import {Routes, Route} from "react-router-dom"
import Login from "./pages/Login/Login"
import HomePage from "./pages/Home/HomePage"

function App() {
  return (
    <>
      <div>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<HomePage />} />
        </Routes>
      </div>
    </>
  )
}

export default App
