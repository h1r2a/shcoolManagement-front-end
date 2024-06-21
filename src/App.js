import "./app.css";
import { AuthProvider } from "./context/AuthContext";
import LoginPage from "./pages/LogIn/LoginPage";
import MainPage from "./pages/Main/MainPage";
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="*" element={<LoginPage />} />
        <Route path="/main" element={<MainPage/>}/>
        {/* <ProtectedRoute path="/dashboard" element={<MainPage />} /> */}
      </Routes>
    </AuthProvider>
  );
};

export default App;
