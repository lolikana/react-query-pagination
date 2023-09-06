# User Data Pagination Table

This project is a practice exercise for using React Query by Tanstack to fetch and display a list of users with pagination and filtering options. In production, the data is fetched from a remote API, specifically [https://mockapi.io/](https://mockapi.io/). In development, we use JSON Server to simulate the API locally.

## Technologies Used

- React
- React Query by Tanstack
- Axios for HTTP requests
- JSON Server (for development)
- Next.js
- TypeScript
- SASS (for styling)
- ESLint and Prettier for code formatting
- Husky and lint-staged for pre-commit hooks

## Getting Started

To run this project locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/user-data-pagination.git
   ```

2. Navigate to the project directory:

   ```bash
   cd user-data-pagination
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```
   
## Features

- **User List**: Fetch and display a list of users.
- **Pagination**: Navigate through different pages of user data.

## Environment Variables

In your project, you can set environment variables for different environments (development and production) to control where the user data is fetched from. Create a `.env.local` file in the root of your project and add the following variables:

```env
# Use the remote API in production
MOCK_API=https://mockapi.io/
```

Make sure to replace the URLs with your actual API endpoints.
