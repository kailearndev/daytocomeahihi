import ReactDOM from 'react-dom/client'
import App from './App'
import SidebarApp from './components/layouts/SidebarApp'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <SidebarApp>
    <App />
  </SidebarApp>
)
