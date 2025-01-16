package com.example.InstaLearn.userManagement.dto;

import com.example.InstaLearn.userManagement.entity.idgenerator.AdminIdSequenceGenerator;
import jakarta.persistence.Column;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class AOfficerSaveRequestDTO {

    private String attendanceOfficerName;
    private String attendanceOfficerEmail;
    private String attendanceOfficerContactno;
    private String attendanceOfficerAddress;
}
