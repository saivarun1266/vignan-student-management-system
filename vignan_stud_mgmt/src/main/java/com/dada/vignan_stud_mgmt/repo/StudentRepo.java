package com.dada.vignan_stud_mgmt.repo;

import com.dada.vignan_stud_mgmt.entities.Student;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentRepo extends JpaRepository<Student, Integer> {

}