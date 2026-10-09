package com.dada.vignan_stud_mgmt.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "student")
public class Student {

    @Id
    @GeneratedValue(strategy =GenerationType.IDENTITY)
    @Column(name = "studentId")
    private int studentId;

    @Column(name = "rollNo", unique = true)
    private String rollNo;

    @Column(name = "email")
    private String email;

    @Column(name = "name")
    private String name;

    @Column(name = "course")
    private String course;

    @Column(name = "branch")
    private String branch;

    @Column(name = "year")
    private int year;

    @Column(name = "javaMarks")
    private int javaMarks;

    @Column(name = "sqlMarks")
    private int sqlMarks;

    @Column(name = "pythonMarks")
    private int pythonMarks;

    @Column(name = "springMarks")
    private int springMarks;

    @Column(name = "cgpa")
    private double cgpa;

    public Student() {
    }

    public int getStudentId() {
        return studentId;
    }

    public void setStudentId(int studentId) {
        this.studentId = studentId;
    }

    public String getRollNo() {
        return rollNo;
    }

    public void setRollNo(String rollNo) {
        this.rollNo = rollNo;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCourse() {
        return course;
    }

    public void setCourse(String course) {
        this.course = course;
    }

    public String getBranch() {
        return branch;
    }

    public void setBranch(String branch) {
        this.branch = branch;
    }

    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }

    public int getJavaMarks() {
        return javaMarks;
    }

    public void setJavaMarks(int javaMarks) {
        this.javaMarks = javaMarks;
    }

    public int getSqlMarks() {
        return sqlMarks;
    }

    public void setSqlMarks(int sqlMarks) {
        this.sqlMarks = sqlMarks;
    }

    public int getPythonMarks() {
        return pythonMarks;
    }

    public void setPythonMarks(int pythonMarks) {
        this.pythonMarks = pythonMarks;
    }

    public int getSpringMarks() {
        return springMarks;
    }

    public void setSpringMarks(int springMarks) {
        this.springMarks = springMarks;
    }

    public double getCgpa() {
        return cgpa;
    }

    public void setCgpa(double cgpa) {
        this.cgpa = cgpa;
    }
}