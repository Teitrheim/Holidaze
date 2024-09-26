# **Holidaze Accommodation Booking Front End**

Welcome to the **Holidaze** accommodation booking application! This project is a modern front-end application for a newly launched booking site called Holidaze. It allows users to browse venues, make bookings, and for venue managers to manage their venues and bookings.

## **Table of Contents**

- [**Holidaze Accommodation Booking Front End**](#holidaze-accommodation-booking-front-end)
  - [**Table of Contents**](#table-of-contents)
  - [**Features**](#features)
  - [**Built With**](#built-with)
  - [**Getting Started**](#getting-started)
    - [**Prerequisites**](#prerequisites)
    - [**Installation**](#installation)
      - [**Usage**](#usage)
        - [**Building for Production**](#building-for-production)
          - [**Project Structure**](#project-structure)
  - [Available Scripts](#available-scripts)
  - [API Documentation](#api-documentation)
  - [User Roles](#user-roles)
    - [Customers](#customers)
    - [Venue Managers](#venue-managers)
  - [Functionality](#functionality)
    - [Customer Features](#customer-features)
      - [View Venues](#view-venues)
      - [Venue Details](#venue-details)
      - [Booking](#booking)
      - [Venue Manager Profile](#venue-manager-profile)
    - [Venue Manager Features](#venue-manager-features)
      - [Venue Management](#venue-management)
      - [Booking Management](#booking-management)
      - [Venue Manager User Profile](#venue-manager-user-profile)
  - [Accessibility](#accessibility)
    - [Accessibility Features](#accessibility-features)
  - [Contributing](#contributing)
  - [Contact](#contact)
  - [Additional Notes](#additional-notes)

## **Features**

- **Browse Venues:** Users can view a comprehensive list of available venues.
- **Search and Filter:** Search for venues by name, category, or services.
- **Venue Details:** View detailed information about each venue, including images, descriptions, amenities, and reviews.
- **Calendar Availability:** Check availability using an interactive calendar.
- **User Authentication:** Register and log in as a customer or venue manager.
- **Booking Management:** Customers can create and view their bookings.
- **Venue Management:** Venue managers can create, update, and delete venues, as well as view bookings for their venues.
- **Profile Management:** Users can update their profile information and avatar.
- **Responsive Design:** Optimized for various devices and screen sizes.
- **Accessibility:** Application tested and optimized for accessibility compliance.

---

## **Built With**

- **React** - JavaScript library for building user interfaces.
- **React Router** - Declarative routing for React applications.
- **Bootstrap** - CSS framework for responsive design.
- **React Bootstrap** - Bootstrap components built with React.
- **React Calendar** - Calendar component for React.
- **Context API** - State management for React applications.
- **Fetch API** - Making API requests.
- **CSS Modules** - Modular and reusable CSS.

---

## **Getting Started**

### **Prerequisites**

- **Node.js** (v14 or later)
- **npm** (v6 or later) or **yarn**

### **Installation**

1. **Clone the repository:**
   git clone [](https://github.com/Teitrheim/Holidaze.git)

2. **Navigate to the project directory:**
   cd holidaze

3. **Install dependencies:**
   npm install

4. **Set up Environment Variables:**
   Create a .env file in the root directory.
   Add the following environment variables:
   REACT_APP_API_KEY=your_api_key_here
   Replace your_api_key_here with your actual API key from the Holidaze API.

#### **Usage**

    Running the App
    To start the development server: npm start
    The app will run on http://localhost:3000.

##### **Building for Production**

    To build the app for production:
    npm run build
    The production-ready files will be in the build folder.

###### **Project Structure**

holidaze/
├── public/
│ └── index.html
├── src/
│ ├── components/
│ ├── contexts/
│ ├── pages/
│ ├── App.js
│ ├── index.js
│ └── index.css
├── .env
├── package.json
└── README.md

    components/: Reusable components like headers, footers, forms.
    contexts/: React Contexts for state management.
    pages/: Page components for different routes.
    App.js: Main application component.
    index.js: Entry point of the application.
    index.css: Global CSS styles.

## Available Scripts

- **npm start**: Runs the app in development mode.
- **npm run build**: Builds the app for production.
- **npm test**: Launches the test runner.
- **npm run eject**: Ejects the app from Create React App (not recommended).

## API Documentation

The application interacts with the Holidaze API.

API documentation can be found at [Holidaze API Documentation](https://docs.noroff.dev/holidaze).

## User Roles

### Customers

- Users with a `stud.noroff.no` email can register as customers.
- Can browse venues, make bookings, and view their bookings.

### Venue Managers

- Users with a `stud.noroff.no` email can register as venue managers.
- Can create, update, and delete venues.
- Can view bookings for their venues.

## Functionality

### Customer Features

#### View Venues

- Browse a list of all available venues.
- Search and filter venues based on categories and services.

#### Venue Details

- View detailed information about a venue.
- Check availability using a calendar.
- Read reviews from other users.

#### Booking

- Select dates and number of guests.
- Create a booking for a venue.
- View and manage upcoming bookings.

#### Venue Manager Profile

- Update profile information and avatar.

### Venue Manager Features

#### Venue Management

- Create new venues by providing necessary details.
- Edit existing venues they manage.
- Delete venues they manage.

#### Booking Management

- View all bookings for their venues.
- Manage bookings and availability.

#### Venue Manager User Profile

- Update profile information and avatar.

## Accessibility

The application has been tested using:

- **WAVE Web Accessibility Evaluation Tool**
- **W3C Markup Validation Service**

### Accessibility Features

- Semantic HTML elements.
- Proper use of ARIA attributes.
- Alt attributes for images.
- Keyboard navigability.
- Sufficient color contrast.

## Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the repository.**

2. **Create a new branch:**
   git checkout -b feature/your-feature-name

3. **Make your changes and commit them:**
   git commit -m 'Add some feature'

4. **Push to the branch:**
   git push origin feature/your-feature-name

5. **Open a pull request.**

License
This project is licensed under the MIT License.

## Contact

Thomas Eitrheim
Email: [teitrheim@gmail.com](mailto:teitrheim@gmail.com)
GitHub: [Teitrheim](https://github.com/Teitrheim)
Project Link: [Holidaze](https://github.com/Teitrheim/Holidaze.git)

Thank you for visiting Holidaze! We hope you enjoy using our application.

## Additional Notes

Design Prototype: [Figma Design Prototype](https://www.figma.com/design/C1pnWnXICGIgnv90TNInC1/Holidaze?node-id=0-1&node-type=canvas&t=eo22w2o5fClYUMLe-0)

Style Guide: [Figma Style Guide](https://www.figma.com/design/C1pnWnXICGIgnv90TNInC1/Holidaze?node-id=0-1&node-type=canvas&t=eo22w2o5fClYUMLe-0)

Project Board: [Trello Project Board](https://trello.com/b/n9gB8YDx/project-exam-kanban-template)

Hosted Application Demo: [Netlify Hosted Application Demo](https://shiny-wisp-e94719.netlify.app/)

Gantt Chart: [Trello Gantt Chart](https://trello.com/b/n9gB8YDx/project-exam-kanban-template)
The Gantt Chart is inside the Trello board. You have to activate it.
