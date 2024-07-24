import { useDispatch } from "react-redux";
import { EntryFormData, setEntryFormData } from "../../app/forms/entryFormSlice";
import {setEditEntryFormData, getEditEntryFormData, resetEditEntryForm, EditEntryFormInterface} from "../../app/forms/editEntryFormSlice";
import {updateMyEntry} from "../../app/entry/entrySlice";

export const EntryForm = ({handleFormReset, formData, handleCreatingEntry}: {handleFormReset: ()=>void, formData: EntryFormData, handleCreatingEntry: ()=>void} ) => {
    
    const dispatch = useDispatch();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        e.preventDefault();
        const { name, value } = e.target;
        dispatch(setEntryFormData({ name, value }));
      };

    return (
        <div className="FormContainer">
            <div className="InputContainer">
                <input type="text" name="title" placeholder="Title" onChange={handleInputChange} value={formData.title}/>
            </div>
            <div className="InputContainer">
                <textarea className="LongTextInput" name="content" placeholder="Content" onChange={handleInputChange} value={formData.content}/>
            </div>
            <div className="ButtonsContainer">
                <button onClick={handleFormReset}>Reset Form</button>
                <button onClick={handleCreatingEntry}>Submit</button>
            </div>
        </div>
    )
}

export const EditEntryForm = ({editEntryFormData}:{editEntryFormData: EditEntryFormInterface}) => {
    const dispatch = useDispatch();
    const handleEditDiaryFormInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        e.preventDefault();
        const { name, value } = e.target;
        dispatch(setEditEntryFormData({ name, value }));
    }

    const handleConfirmEdit = () => {
        dispatch(updateMyEntry(editEntryFormData)).then(() => {
            dispatch(resetEditEntryForm());
        })
    }

    return  (
        <div className="EntityContainer">
            <div>
            <p>New title:</p>
            <p><input className="ShortTextInput" type="text" name="title" placeholder="Title" onChange={handleEditDiaryFormInputChange} value={editEntryFormData.title}/></p>
            <p>New content:</p>
            <p><textarea className="LongTextInput" name="content" placeholder="Content" onChange={handleEditDiaryFormInputChange} value={editEntryFormData.content}/></p>
            </div>
            <div className="ButtonsContainer">
                <button onClick={() => {dispatch(resetEditEntryForm())}}>Cancel</button>
                
                <button onClick={handleConfirmEdit}>Accept</button>
            </div>
        </div>
    )
}