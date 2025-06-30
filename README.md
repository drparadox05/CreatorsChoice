# CreatorsChoice

CreatorsChoice is a decentralized SaaS platform that empowers content creators to engage their audience by uploading YouTube thumbnails and titles for community voting. Leveraging blockchain technology, the platform ensures fair and transparent reward distribution based on audience participation.

## Features

- Upload YouTube thumbnails and titles for voting
- Community-driven voting system
- Blockchain-based reward distribution for creators and voters
- Modern web interface for creators and workers

## Monorepo Structure

```
backend/   # Node.js/TypeScript backend (API, database, blockchain logic)
user/      # Next.js frontend for creators
worker/    # Next.js frontend for workers/voters
```

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn
- (Optional) Vercel CLI for deployment

### Installation

1. Clone the repository:
   ```
   git clone <repo-url>
   cd Decentralized-Data-labelling
   ```

2. Install dependencies for each package:
   ```
   cd backend && npm install
   cd ../user && npm install
   cd ../worker && npm install
   ```

### Running Locally

#### Backend

```
cd backend
npm run dev
```

#### User Frontend

```
cd user
npm run dev
```

#### Worker Frontend

```
cd worker
npm run dev
```


