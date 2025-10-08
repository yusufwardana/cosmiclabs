import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
// Ubah baris ini dari './index.css' menjadi './globals.css'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)