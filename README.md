<p align="center">
  <img src="https://i.ibb.co/hK7spX5/memories-icon.png" width="120" alt="Memories Project Icon">
</p>

<h1 align="center">MEMORIES</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Stack-MERN-blue" />
  <img src="https://img.shields.io/badge/Architecture-MVC%20%2B%20Flux-orange" />
  <img src="https://img.shields.io/badge/Scale-Horizontal-green" />
</p>

---

## 🌐 Overview

A scalable, full-stack **Social Media Platform** built using the **MERN (MongoDB, Express, React, Node.js)** stack.
Designed to enable users to capture, share, and interact with significant life moments under **high-concurrency** and **low-latency** constraints.

This project demonstrates real-world systems engineering concepts:
**JWT & OAuth Authentication, Global State Management (Redux), and RESTful API Design**.

---

## 🛠 Technical Highlights

| Feature | Technical Implementation |
| :--- | :--- |
| **Frontend Architecture** | **React + Redux Thunk**. Implements the Flux architecture for unidirectional data flow, ensuring predictable state mutations across complex UI components (Posts, Form, Auth). |
| **Backend API** | **Node.js + Express**. Uses an event-driven, non-blocking I/O model to handle concurrent requests efficiently. Middleware implementation for CORS, body parsing, and route protection. |
| **Storage / State** | **MongoDB (NoSQL)**. Utilizes a flexible schema with **Mongoose** for modeling data (Posts, Users). Supports extensive rich-text content and BSON image data. |
| **Security** | **JWT (JSON Web Tokens) & Google OAuth**. Hybrid authentication strategy securing stateless REST endpoints. Bcrypt used for password hashing at rest. |

---

## 🏗 System Architecture & Design

Describe the system from a **senior engineer’s perspective**.

### 1. Client Layer (React + Redux)
- **Role**: Handles user interaction, state formulation, and view rendering.
- **Communication**: Communicates with the backend via **Axios** interceptors attached with Bearer tokens.
- **Design**: Component-based architecture using **Material UI** for a responsive, consistent design system.
 
### 2. Service Layer (Node.js + Express)
- **Role**: Business logic execution, request validation, and data orchestration.
- **Communication**: RESTful endpoints exposing CRUD operations for Posts and Users.
- **Data Flow**: Request -> Middleware (Auth) -> Controller -> Model -> Database.

### 3. Data Layer (MongoDB Atlas)
- **Role**: Persistent storage and indexing.
- **Failure Boundaries**: Decoupled from the application logic; connection pooling handled by Mongoose to ensure resilience against transient network failures.

---

## 📈 How It Scales

1. **Horizontal Scaling**
   - The backend is stateless, allowing for easy replication of Node.js instances behind a load balancer (e.g., NGINX).
   - New nodes can join the cluster dynamically to handle increased traffic.

2. **Data Strategy**
   - **MongoDB** supports horizontal scaling via **Sharding**.
   - Indexes are created on frequently queried fields (e.g., tags, search terms) to optimize read performance.

3. **Fault Tolerance**
   - The application handles database connection failures gracefully with retry logic.
   - Global error handling middleware catches exceptions to prevent server crashes.

---

## 🧠 Engineering Challenges Solved

- **Challenge:** Managing Complex State Across Components
  - **Solution:** Implemented **Redux with Thunk Middleware** for asynchronous actions.
  - **Why it works:** Decouples state logic from UI components, allowing for a "single source of truth" and simplifying debugging with time-travel tools.

- **Challenge:** Securing User Data & Sessions
  - **Solution:** Dual authentication system using **Custom JWT** and **Google OAuth**.
  - **Why it works:** Provides flexibility for users while ensuring that API endpoints are strictly protected. Stateless tokens eliminate the need for server-side session storage, aiding scalability.

---

## 🔐 Security & Reliability

- **Authentication**: Bearer Token (JWT) verification middleware for all protected routes.
- **Encryption**: Passwords hashed using **bcrypt** (salt rounds: 12) before persistence.
- **Integrity**: Mongoose schemas enforce strict data typing and validation rules to prevent dirty writes.

---

## 🚀 Future Roadmap

- [x] Core system foundation (CRUD, Auth)
- [x] Basic fault handling & Error responses
- [ ] Pagination for Posts to improve load time
- [ ] Real-time commenting via WebSockets (Socket.io)
- [ ] Image optimization and CDN integration (AWS S3 / Cloudinary)

---

## 📄 License

Distributed under the ISC License.

---

## 🤝 Let's Connect

I'm an engineer fascinated by **high-scale distributed systems, complex backend logic, and building resilient full-stack applications.**

<p align="left">
  <a href="https://www.linkedin.com/in/abhinavkumar03" target="_blank">
    <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn">
  </a>
  <a href="https://backend-engineer-portfolio.vercel.app/" target="_blank">
    <img src="https://img.shields.io/badge/Portfolio-FF5722?style=for-the-badge&logo=react&logoColor=white" alt="Portfolio">
  </a>
  <a href="mailto:your-email@example.com">
    <img src="https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white" alt="Email">
  </a>
</p>

---

<p align="center">
  Built with ❤️ for systems and backend engineering
</p>
