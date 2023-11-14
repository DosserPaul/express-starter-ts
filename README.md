# Express Starter TypeScript

## Description

This is a starter project for Express with TypeScript.

## Installation

```bash
npm install
# or
yarn install
```

## Running the app

### Run docker container

```bash
docker-compose up -d
```

### Initialize prisma

```bash
# initialize prisma
npx prisma init

# add database url to .env.exemple
DATABASE_URL="mysql://<user>:<password>@<host>:<port>/<database_name>"
```

### Create Model

create model in `prisma/schema.prisma`
for example `User`

in `prisma/schema.prisma`
check the provider and datasource

```prisma
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### Run database migration

```bash
npx prisma migrate dev --name init
```

### Run the app

```bash
# development
npm run dev
# or
yarn dev
```
