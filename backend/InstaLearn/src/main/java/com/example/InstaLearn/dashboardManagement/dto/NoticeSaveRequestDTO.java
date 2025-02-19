package com.example.InstaLearn.dashboardManagement.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data

public class NoticeSaveRequestDTO {
        private int noticeId;
        private String title;
        private String body;

}
