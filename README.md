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
  "nombre": "Yoga al aire libre",
  "ubicacion": "Cancha 3",
  "fechaInicio": "2024-04-01",
  "fechaFin": "2024-04-30",
  "horaInicio": "08:00",
  "horaFin": "09:00",
  "maxEstudiantes": 30,
  "instructor": {
    "id": 2,
    "nombre": "Sarah",
    "apellido": "Marenco"
  }
}
```

