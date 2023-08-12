# Project Name

Welcome to the **Programmify** repository! We're excited to have you as a contributor. This project is will be built using Node.js, Express, Bootstrap (Bootswatch theme), HTML, Nodemailer, and PostgreSQL.

## Getting Started

Follow these steps to set up the project on your local machine and start contributing:

### Prerequisites

- Node.js and npm installed on your machine
- PostgreSQL installed and running

### Installation

1. Clone the repository to your local machine:

```bash
git clone https://github.com/programmify-workspace/programmify.git
```

2. Navigate to the project directory:

```bash
    cd programmify
```

3. Install the project dependencies:

```bash
    npm install
```


4. Create a .env file in the root directory and configure the environment variables:

```bash
    Copy code
    PORT=3000
    DATABASE_URL=your-postgresql-database-url
    SMTP_HOST=your-smtp-host
    SMTP_PORT=your-smtp-port
    SMTP_USER=your-smtp-username
    SMTP_PASS=your-smtp-password
```

5. Apply database migrations:

```bash
  npm run migrate
```


### Contributing

1. Create a new branch for your feature or bug fix:

```bash
    git checkout -b feature/your-feature-name
```

2. Make your changes and commit them:

 ```bash
    git add .
    git commit -m "Add your commit message here"
```

3. Push your changes to the remote repository:

```bash
    git push origin feature/your-feature-name
```

4. Create a pull request on GitHub, detailing your changes and the problem they solve.

### Resources
Node.js: https://nodejs.org/
Express: https://expressjs.com/
Bootstrap (Bootswatch): https://bootswatch.com/
Nodemailer: https://nodemailer.com/
PostgreSQL: https://www.postgresql.org/4


