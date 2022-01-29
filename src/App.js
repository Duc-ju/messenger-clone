import "./App.css";
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Login from "./component/Login"
import Main from "./component/Main"
import AuthProvider from './context/AuthProvider'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route element={<Login />} path="/login" />
          <Route element={<Main />} path="/" />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
