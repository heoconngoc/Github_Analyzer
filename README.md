# 🐙 GitHub Analyzer

A simple web application that allows you to search and analyze a GitHub user profile.
The app fetches data from the **GitHub REST API** and displays detailed user information along with their **top repositories** based on stars.

This project is built as a learning exercise to practice:

- Working with public APIs
- Asynchronous JavaScript (`async/await`)
- State management on the client side
- DOM manipulation
- Light / Dark mode theming

---

## ✨ Features

- 🔍 Search GitHub users by username
- 👤 Display user information:
  - Avatar
  - Username & full name
  - Bio
  - Location
  - Public repositories count
  - Followers & following
  - Link to GitHub profile
- 📦 Display **Top 5 repositories** (sorted by star count):
  - Repository name
  - Description
  - Stars ⭐
  - Main programming language
  - Repository size
  - Direct link to repo
- 🌗 Light / Dark mode toggle
- ⏳ Loading state while fetching data
- ❌ Graceful error handling (user not found, empty data)
- ⌨️ Press **Enter** to search (via form submission)

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
- **GitHub REST API**
  - https://docs.github.com/en/rest

---

## 📂 Directory Str

```terminal
github-analyzer/
│── index.html
│── style.css
│── script.js
└── README.md
```

---

## ▶️ How to run project

1. Clone repo:

```terminal
git clone git@github.com:heoconngoc/Github_Analyzer.git
```

2. Open file: index.html

3. Or run by Live Server in VS Code.

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

---

## License

[MIT](https://choosealicense.com/licenses/mit/)
