package com.example.InstaLearn.userManagement.service;

import com.example.InstaLearn.userManagement.dto.AOfficerSaveRequestDTO;
import com.example.InstaLearn.userManagement.dto.AOfficerUpdateRequestDTO;
import com.example.InstaLearn.userManagement.entity.AttendanceOfficer;

import java.util.List;

public interface AOfficerService {
    String saveAttendanceOfficer(AOfficerSaveRequestDTO aOfficerSaveRequestDTO);

    String updateAttendanceOfficer(String attendanceOfficerId, AOfficerUpdateRequestDTO aOfficerUpdateRequestDTO);

    String deleteAttendanceOfficer(String attendanceOfficerId);

    List<AttendanceOfficer> getAllAttandanceOfficers();

    AttendanceOfficer getAttendanceOfficerById(String attendanceOfficerId);
}
