import moment from "moment"
import { CommentsState, delComment, fetchComments } from "../../app/comments/commentsSlice"
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { CommentType } from "../../common/types/CommentType";
import { EditCommentFormState, getEditCommentFormData } from "../../app/comments/editCommentFormSlice";
import { EditCommentForm } from "./EntryForms";


export const CommentList = ({entryId} : {entryId: string}) => {
    const dispatch = useDispatch();
    const comments = useSelector((state: {comments: CommentsState}) => state.comments.comments);
    const editedComment = useSelector((state: {editCommentForm: EditCommentFormState}) => state.editCommentForm.formData);

    useEffect(() => {
        dispatch(fetchComments(entryId));
    }, [dispatch])

    return (
        <div className="EntityList">
            {comments.map((comment) => comment.id === editedComment.id? <EditCommentForm editCommentFormData={editedComment}/>: <Comment key={comment.id} comment={comment}/>)}
        </div>
    )
}

const Comment = ({comment} : {comment: CommentType}) => {
    const dispatch = useDispatch();
    return (
        <div key={comment.id} className="EntityContainer">
            <p className="TitleP">{comment.content}</p>
            <p className="TimeP">Updated at {moment(comment.updatedAt).format('YYYY-MM-DD HH:mm')}</p>
            <div className="ButtonsContainer">
                <button onClick={() => dispatch(getEditCommentFormData(comment))}>Update Comment</button>
                <button onClick={() => dispatch(delComment(comment.id))}>Delete Comment</button>
            </div>
        </div>
    )
}
    