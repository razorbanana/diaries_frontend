import { useDispatch, useSelector } from "react-redux";
import ConsoleLogger from "../../common/utils/logger";
import { LoginFormState, resetLoginForm, setLoginFormData } from "../../app/forms/loginFormSlice";
import { login, register } from "../../services/auth";
import { setToken } from "../../app/user/userSlice";
import { RegisterFormState, resetRegisterForm, setRegisterFormData } from "../../app/forms/registerFormSlice";
import { PostForm } from "../../components/PostForm";

export const LoginForm = ({ handleToggle}: { handleToggle: ()=>void} ) => {
    const dispatch = useDispatch();
    const logger = new ConsoleLogger()
    const loginEntries = useSelector((state: {loginForm: LoginFormState}) => state.loginForm.entries);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

    const inputs = [
        {type: "text", name: "username", placeholder: "Username or email", handleInputChange: handleInputChange, value: loginEntries.username},
        {type: "password", name: "password", placeholder: "Password", handleInputChange: handleInputChange, value: loginEntries.password}
    ]

    const buttons = [
        {name: "Reset Form", onClick: handleFormReset},
        {name: "Submit", onClick: handleLogin}
    ]

    return (
        <div>
            <PostForm inputs={inputs} buttons={buttons}/>
            <div>
                <p>Or maybe...</p>
                <button onClick={handleToggle}>Register</button>
            </div>
        </div>
    )
}

export const RegisterForm = ( {handleToggle}: { handleToggle: ()=>void} ) => {
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

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ) => {
        e.preventDefault();
        const { name, value } = e.target;
        dispatch(setRegisterFormData({ name, value }));
    };

    const handleFormReset = () => {
        dispatch(resetRegisterForm());
    };

    const inputs = [
        {type: "text", name: "username", placeholder: "Username", handleInputChange: handleInputChange, value: regEntries.username},
        {type: "text", name: "email", placeholder: "Email", handleInputChange: handleInputChange, value: regEntries.email},
        {type: "text", name: "password", placeholder: "Password", handleInputChange: handleInputChange, value: regEntries.password}
    ]

    const buttons = [
        {name: "Reset Form", onClick: handleFormReset},
        {name: "Submit", onClick: handleRegister}
    ]

    return (
        <div>
            <PostForm inputs={inputs} buttons={buttons}/>
            <div>
                <p>Or maybe...</p>
                <button onClick={handleToggle}>Log in</button>
            </div>
        </div>
    )
}