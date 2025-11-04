# swap : Deployment

## Deployed Application Link
https://swap-frontend-tigr.onrender.com/

## Build and Run Instructions
### 1. Prerequisites
Ensure that the following prerequisites installed locally to build and run the project: 
- `Node.js`: https://nodejs.org/

- `npm`: https://www.npmjs.com/

### 2. Clone the Repository
Clone the repository by running the following commands line by line:
```
git clone https://github.com/MQCOMP3120-2025/group-project-swap.git 
cd group-project-swap
```
### 3. Install Dependencies
Install all dependencies from `package.json` with the following command:
```
npm install
```
### 4. Environment Setup
Create a `.env` file in the project root folder and add the required environment variables: 
```
FIREBASE_API_KEY=
FIREBASE_PROJECT_ID=
PORT=3000
```
### 5. Running the Application Locally 
- Development Mode: `npm run dev`, to run the app with hot-reload.
  
- Production Build: `npm run build - npm start`, to build the app and start the production server.

## Deployment Process with Render
1. Connect the GitHub repository to Render.
   
2. Create a new web service and link it to the repo.
   
3. Set the build commands to `npm install` and `npm run build`
   
4. Set the start command to: `npm start`
   
5. For both the frontend and backend, set the environment variables to match their `.env` files. 

## Continuous Integration / Continuous Deployment (CI/CD)
### 1. GitHub Actions (CI)
- Automated test workflow is set up in `.github/workflows/ci.yml`.

- Runs on every push or pull request to the `main` branch.

- Executes unit and integration tests for both frontend and backend.

- If any test fails, the workflow stops and the code is not deployed. Developers are notified via GitHub.

### 2. Render Built-in CI/CD (CD)
- Render automatically deploys the app whenever the connected branch (main) is updated.

- Deployment steps include:
  
  1. Installing dependencies (`npm install`).
  2. Running the build script (`npm run build`).
  3. Serving the latest build on the live URL.

- Deployment logs are available in the Render dashboard.

- This ensures the live app is always up-to-date with the latest tested and stable code.

### Summary
- **GitHub Actions** provides continuous integration by testing code before deployment.  

- **Render** handles continuous deployment by hosting the latest successful build automatically.