# swap : Deployment

## Deployed Application
https://swap-frontend-tigr.onrender.com/

## Build and Run Instructions
### 1. Prerequisites
- Ensure that you have the following installed locally to build and run the project: <br>
Node.js: https://nodejs.org/<br>
npm: https://www.npmjs.com/
### 2. Clone the Repository
git clone https://github.com/MQCOMP3120-2025/group-project-swap.git <br>
cd group-project-swap
### 3. Install Dependencies
npm install firebase <br>
npm install swival
### 4. Environment Setup
You would need to create a .env file in the project root folder and add the required environment variables. 
- FIREBASE_API_KEY=
- FIREBASE_PROJECT_ID=
- PORT=3000
### 5. Running the Application Locally 
- Development Mode: npm run dev, to run the app with hot-reload.
- Production Build: npm run build - npm start, to build the app and start the production server.

## Deployment Process with Render
1. Connect your GitHub repository to render. 
2. Create a new web service and link it to the repo.
3. Set the build commands to 'npm install' and 'npm run build'
4. Set the start command to: 'npm start'
5. For both the frontend and backend, set the environment variables to match their .env files. 
### Automatic Deployments 
With render, it automatically triggers new deployment whenever you push changes to the connected branch (in this case it's the main branch). Build logs and deployment status can be monitored from the render dashboard and incase of build or runtime errors, you would check the log for details.

## Continuous Integration / Continuous Deployment (CI/CD)
### Render's Built-in CI/CD
- Render provides built-in CI/CD because it automatically building and deploying your branch on each push to the connected Got branch.
This process includes: Installing dependencies, running build scripts and deploying the latest successful build

Grading Rubric
Description of deployment process
Clear instructions on how to build, run
Details of CI/CD are present and clear

Outline
o   A link to a deployed version of your application if available
o   Information on how to build and run the project, eg. if someone were to take over development
o   Information about any use of Continuous Integration you have implemented.



Dependencies: 

npm install 
npm firebase 
npm swival