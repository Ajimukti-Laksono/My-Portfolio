import React from 'react'
import ReactDOM from 'react-dom/client'
import Lanyard3D from './components/Lanyard3D'

function TestApp() {
  return (
    <div style={{ width: '100vw', height: '100vh', background: '#020617' }}>
      <Lanyard3D
        isDarkMode={true}
        fallback={<div style={{ color: 'red', padding: '20px' }}>3D Lanyard failed to load. Check console.</div>}
      />
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('lanyard-root') || document.getElementById('root')).render(<TestApp />)
