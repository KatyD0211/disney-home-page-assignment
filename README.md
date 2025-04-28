# Disney+ Home Page Assignment

This project is a Disney+ Home Page Clone built using React.
It fetches dynamic collections of movies and shows from a public Disney content API and displays them in a modern, scrollable layout.

## Tech Stack

React (Hooks, Functional Components)

TypeScript (strong typing)

Fetch API (async data fetching)

CSS (flexbox, grid)

### Features

Fetches collections dynamically from Disney's static JSON API.

Divides collections into two types:

Initial collections (with ready items)

RefId collections (need to fetch separately)

Lazy loads collections as the user scrolls 80% down the page.

Graceful handling of broken images (fallback image when 404).

Error handling for network failures.

Clean, modular, readable code structure.

### How to Run Locally
#### 1. Clone the repo
git clone https://github.com/KatyD0211/disney-home-page-assignment.git

#### 2. Navigate into the project
cd disney-home-page-assignment

#### 3. Install dependencies
npm install

#### 4. Start the development server
npm start


### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
