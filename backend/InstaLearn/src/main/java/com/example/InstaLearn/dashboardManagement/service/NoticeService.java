package com.example.InstaLearn.dashboardManagement.service;

import com.example.InstaLearn.dashboardManagement.dto.NoticeSaveRequestDTO;

public interface NoticeService {
    String saveNotice(NoticeSaveRequestDTO noticeSaveRequestDTO);

    String updateNotice(NoticeSaveRequestDTO noticeUpdateRequestDTO);

    String deleteNotice(int noticeId);
}
