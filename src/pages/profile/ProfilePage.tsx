import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyUser, UserState, updateMyUser, delMyUser, setToken } from "../../app/user/userSlice";
import { EditUserFormState, setEditUserFormData, toggleEditUserFormVisibility, toggleUserVisibility } from "../../app/forms/editUserFormSlice";
import { useNavigate } from "react-router-dom";
import { UserType } from "../../common/types/userType";
import { EditUserForm, NewPassportForm } from "./ProfileForms";
import { EditPasswordFormState, toggleEditPasswordFormVisibility } from "../../app/forms/editPasswordFormSlice";

export const ProfilePage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state: {user: UserState}) => state.user.user);
    const loading = useSelector((state: {user: UserState}) => state.user.loading);
    const error = useSelector((state: {user: UserState}) => state.user.error);
    const isVisible = useSelector((state: {editUserForm: EditUserFormState}) => state.editUserForm.isVisible);
    const formData = useSelector((state: {editUserForm: EditUserFormState}) => state.editUserForm.formData);
    const isPasswordEditFormVisible = useSelector((state: {editPasswordForm: EditPasswordFormState}) => state.editPasswordForm.isVisible);

    useEffect(() => {
        dispatch(fetchMyUser());
    }, [dispatch]);

    if (loading || user === undefined) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    const toggleVisibility = () => {
        dispatch(toggleEditUserFormVisibility())
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const { name, value } = e.target;
        dispatch(setEditUserFormData({ name, value }));
    }

    const handleUserVisibility = () => {
        dispatch(toggleUserVisibility())
    }

    const handleDeleteUser = () => {
        dispatch(delMyUser()).then(() => {
            dispatch(setToken('undefined'))
            localStorage.setItem('token', 'undefined')  
            navigate("/my-diaries")  
        })
        
    }

    const updateUser = () => {
        dispatch(updateMyUser(formData)).then(() => {
            toggleVisibility()
            dispatch(fetchMyUser());
        })
        
    }

    return (
        <div className="Page">
            <h1>Profile</h1>
            <div className="EntityContainer">
                {isPasswordEditFormVisible ? <NewPassportForm /> : isVisible ? <EditUserForm user={formData} toggleVisibility={toggleVisibility} handleInputChange={handleInputChange} updateUser={updateUser} handleUserVisibility={handleUserVisibility}/> : <UserProperties user={user} toggleVisibility={toggleVisibility} handleDeleteUser={handleDeleteUser} />}
            </div>
        </div>
    );
}



const UserProperties = ({user, toggleVisibility, handleDeleteUser}: {user: UserType, toggleVisibility: ()=>void, handleDeleteUser:()=>void}) => {
    const dispatch = useDispatch();

    const handleTogglePasswordForm = () => {
        dispatch(toggleEditPasswordFormVisibility())
    }

    return (
        <div>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>Created at: {user.createdAt.toString()}</p>
            <p>Updated at: {user.createdAt.toString()}</p>
            <p>Visible: {user.visible ? 'True':'False'}  </p>
            <div className="ButtonsContainer">
                <button onClick={toggleVisibility}>Edit User</button>
                <button onClick={handleTogglePasswordForm}>Change Password</button>
                <button onClick={handleDeleteUser}>Delete User</button>
            </div>
        </div>
    );
}