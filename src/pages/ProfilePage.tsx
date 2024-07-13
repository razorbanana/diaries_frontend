import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyUser, UserState, UserInterface, updateMyUser } from "../app/user/userSlice";
import { EditUserFormState, setEditUserFormData, toggleEditUserFormVisibility } from "../app/forms/editUserFormSlice";

export const ProfilePage = () => {
    const dispatch = useDispatch();
    const user = useSelector((state: {user: UserState}) => state.user.user);
    const loading = useSelector((state: {user: UserState}) => state.user.loading);
    const error = useSelector((state: {user: UserState}) => state.user.error);
    const isVisible = useSelector((state: {editUserForm: EditUserFormState}) => state.editUserForm.isVisible);
    const formData = useSelector((state: {editUserForm: EditUserFormState}) => state.editUserForm.formData || {id:'', email:'', name:'', visible:false, createdAt: new Date(), updatedAt: new Date()});

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

    const updateUser = () => {
        dispatch(updateMyUser(formData))
    }

    return (
        <div className="Page">
            <h1>Profile</h1>
            <div className="EntityContainer">
                {isVisible ? <EditUserForm user={formData} toggleVisibility={toggleVisibility} handleInputChange={handleInputChange} updateUser={updateUser}/> : <UserProperties user={user} toggleVisibility={toggleVisibility}/>}
            </div>
        </div>
    );
}

const EditUserForm = ({user, toggleVisibility, handleInputChange, updateUser}: {user: UserInterface, toggleVisibility: ()=>void, handleInputChange: (e: React.ChangeEvent<HTMLInputElement>)=>void, updateUser: ()=>void}) => {
    return (
        <div>
            <p>Name: <input type="text" name="name" placeholder="Name" onChange={handleInputChange} value={user.name}/></p>
            <p>Email: <input type="text" name="email" placeholder="Email" onChange={handleInputChange} value={user.email}/></p>
            <p>Created at: {user.createdAt.toString()}</p>
            <p>Updated at: {user.createdAt.toString()}</p>
            <p>Visible: {user.visible ? 'True':'False'}</p>
            <div className="ButtonsContainer">
                <button onClick={toggleVisibility}>Cancel</button>
                <button onClick={updateUser}>Confirm</button>
            </div>
        </div>
    );
}

const UserProperties = ({user, toggleVisibility}: {user: UserInterface, toggleVisibility: ()=>void}) => {
    return (
        <div>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>Created at: {user.createdAt.toString()}</p>
            <p>Updated at: {user.createdAt.toString()}</p>
            <p>Visible: {user.visible ? 'True':'False'}</p>
            <div className="ButtonsContainer">
                <button onClick={toggleVisibility}>Edit User</button>
                <button onClick={()=>{}}>Delete User</button>
            </div>
        </div>
    );
}