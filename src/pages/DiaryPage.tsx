import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom"
import { DiaryEntriesState, fetchDiaryEntries, addEntry } from "../app/diaryEntries/diaryEntriesSlice";
import { EntryType } from "../common/types/entryType";
import { resetEntryForm, setEntryFormData, toggleEntryFormVisibility, EntryFormData, EntryFormState } from "../app/forms/entryFormSlice";
import { createEntry } from "../services/entries";
import { ToggleFormButton } from "../components/ToggleButton";
import { delEntry } from "../app/entry/entrySlice";
import moment from "moment";

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
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        e.preventDefault();
        const { name, value } = e.target;
        dispatch(setEntryFormData({ name, value }));
      };
    
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
            {isVisible ? <EntryForm handleInputChange={handleInputChange} handleFormReset={handleFormReset} formData={formData} handleCreatingEntry={handleCreatingEntry}/>: <></>}
            <EntryList entries={entries} handleDeleteEntry={handleDeleteEntry}/>
        </div>
    );
}

const EntryList = ({ entries, handleDeleteEntry }: {entries: EntryType[], handleDeleteEntry: ()=>void}) => {
    return(
        <div className="EntityList">
            {entries.map((entry) => <Entry key={entry.id} entry={entry} handleDeleteEntry={handleDeleteEntry}/>)}
        </div>
    )
}

const Entry = ({ entry, handleDeleteEntry }: {entry: EntryType, handleDeleteEntry:()=>void}) => {
    const navigate = useNavigate()
    return(
        <div className="EntityContainer">
            <div>
            <p className="TitleP">{entry.title}</p> 
            <p className="TimeP">Updated at {moment(entry.updatedAt).format('YYYY-MM-DD HH:mm')}</p>
            <p>{entry.content}</p>
            </div>
            <div className="ButtonsContainer">
                <button onClick={() => {navigate(`/entry/${entry.id}`)}}>Read Entry</button>
                <button onClick={() => {handleDeleteEntry}}>Delete Entry</button>
            </div>
        </div>
    )
}

const EntryForm = ({handleInputChange, handleFormReset, formData, handleCreatingEntry}: {handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void, handleFormReset: ()=>void, formData: EntryFormData, handleCreatingEntry: ()=>void} ) => {
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