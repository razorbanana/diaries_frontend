import { useDispatch, useSelector } from "react-redux";
import { EditUserFormInterface } from "../../app/forms/editUserFormSlice";
import { EditPasswordFormState, hideEditPasswordForm, setEditPasswordFormData, updatePassword } from "../../app/forms/editPasswordFormSlice";

export const EditUserForm = ({user, toggleVisibility, handleInputChange, updateUser, handleUserVisibility}: {user: EditUserFormInterface, toggleVisibility: ()=>void, handleInputChange: (e: React.ChangeEvent<HTMLInputElement>)=>void, updateUser: ()=>void, handleUserVisibility: ()=>void}) => {
    return (
        <div>
            <p>Name: <input className="ShortTextInput" type="text" name="name" placeholder="Name" onChange={handleInputChange} value={user.name}/></p>
            <p>Email: <input className="ShortTextInput" type="text" name="email" placeholder="Email" onChange={handleInputChange} value={user.email}/></p>
            <p>Visible: <span className="ToggleSpan" onClick={handleUserVisibility}>{user.visible ? 'True':'False'}</span></p>
            <div className="ButtonsContainer">
                <button onClick={toggleVisibility}>Cancel</button>
                <button onClick={updateUser}>Confirm</button>
            </div>
        </div>
    );
}

export const NewPassportForm = () => {

    const dispatch = useDispatch();
    const { oldPassword, newPassword, confirmPassword } = useSelector((state: {editPasswordForm: EditPasswordFormState}) => state.editPasswordForm.formData);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const { name, value } = e.target;
        dispatch(setEditPasswordFormData({ name, value }));
    }

    const cancelForm = () => {
        dispatch(hideEditPasswordForm())
    }

    const handleConfirmPassword = () => {
        dispatch(updatePassword({oldPassword, newPassword, confirmPassword}))
    }

    return (
        <div>
            <p>Old Password: <input className="ShortTextInput" type="password" name="oldPassword" placeholder="Old Password" onChange={handleInputChange} value={oldPassword}/></p>
            <p>New Password: <input className="ShortTextInput" type="password" name="newPassword" placeholder="New Password" onChange={handleInputChange} value={newPassword}/></p>
            <p>Confirm Password: <input className="ShortTextInput" type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleInputChange} value={confirmPassword}/></p>
            <div className="ButtonsContainer">
                <button onClick={cancelForm}>Cancel</button>
                <button onClick={handleConfirmPassword}>Confirm</button>
            </div>
        </div>
    );
}         

