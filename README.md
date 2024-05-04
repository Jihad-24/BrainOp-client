# BrainOp

Click here for the live page: [https://job-hub-mine.netlify.app/]

Here are at least five or more bullet points mentioning different features and functionalities of my website:

# 1. User Authentication:

- My website supports user authentication through email and password, as well as Google Sign-In. Users can create accounts, log in, and log out.

# 2. Navigation and Routing:

- The website uses React Router for navigation and routing. It defines routes for different pages, such as the home page, login page, register page, add job, my jobs and more.

# 3. Password Visibility Toggle:

- In the login and registration forms, there is an option for users to toggle the visibility of the password by clicking the eye icon, allowing them to see the password they are entering.
  there is also a toggole for go to login or register.

# 4. Error Handling and Alerts:

- The website handles errors during the login and registration processes and displays error messages to the user. It also provides success alerts using the Swal (SweetAlert2) and react hot toast library.

# 5. Navigation Bar (Navbar):

- The website includes a navigation bar that displays links to different pages based on the user's authentication status. It provides links for Home, Login, Register, add job, and my job, my bids, bid requests, dashboard. It also displays the user's name and profile picture when logged in and provides a "Sign Out" button for logging out.

# 6. Job Posting and Management:

Registered users can post job listings with details like job title, category, deadline, description, and price range.Users can view the jobs they have posted in the "My Posted Jobs" section.Users can edit and delete their posted jobs.

# 7. Bid Management:

Users can place bids on jobs listed by other users in the "My Bids" section.Users can trackthe status of their bids, and the bids can be marked as "in progress," "complete," or "rejected."Users can delete their bids.

# 8. Error Handling:

The website includes error handling, displaying user-friendly messages for common errors and issues, such as 404 - Page Not Found.Error messages are displayed using the SweetAlert2 library.

# 9. Private Routes:

Some routes are protected and can only be accessed by authenticated users. The PrivateRoute component ensures that only authenticated users can access specific sections of the website.

# 10. JWT (JSON Web Tokens) Token-Based Authentication:

    When a user registers or logs into your website, the authentication process involves generating a JWT (JSON Web Token).After successful authentication, the JWT is issued to the user as a means of identifying and authenticating them for subsequent requests.The JWT is used as an authentication token, and it is included and stored in a secure client-side storage (browser cookies ).The server checks the validity of the JWT for each protected endpoint or route to ensure that the user has the necessary permissions to access the resource.

These are the key features and functionalities of my website.
