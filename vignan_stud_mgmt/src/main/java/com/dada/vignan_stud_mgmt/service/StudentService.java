package com.dada.vignan_stud_mgmt.service;

import com.dada.vignan_stud_mgmt.entities.Student;
import com.dada.vignan_stud_mgmt.repo.StudentRepo;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StudentService {

    private final StudentRepo studentRepo;

    public StudentService(StudentRepo studentRepo) {
        this.studentRepo = studentRepo;
    }

    public Student addStudent(Student student) {
        return studentRepo.save(student);
    }

    public Object updateStudent(int studentId, Student student) {

        Optional<Student> existingStudent = studentRepo.findById(studentId);

        if (existingStudent.isPresent()) {
            student.setStudentId(studentId);
            return studentRepo.save(student);
        }

        return "Student not found";
    }

    public String deleteStudent(int studentId) {

        Optional<Student> student = studentRepo.findById(studentId);

        if (student.isPresent()) {
            studentRepo.deleteById(studentId);
            return "Student deleted successfully";
        }

        return "Student not found";
    }

    public Object getStudent(int studentId) {

        Optional<Student> student = studentRepo.findById(studentId);

        if (student.isPresent()) {
            return student.get();
        }

        return "Student not found";
    }

    public List<Student> getAllStudents() {
        return studentRepo.findAll();
    }
}