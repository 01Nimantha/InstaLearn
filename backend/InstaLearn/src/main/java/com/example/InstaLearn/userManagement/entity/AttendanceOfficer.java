package com.example.InstaLearn.userManagement.entity;

import com.example.InstaLearn.userManagement.entity.idgenerator.AOfficerIdSequenceGenerator;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="attendance_officer")
@AllArgsConstructor
@NoArgsConstructor
@Data

public class AttendanceOfficer {
    @Id
    @Column(name = "a_officer_id", updatable = false, nullable = false)
    private String attendanceOfficerId;

    @PrePersist
    private void generateId() {
        if (this.attendanceOfficerId == null) {
            this.attendanceOfficerId = generateAttendanceOfficerId();
        }
    }
    private String generateAttendanceOfficerId() {
        String prefix = "AO_2025_";
        int nextNumber = AOfficerIdSequenceGenerator.getNextId();
        return prefix + String.format("%05d", nextNumber);
    }

    @Column(name="attendanceOfficer_name")
    private String attendanceOfficerName;

    @Column(name="attendanceOfficer_email")
    private String attendanceOfficerEmail;

    @Column(name="attendanceOfficer_contactno")
    private String attendanceOfficerContactno;

    @Column(name="attendanceOfficer_address")
    private String attendanceOfficerAddress;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "image_id", referencedColumnName = "imageId")
    private Image image;

    @OneToOne
    private User user;

}
