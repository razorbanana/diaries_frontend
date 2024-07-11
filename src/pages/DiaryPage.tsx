import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import { DiaryEntriesState, fetchDiaryEntries } from "../app/diary/diaryEntriesSlice";
import { EntryType } from "../types/entryType";

export const DiaryPage = () => {
    const { id } = useParams<{id: string}>();
    console.log(`id is ${id}`)
    const dispatch = useDispatch();
    const entries = useSelector((state: {diaryEntries: DiaryEntriesState}) =>  {
        console.log(`state in DiaryPage`)
        console.log(state)
        return state.diaryEntries.entries || [];
    });
    const loading = useSelector((state: {diaryEntries: DiaryEntriesState}) => state.diaryEntries.loading);
    const error = useSelector((state: {diaryEntries: DiaryEntriesState}) => state.diaryEntries.error);
    console.log(`entries are ${entries}`)
    console.log(`loading is ${loading}`)
    console.log(`error is ${error}`)

    useEffect(() => {
        console.log("fetching diary entries")
        dispatch(fetchDiaryEntries(id));
    }, [dispatch]);
    
    if (loading || entries === undefined) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    return (
        <div>
            {entries.map((entry) => <Entry key={entry.id} entry={entry}/>)}
        </div>
    );
}

const Entry = ({ entry }: {entry: EntryType}) => {
    return(
        <div>
            <div>
            {entry.title} 
            <p>{entry.content}</p>
            </div>
        </div>
    )
}