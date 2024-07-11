import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import { EntryState, fetchEntry } from "../app/entry/entrySlice";

export const EntryPage = () => {
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
    console.log(`entry is ${entry}`)
    console.log(`loading is ${loading}`)
    console.log(`error is ${error}`)

    useEffect(() => {
        console.log("fetching entry")
        dispatch(fetchEntry(id));
    }, [dispatch]);
    
    if (loading || entry === undefined) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    return (
        <div>
            <div>
            {entry.title} 
            <p>{entry.content}</p>
            </div>
        </div>
    );
}
