package com.dada.vignan_stud_mgmt.service;

import com.dada.vignan_stud_mgmt.entities.Hod;
import com.dada.vignan_stud_mgmt.repo.HodRepo;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class HodService {

    private final HodRepo hodRepo;

    public HodService(HodRepo hodRepo) {
        this.hodRepo = hodRepo;
    }

    public Object login(String username, String password) {

        Optional<Hod> hod = hodRepo.findByUsernameAndPassword(username, password);

        if (hod.isPresent()) {
            return hod.get();
        }

        return "Invalid user";
    }
}