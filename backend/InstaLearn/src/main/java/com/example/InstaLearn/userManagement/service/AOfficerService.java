package com.example.InstaLearn.userManagement.service;

import com.example.InstaLearn.userManagement.dto.AOfficerSaveRequestDTO;
import com.example.InstaLearn.userManagement.dto.AOfficerUpdateRequestDTO;

public interface AOfficerService {
    String saveAttendanceOfficer(AOfficerSaveRequestDTO aOfficerSaveRequestDTO);

    String updateAttendanceOfficer(String attendanceOfficerId, AOfficerUpdateRequestDTO aOfficerUpdateRequestDTO);

    String deleteAttendanceOfficer(String attendanceOfficerId);
}
