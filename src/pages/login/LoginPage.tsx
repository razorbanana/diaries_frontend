import { LoginFormState, resetLoginForm, setLoginFormData, toggleLoginForm } from "../../app/forms/loginFormSlice";
import { login, register } from "../../services/auth";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "../../app/user/userSlice";
import { RegisterFormState, resetRegisterForm, setRegisterFormData, toggleRegisterForm } from "../../app/forms/registerFormSlice";
import { ConsoleLogger } from "../../common/utils/logger";

export const LoginPage = () => {
    const dispatch = useDispatch();
    const loginVisibility = useSelector((state: {loginForm: LoginFormState}) => state.loginForm.isVisible);

    const handleToggle = () => {
        dispatch(toggleLoginForm())
        dispatch(toggleRegisterForm())
        dispatch(resetRegisterForm());
        dispatch(resetLoginForm());
    }

    if (loginVisibility) {
        return (
            <div className="Page">
                <LoginForm handleToggle={handleToggle}/>
            </div>
        ); 
    }
    return (
        <div className="Page">
            <RegisterForm handleToggle={handleToggle}/>
        </div>
    ); 
}

const LoginForm = ({ handleToggle}: { handleToggle: ()=>void} ) => {
    const dispatch = useDispatch();
    const logger = new ConsoleLogger()
    const loginEntries = useSelector((state: {loginForm: LoginFormState}) => state.loginForm.entries);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const { name, value } = e.target;
        dispatch(setLoginFormData({ name, value }));
    };

    const handleFormReset = () => {
        dispatch(resetLoginForm());
    };

    const handleLogin = async () => {
        try {
            const token = await login(loginEntries.username, loginEntries.password);
            logger.info(`handleLogin token: ${token ? true : false}`);
            dispatch(setToken(token));
            localStorage.setItem('token', token);
            handleFormReset()
        } catch (err: any) {
            logger.warn(err.message);
            handleFormReset()
        }
    };

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

const RegisterForm = ( {handleToggle}: { handleToggle: ()=>void} ) => {
    const dispatch = useDispatch();
    const logger = new ConsoleLogger()
    const regEntries = useSelector((state: {registerForm: RegisterFormState}) => state.registerForm.entries);

    const handleRegister = async () => {
        try {
            await register(regEntries.username, regEntries.email, regEntries.password);
            handleFormReset()
            handleToggle()
        } catch (err: any) {
            logger.warn(err.message);
            handleFormReset()
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const { name, value } = e.target;
        dispatch(setRegisterFormData({ name, value }));
    };

    const handleFormReset = () => {
        dispatch(resetRegisterForm());
    };

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