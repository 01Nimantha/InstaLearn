package com.example.InstaLearn.userManagement.service.impl;
import com.example.InstaLearn.userManagement.dto.AOfficerSaveRequestDTO;
import com.example.InstaLearn.userManagement.dto.AOfficerUpdateRequestDTO;
import com.example.InstaLearn.userManagement.entity.Admin;
import com.example.InstaLearn.userManagement.entity.AttendanceOfficer;
import com.example.InstaLearn.userManagement.entity.User;
import com.example.InstaLearn.userManagement.entity.enums.Role;
import com.example.InstaLearn.userManagement.repo.AOfficerRepo;
import com.example.InstaLearn.userManagement.repo.UserRepo;
import com.example.InstaLearn.userManagement.service.AOfficerService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AOfficerServiceIMPL implements AOfficerService {

    @Autowired
    private AOfficerRepo aOfficerRepo;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private UserRepo userRepo;

    @Override
    public String saveAttendanceOfficer(AOfficerSaveRequestDTO aOfficerSaveRequestDTO) {
        AttendanceOfficer attendanceOfficer = modelMapper.map(aOfficerSaveRequestDTO, AttendanceOfficer.class);
        aOfficerRepo.save(attendanceOfficer);

        User user = new User();
        user.setUserName(String.valueOf(attendanceOfficer.getAttendanceOfficerId()));// Set attendanceOfficerId as userName
        user.setRole(Role.valueOf("AOFFICER"));
        userRepo.save(user);

        // Associate the saved User with the attendanceofficer entity
        attendanceOfficer.setUser(user);
        aOfficerRepo.save(attendanceOfficer);// Update attendanceofficer with the associated User

        return attendanceOfficer.getAttendanceOfficerName() + " Saved successfully";
    }

    @Override
    public String updateAttendanceOfficer(String attendanceOfficerId, AOfficerUpdateRequestDTO aOfficerUpdateDTO) {
        if (aOfficerRepo.existsById(attendanceOfficerId)) {

            AttendanceOfficer attendanceOfficer = aOfficerRepo.getReferenceById(attendanceOfficerId);
            modelMapper.map(aOfficerUpdateDTO, attendanceOfficer);
            aOfficerRepo.save(attendanceOfficer);

            return attendanceOfficer.getAttendanceOfficerName() + " updated successfully";
        } else {
            throw new RuntimeException("Admin not found");
        }
    }

    @Override
    public String deleteAttendanceOfficer(String attendanceOfficerId) {
            if(aOfficerRepo.existsById(attendanceOfficerId)) {
                aOfficerRepo.deleteById(attendanceOfficerId);
                return attendanceOfficerId + " deleted successfully";
            }else{
                throw new RuntimeException("Admin not found");
            }

    }

    @Override
    public Page<AttendanceOfficer> getAllAttandanceOfficers(Pageable pageable) {
        return aOfficerRepo.findAll(pageable);
    }

    @Override
    public AttendanceOfficer getAttendanceOfficerById(String attendanceOfficerId) {
        return aOfficerRepo.findById(attendanceOfficerId).orElse(null);
    }
}
