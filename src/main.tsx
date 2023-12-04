import '@assets/styles/index.css'
import '@assets/styles/animate.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ContextProvider } from './contexts/ContextProvider'
import RenderRouts from './routes/RenderRouts'
import BaseLayout from './layout/BaseLayout'


// Create a client
const queryClient = new QueryClient()


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ContextProvider>
        <BrowserRouter basename={import.meta.env.DEV ? '/' : '/frontend/'}>
          <BaseLayout>
            <RenderRouts />
          </BaseLayout>
        </BrowserRouter>
      </ContextProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
