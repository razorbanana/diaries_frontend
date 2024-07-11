import { setStateType } from "../types/setStateType";
import { useNavigate } from "react-router-dom"

export const Topper = ({setToken} : setStateType) => {
    const navigate = useNavigate()
    return (
        <div>
            <h1>Topper</h1>
            <TopperButton text="My Diaries" onClickFunction={() => {
                navigate("/my-diaries")
            }}/>
            <TopperButton text="Home" onClickFunction={() => {
                navigate("/home")
            }}/>
            <TopperButton text="Profile" onClickFunction={() => {
                navigate("/profile")
            }}/>
            <TopperButton text="Log Out" onClickFunction={() => {
                console.log("LogOut")
                setToken("undefined")
                localStorage.setItem('token', 'undefined')    
            }}/>
        </div>
    );
}

type TopperButtonProps = {text: String, onClickFunction: React.MouseEventHandler<HTMLButtonElement>}

const TopperButton = ({text, onClickFunction} : TopperButtonProps) => {
    return (
        <button onClick={onClickFunction}>{text}</button>
    );
}