package com.example.InstaLearn.dashboardManagement.service.impl;


import com.example.InstaLearn.dashboardManagement.dto.NoticeSaveRequestDTO;
import com.example.InstaLearn.dashboardManagement.entity.Notice;
import com.example.InstaLearn.dashboardManagement.repo.NoticeRepo;
import com.example.InstaLearn.dashboardManagement.service.NoticeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class NoticeServiceIMPL implements NoticeService {

    @Autowired
    private NoticeRepo noticeRepo;

    @Override
    public String saveNotice(NoticeSaveRequestDTO noticeSaveRequestDTO) {
        Notice notice=new Notice(
                noticeSaveRequestDTO.getNoticeId(),
                noticeSaveRequestDTO.getTitle(),
                noticeSaveRequestDTO.getBody()
        );
        noticeRepo.save(notice);
       return noticeSaveRequestDTO.getTitle();
    }

    @Override
    public String updateNotice(NoticeSaveRequestDTO noticeSaveRequestDTO) {

        if(noticeRepo.existsById(noticeSaveRequestDTO.getNoticeId())){
            Notice notice=noticeRepo.getReferenceById(noticeSaveRequestDTO.getNoticeId());
            notice.setTitle(noticeSaveRequestDTO.getTitle());
            notice.setBody(noticeSaveRequestDTO.getBody());

            noticeRepo.save(notice);
            return noticeSaveRequestDTO.getTitle()+"Updated Successfully";
        }
        else{
            throw new RuntimeException("No data found for that id");
        }
    }

    @Override
    public String deleteNotice(int noticeId) {

        if(noticeRepo.existsById(noticeId)){
            noticeRepo.deleteById(noticeId);
            return "Deleted Successfully"+ noticeId;
        }
        else{
            throw new RuntimeException("No customer found for that id");
        }
    }
}
