import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"
import { setToken } from "../app/user/userSlice";
import { hideDiaryForm } from "../app/forms/diaryFormSlice";
import { hideEntryForm } from "../app/forms/entryFormSlice";
import { hideEditUserForm } from "../app/forms/editUserFormSlice";
import { ReturnButton } from "../components/ReturnButton";
import { hideEditDiaryForm } from "../app/forms/editDiaryFormSlice";
import { hideEditEntryForm } from "../app/forms/editEntryFormSlice";
import { hideEditPasswordForm } from "../app/forms/editPasswordFormSlice";

export const Topper = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const closeForms = () => {
        dispatch(hideEditDiaryForm())
        dispatch(hideEditEntryForm())
        dispatch(hideEditPasswordForm())
        dispatch(hideDiaryForm())
        dispatch(hideEntryForm())
        dispatch(hideEditUserForm())
    }

    return (
        <div className="Topper">
            <ReturnButton/>
            <TopperButton text="My Diaries" onClickFunction={() => {
                closeForms()
                navigate("/my-diaries")
            }}/>
            <TopperButton text="Home" onClickFunction={() => {
                closeForms()
                navigate("/home")
            }}/>
            <TopperButton text="Profile" onClickFunction={() => {
                closeForms()
                navigate("/profile")
            }}/>
            <TopperButton text="Log Out" onClickFunction={() => {
                console.log("LogOut")
                dispatch(setToken('undefined'))
                closeForms()
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