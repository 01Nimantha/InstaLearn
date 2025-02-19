package com.example.InstaLearn.dashboardManagement.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name= "notice")
@AllArgsConstructor
@NoArgsConstructor
@Data

public class Notice {
    @Id
    @Column(name = "notice_id")
    @GeneratedValue(strategy =GenerationType.AUTO)
    private int noticeId;

    @Column(name="title")
    private String title;

    @Column(name="body")
    private String body;


}
