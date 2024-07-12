import { LoginFormState, resetLoginForm, setLoginFormData, toggleLoginForm } from "../app/forms/loginFormSlice";
import { login, register } from "../services/auth";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "../app/user/userSlice";
import { RegisterFormState, resetRegisterForm, setRegisterFormData, toggleRegisterForm } from "../app/forms/registerFormSlice";

export const LoginPage = () => {
    const dispatch = useDispatch();
    const loginEntries = useSelector((state: {loginForm: LoginFormState}) => state.loginForm.entries || {username: '', password: ''});
    const regEntries = useSelector((state: {registerForm: RegisterFormState}) => state.registerForm.entries || {username: '', email: '', password: ''});
    const loginVisibility = useSelector((state: {loginForm: LoginFormState}) => state.loginForm.isVisible);
    const loginPassword = loginEntries.password || '';
    const loginUsername = loginEntries.username || '';
    const registerPassword = regEntries.password || '';
    const registerUsername = regEntries.username || '';
    const registerEmail = regEntries.email || '';

    const handleLogin = async () => {
        try {
            const token = await login(loginEntries.username, loginEntries.password);
            console.log(`handleLogin token: ${token}`);
            dispatch(setToken(token));
            localStorage.setItem('token', token);
            dispatch(resetLoginForm());
        } catch (err: any) {
            console.error(err.message);
            handleLoginFormReset()
        }
    };
    
    const handleRegister = async () => {
        try {
            await register(registerUsername, registerEmail, registerPassword);
            handleRegisterFormReset()
            handleToggle()
        } catch (err: any) {
            console.error(err.message);
            handleRegisterFormReset()
        }
    }

    const handleRegisterInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const { name, value } = e.target;
        console.log(`name: ${name}, value: ${value}`)
        dispatch(setRegisterFormData({ name, value }));
    };

    const handleLoginInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const { name, value } = e.target;
        console.log(`name: ${name}, value: ${value}`)
        dispatch(setLoginFormData({ name, value }));
    };

    const handleRegisterFormReset = () => {
        dispatch(resetRegisterForm());
    };

    const handleLoginFormReset = () => {
        dispatch(resetLoginForm());
    };

    const handleToggle = () => {
        dispatch(toggleLoginForm())
        dispatch(toggleRegisterForm())
    }

    if (loginVisibility) {
        return (
            <div className="Page">
                <LoginForm  handleInputChange={handleLoginInputChange} handleFormReset={handleLoginFormReset} username={loginUsername} password={loginPassword} handleLogin={handleLogin} handleToggle={handleToggle}/>
            </div>
        ); 
    }
    return (
        <div className="Page">
            <RegisterForm  handleInputChange={handleRegisterInputChange} handleFormReset={handleRegisterFormReset} username={registerUsername} email={registerEmail} password={registerPassword} handleRegister={handleRegister} handleToggle={handleToggle}/>
        </div>
    ); 
}

const LoginForm = ({handleInputChange, handleFormReset, username, password, handleLogin, handleToggle}: {handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void, handleFormReset: ()=>void, username: string, password: string, handleLogin: ()=>void, handleToggle: ()=>void} ) => {
    return (
        <div className="FormContainer">
            <div className="InputContainer">
                <input type="text" name="username" placeholder="Username or email" onChange={handleInputChange} value={username}/>
            </div>
            <div className="InputContainer">
                <input type="text" name="password" placeholder="Password" onChange={handleInputChange} value={password}/>
            </div>
            <div className="ButtonsContainer">
                <button onClick={handleFormReset}>Reset Form</button>
                <button onClick={handleLogin}>Submit</button>
            </div>
            <div>
                <p>Or maybe...</p>
                <button onClick={handleToggle}>Register</button>
            </div>
        </div>
    )
}

const RegisterForm = ({handleInputChange, handleFormReset, username, email, password, handleRegister, handleToggle}: {handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void, handleFormReset: ()=>void, username: string, email: string, password: string, handleRegister: ()=>void, handleToggle: ()=>void} ) => {
    return (
        <div className="FormContainer">
            <div className="InputContainer">
                <input type="text" name="username" placeholder="Username" onChange={handleInputChange} value={username}/>
            </div>
            <div className="InputContainer">
                <input type="text" name="email" placeholder="Email" onChange={handleInputChange} value={email}/>
            </div>
            <div className="InputContainer">
                <input type="text" name="password" placeholder="Password" onChange={handleInputChange} value={password}/>
            </div>
            <div className="ButtonsContainer">
                <button onClick={handleFormReset}>Reset Form</button>
                <button onClick={handleRegister}>Submit</button>
            </div>
            <div>
                <p>Or maybe...</p>
                <button onClick={handleToggle}>Log in</button>
            </div>
        </div>
    )
}