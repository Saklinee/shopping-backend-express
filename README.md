# After School Classes – Backend (Express.js API)

This repository contains the Express.js backend server for the After School Classes coursework project.  
It provides REST API endpoints for lessons, orders, searching, and serves static image files.

---

## 📦 Project Links

- **Vue.js App — GitHub Repository:**  
  https://github.com/Saklinee/shopping-frontend-vue

- **Vue.js App — Live (GitHub Pages):**  
  https://saklinee.github.io/shopping-frontend-vue/

- **Express.js API — GitHub Repository:**  
  https://github.com/Saklinee/shopping-backend-express
- **Express.js API — Live (Render.com):**  
  https://shopping-backend-express.onrender.com


## 🚀 API Endpoints

- **Get all lessons:**  
  `GET https://shopping-backend-express.onrender.com/lessons`

- **Submit an order (JSON POST):**  
  `POST https://shopping-backend-express.onrender.com/orders`


- **Search for lessons:**  
`GET https://shopping-backend-express.onrender.com/search?q=math`

- **Get an image:**  
`GET https://shopping-backend-express.onrender.com/images/english.png`

---

## 🛠️ Local Development Instructions

1. **Clone the repository:**
The web browser link (for viewing on GitHub):
https://github.com/Saklinee/shopping-backend-express

The clone link (for copying the code):
git clone https://github.com/Saklinee/shopping-backend-express.git

2. **Install dependencies:**
npm install

3. **Configure environment:**
- Add a `.env` file:
  ```
MONGODB_URI=mongodb+srv://sakline:alks1234@cst3144.562tnum.mongodb.net/?retryWrites=true&w=majority
DB_NAME=schoolstore
4. **Run the server locally:**
node server.js

5. **Test API endpoints with Postman, browser, or VSCode REST client.**

