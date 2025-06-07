# 🌞 SunTrack ORM

A modern solar system tracking and analysis platform built with NestJS, GraphQL, and PostgreSQL.

## 🚀 Features

- 📊 Solar system data management
- 🔍 Advanced querying capabilities
- 📈 Data analytics and statistics
- 🗺️ Geographic distribution analysis
- 🏢 Customer segment tracking

## 🏗️ Architecture

### Backend Stack
- **Framework**: NestJS
- **API**: GraphQL
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Containerization**: Docker

### Project Structure
```
api/
├── src/
│   ├── solar-systems/           # Solar system module
│   │   ├── solar-systems.resolver.ts
│   │   ├── solar-systems.service.ts
│   │   └── models/
│   │       └── solar-system.model.ts
│   └── app.module.ts
└── prisma/
    └── schema.prisma           # Database schema
```

## 🛠️ Setup

### Prerequisites
- Node.js (v16 or higher)
- Docker and Docker Compose
- PostgreSQL (if running locally)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/suntrack-orm.git
cd suntrack-orm
```

2. Install dependencies:
```bash
cd api
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Start the development server:
```bash
npm run start:dev
```

## 📡 API Usage

### GraphQL Queries

1. Get All Solar Systems:
```graphql
{
  solarSystems {
    id
    pvSystemSizeDc
    state
    city
    installationDate
    customerSegment
  }
}
```

2. Get Solar System by ID:
```graphql
{
  solarSystem(id: "uuid-here") {
    id
    pvSystemSizeDc
    state
    city
  }
}
```

3. Get Systems by Location:
```graphql
{
  solarSystemsByLocation(state: "CA", city: "San Francisco") {
    id
    pvSystemSizeDc
    state
    city
  }
}
```

4. Get Available States:
```graphql
{
  states
}
```

5. Get Data Statistics:
```graphql
{
  dataStats
}
```

## 🔄 Data Import

The system includes a CSV import script for solar system data:
```bash
node scripts/import-csv.js
```

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.