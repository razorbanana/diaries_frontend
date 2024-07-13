import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom"
import { delEntry, EntryState, fetchEntry } from "../app/entry/entrySlice";

export const EntryPage = () => {
    const navigate = useNavigate();
    const { id } = useParams<{id: string}>();
    console.log(`id is ${id}`)
    const dispatch = useDispatch();
    const entry = useSelector((state: {entry: EntryState}) =>  {
        console.log(`state in DiaryPage`)
        console.log(state)
        return state.entry.entry;
    });
    const loading = useSelector((state: {entry: EntryState}) => state.entry.loading);
    const error = useSelector((state: {entry: EntryState}) => state.entry.error);

    useEffect(() => {
        console.log("fetching entry")
        dispatch(fetchEntry(id));
    }, [dispatch]);
    
    const handleDelete = () => {
        console.log(`deleting entry ${id}`)
        dispatch(delEntry(id))
        navigate("/my-diaries")
    }

    if (loading || entry === undefined) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    return (
        <div className="Page">
            <div className="EntityContainer">
                <div>
                    {entry.title} 
                    <p>{entry.content}</p>
                </div>
                <div className="ButtonsContainer">
                    <button onClick={handleDelete}>Delete Entry</button>
                </div>
            </div>
        </div>
    );
}
