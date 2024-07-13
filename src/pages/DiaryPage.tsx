import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom"
import { DiaryEntriesState, fetchDiaryEntries, addEntry } from "../app/diaryEntries/diaryEntriesSlice";
import { EntryType } from "../types/entryType";
import { resetForm, setFormData, toggleFormVisibility, FormData, EntryFormState } from "../app/forms/entryFormSlice";
import { createEntry } from "../services/entries";
import { ToggleFormButton } from "../components/ToggleButton";

export const DiaryPage = () => {
    const { id } = useParams<{id: string}>();
    console.log(`id is ${id}`)
    if (id === undefined) return <p>Diary not found</p>;
    const dispatch = useDispatch();
    const entries = useSelector((state: {diaryEntries: DiaryEntriesState}) =>  {return state.diaryEntries.entries});
    const loading = useSelector((state: {diaryEntries: DiaryEntriesState}) => state.diaryEntries.loading);
    const error = useSelector((state: {diaryEntries: DiaryEntriesState}) => state.diaryEntries.error);
    const isVisible = useSelector((state: {entryForm: EntryFormState}) => state.entryForm.isVisible);
    const formData = useSelector((state: {entryForm: EntryFormState}) => state.entryForm.formData);

    useEffect(() => {
        console.log("fetching diary entries")
        dispatch(fetchDiaryEntries(id));
    }, [dispatch]);
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const { name, value } = e.target;
        dispatch(setFormData({ name, value }));
      };
    
      const handleFormToggle = () => {
        dispatch(toggleFormVisibility());
      };
    
      const handleFormReset = () => {
        dispatch(resetForm());
      };

      const handleCreatingEntry = async () => {
        const response = await createEntry(id, formData)
        const newEntry = {
            id: response.id,
            title: response.title,
            content: response.content
        }
        dispatch(addEntry({entry: newEntry}))
        handleFormReset()
    }

    if (loading || entries === undefined) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    return (
        <div className="Page">
            {isVisible ? <EntryForm handleInputChange={handleInputChange} handleFormReset={handleFormReset} formData={formData} handleCreatingEntry={handleCreatingEntry}/>: <></>}
            <ToggleFormButton onClick={handleFormToggle}/>
            <EntryList entries={entries}/>
        </div>
    );
}

const EntryList = ({ entries }: {entries: EntryType[]}) => {
    return(
        <div className="EntityList">
            {entries.map((entry) => <Entry key={entry.id} entry={entry}/>)}
        </div>
    )
}

const Entry = ({ entry }: {entry: EntryType}) => {
    const navigate = useNavigate()
    return(
        <div className="EntityContainer">
            <div>
            {entry.title} 
            <p>{entry.content}</p>
            </div>
            <div className="ButtonsContainer">
                <button onClick={() => {navigate(`/entry/${entry.id}`)}}>Read Entry</button>
            </div>
        </div>
    )
}

const EntryForm = ({handleInputChange, handleFormReset, formData, handleCreatingEntry}: {handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void, handleFormReset: ()=>void, formData: FormData, handleCreatingEntry: ()=>void} ) => {
    return (
        <div className="FormContainer">
            <div className="InputContainer">
                <input type="text" name="title" placeholder="Title" onChange={handleInputChange} value={formData.title}/>
            </div>
            <div className="InputContainer">
                <input type="textarea" name="content" placeholder="Content" onChange={handleInputChange} value={formData.content}/>
            </div>
            <div className="ButtonsContainer">
                <button onClick={handleFormReset}>Reset Form</button>
                <button onClick={handleCreatingEntry}>Submit</button>
            </div>
        </div>
    )
}