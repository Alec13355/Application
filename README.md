# Application
This solution contains a frontend angular application and a backend .Net minimal api application. We are also using open API and swagger codegen to generate the client code for the frontend application.

## Frontend 
By default (so I didn't have to deal with environments with deployment) the frontend application is configured to use the deployed container. You can change all references to "https://webapp.happybay-41fcc3d3.westus2.azurecontainerapps.io" and change it to https://localhost:5001 if you would like to run the full thing locally. To run the application I am assuming you have node installed. If you don't you can download it here: https://nodejs.org/en/download/ and I'm assuming you are using the terminal on a UNIX device (sorry windows users) but you can use GitBash on windows too.

Clone the code for this repository and navigate to the ui folder. Should look something like
``` bash
    cd ui
```
Then run the following commands:
``` bash
    npm install
    npm start
```
That will run the frontend on port 4200 so you can navigate to http://localhost:4200 to see the application. This is calling out to the API hosted at https://webapp.happybay-41fcc3d3.westus2.azurecontainerapps.io. 
To kill the application close your terminal or control + c to kill it.

## Backend
The backend is a .Net minimal api application. I am assuming you have .Net cli installed if not you can download it here: https://dotnet.microsoft.com/download/dotnet/7.0.

 It is configured to run on port 5001. You can run the backend a few different ways you can either run it locally or you can run it in a container. To run it locally cd into the minimalAPI folder and run the following commands:
``` bash
    dotnet restore
    dotnet run
```
Now you should be running on 5000 for http and 5001 for https! To run it in a container you are going to need docker desktop or something similar and we are using docker-compose so all you should have to do is run docker-compose up and it should build and run the container for you, again hosting it on 5000 for http and 5001 for https.

## Infra 
This application is deployed in two different ways. The UI is deployed via Github actions and a Bicep file. So every time you push to main this will do another build. The backend (just for my own ease and being quicker for development) is currently deployed via the Azure (AZ) cli.
``` bash
az containerapp up \                                                                                                 
  --name azcontainerapptestlt \
  --resource-group $RESOURCE_GROUP \
  --location $LOCATION \
  --environment $ENVIRONMENT \
  --source .
```

Overall here is a sample frontend and backend communicating over HTTP to call a photo API.