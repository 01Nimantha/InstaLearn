package com.example.InstaLearn.userManagement.service.impl;
import com.example.InstaLearn.userManagement.dto.AOfficerSaveRequestDTO;
import com.example.InstaLearn.userManagement.dto.AOfficerUpdateRequestDTO;
import com.example.InstaLearn.userManagement.entity.AttendanceOfficer;
import com.example.InstaLearn.userManagement.repo.AOfficerRepo;
import com.example.InstaLearn.userManagement.service.AOfficerService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AOfficerServiceIMPL implements AOfficerService {

    @Autowired
    private AOfficerRepo aOfficerRepo;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public String saveAttendanceOfficer(AOfficerSaveRequestDTO aOfficerSaveRequestDTO) {
        AttendanceOfficer attendanceOfficer = modelMapper.map(aOfficerSaveRequestDTO, AttendanceOfficer.class);
        aOfficerRepo.save(attendanceOfficer);
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
}
