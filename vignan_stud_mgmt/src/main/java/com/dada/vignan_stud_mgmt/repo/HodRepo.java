package com.dada.vignan_stud_mgmt.repo;

import com.dada.vignan_stud_mgmt.entities.Hod;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface HodRepo extends JpaRepository<Hod, Integer> {

    Optional<Hod> findByUsernameAndPassword(String username, String password);
}