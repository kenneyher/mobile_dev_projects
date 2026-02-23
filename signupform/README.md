# Signup Form App

A React Native (Expo) application featuring a comprehensive signup form with validation, real-time status tracking, and a country picker.

## How to Run the App

1.  **Clone the repository** (or navigate to the project folder).
2.  **Install dependencies**:
    ```bash
    npm install
    ```
3.  **Start the development server**:
    ```bash
    npm start
    ```
4.  **Open the app**:
    - Use the **Expo Go** app on your physical device by scanning the QR code.
    - Press `a` for Android Emulator or `i` for iOS Simulator.

## Features & Integration

- **Country Picker**: Instead of a hardcoded list, this app fetches a live list of countries from the **[REST Countries API](https://restcountries.com/)** (`https://restcountries.com/v3.1/all`). It includes search functionality and display of country flags.
- **Form Status Tracking**: A dynamic status indicator shows whether the form is `Empty`, `Changing`, `Incomplete`, or `Ready` based on user input and validation rules.
- **Validation**:
  - **Phone Number**: Validated against an international format (E.164-ish) requiring a `+` followed by the country code and digits.
  - **Password**: Enforces security rules (8+ characters, uppercase, number, and special character).
  - **Age**: Restricted to users between 18 and 100.
- **Feedback**: Uses a modal to provide clear success or error summaries upon submission.

## Assumptions & Limitations

- **Internet Connection**: A stable internet connection is required to fetch the country list from the API. If the API is unreachable, the country picker will remain in a loading state.
- **E.164 Phone Format**: The phone validation assumes users will provide a `+` prefix. It automatically prepends `+` if missing, but requires a valid country code.
- **Genre Selection**: Limited to "Male" and "Female" as per initial requirements.
- **Local State**: Form data is not persisted to a backend database; it is managed purely via local React state for demonstration purposes.
