import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ChakraProvider } from './providers/ChakraProvider'
import { QueryProvider } from './providers/QueryProvider'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider>
      <QueryProvider>
        <App />
      </QueryProvider>
    </ChakraProvider>
  </React.StrictMode>
)
