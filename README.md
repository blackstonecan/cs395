
# System Monitoring Web Application

## Introduction

This project is a web-based system monitoring application for the **CS-395 2024 Fall Project**. It is designed with simplicity in mind, using a clean admin panel layout to prevent clutter and confusion. Each feature is displayed one at a time, and navigation is provided via a navbar.

## Table of Contents

1. [Features](#features)
2. [Installation](#installation)
3. [Usage](#usage)
4. [Configuration](#configuration)
5. [Dependencies](#dependencies)
6. [Contributors](#contributors)
7. [License](#license)

---

## Features

- **Password Protection**: Restricted access with username and password.
- **System Stats**:
  - CPU, memory, disk, and load details.
  - Process listing with sorting by CPU, memory, or PID.
  - Process summary: counts and states.
  - List of logged-in users and system logs.
- **Clean Design**:
  - Admin panel layout with a **navbar for easy navigation**.
  - Only one feature displayed at a time to avoid clutter.
- **Containerized**: Runs in Docker for easy setup.

---

## Installation

### Requirements
- Docker
- Docker Compose

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/emrehancetin/CS-395.git
   cd https://github.com/emrehancetin/CS-395
   ```
2. Build and run:
   ```bash
   docker-compose up --build
   ```
3. Access at:
   ```
   https://cs395.org/<your Linux user ID>/monitor
   ```

---

## Usage

### Steps
- It is running on 443 and 8765 PORTS.
- Go to '/register' page and register.
- After that, it will direct you to home page which is '/'.

### Navigation
- Use the navbar to switch between features like system stats, process lists, and user logs.

---

## Configuration

### Environment Variables

The application requires a `.env` file with the following environment variables:

- **HTTPS_PORT**: The port used for HTTPS access. Defaults to `443`.
- **HTTP_PORT**: The port used for HTTP access. Defaults to `80`.
- **SYS_SECRET**: A secret key used for application security (e.g., session management, encryption). **Keep this confidential!**
- **NODE_ENV**: Defines the environment in which the application runs. Defaults to `production`. For development, use `development`.

---

## Dependencies

- **Backend**: Node.js, Express.js
- **Frontend**: HTML, CSS, JavaScript
- **Containerization**: Docker, Docker Compose

---

## Contributors

- **Emrehan ÇETİN**
- **Emre Can KARATAŞ**

GitHub Repository: [https://github.com/emrehancetin/CS-395](https://github.com/emrehancetin/CS-395)


---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---
