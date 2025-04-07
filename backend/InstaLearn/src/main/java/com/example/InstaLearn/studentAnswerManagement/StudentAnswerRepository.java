package com.example.InstaLearn.studentAnswerManagement;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface StudentAnswerRepository extends JpaRepository<StudentAnswer,Integer> {
    public List<StudentAnswer> findByQpIdAndStId(int qp_id, String st_id);
    @Query("SELECT sa.qpId FROM StudentAnswer sa WHERE sa.stId = :stid")
    List<Integer> findQPIDByStId(@Param("stid") String stid);
}
