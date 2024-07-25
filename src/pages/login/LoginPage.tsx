import { LoginFormState, resetLoginForm, toggleLoginForm } from "../../app/forms/loginFormSlice";
import { useDispatch, useSelector } from "react-redux";
import { resetRegisterForm, toggleRegisterForm } from "../../app/forms/registerFormSlice";
import { LoginForm, RegisterForm } from "./LoginForms";

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


