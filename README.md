# Vignan Student Management System

A web-based Student Management System built to organize and manage student information using Java, Spring Boot, MySQL, HTML, CSS, and JavaScript.

## Overview

The Vignan Student Management System is a full-stack web application designed as a college project. It combines a web-based frontend with a Spring Boot backend and a MySQL database.

## Features

- Web-based user interface
- REST API backend using Spring Boot
- MySQL database integration
- Frontend built with HTML, CSS, and JavaScript

*Additional features depend on the functionality implemented in the current version.*

## Technology Stack

| Component | Technology |
|---|---|
| Backend | Java, Spring Boot |
| API | REST API |
| Database | MySQL |
| Frontend | HTML, CSS, JavaScript |
| Build Tool | Maven |

## Project Structure

```text
WORKSHOP/
├── stud_mgmt_frontend/
│   ├── index.html
│   ├── style.css
│   └── app.js
├── vignan_stud_mgmt/
│   ├── src/
│   ├── pom.xml
│   └── mvnw
├── .gitignore
└── README.md
```

## Getting Started

### Prerequisites

- Java Development Kit (JDK)
- MySQL Server
- A modern web browser
- Git (optional, for cloning the repository)

### Setup

1. Clone this repository:

   ```bash
   git clone https://github.com/saivarun1266/vignan-student-management-system.git
   ```

2. Create a MySQL database for the application.

3. Configure your database connection using a local configuration file. Never commit real database passwords or other secrets to GitHub.

4. Open the `vignan_stud_mgmt` folder and configure the application as needed.

5. Start the Spring Boot backend using your IDE or Maven wrapper.

6. Open `stud_mgmt_frontend/index.html` in your browser and configure the frontend to use the correct backend URL.

## Future Improvements

- Deploy the frontend and backend online
- Improve validation and error handling
- Add authentication and role-based access where needed
- Add screenshots and usage documentation

## Repository

GitHub: https://github.com/saivarun1266/vignan-student-management-system

## Author

Developed as a student project at Vignan Institute of Technology and Science, Hyderabad.