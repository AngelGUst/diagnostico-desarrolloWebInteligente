# diagnostico-desarrolloWebInteligente
# Diagnóstico — Sistema de Gestión de Empleados

## Descripción

Aplicación web full-stack para la administración de empleados. Permite registrar, consultar, actualizar y eliminar empleados mediante una interfaz web intuitiva que consume una API REST construida con Spring Boot.

---

## Tecnologías utilizadas

### Backend
| Tecnología | Versión |
|---|---|
| Java | 17+ |
| Spring Boot | 3.x |
| Spring Data JPA | 3.x |
| Hibernate | 6.x |
| MySQL | 8.x |
| Lombok | 1.18+ |
| Maven | 3.x |

### Frontend
| Tecnología | Descripción |
|---|---|
| HTML5 | Estructura de la interfaz |
| CSS3 | Estilos y diseño responsivo |
| JavaScript (Vanilla) | Lógica de consumo de API y manipulación del DOM |

---

## Funcionalidades

- **Listar empleados** — Visualización de todos los empleados en una tabla interactiva.
- **Crear empleado** — Formulario para registrar un nuevo empleado con nombre, apellido, email, cargo y salario.
- **Editar empleado** — Carga los datos del empleado seleccionado en el formulario para su modificación.
- **Eliminar empleado** — Eliminación con modal de confirmación para evitar borrados accidentales.
- **Alertas visuales** — Notificaciones de éxito o error tras cada operación.
- **Diseño responsivo** — Adaptado para escritorio y dispositivos móviles.

---

## Estructura del proyecto

```
diagnostico/
├── diagnostico2/          # Backend Spring Boot
│   ├── src/main/java/com/example/diagnostico2/
│   │   ├── config/        # Configuración CORS
│   │   ├── controller/    # EmpleadoController
│   │   ├── model/         # Entidad Empleado
│   │   ├── repository/    # EmpleadoRepository (JPA)
│   │   └── service/       # EmpleadoService
│   ├── src/main/resources/
│   │   └── application.properties
│   └── pom.xml
└── front-end/             # Frontend estático
    ├── index.html
    ├── index.js
    └── style.css
```

---

## Instrucciones para ejecutar el proyecto

### Requisitos previos

- Java 17 o superior instalado
- Maven 3.x instalado
- MySQL 8 en ejecución
- Navegador web moderno

### 1. Configurar la base de datos

Abre MySQL y crea la base de datos:

```sql
CREATE DATABASE diagnostico_db;
```

> La aplicación crea las tablas automáticamente con `spring.jpa.hibernate.ddl-auto=update`.

### 2. Configurar credenciales (si es necesario)

Edita el archivo `diagnostico2/src/main/resources/application.properties` con tus credenciales de MySQL:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/diagnostico_db
spring.datasource.username=root
spring.datasource.password=root
```

### 3. Ejecutar el backend

Desde la carpeta `diagnostico2/`:

```bash
mvn spring-boot:run
```

El servidor quedará disponible en: `http://localhost:8080`

### 4. Ejecutar el frontend

Abre el archivo `front-end/index.html` directamente en tu navegador, o usa la extensión **Live Server** de VS Code para evitar problemas de CORS en desarrollo.

---

## Endpoints de la API

| Método | Endpoint | Descripción |
|--------|---|---|
| GET | `/api/empleados` | Obtener todos los empleados |
| GET | `/api/empleados/{id}` | Obtener empleado por ID |
| POST | `/api/empleados` | Crear nuevo empleado |
| PUT | `/api/empleados/{id}` | Actualizar empleado |
| DELETE | `/api/empleados/{id}` | Eliminar empleado |
