import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom"
import { DiaryEntriesState, fetchDiaryEntries, addEntry } from "../../app/diaryEntries/diaryEntriesSlice";
import { EntryType } from "../../common/types/entryType";
import { resetEntryForm, toggleEntryFormVisibility, EntryFormState } from "../../app/forms/entryFormSlice";
import { createEntry } from "../../services/entries";
import { ToggleFormButton } from "../../components/ToggleButton";
import { delEntry } from "../../app/entry/entrySlice";
import moment from "moment";
import { EditEntryForm, EntryForm } from "./DiaryForms";
import { EditEntryFormState, getEditEntryFormData } from "../../app/forms/editEntryFormSlice";

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

const EntryList = ({ entries, handleDeleteEntry }: {entries: EntryType[], handleDeleteEntry: ()=>void}) => {
    const editEntryFormData = useSelector((state: {editEntryForm: EditEntryFormState}) => state.editEntryForm.formData);

    return(
        <div className="EntityList">
            {entries.map((entry) => editEntryFormData.id !== entry.id ?<Entry key={entry.id} entry={entry} handleDeleteEntry={handleDeleteEntry}/> : <EditEntryForm key={entry.id} editEntryFormData={editEntryFormData}/>)}
        </div>
    )
}

const Entry = ({ entry, handleDeleteEntry }: {entry: EntryType, handleDeleteEntry:()=>void}) => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    return(
        <div className="EntityContainer">
            <div>
            <p className="TitleP">{entry.title}</p> 
            <p className="TimeP">Updated at {moment(entry.updatedAt).format('YYYY-MM-DD HH:mm')}</p>
            <p>{entry.content}</p>
            </div>
            <div className="ButtonsContainer">
                <button onClick={() => {navigate(`/entry/${entry.id}`)}}>Read Entry</button>
                <button onClick={() => {dispatch(getEditEntryFormData(entry))}}>Update Diary</button>
                <button onClick={() => {handleDeleteEntry}}>Delete Entry</button>
            </div>
        </div>
    )
}

