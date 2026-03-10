# Government Tenders Portal - Web Marketplace

Welcome to the **Government Tenders Portal**, a comprehensive B2B marketplace engineered for complete transparency in public procurement. This frontend repository is part of a larger ecosystem (with a private backend) designed to securely manage, bid on, and award government contracts.

> **Authored by**: Sumit Sahu  
> **Status**: Active Development  

---

## 🚀 Project Overview & Flow

This project moves away from traditional, bulky government portals and provides a modern, fast, and frictionless user experience divided into three distinct personas:

1.  **Public (Viewer)**:
    *   **The Flow**: Frictionless browsing. Any citizen can search and view active government tenders directly without needing an account. It ensures transparency. They are only prompted to log in/register when they try to apply or download sensitive documents.
2.  **Contractor (Bidder)**:
    *   **The Flow**: Upon registration, contractors get a personalized dashboard. They can track their application statuses (`Draft ➔ Submitted ➔ Technical Evaluation ➔ Awarded`), view matched tenders based on their registered industry, and manage their compliance documents.
3.  **Government Official (Admin)**:
    *   **The Flow**: The authorized command center. Government officials use this interface to securely publish new tenders, manage deadlines, review incoming contractor bids, and publish addendums.

---

## 🏗️ Technical Architecture (Service-Dashboard Pattern)

To ensure this application scales cleanly and cleanly separates business logic from the view layer, the architecture relies on the following structural foundation:

*   `/src/dashboards/`: Contains all main dashboard orchestrations (e.g., `Government`, `Contractor`, `Public`). Each directory encompasses the specific entry Dashboard file and all subsequent specialized UI pages.
*   `/src/services/`: This isolates all backend functionality. Every API request, token authorization sequence, and data normalization operation is strictly written as an isolated Service function here to prevent component bloat and logic coupling.
*   `/src/components/Shared`: Reusable micro-UI elements (Navigation, Footers, Data Tables) and logic wrappers like `ProtectedRoute.jsx`.

---

## 💡 What Makes This Project Different? (Features & Libraries)

*   **Framer Motion Integration**: Instead of jarring transitions, this application utilizes **Framer Motion** for enterprise-grade UI interactions. Landing pages assemble via staggered mount physics, cards utilize spring physics on hover, providing a fluid premium UX often absent in B2B sites.
*   **Role-Based Access Control (RBAC)**: Implemented secure, declarative routing using Higher-Order Components. A contractor simply cannot access government routes, preventing front-end data leaks.
*   **Cross-Tab Authentication Syncing**: Built a real-time session synchronizer. If a user logs out in one tab, the React `window.storage` event handler instantly detects the state evaporation and logs out all concurrent tabs securely.

---

## 🧠 Key Learnings

Building this application reinforced several advanced engineering concepts:
1.  **Decoupling with Service Patterns**: Creating a `services/` directory proved that storing Axios/Fetch wrappers outside of React components makes the UI layer exclusively responsible for *displaying* rather than *fetching* data. This vastly improves testing scopes.
2.  **UI Physics Rendering**: Integrating `framer-motion` shifted the design mindset from CSS keyframes to reactive component physics, producing an organic interactive flow efficiently.
3.  **Real-World Product Flow**: Modeling strict multi-tenant access (Public vs Private Dashboarding) rather than a flat Single Page Application flow.

---

### How to Run Locally

1. Clone the repository.
2. Run `npm install` to install dependencies (including `framer-motion`).
3. Start the development server with `npm start`.
