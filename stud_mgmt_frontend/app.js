// =====================================================
// SPRING BOOT BACKEND URL
// =====================================================

const API_URL = "http://localhost:8082";


// =====================================================
// LOCAL STORAGE KEYS
// =====================================================

const HOD_STORAGE_KEY = "vignan_logged_hod";
const STUDENTS_STORAGE_KEY = "vignan_students";


// =====================================================
// VARIABLES
// =====================================================

let currentHod = null;
let students = [];
let editingStudentId = null;
let deletingStudentId = null;


// =====================================================
// ELEMENTS
// =====================================================

const loginPage = document.getElementById("loginPage");
const dashboardPage = document.getElementById("dashboardPage");

const loginForm = document.getElementById("loginForm");

const username = document.getElementById("username");
const password = document.getElementById("password");

const loginMessage = document.getElementById("loginMessage");

const showPassword = document.getElementById("showPassword");

const dashboardSection =
    document.getElementById("dashboardSection");

const studentSection =
    document.getElementById("studentSection");

const formSection =
    document.getElementById("formSection");

const studentTable =
    document.getElementById("studentTable");

const noStudents =
    document.getElementById("noStudents");

const searchInput =
    document.getElementById("searchInput");

const toast =
    document.getElementById("toast");

const deleteModal =
    document.getElementById("deleteModal");


// =====================================================
// PAGE LOAD
// =====================================================

document.addEventListener("DOMContentLoaded", function () {

    loadHodFromStorage();

    loadStudentsFromStorage();

});


// =====================================================
// LOAD HOD FROM LOCAL STORAGE
// =====================================================

function loadHodFromStorage() {

    const savedHod =
        localStorage.getItem(HOD_STORAGE_KEY);

    if (savedHod) {

        try {

            currentHod = JSON.parse(savedHod);

            openDashboard();

        } catch (error) {

            localStorage.removeItem(HOD_STORAGE_KEY);

        }

    }

}


// =====================================================
// LOAD STUDENTS FROM LOCAL STORAGE
// =====================================================

function loadStudentsFromStorage() {

    const savedStudents =
        localStorage.getItem(STUDENTS_STORAGE_KEY);

    if (savedStudents) {

        try {

            students = JSON.parse(savedStudents);

        } catch (error) {

            students = [];

        }

    }

}


// =====================================================
// SAVE STUDENTS TO LOCAL STORAGE
// =====================================================

function saveStudentsToStorage() {

    localStorage.setItem(
        STUDENTS_STORAGE_KEY,
        JSON.stringify(students)
    );

}


// =====================================================
// HOD LOGIN
// EXACT BACKEND URL:
//
// POST /api/hod/login?username=...&password=...
// =====================================================

loginForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    const user =
        username.value.trim();

    const pass =
        password.value.trim();


    if (!user || !pass) {

        showLoginError(
            "Please enter username and password."
        );

        return;
    }


    try {

        const url =
            `${API_URL}/api/hod/login?username=${encodeURIComponent(user)}&password=${encodeURIComponent(pass)}`;


        console.log("LOGIN REQUEST:", url);


        const response =
            await fetch(url, {
                method: "POST"
            });


        const text =
            await response.text();


        console.log(
            "LOGIN STATUS:",
            response.status
        );

        console.log(
            "LOGIN RESPONSE:",
            text
        );


        if (!response.ok) {

            showLoginError(
                text || "Invalid user"
            );

            return;
        }


        const hod =
            JSON.parse(text);


        currentHod = hod;


        // Store HOD in local storage

        localStorage.setItem(
            HOD_STORAGE_KEY,
            JSON.stringify(hod)
        );


        username.value = "";
        password.value = "";


        openDashboard();


    } catch (error) {

        console.error(
            "LOGIN ERROR:",
            error
        );

        showLoginError(
            "Backend server is not reachable. Start Spring Boot on port 8080."
        );

    }

});


// =====================================================
// PASSWORD SHOW / HIDE
// =====================================================

showPassword.addEventListener("click", function () {

    if (password.type === "password") {

        password.type = "text";

        showPassword.textContent = "Hide";

    } else {

        password.type = "password";

        showPassword.textContent = "Show";

    }

});


// =====================================================
// OPEN DASHBOARD
// =====================================================

function openDashboard() {

    loginPage.classList.add("hidden");

    dashboardPage.classList.remove("hidden");


    document.getElementById("headerHodName")
        .textContent =
        currentHod.name || "HOD";


    document.getElementById("headerDepartment")
        .textContent =
        currentHod.department || "Department";


    document.getElementById("welcomeName")
        .textContent =
        currentHod.name || "HOD";


    showDashboard();


    // Get latest data from backend

    loadStudentsFromBackend();

}


// =====================================================
// LOGOUT
// =====================================================

document.getElementById("logoutBtn")
    .addEventListener("click", function () {

        currentHod = null;


        // Remove login information

        localStorage.removeItem(
            HOD_STORAGE_KEY
        );


        // Hide dashboard

        dashboardPage.classList.add("hidden");

        loginPage.classList.remove("hidden");


        // Clear login fields

        username.value = "";

        password.value = "";


        showLoginError("");


        loginMessage.style.display = "none";


        showDashboard();


    });


// =====================================================
// NAVIGATION
// =====================================================

document.getElementById("dashboardBtn")
    .addEventListener(
        "click",
        showDashboard
    );


document.getElementById("studentsBtn")
    .addEventListener(
        "click",
        showStudents
    );


document.getElementById("addBtn")
    .addEventListener(
        "click",
        showAddStudent
    );


document.getElementById("quickAdd")
    .addEventListener(
        "click",
        showAddStudent
    );


document.getElementById("quickView")
    .addEventListener(
        "click",
        showStudents
    );


document.getElementById("addStudentBtn")
    .addEventListener(
        "click",
        showAddStudent
    );


// =====================================================
// SHOW DASHBOARD
// =====================================================

function showDashboard() {

    dashboardSection.classList.remove("hidden");

    studentSection.classList.add("hidden");

    formSection.classList.add("hidden");


    document.getElementById("dashboardBtn")
        .classList.add("active");

    document.getElementById("studentsBtn")
        .classList.remove("active");

    document.getElementById("addBtn")
        .classList.remove("active");


    document.getElementById("pageTitle")
        .textContent = "Dashboard";

    document.getElementById("pageDescription")
        .textContent =
        "Student Management System";


    updateStatistics();

}


// =====================================================
// SHOW STUDENTS
// =====================================================

async function showStudents() {

    dashboardSection.classList.add("hidden");

    studentSection.classList.remove("hidden");

    formSection.classList.add("hidden");


    document.getElementById("dashboardBtn")
        .classList.remove("active");

    document.getElementById("studentsBtn")
        .classList.add("active");

    document.getElementById("addBtn")
        .classList.remove("active");


    document.getElementById("pageTitle")
        .textContent = "Students";

    document.getElementById("pageDescription")
        .textContent =
        "View, search, edit and delete students";


    await loadStudentsFromBackend();

}


// =====================================================
// SHOW ADD STUDENT
// =====================================================

function showAddStudent() {

    dashboardSection.classList.add("hidden");

    studentSection.classList.add("hidden");

    formSection.classList.remove("hidden");


    document.getElementById("dashboardBtn")
        .classList.remove("active");

    document.getElementById("studentsBtn")
        .classList.remove("active");

    document.getElementById("addBtn")
        .classList.add("active");


    document.getElementById("pageTitle")
        .textContent = "Add Student";

    document.getElementById("pageDescription")
        .textContent =
        "Create a new student record";


    document.getElementById("formTitle")
        .textContent = "Add Student";


    document.getElementById("formDescription")
        .textContent =
        "Enter student information";


    document.getElementById("saveBtn")
        .textContent = "Save Student";


    clearStudentForm();

}


// =====================================================
// LOAD STUDENTS FROM BACKEND
//
// GET /api/student/all
// =====================================================

async function loadStudentsFromBackend() {

    try {

        const response =
            await fetch(
                `${API_URL}/api/student/all`,
                {
                    method: "GET"
                }
            );


        console.log(
            "GET ALL STUDENTS STATUS:",
            response.status
        );


        if (!response.ok) {

            console.log(
                "Backend failed. Using localStorage."
            );

            renderStudents(students);

            return;
        }


        const data =
            await response.json();


        students = data;


        // Store backend data locally

        saveStudentsToStorage();


        renderStudents(students);

        updateStatistics();


    } catch (error) {

        console.error(
            "GET STUDENTS ERROR:",
            error
        );


        // Fallback to localStorage

        renderStudents(students);

        updateStatistics();

    }

}


// =====================================================
// RENDER STUDENTS
// =====================================================

function renderStudents(list) {

    studentTable.innerHTML = "";


    if (!list || list.length === 0) {

        noStudents.classList.remove("hidden");

        return;

    }


    noStudents.classList.add("hidden");


    list.forEach(function (student) {

        const row =
            document.createElement("tr");


        row.innerHTML = `

            <td>${student.studentId}</td>

            <td>
                <strong>
                    ${escapeHTML(student.rollNo)}
                </strong>
            </td>

            <td>
                ${escapeHTML(student.name)}
            </td>

            <td>
                ${escapeHTML(student.email)}
            </td>

            <td>
                ${escapeHTML(student.course)}
            </td>

            <td>
                ${escapeHTML(student.branch)}
            </td>

            <td>
                ${student.year}
            </td>

            <td>
                <strong>
                    ${student.cgpa}
                </strong>
            </td>

            <td>

                <div class="action-buttons">

                    <button
                        class="edit-btn"
                        onclick="editStudent(${student.studentId})"
                    >
                        Edit
                    </button>

                    <button
                        class="delete-btn"
                        onclick="openDeleteModal(${student.studentId})"
                    >
                        Delete
                    </button>

                </div>

            </td>
        `;


        studentTable.appendChild(row);

    });

}


// =====================================================
// SEARCH
//
// Search is performed on localStorage/backend data
// =====================================================

searchInput.addEventListener(
    "input",
    function () {

        const value =
            searchInput.value
                .trim()
                .toLowerCase();


        if (!value) {

            renderStudents(students);

            return;
        }


        const filtered =
            students.filter(function (student) {

                return (

                    String(student.studentId)
                        .toLowerCase()
                        .includes(value)

                    ||

                    String(student.rollNo)
                        .toLowerCase()
                        .includes(value)

                    ||

                    String(student.name)
                        .toLowerCase()
                        .includes(value)

                    ||

                    String(student.email)
                        .toLowerCase()
                        .includes(value)

                    ||

                    String(student.course)
                        .toLowerCase()
                        .includes(value)

                    ||

                    String(student.branch)
                        .toLowerCase()
                        .includes(value)

                );

            });


        renderStudents(filtered);

    }
);


// =====================================================
// CLEAR SEARCH
// =====================================================

document.getElementById("clearSearch")
    .addEventListener(
        "click",
        function () {

            searchInput.value = "";

            renderStudents(students);

        }
    );


// =====================================================
// ADD / UPDATE STUDENT
//
// ADD:
// POST /api/student/add
//
// UPDATE:
// PUT /api/student/update/{studentId}
// =====================================================

document.getElementById("studentForm")
    .addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            const student = {

                rollNo:
                    document.getElementById("rollNo")
                        .value.trim(),

                email:
                    document.getElementById("email")
                        .value.trim(),

                name:
                    document.getElementById("studentName")
                        .value.trim(),

                course:
                    document.getElementById("course")
                        .value.trim(),

                branch:
                    document.getElementById("branch")
                        .value.trim(),

                year:
                    Number(
                        document.getElementById("year")
                            .value
                    ),

                javaMarks:
                    Number(
                        document.getElementById("javaMarks")
                            .value
                    ),

                sqlMarks:
                    Number(
                        document.getElementById("sqlMarks")
                            .value
                    ),

                pythonMarks:
                    Number(
                        document.getElementById("pythonMarks")
                            .value
                    ),

                springMarks:
                    Number(
                        document.getElementById("springMarks")
                            .value
                    ),

                cgpa:
                    Number(
                        document.getElementById("cgpa")
                            .value
                    )

            };


            try {

                let response;


                // ================= ADD =================

                if (editingStudentId === null) {

                    response =
                        await fetch(
                            `${API_URL}/api/student/add`,
                            {
                                method: "POST",

                                headers: {
                                    "Content-Type":
                                        "application/json"
                                },

                                body:
                                    JSON.stringify(student)
                            }
                        );

                }


                // ================= UPDATE =================

                else {

                    response =
                        await fetch(
                            `${API_URL}/api/student/update/${editingStudentId}`,
                            {
                                method: "PUT",

                                headers: {
                                    "Content-Type":
                                        "application/json"
                                },

                                body:
                                    JSON.stringify(student)
                            }
                        );

                }


                console.log(
                    "STUDENT SAVE STATUS:",
                    response.status
                );


                const text =
                    await response.text();


                console.log(
                    "STUDENT SAVE RESPONSE:",
                    text
                );


                if (!response.ok) {

                    showToast(
                        text ||
                        "Unable to save student."
                    );

                    return;
                }


                const savedStudent =
                    JSON.parse(text);


                // Update localStorage

                if (editingStudentId === null) {

                    students.push(savedStudent);

                    showToast(
                        "Student added successfully."
                    );

                } else {

                    const index =
                        students.findIndex(
                            function (student) {

                                return student.studentId ===
                                    editingStudentId;

                            }
                        );


                    if (index !== -1) {

                        students[index] =
                            savedStudent;

                    }


                    showToast(
                        "Student updated successfully."
                    );

                }


                saveStudentsToStorage();


                editingStudentId = null;


                clearStudentForm();


                await loadStudentsFromBackend();


                showStudents();

            } catch (error) {

                console.error(
                    "SAVE STUDENT ERROR:",
                    error
                );


                showToast(
                    "Backend server is not reachable."
                );

            }

        }
    );


// =====================================================
// EDIT STUDENT
//
// GET /api/student/{studentId}
// =====================================================

async function editStudent(studentId) {

    try {

        const response =
            await fetch(
                `${API_URL}/api/student/${studentId}`,
                {
                    method: "GET"
                }
            );


        console.log(
            "GET STUDENT STATUS:",
            response.status
        );


        if (!response.ok) {

            showToast(
                "Student not found."
            );

            return;
        }


        const student =
            await response.json();


        editingStudentId =
            student.studentId;


        showAddStudent();


        document.getElementById("formTitle")
            .textContent =
            "Edit Student";


        document.getElementById("formDescription")
            .textContent =
            "Update student information";


        document.getElementById("saveBtn")
            .textContent =
            "Update Student";


        document.getElementById("studentId")
            .value =
            student.studentId;


        document.getElementById("rollNo")
            .value =
            student.rollNo || "";


        document.getElementById("studentName")
            .value =
            student.name || "";


        document.getElementById("email")
            .value =
            student.email || "";


        document.getElementById("course")
            .value =
            student.course || "";


        document.getElementById("branch")
            .value =
            student.branch || "";


        document.getElementById("year")
            .value =
            student.year || "";


        document.getElementById("javaMarks")
            .value =
            student.javaMarks ?? "";


        document.getElementById("sqlMarks")
            .value =
            student.sqlMarks ?? "";


        document.getElementById("pythonMarks")
            .value =
            student.pythonMarks ?? "";


        document.getElementById("springMarks")
            .value =
            student.springMarks ?? "";


        document.getElementById("cgpa")
            .value =
            student.cgpa ?? "";


    } catch (error) {

        console.error(
            "GET STUDENT ERROR:",
            error
        );

        showToast(
            "Unable to connect to backend."
        );

    }

}


// =====================================================
// DELETE MODAL
// =====================================================

function openDeleteModal(studentId) {

    deletingStudentId =
        studentId;

    deleteModal.classList.remove("hidden");

}


document.getElementById("cancelDelete")
    .addEventListener(
        "click",
        function () {

            deletingStudentId = null;

            deleteModal.classList.add("hidden");

        }
    );


// =====================================================
// DELETE STUDENT
//
// DELETE /api/student/delete/{studentId}
// =====================================================

document.getElementById("confirmDelete")
    .addEventListener(
        "click",
        async function () {

            if (deletingStudentId === null) {
                return;
            }


            try {

                const response =
                    await fetch(
                        `${API_URL}/api/student/delete/${deletingStudentId}`,
                        {
                            method: "DELETE"
                        }
                    );


                console.log(
                    "DELETE STATUS:",
                    response.status
                );


                const result =
                    await response.text();


                console.log(
                    "DELETE RESPONSE:",
                    result
                );


                if (!response.ok) {

                    showToast(
                        result ||
                        "Unable to delete student."
                    );

                    return;
                }


                // Remove from localStorage

                students =
                    students.filter(
                        function (student) {

                            return student.studentId !==
                                deletingStudentId;

                        }
                    );


                saveStudentsToStorage();


                deleteModal.classList.add(
                    "hidden"
                );


                showToast(
                    result ||
                    "Student deleted successfully."
                );


                deletingStudentId = null;


                await loadStudentsFromBackend();


                renderStudents(students);


            } catch (error) {

                console.error(
                    "DELETE ERROR:",
                    error
                );

                showToast(
                    "Backend server is not reachable."
                );

            }

        }
    );


// =====================================================
// CANCEL FORM
// =====================================================

document.getElementById("cancelBtn")
    .addEventListener(
        "click",
        showStudents
    );


document.getElementById("cancelBtnBottom")
    .addEventListener(
        "click",
        showStudents
    );


// =====================================================
// CLEAR STUDENT FORM
// =====================================================

function clearStudentForm() {

    document.getElementById("studentForm")
        .reset();

    document.getElementById("studentId")
        .value = "";

    editingStudentId = null;

}


// =====================================================
// STATISTICS
// =====================================================

function updateStatistics() {

    const total =
        students.length;


    document.getElementById("totalStudents")
        .textContent =
        total;


    const branches =
        new Set();


    students.forEach(function (student) {

        if (student.branch) {

            branches.add(
                student.branch.toLowerCase()
            );

        }

    });


    document.getElementById("totalBranches")
        .textContent =
        branches.size;


    if (total === 0) {

        document.getElementById("averageCgpa")
            .textContent =
            "0.00";

        return;
    }


    let totalCgpa = 0;


    students.forEach(function (student) {

        totalCgpa +=
            Number(student.cgpa || 0);

    });


    const average =
        totalCgpa / total;


    document.getElementById("averageCgpa")
        .textContent =
        average.toFixed(2);

}


// =====================================================
// LOGIN ERROR
// =====================================================

function showLoginError(message) {

    if (!message) {

        loginMessage.textContent = "";

        loginMessage.className = "";

        return;
    }


    loginMessage.textContent =
        message;

    loginMessage.className =
        "error";

}


// =====================================================
// TOAST
// =====================================================

function showToast(message) {

    toast.textContent =
        message;

    toast.classList.add("show");


    setTimeout(function () {

        toast.classList.remove("show");

    }, 3000);

}


// =====================================================
// HTML ESCAPE
// =====================================================

function escapeHTML(value) {

    if (
        value === null ||
        value === undefined
    ) {
        return "";
    }


    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");

}