
<div align="center">

<img src="./Frontend/public/logo1.png" />

<br />
<br />

# TENSY - Tendering Made Easy !

</div>

<br />

# DEVSPACE-GOCOMET-PROBLEM-2

This is the official repository for team-Lazy Sprinters

# Problem Statement

Manufacturing Companies require a lot of raw materials to be supplied from one or more vendor companies regularly to keep up with production. A simple way of procuring the raw materials is through emailing the vendor companies about the requirements, and then negotiating through a trail of emails which is not only time consuming but quite difficult to document and hence becomes a logistical nightmare.

# Proposed Solution

We propose a solution where we create a web app with two portals (one for buyers and one for sellers), a platform where all the companies be it manufacturing or vendor can assemble and carry out their transactions and dealings quickly, effectively and hassle-free. One of the ways we've approached this problem is by modularising various aspects of the project including creation of requests which is done semi-automatically. The vendor companies can see the requests created and make their agreement proposals through the portal itself. Then the negotiations can start without the companies being in direct contact with each other and leaving a trail of mails. After the deadline of the request, the buyer can select the best option for their company. At various points during the negotiation, we've given the option to opt out of a proposed solution if the vendor companies don't view the transaction in their best interests.

# Tech Stack Used

  ### Tools:
     Sublime Text
     Visual Studio Code
     Postman
     Robo 3T
  ### Languages:
     Javascript
  ### Frameworks:
     Reactjs
     Nodejs
     MongoDB 


# FRONTEND

## Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
  
# BACKEND
## TO RUN ON LOCAL MACHINE<br>
### COMMAND: `npm run dev` in Backend directory<br>
Open [http://localhost:5000](http://localhost:5000) to view it in the browser.<br>

Create a .env file in the backend-root directory on your local machine with the following format<br>
TEST_MAIL=(Mail ID for sending the cancellation messages and verifications emails)<br>
TEST_PASS=(Password of the mail ID)<br>
API_KEY=(API KEY for the HERE Platform)<br>
SECRET=(Secret for the vonage API service)<br>
VKEY=(Key for the vonage API service)<br>
SERVICE=(Service of the mail ID as in hotmail,yahoo,gmail etc)<br>
AUTHSRT=(Token for the authentication service)<br>

