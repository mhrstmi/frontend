import '@assets/styles/index.css'
import '@assets/styles/animate.css'
// import '@assets/fonts/fonts.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Routes } from './routes/routes'
import AuthProvider from './providers/AuthProvider'




// Create a client
const queryClient: QueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 60 * 1000 /*1 minute*/,
      refetchOnWindowFocus: false,
      retryOnMount: false // prevent infinite request on error in whitch component has loading before mount
      // notifyOnChangeProps: ['data', 'error'],
    },
  },
});


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter basename={import.meta.env.DEV ? '/' : '/frontend/'}>
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>,
)
