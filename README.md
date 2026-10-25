# RESTful Laravel

A Laravel RESTful API for managing student records. No frontend. Tested with Postman.

## Lab Activities

The lab activities are available in their respective branches in this repository. Make sure to switch to the appropriate branch to access them.

## Requirements

- PHP 8.5+
- Composer
- MySQL / MariaDB
- Postman

## Setup

```bash
composer install
cp .env.example .env
php artisan key:generate
```

Edit `.env` for your database:

```
DB_CONNECTION=mysql
DB_DATABASE=restful_laravel
DB_USERNAME=root
DB_PASSWORD=
```

Then:

```bash
php artisan migrate
composer run dev
```

API base URL: `http://127.0.0.1:8000/api`

## Endpoints

### Public

| Method | URI             | Action   |
| ------ | --------------- | -------- |
| POST   | `/api/register` | Register |
| POST   | `/api/login`    | Login    |

### Authenticated (any role)

| Method | URI                  | Action          |
| ------ | -------------------- | --------------- |
| POST   | `/api/logout`        | Revoke token    |
| GET    | `/api/students`      | List students   |
| GET    | `/api/students/{id}` | Get one student |

### Admin only

| Method    | URI                  | Action         |
| --------- | -------------------- | -------------- |
| POST      | `/api/students`      | Create student |
| PUT/PATCH | `/api/students/{id}` | Update student |
| DELETE    | `/api/students/{id}` | Delete student |

## Project Structure (Relevant Files)

```
app/
├── Http/
│ ├── Controllers/
│ │ ├── AuthController.php
│ │ └── StudentController.php
│ ├── Middleware/
│ │ └── EnsureUserIsAdmin.php
│ └── Requests/
│ └── StudentRequest.php
└── Models/
  ├── Student.php
  └── User.php

bootstrap/
└── app.php

database/
└── migrations/
├── xxxx_xx_xx_create_students_table.php
├── xxxx_xx_xx_create_users_table.php
└── xxxx_xx_xx_create_personal_access_tokens_table.php

routes/
└── api.php
```
