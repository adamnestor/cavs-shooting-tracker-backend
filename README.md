# Cavs Shooting Tracker - Backend

RESTful API backend for the Cavs Shooting Tracker application, built with Node.js, Express, Prisma, and PostgreSQL.

## 1. Live API

**Base URL:** `https://cavs-shooting-tracker-backend-production.up.railway.app/`

## 2. Project Overview

This backend provides API endpoints for managing players and shooting test results, including support for both standard and zone-based shooting tests.

## 3. Tech Stack

- **Runtime:** Node.js 20
- **Framework:** Express.js
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Language:** TypeScript
- **Development:** tsx, nodemon
- **Deployment:** Railway

## 4. Local Setup

### Prerequisites
- Node.js 18+ and npm
- PostgreSQL 14+ installed and running locally

### Installation

1. **Clone the repository**
```bash
   git clone https://github.com/[your-username]/cavs-shooting-tracker-backend.git
   cd cavs-shooting-tracker-backend
```

2. **Install dependencies**
```bash
   npm install
```

3. **Set up PostgreSQL database**

   Using the PostgreSQL command line:
```bash
   # Connect to PostgreSQL
   psql -U postgres
   
   # Create database
   CREATE DATABASE cavs_shooting_tracker;
   
   # Verify database was created
   \l
   
   # Exit psql
   \q
```

4. **Configure environment variables**
   
   Create a `.env` file in the root directory:
```env
   DATABASE_URL="postgresql://postgres:your_password@localhost:5432/cavs_shooting_tracker?schema=public"
   NODE_ENV=development
```
   
   Replace `your_password` with your PostgreSQL password.
   
   **Note:** Set `NODE_ENV=production` when deploying.

5. **Run database migrations**
```bash
   npx prisma migrate dev
```
   
   This will:
   - Create all tables (Player, Test, ZoneStat)
   - Generate Prisma Client
   - Apply all migrations

6. **Start development server**
```bash
   npm run dev
```
   
   Server will run on [http://localhost:3000](http://localhost:3000)

### Verify Setup

Test the API is running:
```bash
curl http://localhost:3000/api/players
```

You should receive an empty array `[]` or existing players.

## 4. Project Structure
```
src/
├── controllers/         # Request handlers
│   ├── playerController.ts
│   └── testController.ts
├── routes/             # API route definitions
│   ├── playerRoutes.ts
│   └── testRoutes.ts
├── server.ts           # Express app setup and startup
prisma/
├── schema.prisma       # Database schema
└── migrations/         # Migration history
```

## 5. API Endpoints

### Players

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/players` | Get all active players |
| GET | `/api/players?includeArchived=true` | Get all players including archived |
| POST | `/api/players` | Create new player |
| PUT | `/api/players/:id` | Update player |

**Example: Create Player**
```json
POST /api/players
{
  "firstName": "Donovan",
  "lastName": "Mitchell",
  "jerseyNumber": 45,
  "position": "Guard"
}
```

### Tests

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tests` | Get all tests with players and zone stats |
| POST | `/api/tests` | Create new test result |

**Example: Create Standard Test**
```json
POST /api/tests
{
  "startTime": "2024-11-18T19:00:00Z",
  "endTime": "2024-11-18T19:09:15Z",
  "shots": 100,
  "made": 78,
  "playerId": 1,
  "testType": "standard"
}
```

**Example: Create Zone Test**
```json
POST /api/tests
{
  "startTime": "2024-11-18T19:00:00Z",
  "endTime": "2024-11-18T19:09:15Z",
  "shots": 100,
  "made": 80,
  "playerId": 1,
  "testType": "zone",
  "zoneStats": [
    { "zone": "Left Corner", "made": 18, "shots": 20 },
    { "zone": "Left Wing", "made": 12, "shots": 20 },
    { "zone": "Top of Key", "made": 16, "shots": 20 },
    { "zone": "Right Wing", "made": 18, "shots": 20 },
    { "zone": "Right Corner", "made": 16, "shots": 20 }
  ]
}
```

## 6. Database Schema

### Player
- `id` (Int, Primary Key)
- `firstName` (String)
- `lastName` (String)
- `jerseyNumber` (Int)
- `position` (String)
- `active` (Boolean, default: true)

### Test
- `id` (Int, Primary Key)
- `startTime` (DateTime)
- `endTime` (DateTime)
- `shots` (Int)
- `made` (Int)
- `playerId` (Int, Foreign Key → Player)
- `testType` (String, default: "standard")

### ZoneStat
- `id` (Int, Primary Key)
- `testId` (Int, Foreign Key → Test)
- `zone` (String)
- `made` (Int)
- `shots` (Int)

## 7. Useful Commands
```bash
# Generate Prisma Client after schema changes
npx prisma generate

# Create a new migration
npx prisma migrate dev --name migration_name

# Reset database (WARNING: deletes all data)
npx prisma migrate reset

# Open Prisma Studio (database GUI)
npx prisma studio

# Run development server with auto-reload
npm run dev

# Build TypeScript
npm run build

# Run production server
npm start
```

## 8. Deployment

Deployed on Railway with automatic deployments from the main branch.

**Environment Variables on Railway:**
- `DATABASE_URL` - PostgreSQL connection string (provided by Railway)
- `NODE_ENV` - Set to `production`

**Deployment handled via package.json scripts:**
```json
{
  "scripts": {
    "build": "tsc",
    "start": "node dist/server.js",
    "dev": "nodemon --exec tsx src/server.ts"
  }
}
```

Railway automatically:
1. Runs `npm install`
2. Runs `npx prisma generate`
3. Runs `npm run build`
4. Executes `npx prisma migrate deploy && npm start`

## 9. Related Repositories

- **Frontend Application:** [cavs-shooting-tracker-frontend](https://github.com/[your-username]/cavs-shooting-tracker-frontend)

## 10. Author

**Adam Nestor**  
Created for Cleveland Cavaliers Full-Stack Developer Interview
