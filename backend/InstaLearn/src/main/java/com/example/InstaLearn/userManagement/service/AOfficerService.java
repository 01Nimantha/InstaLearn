package com.example.InstaLearn.userManagement.service;

import com.example.InstaLearn.userManagement.dto.AOfficerSaveRequestDTO;
import com.example.InstaLearn.userManagement.dto.AOfficerUpdateRequestDTO;
import com.example.InstaLearn.userManagement.entity.AttendanceOfficer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface AOfficerService {
    String saveAttendanceOfficer(AOfficerSaveRequestDTO aOfficerSaveRequestDTO);

    String updateAttendanceOfficer(String attendanceOfficerId, AOfficerUpdateRequestDTO aOfficerUpdateRequestDTO);

    String deleteAttendanceOfficer(String attendanceOfficerId);

    Page<AttendanceOfficer> getAllAttandanceOfficers(Pageable pageable);

    AttendanceOfficer getAttendanceOfficerById(String attendanceOfficerId);

    Page<AttendanceOfficer> searchAttendanceOfficers(String searchTerm, Pageable pageable);
}
