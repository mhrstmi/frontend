import '@assets/styles/index.css'
import '@assets/styles/animate.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ContextProvider } from './contexts/ContextProvider'
import { Routes } from './routes/routes'


// Create a client
const queryClient = new QueryClient()


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ContextProvider>
        <BrowserRouter basename={import.meta.env.DEV ? '/' : '/frontend/'}>
          <Routes isAuthorized={true} />
        </BrowserRouter>
      </ContextProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
