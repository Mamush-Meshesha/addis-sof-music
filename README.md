# Addis Software Test Project

In this project, I used AI for the music-visualization component (the blinking background is generated using AI – ChatGPT).  
Throughout the project, I also used AI for some debugging and fix suggestions — the rest is mine.

---

## 📦 Explanation of the Webpack Config

- **Environment Variables**: Loads `.env` variables and injects them into the frontend during build.
- **Entry Point**: `/src/index.js`
- **Output**:
  - Generates `dist/` during build
  - Output file: `bundle.js`
  - Includes `index.html`
- **Extensions**: Supports both `.js` and `.jsx` for React.
- **Dev Server**:
  - Hot reload
  - Auto open on run
  - History fallback
- **Module Rules**:
  - Babel for `.js` and `.jsx`
  - CSS files
  - Asset files like `.svg`, `.png`, `.jpg`
- **Plugins**:
  - Loads `.env` keys
  - Injects `index.html`

---

## 🎵 API Endpoints

- `GET /api/songs`  
  Returns a list of all songs.

- `GET /api/songs/:id`  
  Retrieves a single song by its unique ID.

- `POST /api/songs/create`  
  Uploads a new song with audio and thumbnail files.  
  **Request (multipart/form-data)**:
  - `audioFile`: Audio file (mp3, wav, etc.)
  - `thumbnailFile`: Image file (jpg, png, etc.)

- `PUT /api/songs/:id`  
  Updates an existing song’s details.

- `DELETE /api/songs/:id`  
  Deletes a song by ID.

---

## 🔄 System Flow

- Configured **Jest** for basic testing — some components tested, but full unit/integration tests are pending due to time.
- Debugging was done using `console.log()` and Redux state inspection.
- **Data fetching**:
  - Tested APIs via Postman
  - Used `useSelector`, `useEffect` to fetch and render data
- **Song creation**:
  - First tested with Postman
  - Then implemented the form on the frontend
- **Performance**:
  - Implemented code splitting
  - Lazy loading is planned

---

## ⚠️ Git Commit Notes

I didn’t use `feat:` or `fix:` prefixes, but all commits have clear and descriptive messages.

# 🔧 Project Usage

# Clone the repository
git clone git@github.com:Mamush-Meshesha/addis-sof-music.git

# Go to the project directory
cd addis-sof-music

# Set up the frontend
cd frontend
npm install

# Set up environment variables
cp .env.example .env
# Edit the .env file with appropriate values

# Start the development server
npm run dev

# Set up the backend
cd ../backend
npm install

# Set up environment variables for backend
cp .env.example .env
# Edit the backend .env file as needed

# Start the backend server
npm run dev
