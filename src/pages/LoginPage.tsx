import { LoginFormEntries, LoginFormState, resetLoginForm, setLoginFormData, toggleLoginForm } from "../app/forms/loginFormSlice";
import { login, register } from "../services/auth";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "../app/user/userSlice";
import { RegisterFormEntries, RegisterFormState, resetRegisterForm, setRegisterFormData, toggleRegisterForm } from "../app/forms/registerFormSlice";
import { ConsoleLogger } from "../common/utils/logger";

export const LoginPage = () => {
    const dispatch = useDispatch();
    const loginEntries = useSelector((state: {loginForm: LoginFormState}) => state.loginForm.entries);
    const regEntries = useSelector((state: {registerForm: RegisterFormState}) => state.registerForm.entries);
    const loginVisibility = useSelector((state: {loginForm: LoginFormState}) => state.loginForm.isVisible);
    const logger = new ConsoleLogger()


    const handleLogin = async () => {
        try {
            const token = await login(loginEntries.username, loginEntries.password);
            logger.info(`handleLogin token: ${token ? true : false}`);
            dispatch(setToken(token));
            localStorage.setItem('token', token);
            handleLoginFormReset()
        } catch (err: any) {
            logger.warn(err.message);
            handleLoginFormReset()
        }
    };
    
    const handleRegister = async () => {
        try {
            await register(regEntries.username, regEntries.email, regEntries.password);
            handleRegisterFormReset()
            handleToggle()
        } catch (err: any) {
            logger.warn(err.message);
            handleRegisterFormReset()
        }
    }

    const handleRegisterInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const { name, value } = e.target;
        dispatch(setRegisterFormData({ name, value }));
    };

    const handleLoginInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const { name, value } = e.target;
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
        handleRegisterFormReset()
        handleLoginFormReset()
    }

    if (loginVisibility) {
        return (
            <div className="Page">
                <LoginForm  handleInputChange={handleLoginInputChange} handleFormReset={handleLoginFormReset} loginEntries={loginEntries} handleLogin={handleLogin} handleToggle={handleToggle}/>
            </div>
        ); 
    }
    return (
        <div className="Page">
            <RegisterForm  handleInputChange={handleRegisterInputChange} handleFormReset={handleRegisterFormReset} regEntries={regEntries} handleRegister={handleRegister} handleToggle={handleToggle}/>
        </div>
    ); 
}

const LoginForm = ({handleInputChange, handleFormReset, loginEntries, handleLogin, handleToggle}: {handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void, handleFormReset: ()=>void, loginEntries: LoginFormEntries, handleLogin: ()=>void, handleToggle: ()=>void} ) => {
    return (
        <div className="FormContainer">
            <div className="InputContainer">
                <input type="text" name="username" placeholder="Username or email" onChange={handleInputChange} value={loginEntries.username}/>
            </div>
            <div className="InputContainer">
                <input type="text" name="password" placeholder="Password" onChange={handleInputChange} value={loginEntries.password}/>
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

const RegisterForm = ({handleInputChange, handleFormReset, regEntries, handleRegister, handleToggle}: {handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void, handleFormReset: ()=>void, regEntries: RegisterFormEntries, handleRegister: ()=>void, handleToggle: ()=>void} ) => {
    return (
        <div className="FormContainer">
            <div className="InputContainer">
                <input type="text" name="username" placeholder="Username" onChange={handleInputChange} value={regEntries.username}/>
            </div>
            <div className="InputContainer">
                <input type="text" name="email" placeholder="Email" onChange={handleInputChange} value={regEntries.email}/>
            </div>
            <div className="InputContainer">
                <input type="text" name="password" placeholder="Password" onChange={handleInputChange} value={regEntries.password}/>
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