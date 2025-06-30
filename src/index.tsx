import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ReactDOM from 'react-dom/client'

import './neobrutalism.css'
import App from './components/App'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
)

window.addEventListener('contextmenu', (event) => {
  event.preventDefault()
  const { x, y } = event
  window.api.showContextMenu({ x, y })
})
