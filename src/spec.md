# Private Valentine Website

## Overview
A password-protected personal website designed for one specific visitor with a romantic Valentine's Day theme.

## Core Features

### Password Protection
- Display a password input field as the initial screen
- Only the correct password grants access to the main content
- Store the correct password "12082006" in the backend for validation
- Frontend must connect to backend to verify the password immediately upon entry
- Successful password validation must immediately redirect to the Valentine question page
- Backend must maintain access state after successful password validation
- Frontend must properly update access state and render Valentine question screen immediately after successful validation
- Password validation system must be robust and reliable, ensuring "12082006" always grants access
- Frontend and backend password validation logic must be perfectly synchronized
- React Query must properly refetch and update state after successful password validation
- Display visible error message for incorrect password attempts
- Clear error message immediately upon successful password entry
- Ensure validatePassword consistently returns true for correct password "12082006"
- Instant access state update in React Query without requiring refreshes or retries

### Valentine Question Page
- After successful password entry, display a romantic-themed page
- Show the question "Will you be my Valentine?"
- Provide two response buttons: "Yes" and "No"

### Response Handling
- **Yes Response**: Display a sweet, celebratory message with romantic animations (hearts or confetti effects)
- **No Response**: Display a playful or humorous message to maintain a lighthearted tone

### Design Theme
- Romantic color scheme using soft pinks and reds
- Subtle animated background with floating hearts
- Responsive design for various screen sizes

## Backend Requirements
- Store the correct password "12082006" for validation
- Provide password verification endpoint that returns immediate validation response
- Maintain access state after successful password validation with hasAccess() function
- Ensure password comparison is exact match for "12082006" with reliable validation logic
- Provide access state query endpoint for frontend to check current access status
- Password validation must be consistent and never fail for correct password
- validatePassword function must reliably return true for "12082006" input
- No user data persistence required beyond password storage and access state

## Frontend Requirements
- Password input form with immediate backend validation
- Proper state management to update access state immediately after successful password validation
- Access state synchronization with backend through validatePassword call and access-check query
- React Query integration with proper refetch mechanisms for seamless state updates
- Seamless transition from password screen to Valentine question interface upon successful authentication
- Valentine question interface with Yes/No buttons
- Animated responses with visual effects (hearts, confetti)
- Romantic styling with soft color palette
- Floating hearts background animation
- Visible error message display for incorrect password attempts
- Error message clearing upon successful password entry
- All interactions and animations handled in frontend
- Application content displayed in English
- Robust error handling with immediate user feedback
- Instant access state updates without page refreshes or retries
