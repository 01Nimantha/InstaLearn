package com.example.InstaLearn.dashboardManagement.service;

import com.example.InstaLearn.dashboardManagement.dto.NoticeSaveRequestDTO;
import com.example.InstaLearn.dashboardManagement.entity.Notice;

import java.util.List;

public interface NoticeService {
    String saveNotice(NoticeSaveRequestDTO noticeSaveRequestDTO);

    String updateNotice(NoticeSaveRequestDTO noticeUpdateRequestDTO);

    String deleteNotice(int noticeId);


    List<Notice> getAllNotices();
}
