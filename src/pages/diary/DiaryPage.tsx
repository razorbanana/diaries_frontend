import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import { DiaryEntriesState, fetchDiaryEntries, addEntry } from "../../app/diaryEntries/diaryEntriesSlice";
import { resetEntryForm, toggleEntryFormVisibility, EntryFormState } from "../../app/forms/entryFormSlice";
import { createEntry } from "../../services/entries";
import { ToggleFormButton } from "../../components/ToggleButton";
import { delEntry } from "../../app/entry/entrySlice";
import { EntryForm } from "./DiaryForms";
import { EntryList } from "./EntryList";

export const DiaryPage = () => {
    const { id } = useParams<{id: string}>();
    if (id === undefined) return <p>Diary not found</p>;
    const dispatch = useDispatch();
    const entries = useSelector((state: {diaryEntries: DiaryEntriesState}) =>  state.diaryEntries.entries);
    const loading = useSelector((state: {diaryEntries: DiaryEntriesState}) => state.diaryEntries.loading);
    const error = useSelector((state: {diaryEntries: DiaryEntriesState}) => state.diaryEntries.error);
    const isVisible = useSelector((state: {entryForm: EntryFormState}) => state.entryForm.isVisible);
    const formData = useSelector((state: {entryForm: EntryFormState}) => state.entryForm.formData);

    useEffect(() => {
        dispatch(fetchDiaryEntries(id));
    }, [dispatch]);
    
      const handleFormToggle = () => {
        dispatch(toggleEntryFormVisibility());
      };
    
      const handleFormReset = () => {
        dispatch(resetEntryForm());
      };

      const handleDeleteEntry = () => {
        dispatch(delEntry(id))
    }

      const handleCreatingEntry = async () => {
        const response = await createEntry(id, formData)
        dispatch(addEntry({entry: response}))
        handleFormReset()
    }

    if (loading || entries === undefined) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    return (
        <div className="Page">
            <ToggleFormButton onClick={handleFormToggle}/>
            {isVisible ? <EntryForm handleFormReset={handleFormReset} formData={formData} handleCreatingEntry={handleCreatingEntry}/>: <></>}
            <EntryList entries={entries} handleDeleteEntry={handleDeleteEntry}/>
        </div>
    );
}



