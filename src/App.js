import "./App.css";
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Login from "./component/Login"
import Main from "./component/Main"
import AuthProvider from './context/AuthProvider'
import AppProvider from './context/AppProvider'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppProvider>
          <Routes>
            <Route element={<Login />} path="/login" />
            <Route element={<Main />} path="/" />
          </Routes>
        </AppProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
