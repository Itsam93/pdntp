# Healing Streams Avatar Generator

## Overview
The Healing Streams Avatar Generator is a web application that allows sponsors to create a personalized Healing To The Nations Magazine Sponsorship campaign avatar.

Users complete a registration form, upload a profile picture, adjust the image within the Healing Streams frame, and download a high-quality avatar ready for use across all social media platforms ranging from WhatsApp, Facebook, Instagram, X, Telegram.

---

# Features
* Sponsor registration
* Upload profile photo
* Drag and reposition image
* Zoom image
* Official Healing Streams branded frame
* Display sponsored magazine copies on the avatar
* High-resolution avatar download
* Responsive design
* Optional API integration for registration and download analytics


# Technology Stack
* React
* Vite
* React Router
* Tailwind CSS
* HTML5 Canvas API

# Project Structure
src/
│
├── assets/
│   ├── frame.png
│   ├── healing-streams-logo.png
│
├── components/
│   ├── AvatarCanvas.jsx
│   ├── Hero.jsx
│   ├── RegistrationForm.jsx
│   └── Spinner.jsx
│
├── config/
│   ├── avatarAssets.js
│   └── avatarFrames.js
│
├── pages/
│   ├── Home.jsx
│   └── AvatarPage.jsx
│
├── routes/
│   └── AppRoutes.jsx
│
├── utils/
│   └── frameLocator.js
│
├── App.jsx
├── main.jsx
└── index.css

# Registration Flow
The user provides:
* Title (Pastor, Deacon/Deaconess, Brother, Sister, Miss or Master)
* Full Name
* Name of Church
* Magazine Sponsorship Category
* Number of Copies Sponsored

After submission:
1. Information is saved locally.
2. Registration can optionally be sent to an API.
3. User is redirected to the Avatar page.


# Avatar Creation Flow
The user:
1. Uploads a photo.
2. Repositions the image by dragging.
3. Adjusts the zoom level.
4. Downloads the completed Healing Streams avatar.

The generated avatar contains:
* Official Healing Streams frame
* User photograph
* Number of sponsored magazine copies


# Magazine Sponsorship Categories
| Category              | Amount                                    |
| --------------------- | ----------------------------------------- |
| 1 – 99 Copies         | ₦600 – ₦59,400 (0.3 – 29.7 Espees)        |
| 100 – 499 Copies      | ₦60,000 – ₦299,400 (30 – 149.7 Espees)    |
| 500 – 999 Copies      | ₦300,000 – ₦599,400 (150 – 299.7 Espees)  |
| 1000 Copies and Above | ₦600,000 and Above (300 Espees and Above) |


# Local Storage
The application stores registration information temporarily using Local Storage.
Key: avatarUser

## avatarAssets.js
Contains the official Healing Streams frame.

## avatarFrames.js
Controls the positioning of:
* Profile photo
* Number of copies text

Adjust these values whenever a new frame design is introduced.


# Installation
Clone the repository

```bash
git clone <repository-url>
```

Navigate into the project
```bash
cd healing-streams-avatar
```

Install dependencies
```bash
npm install
```

Start the development server
```bash
npm run dev
```

Build for production
```bash
npm run build
```

Preview the production build
```bash
npm run preview
```

# Browser Support
* Google Chrome
* Microsoft Edge
* Mozilla Firefox
* Safari
* Brave

# Author
Developed for the Sponsorship of the Healing To The Nations Magazine campaign to enable sponsors generate branded campaign avatars quickly and consistently.
