package com.example.InstaLearn.dashboardManagement.controller;

import com.example.InstaLearn.dashboardManagement.dto.NoticeSaveRequestDTO;
import com.example.InstaLearn.dashboardManagement.entity.Notice;
import com.example.InstaLearn.dashboardManagement.service.NoticeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/notice")
@CrossOrigin

public class NoticeController {
    @Autowired
    private NoticeService noticeService;

    @PostMapping("/save")
    public String saveNotice(@RequestBody NoticeSaveRequestDTO noticeSaveRequestDTO) {
        noticeService.saveNotice(noticeSaveRequestDTO);
        return "saved";

    }
    @PutMapping("/update")
    public String updateNotice(@RequestBody NoticeSaveRequestDTO noticeUpdateRequestDTO) {
        String  msg=noticeService.updateNotice(noticeUpdateRequestDTO);
        return msg;
    }

    @DeleteMapping(
            path = "delete-notice",
            params = "id"
    )
    public String deleteNotice(@RequestParam(value = "id") int noticeId) {
        String deleted=noticeService.deleteNotice(noticeId);
        return deleted;
    }

    @GetMapping("/get-all-notices")
    public List<Notice> getAllNotices() {
        return noticeService.getAllNotices();
    }
}
