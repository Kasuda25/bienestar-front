# bienestar-front

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


# Endpoints de Autenticación

## 1. Login General (Admin/Instructor)

### POST `/api/auth/login`
Autentica usuarios ADMIN o INSTRUCTOR.

**Request:**
```json
{
  "email": "admin@unicolombo.edu.co",
  "password": "admin123"
}
```

**Respuesta:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "usuario": {
    "id": 1,
    "email": "admin@unicolombo.edu.co",
    "rol": "ADMIN",
    "nombre": "Admin",
    "apellido": "Sistema"
  }
}
```

**Respuesta (error)**
```json
{
  "error": "Credenciales inválidas"
}
```

# Endpoints de Autenticación

## 2. Login (Estudiante)

### POST `/api/auth/login-estudiante`
Autentica estudiantes con código estudiantil.

**Request:**
```json
{
  "email": "estudiante@unicolombo.edu.co",
  "codigoEstudiantil": "UC202401"
}
```

**Respuesta:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "usuario": {
    "id": 2,
    "email": "estudiante@unicolombo.edu.co",
    "rol": "ESTUDIANTE",
    "nombre": "Carlos",
    "apellido": "Marrugo",
    "codigoEstudiantil": "UC202401",
    "horasAcumuladas": 15
  }
}
```

# Endpoints de Actividades

## 3. Actividad (token de authentication para el permiso)

### POST `/api/actividades`
Creacion de actividades con rol admin

**Request:**
```json
{
  "nombre": "Yoga al aire libre",
  "ubicacion": "Cancha 3",
  "fechaInicio": "2024-04-01",
  "fechaFin": "2024-04-30",
  "horaInicio": "08:00",
  "horaFin": "09:00",
  "maxEstudiantes": 30,
  "instructorId": 2
}
```

**Respuesta:**
```json
{
    "id": 1,
    "nombre": "Volleyball",
    "ubicacion": "Cancha Unicolombo",
    "fechaInicio": "2025-05-10",
    "fechaFin": "2025-05-25",
    "horaInicio": "13:00:00",
    "horaFin": "17:00:00",
    "maxEstudiantes": 30,
    "instructor": {
        "id": 2,
        "nombre": "Sarah",
        "apellido": "Marenco",
        "email": "sarah@unicolombo.edu.co",
        "password": "$2a$10$ej/RSZ/ts/BGGkMtTRL8n.PFL4VCHUaxZnlEcn7b5Ok8Ky/D2DfLq",
        "rol": "INSTRUCTOR",
        "activo": true,
        "estudiante": null,
        "enabled": true,
        "username": "sarah@unicolombo.edu.co",
        "authorities": [
            {
                "authority": "ROLE_INSTRUCTOR"
            }
        ],
        "credentialsNonExpired": true,
        "accountNonExpired": true,
        "accountNonLocked": true
    }
}
```

# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about IDE Support for Vue in the [Vue Docs Scaling up Guide](https://vuejs.org/guide/scaling-up/tooling.html#ide-support).
