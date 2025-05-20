# Voltwait
A cross-platform mobile application that helps users find nearby EV charging stations. The app uses Google Maps on Android and Apple Maps on iOS to provide a native experience on each platform.
Getting Started with Expo Go
Prerequisites

# Before you begin, make sure you have the following installed:

Node.js (version 14 or later)
npm (comes with Node.js) 
Expo Go app installed on your mobile device

# Installation

Clone the repository (if applicable)
git clone https://github.com/[put-your-github-username]/VoltWait.git
cd VoltWait

# Install dependencies
npm install

# Running the App with Expo Go

to start the development server
npx expo start --tunnel

# Connect with Expo Go
Option 1: Scan QR Code

When the development server starts, a QR code will appear in your terminal
On Android: Open Expo Go app and scan the QR code
On iOS: Use your camera app to scan the QR code, which will prompt you to open in Expo Go

Option 2: Enter Project URL

Open Expo Go on your device
Tap "Enter URL manually"
Enter the URL shown in your terminal (usually something like exp://192.168.x.x:19000)

# Troubleshooting

Make sure your phone and computer are on the same network

If you're having trouble connecting, try using Expo's "Tunnel" connection type

npx expo start --tunnel



Location services must be enabled on your device for the app to function properly
If the app crashes on startup:

Check that you have allowed location permissions
Ensure you have an active internet connection

