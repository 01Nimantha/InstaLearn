package com.example.InstaLearn.classTypeManagement.repo;

import com.example.InstaLearn.classTypeManagement.entity.ClassType;
import com.example.InstaLearn.classTypeManagement.entity.enums.Type;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
@EnableJpaRepositories
public interface ClassTypeRepo extends JpaRepository<ClassType, Long> {

    @Query("SELECT c.classTypeName FROM ClassType c")
    List<String> findAllClassNames();

    @Query("SELECT c.type FROM ClassType c")
    List<String> findAllClassTypes();

    Optional<ClassType> findByClassTypeNameAndType(String classTypeName, Type type);

    @Query("SELECT c.classTypeId FROM ClassType c WHERE c.classTypeName = :classTypeName AND c.type = :type")
    Optional<Long> findClassTypeIdByClassNameAndClassType(@Param("classTypeName") String classTypeName,
                                                          @Param("type") Type type);

}
