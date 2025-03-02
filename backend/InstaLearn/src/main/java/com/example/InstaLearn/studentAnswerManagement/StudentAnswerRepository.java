package com.example.InstaLearn.studentAnswerManagement;


import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface StudentAnswerRepository extends JpaRepository<StudentAnswer,Integer> {
    public List<StudentAnswer> findByQpIdAndStId(int qp_id, String st_id);

}
