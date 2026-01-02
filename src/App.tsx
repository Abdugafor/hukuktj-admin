import './App.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Sidebar from './components/Sidebar';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 min-h-screen bg-white">
        <Outlet />
      </main>
    </div>
  );
}

export default App
