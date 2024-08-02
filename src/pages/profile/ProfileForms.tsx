import { useDispatch, useSelector } from "react-redux";
import { EditUserFormState, setEditUserFormData, toggleUserVisibility } from "../../app/user/editUserFormSlice";
import { EditPasswordFormState, hideEditPasswordForm, setEditPasswordFormData, updatePassword } from "../../app/user/editPasswordFormSlice";
import { fetchMyUser, updateMyUser } from "../../app/user/userSlice";
import { PostForm } from "../../components/PostForm";
import { handleInputChangeEventType } from "../../common/types/handleInputChangeTypeEvent";

export const EditUserForm = ({toggleVisibility}: {toggleVisibility: ()=>void}) => {
    const dispatch = useDispatch();
    const formData = useSelector((state: {editUserForm: EditUserFormState}) => state.editUserForm.formData);

    const updateUser = () => {
        dispatch(updateMyUser(formData)).then(() => {
            toggleVisibility()
            dispatch(fetchMyUser());
        })
        
    }

    const handleUserVisibility = () => {
        dispatch(toggleUserVisibility())
    }

    const handleInputChange = (e: handleInputChangeEventType ) => {
        e.preventDefault();
        const { name, value } = e.target;
        dispatch(setEditUserFormData({ name, value }));
    }

    const inputs = [
        {type: "text", name: "name", placeholder: "Name", handleInputChange: handleInputChange, value: formData.name},
        {type: "text", name: "email", placeholder: "Email", handleInputChange: handleInputChange, value: formData.email}
    ]

    const buttons = [
        {name: "Cancel", onClick: toggleVisibility},
        {name: "Confirm", onClick: updateUser}
    ]

    const toggles = [
        {name: "Visible", onClick: handleUserVisibility, trueText: 'True', falseText: 'False', value: formData.visible}
    ]

    return (
        <PostForm inputs={inputs} buttons={buttons} toggles={toggles}/>
    );
}

export const NewPasswordForm = () => {

    const dispatch = useDispatch();
    const { oldPassword, newPassword, confirmPassword } = useSelector((state: {editPasswordForm: EditPasswordFormState}) => state.editPasswordForm.formData);

    const handleInputChange = (e: handleInputChangeEventType) => {
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

    const inputs = [
        {type: "password", name: "oldPassword", placeholder: "Old Password", handleInputChange: handleInputChange, value: oldPassword},
        {type: "password", name: "newPassword", placeholder: "New Password", handleInputChange: handleInputChange, value: newPassword},
        {type: "password", name: "confirmPassword", placeholder: "Confirm Password", handleInputChange: handleInputChange, value: confirmPassword}
    ]

    const buttons = [
        {name: "Cancel", onClick: cancelForm},
        {name: "Confirm", onClick: handleConfirmPassword}
    ]

    return (
        <PostForm inputs={inputs} buttons={buttons}/>
    );
}         

