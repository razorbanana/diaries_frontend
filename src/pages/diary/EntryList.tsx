import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { EntryType } from "../../common/types/entryType";
import moment from "moment";
import { EditEntryFormState, getEditEntryFormData } from "../../app/forms/editEntryFormSlice";
import { EditEntryForm } from "./DiaryForms";
import { delEntry } from "../../app/entry/entrySlice";
import { DiaryEntriesState } from "../../app/diaryEntries/diaryEntriesSlice";
import { FilterInput } from "../../components/FilterInput";
import { FilterState, resetFilter } from "../../app/filter/filterSlice";

export const EntryList = () => {
    const editEntryFormData = useSelector((state: {editEntryForm: EditEntryFormState}) => state.editEntryForm.formData);
    const entries = useSelector((state: {diaryEntries: DiaryEntriesState}) =>  state.diaryEntries.entries);
    const loading = useSelector((state: {diaryEntries: DiaryEntriesState}) => state.diaryEntries.loading);
    const error = useSelector((state: {diaryEntries: DiaryEntriesState}) => state.diaryEntries.error);
    const filterValue = useSelector((state: {filter: FilterState}) => state.filter.value);
    const filterType = useSelector((state: {filter: FilterState}) => state.filter.type);

    const filteredEntries = entries?.filter((entry) => {
        if (filterType === 'title') {
            return entry.title.toLowerCase().includes(filterValue.toLowerCase());
        }
        if (filterType === 'content') {
            return entry.content.toLowerCase().includes(filterValue.toLowerCase());
        }
        if (filterType === 'date') {
            return moment(entry.updatedAt).format('YYYY-MM-DD').includes(filterValue);
        }
        return true;
    })
    
    if (loading || entries === undefined) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    return(
            <div className="EntityList">
                <FilterInput types={['title', 'content', 'date']}/>
                {filteredEntries.map((entry) => editEntryFormData.id !== entry.id ?<Entry key={entry.id} entry={entry}/> : <EditEntryForm key={entry.id} editEntryFormData={editEntryFormData}/>)}
            </div>
    )
}

const Entry = ({ entry }: {entry: EntryType}) => {
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const handleReadEntry = () => {
        navigate(`/entry/${entry.id}`)
        dispatch(resetFilter())
    }

    return(
        <div className="EntityContainer">
            <div>
            <p className="TitleP">{entry.title}</p> 
            <p className="TimeP">Updated at {moment(entry.updatedAt).format('YYYY-MM-DD HH:mm')}</p>
            <p>{entry.content.length > 50 ? entry.content.slice(0,50)+'...': entry.content}</p>
            </div>
            <div className="ButtonsContainer">
                <button onClick={handleReadEntry}>Read Entry</button>
                <button onClick={() => {dispatch(getEditEntryFormData(entry))}}>Update Diary</button>
                <button onClick={() => dispatch(delEntry(entry.id))}>Delete Entry</button>
            </div>
        </div>
    )
}