package com.example.InstaLearn.userManagement.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table
@AllArgsConstructor
@NoArgsConstructor
@Data

public class AttendanceOfficer {
    @Id
    @Column(name = "attendanceOfficer_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int attendanceOfficerId;

    @Column(name="attendanceOfficer_name")
    private String attendanceOfficerName;

    @Column(name="attendanceOfficer_email")
    private String attendanceOfficerEmail;

    @Column(name="attendanceOfficer_contactno")
    private String attendanceOfficerContactno;

    @Column(name="attendanceOfficer_address")
    private String attendanceOfficerAddress;

}
