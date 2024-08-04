import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { GameEngineProvider } from './hooks/useGameEngine.jsx'
import { insertCoin } from 'playroomkit'

insertCoin({persistentMode:true}).then(()=>{
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <GameEngineProvider>
        <App />
      </GameEngineProvider>
    </React.StrictMode>,
  );
});