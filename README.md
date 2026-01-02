# School-Internship-Web

This repository contains the source code for an Internship Management System designed for schools. The goal of this project is to provide a user-friendly and efficient platform for managing student internships.

## Technologies Used

**Backend:**
- Spring Boot: Java framework for building web applications.
- Spring Data JPA: Spring module for JPA (Java Persistence API) support.
- Spring Web: Spring module for building web applications.
- PostgreSQL: Database for data storage.

**Frontend:**
- Angular: JavaScript/TypeScript framework for building web applications.
- Bootstrap: CSS framework for designing responsive web pages.
- PrimeNG: UI component library for Angular.

## Backend Setup

To set up the backend, follow these steps:

1. Ensure you have Java Development Kit (JDK) and Apache Maven installed.
2. Import the `backend` folder as a Maven project in your preferred IDE.
3. Update the PostgreSQL database configuration in `application.properties` located in `src/main/resources`.
4. Run the `EcmisApplication.java` file to start the backend server.

## Frontend Setup

To set up the frontend, follow these steps:

1. Ensure you have `Node.js` and npm (Node Package Manager) installed.
2. Open the `frontend` folder in your preferred code editor.
3. Run `npm install` to install the required dependencies.
4. Update the API endpoint in the Angular service files to match the backend server address.
5. Run `ng serve` to start the frontend development server.

## Usage

After setting up the backend and frontend, access the application by visiting http://localhost:4200 in your web browser. From there, you can efficiently manage student internships within the school.
