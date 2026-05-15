# 🐙 GitHub Analyzer

A **full‑stack web application** for searching and analyzing GitHub profiles and trending repositories.
The app fetches data from the **GitHub REST API**, caches important data on the backend, and stores it in a database to provide better performance, history tracking, and realistic production‑style architecture.
This project is built as a learning project to practice both **frontend and backend web development** using modern JavaScript.

---

## ✨ Features

- Search GitHub users by username
- Display detailed user information:
  - Avatar
  - Username & full name
  - Bio
  - Location
  - Public repositories count
  - Followers & following
  - Link to GitHub profile
- Display Top 5 repositories (sorted by star count):
  - Repository name
  - Description
  - Stars ⭐
  - Main programming language
  - Repository size
  - Direct link to repository
- User search history is stored in the backend database

---

## 🔥 Trending Repositories (Backend‑Powered)

- View GitHub trending repositories
  - All‑time
  - Last 7 days
  - Last 30 days
- Backend caches trending data
  - GitHub API is called periodically (not on every page load)
  - Data is stored in a database (SQLite)
- Supports pagination (Load more)
- Much faster and avoids GitHub API rate limits

---

## 🎨 UI / UX

- 🌗 Light / Dark mode toggle
- ⏳ Loading states while fetching data
- ❌ Graceful error handling
- ⌨️ Press Enter to search
- Clean, responsive layout

---

## 🛠️ Technologies Used

- **HTML5**
- **CSS3**
  - Flexbox
  - CSS Variables
  - Light / Dark theme
- **JavaScript (ES6+)**
  - `async / await`
  - `Promise.all`
  - DOM manipulation
  - Event handling
- **Backend**
  - Node.js
  - Express.js
  - SQLite
  - CORS
  - GitHub REST API
    - https://docs.github.com/en/rest

---

## ▶️ How to Run the Project (Development)

1. Clone repo:

```terminal
git clone git@github.com:heoconngoc/Github_Analyzer.git
```

2. Run the backend

```terminal
cd backend
npm install
node server.js
```
Backend will run at:
```
http://localhost:3001
```

3. Run the frontend
- Using Live Server or any static server:
```terminal
cd frontend
live-server
```
Frontend will run at:
```http://127.0.0.1:8080```

5. Or run by Live Server in VS Code.

```terminal
npm install -g live-server
live-server
```

---

## 👨‍💻 Author

**hoangtunanggia**  
GitHub: https://github.com/heoconngoc

---

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.
