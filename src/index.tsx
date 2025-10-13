import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app'
import { ChakraProvider } from './providers/chakra-provider'
import { QueryProvider } from './providers/query-provider'
import { AuthProvider } from './providers/auth-provider'

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <ChakraProvider>
      <QueryProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </QueryProvider>
    </ChakraProvider>
  </React.StrictMode>
)
