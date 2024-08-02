import { useDispatch, useSelector } from "react-redux";
import { EntryFormState, resetEntryForm, setEntryFormData } from "../../app/diaryEntries/entryFormSlice";
import {setEditEntryFormData, resetEditEntryForm, EditEntryFormInterface} from "../../app/diaryEntries/editEntryFormSlice";
import {updateMyEntry} from "../../app/entry/entrySlice";
import {PostForm} from "../../components/PostForm";
import { addEntry } from "../../app/diaryEntries/diaryEntriesSlice";
import { createEntry } from "../../services/entries";
import { handleInputChangeEventType } from "../../common/types/handleInputChangeTypeEvent";

export const EntryForm = ({diaryId}: {diaryId: string} ) => {
    const formData = useSelector((state: {entryForm: EntryFormState}) => state.entryForm.formData);
    const dispatch = useDispatch();

    const handleFormReset = () => {
        dispatch(resetEntryForm());
      };

    const handleCreatingEntry = async () => {
        const response = await createEntry(diaryId, formData)
        dispatch(addEntry({entry: response}))
        handleFormReset()
    }
    
    const handleInputChange = (e: handleInputChangeEventType) => {
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
    const handleEditDiaryFormInputChange = (e: handleInputChangeEventType) => {
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