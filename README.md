<p align="center">
  <img src="https://skillicons.dev/icons?i=mongodb,express,react,nodejs&theme=dark" width="300" alt="MERN Stack Architecture">
</p>

<h1 align="center">MEMORIES: Distributed Social Engine</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Stack-MERN-blue?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Architecture-MVC%20%2F%20Flux-orange?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Scale-Horizontal-green?style=for-the-badge" />
</p>

---

## 🌐 Executive Summary
**Memories** is a high-availability, full-stack social platform engineered to handle rich-media content sharing. By leveraging the **MERN** stack and a **stateless architecture**, the system is designed to provide low-latency user experiences while maintaining rigorous data integrity and secure authentication standards.



---

## 🛠️ Technical Power Grid

| Component | Engineering Focus | Technical Implementation |
| :--- | :--- | :--- |
| ⚛️ **Frontend** | **State Predictability** | **React + Redux Thunk**. Implements the Flux architecture for unidirectional data flow and centralized state management. |
| 🚀 **Backend** | **Event-Driven I/O** | **Node.js + Express**. Optimized RESTful API design using non-blocking I/O to maximize concurrent request throughput. |
| 🍃 **Database** | **Schema Flexibility** | **MongoDB (Atlas)**. High-performance NoSQL storage utilizing Mongoose for object modeling and validation. |
| 🔐 **Security** | **Identity Management** | Hybrid **JWT & Google OAuth 2.0** strategy. Stateless session handling with Bcrypt-protected data at rest. |

---

## 🏗 System Architecture

I designed this application using a **decoupled, multi-tier architecture** to ensure each layer can scale and fail independently.

### 1. Presentation & State Layer (React/Redux)
- **Design Pattern**: Component-based UI with **Material UI**.
- **State Logic**: Axios interceptors manage the injection of Bearer tokens for seamless, secure API communication.

### 2. Orchestration Layer (Node.js/Express)
- **Middleware Pipeline**: Implements granular security layers (CORS, Auth, Validation) before reaching business controllers.
- **Pattern**: Strict **MVC (Model-View-Controller)** pattern for maintainable and testable code.

### 3. Data Persistence Layer (MongoDB)
- **Fault Tolerance**: Decoupled connection pooling via Mongoose prevents system-wide crashes during transient DB outages.



---

## 📈 Engineering for Scale

For a system to handle global traffic, it must move beyond local execution. This project is built for **Horizontal Growth**:

1. **Stateless Backend**: By utilizing JWTs instead of server-side sessions, backend instances can be replicated across a cluster behind a Load Balancer (NGINX/AWS ALB) without session loss.
2. **Database Sharding**: Designed for MongoDB's horizontal scaling. Data can be partitioned across multiple shards based on user IDs to handle petabytes of "Memories."
3. **Optimized Reads**: Strategic indexing on frequently searched fields (tags, titles) reduces query latency from $O(N)$ to $O(\log N)$.

---

## 🧠 Engineering Challenges Solved

* **State Explosion**: Managed deeply nested UI updates by implementing **Redux**. This created a "Single Source of Truth," reducing re-render overhead and simplifying state debugging.
* **Security at Scale**: Developed a custom Auth middleware. This ensures that even in a distributed environment, every micro-transaction is verified against a secure, cryptographically signed token.
* **Asset Management**: Handled BSON image data efficiently while maintaining high response speeds.

---

## 🚀 Roadmap to Production
- [x] **Phase 1**: Core CRUD & Hybrid Authentication.
- [x] **Phase 2**: Pagination & Infinite Scroll for optimized DOM performance.
- [x] **Phase 3**: Real-time interactivity via **Socket.io** (WebSockets).
- [ ] **Phase 4**: Migration of media storage to **AWS S3 / Cloudinary** CDN.

---

## 🤝 Let's Connect

I'm an engineer fascinated by **distributed systems, real-time data flow, and building resilient full-stack applications.**

<p align="left">
  <a href="https://www.linkedin.com/in/abhinavkumar03" target="_blank">
    <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn">
  </a>
  <a href="https://backend-engineer-portfolio.vercel.app/" target="_blank">
    <img src="https://img.shields.io/badge/Portfolio-FF5722?style=for-the-badge&logo=react&logoColor=white" alt="Portfolio">
  </a>
</p>

---
<p align="center">
  <i>"Scalability is not just a feature; it's a fundamental architectural commitment."</i>
</p>
