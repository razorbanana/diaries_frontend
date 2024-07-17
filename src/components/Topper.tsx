import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"
import { setToken } from "../app/user/userSlice";
import { hideDiaryForm } from "../app/forms/diaryFormSlice";
import { hideEntryForm } from "../app/forms/entryFormSlice";
import { hideEditUserForm } from "../app/forms/editUserFormSlice";
import { ReturnButton } from "../components/ReturnButton";

export const Topper = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    return (
        <div className="Topper">
            <ReturnButton/>
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
                dispatch(setToken('undefined'))
                dispatch(hideDiaryForm())
                dispatch(hideEntryForm())
                dispatch(hideEditUserForm())
                localStorage.setItem('token', 'undefined')  
                navigate("/my-diaries")  
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