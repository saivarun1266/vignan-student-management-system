package com.dada.vignan_stud_mgmt.controllers;

import com.dada.vignan_stud_mgmt.entities.Student;
import com.dada.vignan_stud_mgmt.service.StudentService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/student")
public class StudentController {

    private final StudentService studentService;

    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    @PostMapping("/add")
    public Student addStudent(@RequestBody Student student) {
        return studentService.addStudent(student);
    }

    @PutMapping("/update/{studentId}")
    public Object updateStudent(@PathVariable int studentId,
                                @RequestBody Student student) {
        return studentService.updateStudent(studentId, student);
    }

    @DeleteMapping("/delete/{studentId}")
    public String deleteStudent(@PathVariable int studentId) {
        return studentService.deleteStudent(studentId);
    }

    @GetMapping("/{studentId}")
    public Object getStudent(@PathVariable int studentId) {
        return studentService.getStudent(studentId);
    }

    @GetMapping("/all")
    public List<Student> getAllStudents() {
        return studentService.getAllStudents();
    }
}