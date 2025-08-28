# MD-Notes

A full-stack web application that allows users to **create, edit, and upload Markdown (`.md`) files**.  
It is built with:

- **Backend:** [NestJS](https://nestjs.com/) (API + database integration)
- **Frontend:** [Astro](https://astro.build/) (UI)
- **Database:** MySQL 8.0

![Md-notes home page](/img/home.png "Home page")

![Md-notes create page previewing a note](/img/create.png "Preview note")

![Md-notes upload page](/img/upload.png "Upload note")


---

## 🚀 Features
- Create, edit, and manage `.md` files through a clean web UI.
- Store .md notes in a MySQL database.
- Database persistence and automatic initialization from a backup if provided.

## 🛠️ Setup & Usage

### 1. Prerequisites
- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/)

### 2. (Optional) Database Initialization
If you have an existing database dump you want to preload:
- Place `backup.sql` inside the `db/` folder.
- On the first run (when the database is empty), MySQL will automatically import it.

### 3. Start the project
From the root folder:

```bash
docker-compose up --build
```

This will start:

- MySQL on port **3306**

- Backend (NestJS) on port **3000**

- Frontend (Astro) on port **4321**

## ⛁ Database backups
To create a backup of your current database:

```bash
docker exec mysql \
  mysqldump -u user -ppassword md_notes > db/backup.sql
```

To restore the backup, stop containers, delete the mysql_data volume, and restart with backup.sql in place.

## ⚙️ Environment Variables

Environment variables are managed via docker-compose.yml.
Key ones include:

- DATABASE_HOST

- DATABASE_PORT

- DATABASE_USER

- DATABASE_PASSWORD

- DATABASE_NAME

- PUBLIC_API_URL (used by the frontend to reach the backend)

You can also create .env files in backend/ and frontend/ for local (non-Docker) development.

