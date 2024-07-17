import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom"
import { delEntry, EntryState, fetchEntry } from "../app/entry/entrySlice";
import moment from "moment";

export const EntryPage = () => {
    const navigate = useNavigate();
    const { id } = useParams<{id: string}>();
    const dispatch = useDispatch();
    const entry = useSelector((state: {entry: EntryState}) => state.entry.entry);
    const loading = useSelector((state: {entry: EntryState}) => state.entry.loading);
    const error = useSelector((state: {entry: EntryState}) => state.entry.error);

    useEffect(() => {
        dispatch(fetchEntry(id));
    }, [dispatch]);
    
    const handleDelete = () => {
        dispatch(delEntry(id))
        navigate("/my-diaries")
    }

    if (loading || entry === undefined) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    return (
        <div className="Page">
            <div className="EntityContainer">
                <div>
                    <p className="TitleP">{entry.title}</p>
                    <p className="TimeP">Updated at {moment(entry.updatedAt).format('YYYY-MM-DD HH:mm')}</p>
                    <p>{entry.content}</p>
                </div>
                <div className="ButtonsContainer">
                    <button onClick={handleDelete}>Delete Entry</button>
                </div>
            </div>
        </div>
    );
}
