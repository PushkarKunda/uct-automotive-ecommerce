# Automotive Parts E-commerce Project - Final Report
**Date**: [Insert Final Date]
**Author**: Pushkar Kunda

## 1. Project Background & Problem Statement
The automotive aftermarket is a multi-billion dollar industry. Standard e-commerce platforms often fail to provide the nuanced search capabilities required when purchasing highly specific automotive parts. The central problem is **vehicle fitment**—customers need assurance that a part (e.g., a specific alternator or brake pad) accurately fits their vehicle's exact Make, Model, and Year. 

This project aims to solve this by providing a tailored shopping experience directly addressing the vehicle fitment problem, ensuring confidence in purchases and reducing return rates common in the automotive parts industry.

## 2. Implementation Details

### 2.1 Database & Backend Architecture
- **Schema Design**: Implemented robust Mongoose models for `Users`, `Products`, and `Orders`. The logic supports complex relationships where orders are linked to users and products.
- **API Construction**: Developed a RESTful API using Express.js. Routes are segmented into `userRoutes`, `productRoutes`, `orderRoutes`, and `paymentRoutes` for scalability and clarity.
- **Security**: Used `bcryptjs` for password hashing and `jsonwebtoken` (JWT) for secure user authentication and route protection.

### 2.2 Intelligent Search & Fitment Logic
- **Search Implementation**: The backend `productController` leverages MongoDB's `$regex` for partial matches and array filtering to match `compatibleVehicles` (Make, Model, Year). This ensures users only see parts that actually fit their car.

### 2.3 Frontend & User Experience
- **Cart & Persistence**: Built a persistent shopping cart using Redux Toolkit and `localStorage`. This ensures users don't lose their selected parts even if they refresh the page or close the browser.
- **Styling**: Used Tailwind CSS to create a premium, responsive, and high-performance user interface.

### 2.4 Payments & Security
- **Stripe Integration**: Successfully integrated Stripe Elements and Payment Intents. The checkout flow handles secure credit card processing without sensitive data ever touching our server.

## 3. Final Results & Screenshots
- **Catalog Page**: Displays all automotive parts with intuitive filters.
- **Vehicle Selection**: Allows users to filter inventory by car year, make, and model.
- **Secure Checkout**: Interactive Stripe-based payment form.
- **Admin Management**: API structure is ready for inventory management.

## 4. Personal Learnings & Conclusion
Building the UCT Automotive E-commerce project provided deep insights into:
- The importance of relational data logic in a NoSQL environment (Product-Vehicle mapping).
- Managing global state across complex commerce flows using Redux.
- Securely handling real-world transactions via Stripe.
- Delivering a professional-grade technical report for an industry-level project.

