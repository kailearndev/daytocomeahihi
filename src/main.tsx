import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import SidebarApp from './components/layouts/SidebarApp.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <SidebarApp>
    <App />
  </SidebarApp>
)
