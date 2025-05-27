import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import React from 'react'
import { RouterProvider} from 'react-router-dom'
import routes from './routes/Routes.jsx'
createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={routes} />
    <App />
  </React.StrictMode>
)
