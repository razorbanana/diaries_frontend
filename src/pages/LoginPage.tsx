import { LoginFormState, resetLoginForm, setLoginFormData } from "../app/forms/loginFormSlice";
import { login } from "../services/auth";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "../app/user/userSlice";

export const LoginPage = () => {
    const dispatch = useDispatch();
    const entries = useSelector((state: {loginForm: LoginFormState}) => state.loginForm.entries || {username: '', password: ''});
    console.log(`entries are ${entries}`)
    const password = entries.password || '';
    const username = entries.username || '';

    const handleLogin = async () => {
        try {
            const token = await login(entries.username, entries.password);
            console.log(`handleLogin token: ${token}`);
            dispatch(setToken(token));
            localStorage.setItem('token', token);
            dispatch(resetLoginForm());
        } catch (err: any) {
            console.error(err.message);
            handleFormReset()
        }
    };
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const { name, value } = e.target;
        console.log(`name: ${name}, value: ${value}`)
        dispatch(setLoginFormData({ name, value }));
    };

    const handleFormReset = () => {
        dispatch(resetLoginForm());
    };

    return (
        <div>
            <LoginForm  handleInputChange={handleInputChange} handleFormReset={handleFormReset} username={username} password={password} handleLogin={handleLogin}/>
        </div>
    );  
}

const LoginForm = ({handleInputChange, handleFormReset, username, password, handleLogin}: {handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void, handleFormReset: ()=>void, username: string, password: string, handleLogin: ()=>void} ) => {
    return (
        <div>
            <input type="text" name="username" placeholder="Username or email" onChange={handleInputChange} value={username}/>
            <input type="text" name="password" placeholder="Password" onChange={handleInputChange} value={password}/>
            <button onClick={handleFormReset}>Reset Form</button>
            <button onClick={handleLogin}>Submit</button>
        </div>
    )
}