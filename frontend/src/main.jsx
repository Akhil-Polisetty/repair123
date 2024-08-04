import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
// import './index.css'
import Dashboard1 from './components/Dashboard1.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <div style={{height:'100vh',width:"100vw"}}>
    <App />
    </div>
  </React.StrictMode>,
)
