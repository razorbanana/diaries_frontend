import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyUser, UserState, UserInterface, updateMyUser, delMyUser, setToken } from "../app/user/userSlice";
import { EditUserFormInterface, EditUserFormState, setEditUserFormData, toggleEditUserFormVisibility, toggleUserVisibility } from "../app/forms/editUserFormSlice";
import { useNavigate } from "react-router-dom";

export const ProfilePage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state: {user: UserState}) => state.user.user);
    const loading = useSelector((state: {user: UserState}) => state.user.loading);
    const error = useSelector((state: {user: UserState}) => state.user.error);
    const isVisible = useSelector((state: {editUserForm: EditUserFormState}) => state.editUserForm.isVisible);
    const formData = useSelector((state: {editUserForm: EditUserFormState}) => state.editUserForm.formData);

    useEffect(() => {
        console.log("fetching profile")
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
                {isVisible ? <EditUserForm user={formData} toggleVisibility={toggleVisibility} handleInputChange={handleInputChange} updateUser={updateUser} handleUserVisibility={handleUserVisibility}/> : <UserProperties user={user} toggleVisibility={toggleVisibility} handleDeleteUser={handleDeleteUser} />}
            </div>
        </div>
    );
}

const EditUserForm = ({user, toggleVisibility, handleInputChange, updateUser, handleUserVisibility}: {user: EditUserFormInterface, toggleVisibility: ()=>void, handleInputChange: (e: React.ChangeEvent<HTMLInputElement>)=>void, updateUser: ()=>void, handleUserVisibility: ()=>void}) => {
    return (
        <div>
            <p>Name: <input type="text" name="name" placeholder="Name" onChange={handleInputChange} value={user.name}/></p>
            <p>Email: <input type="text" name="email" placeholder="Email" onChange={handleInputChange} value={user.email}/></p>
            <p>Visible: <span className="ToggleSpan" onClick={handleUserVisibility}>{user.visible ? 'True':'False'}</span></p>
            <div className="ButtonsContainer">
                <button onClick={toggleVisibility}>Cancel</button>
                <button onClick={updateUser}>Confirm</button>
            </div>
        </div>
    );
}

const UserProperties = ({user, toggleVisibility, handleDeleteUser}: {user: UserInterface, toggleVisibility: ()=>void, handleDeleteUser:()=>void}) => {
    return (
        <div>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>Created at: {user.createdAt.toString()}</p>
            <p>Updated at: {user.createdAt.toString()}</p>
            <p>Visible: {user.visible ? 'True':'False'}  </p>
            <div className="ButtonsContainer">
                <button onClick={toggleVisibility}>Edit User</button>
                <button onClick={handleDeleteUser}>Delete User</button>
            </div>
        </div>
    );
}