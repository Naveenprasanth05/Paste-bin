import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CreatePaste from './components/CreatePaste'
import ViewPaste from './components/viewPaste'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className='flex justify-center w-full items-center'>
      <ToastContainer position="bottom-right" autoClose={3000} />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CreatePaste />} />
          <Route path="/view/:id" element={<ViewPaste />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
