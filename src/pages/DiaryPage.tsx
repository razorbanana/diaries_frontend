import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom"
import { DiaryEntriesState, fetchDiaryEntries, addEntry } from "../app/diaryEntries/diaryEntriesSlice";
import { EntryType } from "../types/entryType";
import { resetForm, setFormData, toggleFormVisibility, FormData, EntryFormState } from "../app/forms/entryFormSlice";
import { createEntry } from "../services/entries";

export const DiaryPage = () => {
    const { id } = useParams<{id: string}>();
    console.log(`id is ${id}`)
    if (id === undefined) return <p>Diary not found</p>;
    const dispatch = useDispatch();
    const entries = useSelector((state: {diaryEntries: DiaryEntriesState}) =>  {
        console.log(`state in DiaryPage`)
        console.log(state)
        return state.diaryEntries.entries || [];
    });
    const loading = useSelector((state: {diaryEntries: DiaryEntriesState}) => state.diaryEntries.loading);
    const error = useSelector((state: {diaryEntries: DiaryEntriesState}) => state.diaryEntries.error);
    const isVisible = useSelector((state: {entryForm: EntryFormState}) => state.entryForm.isVisible);
    const formData = useSelector((state: {entryForm: EntryFormState}) => state.entryForm.formData || {title:'', content:''});
    console.log(`entries are ${entries}`)
    console.log(`loading is ${loading}`)
    console.log(`error is ${error}`)
    console.log(`formData is`)
    console.log(formData)

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
        console.log(`CREATION RESPONSE`)
        console.log(response)
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
        <div>
            {isVisible ? <EntryForm handleInputChange={handleInputChange} handleFormReset={handleFormReset} formData={formData} handleCreatingEntry={handleCreatingEntry}/>: <></>}
            <ToggleFormButton onClick={handleFormToggle}/>
            {entries.map((entry) => <Entry key={entry.id} entry={entry}/>)}
        </div>
    );
}

const Entry = ({ entry }: {entry: EntryType}) => {
    const navigate = useNavigate()
    return(
        <div>
            <div>
            {entry.title} 
            <p>{entry.content}</p>
            </div>
            <button onClick={() => {navigate(`/entry/${entry.id}`)}}>Read Entry</button>
        </div>
    )
}

const ToggleFormButton = ({onClick}: {onClick: () => void}) => {
    return(
        <button onClick={onClick}>Toggle form</button>
    )
}

const EntryForm = ({handleInputChange, handleFormReset, formData, handleCreatingEntry}: {handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void, handleFormReset: ()=>void, formData: FormData, handleCreatingEntry: ()=>void} ) => {
    return (
        <div>
            <input type="text" name="title" placeholder="Title" onChange={handleInputChange} value={formData.title}/>
            <input type="text" name="content" placeholder="Content" onChange={handleInputChange} value={formData.content}/>
            <button onClick={handleFormReset}>Reset Form</button>
            <button onClick={handleCreatingEntry}>Submit</button>
        </div>
    )
}