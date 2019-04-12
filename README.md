# Clics
An application for work time reporting

## Screenshots
![Login](https://user-images.githubusercontent.com/10371312/56020922-f010bf00-5d10-11e9-8297-3e47d4d7cdc8.PNG)
![Main](https://user-images.githubusercontent.com/10371312/56020923-f010bf00-5d10-11e9-971c-da0879d3e25f.PNG)
![Edit](https://user-images.githubusercontent.com/10371312/56020924-f0a95580-5d10-11e9-9d1e-74fcc7dde6de.PNG)

## Build
In order to build the project you need [IntelliJ IDEA](https://www.jetbrains.com/idea/).
Clone the repository and open the project with IntelliJ.

Then in `clics -> src` folder create a `.env` file with the following content
```
REACT_APP_MONGODB_APP_ID=YOUR_APP_ID_FROM_STITCH
```
and replace `YOUR_APP_ID_FROM_STITCH` with your key from MongoDB Stitch.

Then you can run the project with `npm start` or build with `npm build`.

## Libraries Used
* [MongoDB](https://cloud.mongodb.com) used as database.
* [ReactJS](https://reactjs.org/) used for the front end.
* [Material-UI](https://material-ui.com/) used for the front end UI.
