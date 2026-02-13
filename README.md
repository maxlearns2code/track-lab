# TrackLab 🎵

A Context-Aware Music Dashboard built for an interview case study.
It suggests music based on your current **Weather** and **Location**.

## 🏗️ Tech Stack
-   **Frontend**: React (Vite) + Tailwind CSS
-   **Backend**: Node.js + Express + TypeScript
-   **Database**: PostgreSQL (Stores User Favorites)
-   **Cache**: Redis (Caches External API responses)
-   **APIs**:
    -   [Open-Meteo](https://open-meteo.com/) (Weather)
    -   [Jamendo](https://developer.jamendo.com/) (Music Search)

## 🚀 Getting Started

### 1. Infrastructure
Start the databases (Postgres + Redis):
```bash
docker-compose up -d
```

### 2. Backend
Configure environment:
1.  Copy `server/.env.example` to `server/.env`
2.  Add your **Jamendo Client ID**.

Run the server:
```bash
cd server
npm install
npm run dev
```
Server runs on `http://localhost:3001`.

### 3. Frontend
```bash
cd client
npm install
npm run dev
```

## 🔌 API Endpoints

### Weather
`GET /api/weather?lat={lat}&lon={lon}`
-   Fetches current weather for coordinates.
-   Source: Open-Meteo.

### Music
`GET /api/music?vibe={tag}`
-   Fetches tracks matching a tag (e.g., 'rock', 'sunny').
-   **Cached in Redis** for 10 minutes to prevent rate-limiting.

### Favorites
`GET /api/favorites`
-   List saved tracks.

`POST /api/favorites`
-   Save a track to Postgres.
-   Body: `{ jamendo_id, name, artist_name, image, audio_url }`

`DELETE /api/favorites/:id`
-   Remove a favorite.
