# Scissor

Scissor is a web application that provides a URL shortening service with custom URL support and analytics. It allows users to shorten their long URLs and track the traffic and clicks on those URLs.

## Features

- Custom URL shortening: Create personalized short URLs for your links.
- Analytics: Track the number of clicks and traffic sources for each shortened URL.
- Device Type Tracking: Identify the device types (mobile, laptop, tablet) used to visit your links.
- Daily, Weekly, and Monthly Reports: Generate data visualizations to analyze traffic trends over time.
- User-Friendly Interface: Intuitive and easy-to-use interface for managing URLs and accessing analytics.
- QRcode generation: Generate QRcode to enable easy sharing of codes.

## Technologies Used

- React.js: Front-end JavaScript library for building user interfaces.
- Node.js: Server-side JavaScript runtime environment.
- Express.js: Web application framework for Node.js.
- MongoDB: NoSQL database for storing URL and traffic data.
- Chart.js: JavaScript library for data visualization.
- Axios: Promise-based HTTP client for making API requests.
- Redux & Redux Toolkit: For state management.
- RTK Query: Promise-based HTTP client for making API requests.

## Installation

1. Clone the repository: `git clone https://github.com/ndollawa/scissor-frontend.git`
2. Navigate to the project directory: `cd scissor-frontend`
3. Install dependencies: `npm install`
4. Configure environment variables: Create a `.env` file and provide the necessary configuration.
5. Start the development server: `npm start`
6. Open the application in your browser: `http://localhost:3000`

## Usage

1. Register an account or log in to your existing account.
2. Shorten a URL by providing the original URL and customizing the short URL if desired.
3. Track the traffic and clicks on your shortened URLs through the analytics dashboard.
4. Generate visual reports to analyze the traffic trends over the last 7 days, current week, and month.
5. Update or delete existing shortened URLs as needed.

[Visit app Frontend](https://scissors-psi.vercel.app)


[Visit app Backend](https://scissor-backend-11sy.onrender.com)
## ScreenShots
![Home Page](src/images/screenshots/Screenshot(40).png)
![Shorten Link](src/images/screenshots/Screenshot(36).png)
![Shorten Link with Custom url](src/images/screenshots/Screenshot(35).png)
![Dashboard](src/images/screenshots/Screenshot(44).png)
![URL Analytic](src/images/screenshots/Screenshot(45).png)
![Dashboard 2](src/images/screenshots/Screenshot(38).png)
![Login Page](src/images/screenshots/Screenshot(42).png)
![Registration Page](src/images/screenshots/Screenshot(43).png)

## Contributing

Contributions are welcome! If you have any suggestions, improvements, or bug fixes, please submit a pull request. For major changes, please open an issue first to discuss the changes.

## License

This project is licensed under the [MIT License](LICENSE).

