import { useState } from "react";
import { login } from "../services/auth";
import { setStateType } from "../types/setStateType";

export const LoginPage = ({setToken}: setStateType) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    
    const handleLogin = async () => {
        try {
            const token = await login(username, password);
            console.log(`handleLogin token: ${token}`);
            setToken(token);
            localStorage.setItem('token', token);
        } catch (err: any) {
            setError(err.message);
        }
    };
    
    return (
        <div>
        <input
            type="username"
            placeholder="Username or email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
        />
        <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
        {error && <p>{error}</p>}
        </div>
    );  
}