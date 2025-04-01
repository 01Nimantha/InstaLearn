package com.example.InstaLearn.userManagement.service.impl;

import com.example.InstaLearn.userManagement.dto.ParentUpdateRequestDTO;
import com.example.InstaLearn.userManagement.entity.Parent;
import com.example.InstaLearn.userManagement.repo.ParentRepo;
import com.example.InstaLearn.userManagement.service.ParentService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ParentServiceIMPL implements ParentService {

    @Autowired
    private ParentRepo parentRepo;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public String updateParent(String parentId, ParentUpdateRequestDTO parentUpdateRequestDTO) {
        if (parentRepo.existsById(parentId)) {

            Parent parent = parentRepo.getReferenceById(parentId);
            modelMapper.map(parentUpdateRequestDTO, parent);
            parentRepo.save(parent);

            return parent.getParentName() + " updated successfully";
        } else {
            throw new RuntimeException("Student not found");
        }
    }

    @Override
    public Page<Parent> getAllParents(Pageable pageable) {
        return parentRepo.findAll(pageable);

    }

    @Override
    public Parent getParentById(String parentId) {
        return parentRepo.findById(parentId).orElse(null);
    }
}
