# techdegree-p7-React Gallery App

## What it is
This is the seventh project while studying Full Stack JavaScript techdegree at Treehouse.
In this project, I use React.js to build a web app displaying a list of photos as a user's request. Because the photos are from Flickr API, users need to have their own API key. I will explain more about it in the following section. This app's name is **Famous Motor Gallery**. As you can imagine, the app lists photos of beautiful cars as default on the page. Also, there are nav buttons to render components with the data loaded when the page is initialized. If users want more, they can use the search form to get new photos.

## How it works
When loading the page, the React app renders components according to the Routes and requests JSON data to Flickr API. Once the promises are fulfilled and the data is ready, the app updates the state object and render the components again with the new state. After that, users can navigate between nav buttons without updating the state. However, when users submit the search form, the app fetches the source URL with the search keyword as a parameter. While waiting for the request resolved, the page indicates "Loading" message and updates the state object and so on.

If the search request returns nothing, the page displays "No Result and please try again" message. Also, if users enter not existing Routes, it will show 404 error page to them. 

## Flickr API Key
As I mentioned before, users should have an API key. Please visit Flickr(https://www.flickr.com/services/api/misc.api_keys.html) and apply for a non-commercial API key. Users need to create an account if they don't have it. Then, users set config.js file in the src folder. The config.js file should look like this
```javascript
const apiKey = 'YOUR API KEY';
export default apiKey;
```

## Changes in index.css
* shadow in h1
* Background color in body
* Font
* Colors in nav

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
