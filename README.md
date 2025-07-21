Addis Software Test Project
In this project I used AI for the music-visualization component (the blinking background is generated using AI (ChatGPT)).

Throughout the project, I used AI for some debug/fix suggestions as well — the rest is mine.

📦 Explanation of the Webpack Config
At the top, I used env so the project can load variables and values from .env file. Then it securely injects them to the frontend JavaScript code during build process.

Entry point - it specifies the main JavaScript file of the application: /src/index.js.

Output - during build, it generates a dist folder. This section specifies:

the file path,

the output file name (bundle.js),

and location of index.html.

Extensions - while using React, syntax can be .js or .jsx, so we have to specify both extensions.

Dev server - I configured things like:

hot reload,

auto open on run,

history fallback.
These are great for developer experience.

Module rules - I added support for:

.js, .jsx files using Babel,

.css files,

and assets like .svg, .png, .jpg, etc.

Finally, in the plugins section, I load the .env keys and expose the index.html.

This is all about the highlights of the Webpack configuration.

🎵 API Endpoints
GET /api/songs
Returns a list of all songs.

GET /api/songs/:id
Retrieves a single song by its unique ID.

POST /api/songs/create
Upload a new song with its audio file and thumbnail image.

Request (multipart/form-data)
audioFile: Audio file (mp3, wav, etc.)

thumbnailFile: Image file (jpg, png, etc.)

PUT /api/songs/:id
Update an existing song's details, audio file, or thumbnail.

DELETE /api/songs/:id
Deletes a song by its ID.

🔄 System Flow
I configured Jest for initial testing and tested some components, but due to time constraints, I couldn’t finish the full unit/integration testing.

Throughout the project, I debugged errors using console.log and by checking Redux state.

Fetching data: I first tested the API using Postman, then integrated it into the frontend. I logged the data and accessed it using useSelector and useEffect, then rendered it via list and card components.

Adding a song: I tested using Postman first, then connected it to the frontend, submitting the form data.

Performance: I used code splitting and plan to add lazy loading shortly.

⚠️ Git Commit Notes
Sorry for the Git commit messages — I didn’t use conventional feat: or fix: prefixes, but I did write clear commit messages for every commit!