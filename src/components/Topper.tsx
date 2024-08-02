import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"
import { setToken } from "../app/user/userSlice";
import { hideDiaryForm } from "../app/diaries/diaryFormSlice";
import { hideEntryForm } from "../app/diaryEntries/entryFormSlice";
import { hideEditUserForm } from "../app/user/editUserFormSlice";
import { ReturnButton } from "../components/ReturnButton";
import { hideEditDiaryForm } from "../app/diaries/editDiaryFormSlice";
import { hideEditEntryForm } from "../app/diaryEntries/editEntryFormSlice";
import { hideEditPasswordForm } from "../app/user/editPasswordFormSlice";
import { resetFilter } from "../app/filter/filterSlice";

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
        dispatch(resetFilter())
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