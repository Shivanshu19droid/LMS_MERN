#plugins and dependencies:
 install @reduxjs/toolkit react-redux react-router-dom react-icons react-chartjs-2 chart.js daisyui axios react-hot-toast @tailwind/line-clamp

 all the routes will be mapped to their respective components in the app.jsx file

 we setup axios, which is used for making http requests like GET, POST, PUT, DELETE to the backend

 next we move to making the components in the src/Components folder

 we can create a nav bar and a footer component and use it directly in app.jsx, but if we want different layouts for the user and the admin, we will have to enter man conditions - so here we will create a layout and then call others as child components inside the main layout


 result will be we cam decide which page to have which layout, and we will list only the routings of the pages in app.jsx file

 after creating the layout, we will create the pages to be wrapped inside the layout

 we have installed daisyui and lineclamp, to use them we need to include them in the tailwind.config.js plugins

 while implementing the carousel, there is a lot of code repetition, so we make a slide component instead to make the carousel
 we will make a new component called carousel slide

 we will go to the AuthSlice.js to setup an asynchroonous thunk to handle the account creation, then the function will be dispatched during signup

 before starting to build the page of any important part, we will - create a slice for it, use the slice in store.js file