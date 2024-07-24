import { useDispatch } from "react-redux";
import { EntryFormData, setEntryFormData } from "../../app/forms/entryFormSlice";
import {setEditEntryFormData, resetEditEntryForm, EditEntryFormInterface} from "../../app/forms/editEntryFormSlice";
import {updateMyEntry} from "../../app/entry/entrySlice";
import {PostForm} from "../../components/PostForm";

export const EntryForm = ({handleFormReset, formData, handleCreatingEntry}: {handleFormReset: ()=>void, formData: EntryFormData, handleCreatingEntry: ()=>void} ) => {
    
    const dispatch = useDispatch();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        e.preventDefault();
        const { name, value } = e.target;
        dispatch(setEntryFormData({ name, value }));
    };

    const inputs = [
        {type: "text", placeholder:"Title", name: "title", handleInputChange: handleInputChange, value: formData.title},
        {type: "textarea", placeholder:"Content", name: "content", handleInputChange: handleInputChange, value: formData.content}
    ]

    const buttons = [
        {name: "Reset Form", onClick: handleFormReset},
        {name: "Submit", onClick: handleCreatingEntry}
    ]

    return (
        <PostForm inputs={inputs} buttons={buttons}/>
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

    const handleResetForm = () => {dispatch(resetEditEntryForm())}

    const inputs = [
        {type: "text", placeholder:"New Title", name: "title", handleInputChange: handleEditDiaryFormInputChange, value: editEntryFormData.title},
        {type: "textarea", placeholder:"New Content", name: "content", handleInputChange: handleEditDiaryFormInputChange, value: editEntryFormData.content}
    ]

    const buttons = [
        {name: "Cancel", onClick: handleResetForm},
        {name: "Accept", onClick: handleConfirmEdit}
    ]

    return  (
        <PostForm inputs={inputs} buttons={buttons}/>
    )
}