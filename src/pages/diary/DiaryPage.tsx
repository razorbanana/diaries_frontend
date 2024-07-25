import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import { fetchDiaryEntries} from "../../app/diaryEntries/diaryEntriesSlice";
import { toggleEntryFormVisibility, EntryFormState } from "../../app/forms/entryFormSlice";
import { ToggleFormButton } from "../../components/ToggleButton";
import { EntryForm } from "./DiaryForms";
import { EntryList } from "./EntryList";

export const DiaryPage = () => {
    const { id } = useParams<{id: string}>();
    if (id === undefined) return <p>Diary not found</p>;
    const dispatch = useDispatch();
    
    const isVisible = useSelector((state: {entryForm: EntryFormState}) => state.entryForm.isVisible);

    useEffect(() => {
        dispatch(fetchDiaryEntries(id));
    }, [dispatch]);
    
      const handleFormToggle = () => {
        dispatch(toggleEntryFormVisibility());
      };
         
    return (
        <div className="Page">
            <ToggleFormButton onClick={handleFormToggle}/>
            {isVisible ? <EntryForm diaryId={id}/>: <></>}
            <EntryList />
        </div>
    );
}



