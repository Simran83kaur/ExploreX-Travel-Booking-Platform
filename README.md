# ExploreX - Destination Booking Website

## Project Overview

ExploreX is a travel and destination booking website developed using **React.js and Vite**.

The website provides users with an easy-to-use platform to explore different destinations and access travel-related services such as **flight and hotel booking**. It also includes user authentication pages, destination details, booking confirmation, and a **My Bookings** section.

The main purpose of this project is to provide a complete frontend travel-booking experience with a clean, responsive, and user-friendly interface.

This project was developed as part of an **internship** to gain practical experience in React.js, frontend development, routing, form handling, state management, and implementing booking workflows.

---

## Main Features

### Home Page

* Introduction to the ExploreX travel platform.
* Navigation to different sections of the website.
* Quick access to destinations, flights, hotels, and booking features.

### Destinations

* Displays available travel destinations.
* Allows users to explore different destinations.
* Provides destination-related information.
* Supports navigation to individual destination details.

### Destination Details

* Displays detailed information about a selected destination.
* Helps users explore a destination before planning their trip.
* Provides navigation to relevant booking sections.

### Flight Search and Booking

The flight section allows users to:

* Search flights according to destination.
* Select a travel date.
* View available flights.
* View airline information.
* View departure and arrival locations.
* View departure and arrival times.
* View flight duration.
* View flight prices.
* Select the number of travelers.
* Enter passenger details.
* Calculate the total flight price.
* Confirm a flight booking.
* Generate a unique booking ID.
* View confirmed booking details.
* Access bookings through the My Bookings section.

### Hotel Booking

The hotel section allows users to:

* Browse available hotels.
* View hotel information.
* Select a hotel.
* Enter booking details.
* Complete the hotel booking process.

### User Authentication

The project includes:

* Login page
* Signup page
* User profile page

These pages provide the frontend interface required for basic account-related functionality.

### Search

The website includes search functionality that allows users to find relevant travel options and destinations.

### My Bookings

The **My Bookings** section allows users to view their previously created bookings.

Booking information is stored using the browser's **Local Storage** in the current frontend implementation.

### Responsive Design

The website is designed to work across different screen sizes, including:

* Desktop
* Laptop
* Tablet
* Mobile devices

---

## Technologies Used

* **React.js** - Used for building the user interface and reusable components.
* **JavaScript** - Used for application logic and functionality.
* **HTML5** - Used for structuring the web pages.
* **CSS3** - Used for styling and responsive layouts.
* **Vite** - Used as the frontend development and build tool.
* **React Router DOM** - Used for navigation and routing between pages.
* **Local Storage** - Used for storing booking information in the browser.

---

## Application Pages

The project contains the following major pages:

* Home
* Destinations
* Destination Details
* Flights
* Flight Booking
* Hotels
* Hotel Booking
* Booking
* My Bookings
* Login
* Signup
* Profile
* About
* Contact
* Search Results

---

## Project Structure

```text
ExploreX/
│
├── public/
│
├── src/
│   │
│   ├── components/
│   │
│   ├── data/
│   │
│   ├── layout/
│   │
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Destinations.jsx
│   │   ├── DestinationDetails.jsx
│   │   ├── Flights.jsx
│   │   ├── FlightBooking.jsx
│   │   ├── Hotels.jsx
│   │   ├── HotelBooking.jsx
│   │   ├── Booking.jsx
│   │   ├── MyBookings.jsx
│   │   ├── Login.jsx
│   │   ├── Signup.jsx
│   │   ├── Profile.jsx
│   │   ├── About.jsx
│   │   ├── Contact.jsx
│   │   └── SearchResults.jsx
│   │
│   ├── App.jsx
│   └── main.jsx
│
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
```

---

## Running the Project

Follow the steps below to run the ExploreX project on a local computer.

### 1. Download and Extract the Project

Download the ExploreX ZIP file and extract it to your computer.

### 2. Open the Project in VS Code

Open the extracted **ExploreX** project folder in Visual Studio Code.

### 3. Open the Terminal

Open the terminal in VS Code and make sure you are inside the project folder.

### 4. Install Dependencies

Run the following command:

```bash
npm install
```

This installs all the required packages and dependencies mentioned in `package.json`.

### 5. Start the Development Server

After the dependencies are installed, start the Vite development server using:

```bash
npm run dev
```

The terminal will display a local development URL, usually:

```text
http://localhost:5173/
```

Open the displayed URL in a web browser to access the ExploreX website.

### 6. Stop the Development Server

To stop the development server, press:

```text
Ctrl + C
```

---

## Build for Production

To create a production build of the project, run:

```bash
npm run build
```

The production-ready files will be generated in the `dist` folder.

To preview the production build locally, run:

```bash
npm run preview
```

---

## Booking Workflow

The basic flight booking workflow is:

```text
Home
  ↓
Flights
  ↓
Search Flights
  ↓
Select Flight
  ↓
Enter Passenger Details
  ↓
Calculate Total Price
  ↓
Confirm Booking
  ↓
Generate Booking ID
  ↓
Save Booking Information
  ↓
My Bookings
```

Hotel booking follows a similar frontend workflow:

```text
Hotels
  ↓
Select Hotel
  ↓
Enter Booking Details
  ↓
Confirm Booking
  ↓
View Booking
```

---

## Data Storage

ExploreX currently uses **browser Local Storage** for storing booking-related information.

This allows booking information to remain available when the user navigates between pages or refreshes the website in the same browser.

No external database is required for the current frontend implementation.

---

## Future Improvements

The project can be extended with the following features:

* Backend integration using Node.js and Express.js.
* Database integration using MongoDB.
* Real-time flight and hotel APIs.
* Online payment integration.
* Email confirmation for bookings.
* PDF ticket generation.
* Secure user authentication.
* Password reset functionality.
* Admin dashboard.
* Booking cancellation and modification.
* Cloud deployment with complete backend integration.

---

## Internship Project

**Project Name:** ExploreX - Destination Booking Website

**Technology:** React.js, Vite, JavaScript, HTML5, CSS3

**Project Type:** Full-Stack Web Development

**Purpose:** Developed as an internship project to gain practical experience in React.js, responsive web development, routing, form handling, state management, and travel booking workflows.
