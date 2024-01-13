# Prescription Service

This project is a Prescription Service that provides APIs for managing patients, pharmacies, medicines, and prescriptions. It utilizes [Express](https://expressjs.com/) for the server, [Prisma](https://www.prisma.io/) for database interaction, and [RabbitMQ](https://www.rabbitmq.com/) for asynchronous message processing.

## Table of Contents

- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Endpoints](#endpoints)
- [Database](#database)
- [Middleware](#middleware)
- [Workers](#workers)
- [Acknowledgments](#acknowledgments)

## Overview

The Prescription Service is a backend system for managing medical data, including patients, pharmacies, medicines, and prescriptions. It is designed to be scalable and efficient, using modern technologies such as Express for the server, Prisma as the database client, and RabbitMQ for handling background tasks.

## Prerequisites

Before running the Prescription Service, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (including npm)
- [PostgreSQL](https://www.postgresql.org/) for the database
- [RabbitMQ](https://www.rabbitmq.com/) for message processing
- [dotenv](https://www.npmjs.com/package/dotenv) for managing environment variables

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/alperengokbak/Prescription-Service.git
   ```

2. Navigate to the project directory:

   ```bash
   cd your-repo
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Set up environment variables:

   Create a `.env` file in the project root with the following content:

   ```env
   DB_URL=your_postgres_database_url
   TOKEN_SECRET=your_jwt_token_secret
   RABBITMQ_DEFAULT_USER=your_rabbitmq_username
   RABBITMQ_DEFAULT_PASS=your_rabbitmq_password
   RABBITMQ_HOST=your_rabbitmq_host
   GMAIL=your_gmail_address
   APP_PASSWORD=your_app_password
   ```

## Usage

Start the Prescription Service:

```bash
npm run start
```

The service will be running on [http://localhost:3002](http://localhost:3002).

## Endpoints

- **Medicine Routes** (`/medicine`):

  - `POST /addMedicine`: Add a single medicine.
  - `POST /addManyMedicine`: Add multiple medicines from an Excel file.

- **Patient Routes** (`/patient`):

  - `GET /getAllPatients`: Get a list of all patients.
  - `POST /createPatient`: Create a new patient.
  - `POST /createPatients`: Create multiple patients.

- **Pharmacy Routes** (`/pharmacy`):

  - `GET /getAllPharmacy`: Get a list of all pharmacies.
  - `GET /checkPharmacy`: Check pharmacy authorization.
  - `POST /loginPharmacy`: Login to a pharmacy account.
  - `POST /createPharmacy`: Create a new pharmacy account.
  - `POST /createPrescription`: Create a prescription.
  - `DELETE /deletePharmacy`: Delete a pharmacy account.

- **Client Routes** (`/client`):
  - `GET /searchAllMedicine`: Search for all medicines.
  - `POST /searchMedicine`: Search for a medicine.

## Database

The project uses Prisma as an Object-Relational Mapping (ORM) tool for interaction with the PostgreSQL database. The database schema is defined in `prisma/schema.prisma`.

## Middleware

- **isAuthorized**: Middleware to check if the request is authorized using JWT tokens.

## Workers

- **emailWorker**: Sends messages to RabbitMQ for asynchronous email processing.

## Acknowledgments

- Special thanks to the creators of [Express](https://expressjs.com/), [Prisma](https://www.prisma.io/), [RabbitMQ](https://www.rabbitmq.com/), and other dependencies used in this project.
