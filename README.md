# Project

A web application with a REST API on Node.js (Express) and a PostgreSQL database in Docker.

---

### Prerequisites

To run this project on your machine, you must have the following installed:
* **Docker**
* **Docker Compose**
* **Node.js** and **npm**

---

### Setup and Launch

1.  **Environment Configuration:**
    * Create a **`.env`** file by copying the contents from the **`env.sample`** file.
    * Fill in the necessary environment variables, such as database credentials and ports.

2.  **Launching Docker Containers:**
    * Execute the following command to start all services defined in `docker-compose.yml`. This will bring up the database container.
    ```bash
    npm run docker
    ```

3.  **Database Preparation:**
    * After the container is running, you need to prepare the database. Choose one of two options:

    **Option 1: Using a Database Dump**
    * If you have a database dump file (`.sql`) in the **`./dump`** folder, you can import it manually into the running DB container.
    * **Example command:** `docker exec -i <db_container_name> psql -U <db_user_name> -d <db_name> < ./dump/your_dump.sql`

    **Option 2: Using Migrations**
    * Run migrations to create the necessary table structure in the database:
    ```bash
    npm run migration
    ```
    * To **generate a new migration**, use the command:
    ```bash
    npm run migration:generate -- --name <migration_name>
    ```

4.  **Launching the Application:**
    * You can now launch the server application.

    **For Development:**
    ```bash
    npm run dev
    ```

    **For Production:**
    ```bash
    npm run start
    ```

---

### Available Scripts

The following commands are configured and can be run using `npm run <script_name>`:

| Script               | Description                                                          |
| -------------------- | -------------------------------------------------------------------- |
| `start`              | Runs the application in "production" mode.                           |
| `dev`                | Runs the application in "development" mode with hot-reloading (nodemon). |
| `docker`             | Starts Docker containers in the background.                          |
| `migration:generate` | Generates a new migration file.                                      |
| `migration`          | Applies all pending migrations to the database.                      |
| `migration:undo`     | Reverts the last applied migration.                                  |
| `lint`               | Checks the code for ESLint rule violations.                          |
| `format`             | Formats the code using Prettier.                                     |
