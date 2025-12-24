# 📦 Proyecto Laravel 12

Aplicación desarrollada con **Laravel 12**, **PHP 8.3**, **Inertia.js** y **React**.

---

## 🧰 Requisitos

- PHP **8.3**
- Composer
- Node.js (v18 o superior recomendado)
- NPM
- Base de datos (MySQL / MariaDB / PostgreSQL)

---

## 🚀 Instalación

### 1. Clonar el repositorio
```bash
git clone <url-del-repositorio>
cd <nombre-del-proyecto>
```

---

### 2. Crear archivo `.env`
```bash
cp .env.example .env
```

---

### 3. Configurar variables de entorno

Editar el archivo `.env` y ajustar las variables necesarias:

```env
APP_NAME=Laravel
APP_ENV=local
APP_KEY=
APP_DEBUG=true
APP_URL=http://127.0.0.1:8000

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=nombre_base_datos
DB_USERNAME=usuario
DB_PASSWORD=contraseña
```

Generar la clave de la aplicación:

```bash
php artisan key:generate
```

---

### 4. Instalar dependencias PHP
```bash
composer install
```

---

### 5. Instalar dependencias de Node
```bash
npm install
```

---

### 6. Compilar assets

Modo desarrollo:
```bash
npm run dev
```

Modo producción:
```bash
npm run build
```

---

### 7. Ejecutar migraciones
```bash
php artisan migrate
```

---

## ▶️ Ejecutar el proyecto

Levantar el servidor de desarrollo:

```bash
php artisan serve
```

Acceder desde el navegador:

```
http://127.0.0.1:8000
```

---

## ℹ️ Notas

- El proyecto requiere **PHP 8.3**
- Para desarrollo con Inertia + React se recomienda mantener activo:
  ```bash
  npm run dev
  ```

---
