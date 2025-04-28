# Disney+ Home Page Assignment

This project is a Disney+ Home Page Clone built using React.
It fetches dynamic collections of movies and shows from a public Disney content API and displays them in a modern, scrollable layout.

### Tech Stack

React (Hooks, Functional Components)

TypeScript (strong typing)

Fetch API (async data fetching)

CSS (flexbox, grid)


### How to Run Locally
#### 1. Clone the repo
git clone https://github.com/KatyD0211/disney-home-page-assignment.git

#### 2. Navigate into the project
cd disney-home-page-assignment

#### 3. Install dependencies
npm install

#### 4. Start the development server
npm start

### My Approach
My approach focuses on modular and scalable code that enhances both performance and maintainability. Key principles include:

Dynamic Collection Fetching: Collections are fetched on-demand to avoid unnecessary data load and optimize performance.

Type Safety: TypeScript interfaces provide structure and ensure long-term maintainability.

Image Fallback: Broken images are replaced with placeholders to improve user experience.

Data Sanitization: API data is normalized to ensure consistency.

Performance Optimization: Lazy loading and dynamic fetching minimize initial load times.

This approach ensures a seamless balance between performance, user experience, and maintainability.

### Future Improvements
Implement Infinite Scroll Optimization
Show a spinner or skeleton loader while fetching more data, enhancing the user experience during long wait times.
Ensure images have appropriate alt text and all interactive elements are keyboard-navigable.
Better State Management
lightweight caching or localStorage to persist fetched data across sessions (e.g., after refresh).
Prefetch data for related collections ahead of time to create a smoother navigation experience.
Automatically retry failed network requests
Abstract getAllCollections and getCollectionItems into custom React hooks like useCollections for cleaner and reusable fetching logic.












