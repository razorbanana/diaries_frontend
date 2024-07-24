import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { EntryType } from "../../common/types/entryType";
import moment from "moment";
import { EditEntryFormState, getEditEntryFormData } from "../../app/forms/editEntryFormSlice";
import { EditEntryForm } from "./DiaryForms";

export const EntryList = ({ entries, handleDeleteEntry }: {entries: EntryType[], handleDeleteEntry: ()=>void}) => {
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
            <p>{entry.content.length > 50 ? entry.content.slice(0,50)+'...': entry.content}</p>
            </div>
            <div className="ButtonsContainer">
                <button onClick={() => {navigate(`/entry/${entry.id}`)}}>Read Entry</button>
                <button onClick={() => {dispatch(getEditEntryFormData(entry))}}>Update Diary</button>
                <button onClick={() => {handleDeleteEntry}}>Delete Entry</button>
            </div>
        </div>
    )
}