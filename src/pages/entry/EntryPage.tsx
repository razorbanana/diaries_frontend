import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom"
import { delEntry, EntryState, fetchEntry } from "../../app/entry/entrySlice";
import moment from "moment";
import { EntryType } from "../../common/types/entryType";
import { ToggleFormButton } from "../../components/ToggleButton";
import { PostCommentFormState, togglePostCommentFormVisibility } from "../../app/forms/postCommentFormSlice";
import { PostCommentForm } from "./EntryForms";

export const EntryPage = () => {
    const { id } = useParams<{id: string}>();
    if (id === undefined) return <p>Diary not found</p>;
    const dispatch = useDispatch();
    const entry = useSelector((state: {entry: EntryState}) => state.entry.entry);
    const loading = useSelector((state: {entry: EntryState}) => state.entry.loading);
    const error = useSelector((state: {entry: EntryState}) => state.entry.error);

    useEffect(() => {
        dispatch(fetchEntry(id));
    }, [dispatch]);

    if (loading || entry === undefined) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    
    return (
        <Entry entry={entry}/>
    )
}

const Entry = ({entry} : {entry: EntryType}) => {
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const postCommentFormVisibility = useSelector((state: {postCommentForm: PostCommentFormState}) => state.postCommentForm.isVisible);

    const handleDelete = () => {
        dispatch(delEntry(entry.id))
        navigate("/my-diaries")
    }

    const handleFormToggle = () => {
        dispatch(togglePostCommentFormVisibility())
    }

    return (
        <div className="Page">
            <div className="EntityContainer">
                <div>
                    <p className="TitleP">{entry.title}</p>
                    <p className="TimeP">Updated at {moment(entry.updatedAt).format('YYYY-MM-DD HH:mm')}</p>
                    <p className="ContentP">{entry.content}</p>
                </div>
                <div className="ButtonsContainer">
                    <button onClick={handleDelete}>Delete Entry</button>
                </div>
            </div>
            <ToggleFormButton onClick={handleFormToggle}/>
            {postCommentFormVisibility?<PostCommentForm entryId={entry.id}/>:<></>}
        </div>
    );
}