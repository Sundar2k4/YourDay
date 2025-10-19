# YourDay

**YourDay** is a full‑stack **MERN (MongoDB, Express, React, Node.js)** web application that helps users store and manage important dates and personal favourites of their loved ones. It provides secure login, smooth data handling, and an elegant interface to access all stored details anytime.

---

## 💫 Overview

YourDay serves as a personalized memory keeper — users can:

- Save meaningful dates such as birthdays, anniversaries, and milestones.
- Add and update favourites for each person (like movies, songs, foods, or hobbies).
- Store all data securely under authenticated user accounts.

The project follows a modular MERN architecture with **user authentication**, **JWT‑based authorization**, and **RESTful API design**, ensuring both speed and data security.

---

## 🚀 Key Features

- **Login & Authentication:**  
  Secure login with password encryption using **bcrypt** and authorization via **JWT** tokens.

- **User‑Centric Dashboard:**  
  Each logged‑in user can manage unique sets of favourites and dates.

- **Add, Read, and Update Favourites:**  
  Easily append new favourite items to existing users without overwriting previous ones.

- **Favourites Merging Logic:**  
  Backend smartly merges new items into arrays, preventing duplicates.

- **MongoDB Data Storage:**  
  All favourites and dates are stored efficiently using a document‑based schema.

- **Responsive UI:**  
  Built using **React** and **Tailwind CSS**, optimized for desktop and mobile access.

- **Protected REST API Routes:**  
  Secured routes ensure that only authenticated users can manipulate data.

---

## 🧩 Technologies Used

### Frontend

- React.js
- React Router DOM
- Tailwind CSS

### Backend

- Node.js
- Express.js
- MongoDB (Mongoose ORM)
- JSON Web Tokens (JWT)
- bcrypt for password hashing

---

## ⚙️ How It Works

1. **Authentication Flow**

   - Users register and log in securely.
   - Each request to the backend includes a valid JWT for authorization.

2. **Data Management**

   - Each user has one or more **entries** corresponding to people they care about.
   - Each entry includes **names**, important **dates**, and **arrays of favourites**.

3. **Updating Favourites**

   - When users add new favourites for a person, the system checks if that person already exists and merges new items into their existing list.

4. **Database Schema Example**
   - `name`: String
   - `items`: [String] (array of favourites)
   - `date`: Date (e.g., birthday or anniversary)
   - `userId`: Reference to authenticated user

---

## 🧠 Project Objectives

- Demonstrate **end‑to‑end full‑stack integration** in MERN applications.
- Implement **JWT‑based user authentication** with secure routes.
- Explore user‑specific data modeling and manipulation in MongoDB.
- Deliver a **simple yet powerful UI** for managing personalized information.

---

## 🌐 Deployment

The project is fully hosted online at:  
**[yourday-frontend.onrender.com](https://yourday-frontend.onrender.com)**

Backend and database are deployed with **Render** and **MongoDB Atlas**, respectively.

---

## 🧩 Future Enhancements

- Add visual calendar integration for date reminders.
- Enable notifications via email or browser alerts.
- Implement advanced editing and sorting features for favourites.
- Include profile customization and theme settings.
- Improve backend validation with middleware and input sanitation.

---

## 🔒 Security Highlights

- Passwords are hashed using **bcrypt** before saving.
- Authorization is enforced via **JWT** tokens stored securely in local storage.
- Backend input validation to prevent data injection or malformed requests.

---

## 🧾 License

This project is licensed under the **MIT License** — free to use and modify for educational or professional development.

---

## ✨ Author

Developed by **Sundar C**,  
a Computer Science student passionate about full‑stack web development, cloud computing, and scalable digital solutions.

```

```
