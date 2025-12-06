## 🔗 TinyLink – URL Shortener

TinyLink is a clean and lightweight URL shortening web application similar to Bitly.
Users can create short links, track clicks, view analytics, and manage their links through a simple dashboard.

Built using Node.js, Express, EJS, Tailwind CSS, and Neon (PostgreSQL).

## 🚀 Live Demo

🔗 Hosted URL: <deployment link here after deployment>

## 📌 Features

+------------------------------------------+--------+
| Feature                                  | Status |
+------------------------------------------+--------+
| Create short links                       | ✔ |
| Optional custom shortcode                | ✔ |
| Redirect based on shortcode              | ✔ |
| Click counter on each redirect           | ✔ |
| Last clicked timestamp tracking          | ✔ |
| Delete a link                            | ✔ |
| Stats page /code/:code                   | ✔ |
| Health check /healthz                    | ✔ |
| Dashboard with table + search            | ✔ |
| Responsive clean UI using Tailwind CSS   | ✔ |
+------------------------------------------+--------+

## 🔧 Environment Variables

DATABASE_URL=postgresql://your_neon_connection_string
BASE_URL=https://your-render-url # used to build short link display

## 🧪 Local Setup

git clone https://github.com/TusharSuryawanshi9297/tinylink.git
cd tinylink
npm install
cp .env.example .env
npm run dev # or npm start

## 🌐 Important Routes

+--------------+---------------------------------------------+
| Route        | Purpose |
+--------------+---------------------------------------------+
| /            | Dashboard (list, add, delete links) |
| /code/:code  | Stats page for a specific shortcode |
| /:code       | Redirect to the target URL |
| /healthz     | System health check |
+--------------+---------------------------------------------+

## 🧭 API Endpoints

+--------+------------------------+--------------------------+
| Method | Path                   | Description |
+--------+------------------------+--------------------------+
| POST   | /api/links             | Create new short link |
| GET    | /api/links             | List all links |
| GET    | /api/links/:code       | Get stats for a code |
| DELETE | /api/links/:code       | Delete a shortcode |
+--------+------------------------+--------------------------+

## 🪪 License

This project is licensed under the MIT License.

## 🙋 Author

Tushar Suryawanshi
GitHub: https://github.com/TusharSuryawanshi9297
