//component imports
import App from "./App"

//css imports
import "./index.css"

//library imports
import ReactDOM from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
//import {toaster} from 'react-router-dom'
import store from "../Redux/store"
import Footer from "./Components/Footer.jsx"
import HomeLayout from "./Layouts/HomeLayout.jsx"
import { Provider } from "react-redux"
import {Toaster} from 'react-hot-toast'

ReactDOM.createRoot(document.getElementById('root')).render(
   <Provider store = {store}> 
   <BrowserRouter>
      <App />
      <Toaster />
   </BrowserRouter>
   </Provider>
)
