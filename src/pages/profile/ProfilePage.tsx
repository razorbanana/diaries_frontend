import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyUser, UserState, delMyUser, setToken } from "../../app/user/userSlice";
import { EditUserFormState, toggleEditUserFormVisibility } from "../../app/forms/editUserFormSlice";
import { useNavigate } from "react-router-dom";
import { EditUserForm, NewPasswordForm } from "./ProfileForms";
import { EditPasswordFormState, toggleEditPasswordFormVisibility } from "../../app/forms/editPasswordFormSlice";

export const ProfilePage = () => {
    const dispatch = useDispatch();
    
    const isVisible = useSelector((state: {editUserForm: EditUserFormState}) => state.editUserForm.isVisible);
    const isPasswordEditFormVisible = useSelector((state: {editPasswordForm: EditPasswordFormState}) => state.editPasswordForm.isVisible);

    useEffect(() => {
        dispatch(fetchMyUser());
    }, [dispatch]);

    

    const toggleVisibility = () => {
        dispatch(toggleEditUserFormVisibility())
    }

    return (
        <div className="Page">
            <h1>Profile</h1>
            {isPasswordEditFormVisible ? <NewPasswordForm /> : isVisible ? <EditUserForm toggleVisibility={toggleVisibility}/> : <UserProperties toggleVisibility={toggleVisibility}/>}
        </div>
    );
}



const UserProperties = ({toggleVisibility}: {toggleVisibility: ()=>void}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state: {user: UserState}) => state.user.user);
    const loading = useSelector((state: {user: UserState}) => state.user.loading);
    const error = useSelector((state: {user: UserState}) => state.user.error);

    const handleTogglePasswordForm = () => {
        dispatch(toggleEditPasswordFormVisibility())
    }

    const handleDeleteUser = () => {
        dispatch(delMyUser()).then(() => {
            dispatch(setToken('undefined'))
            localStorage.setItem('token', 'undefined')  
            navigate("/my-diaries")  
        })
        
    }
    if (loading || user === undefined) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    return (
        <div className="EntityContainer">
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