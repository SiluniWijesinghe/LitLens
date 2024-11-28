# LitLens

##Features Implemented
CRUD Operations:
Create, Read, Update, and Delete book reviews.
Reviews contain the book title, author, rating (1 to 5 stars), and review text.

Filtering:
Filter reviews by rating (1 to 5 stars).

Sorting:
Sort reviews by date (oldest first or newest first).

Frontend:
Built with React.js for dynamic rendering and state management.
React Router for navigation between pages.

Backend:
Built with Spring Boot for handling RESTful API endpoints.
Reviews are stored in a MySQL database.

##Additional Notes
Database Configuration:

The application uses MySQL as the database to store the book reviews.
The default database connection is to a local MySQL instance running on localhost:3306.
The database configuration can be modified in the application.properties file.

CORS:

Cross-Origin Resource Sharing (CORS) is enabled in the backend, allowing the frontend (React.js) to communicate with the backend (Spring Boot).
