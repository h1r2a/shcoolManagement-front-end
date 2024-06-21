import React, { useContext, useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import "./login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import toastr from "toastr";
import { authContext } from "../../context/AuthContext";
const LoginPage = () => {
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const credentials ={
        email: email,
        password: password
    };
    const {setUser} = useContext(authContext);

    const authenticate = async () => {
        try {
            const token = await axios.post("http://localhost:8080/api/user/authenticate", credentials);
           if(token){
           localStorage.setItem("token",token.data);
            setUser(jwtDecode(token.data));
            toastr.success("Login succefull!")
            navigate('/main')
           }
        } catch (error) {
            toastr.error(error.response.data)
            
        }
    };

    return (
        <div className="login">
            <div className="header">
                <h1>MATHISI</h1>
            </div>
            <div className="form-container">
                <div className="form">
                    <div className="form-header">
                        <h1>MATHISI</h1>
                    </div>
                    <div className="form-content">
                        <div className="form-group">
                            <FaUser className="icon" />
                            <input
                                type="text"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <FaLock className="icon" />
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button type="submit" onClick={authenticate}>Login</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
