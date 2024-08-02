import moment from "moment"
import { CommentsState, fetchComments } from "../../app/comments/commentsSlice"
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { CommentType } from "../../common/types/CommentType";

export const CommentList = ({entryId} : {entryId: string}) => {
    const dispatch = useDispatch();
    const comments = useSelector((state: {comments: CommentsState}) => state.comments.comments);

    useEffect(() => {
        dispatch(fetchComments(entryId));
    }, [dispatch])

    return (
        <div className="EntityList">
            {comments.map((comment) => <Comment key={comment.id} comment={comment}/>)}
        </div>
    )
}

const Comment = ({comment} : {comment: CommentType}) => {
    return (
        <div key={comment.id} className="EntityContainer">
            <p className="TitleP">{comment.content}</p>
            <p className="TimeP">Updated at {moment(comment.updatedAt).format('YYYY-MM-DD HH:mm')}</p>
        </div>
    )
}
    