import { useDispatch, useSelector } from "react-redux";
import { PostCommentFormState, resetPostCommentForm, setPostCommentFormData, togglePostCommentFormVisibility } from "../../app/comments/postCommentFormSlice";
import { PostForm } from "../../components/PostForm"
import { handleInputChangeEventType } from "../../common/types/handleInputChangeTypeEvent";
import {createComment } from "../../services/comments";
import { addComment, updateComment } from "../../app/comments/commentsSlice";
import { EditCommentFormInterface, resetEditCommentForm, setEditCommentFormData } from "../../app/comments/editCommentFormSlice";

export const PostCommentForm = ({entryId}:{entryId:string}) => {

    const dispatch = useDispatch()

    const formData = useSelector((state: {postCommentForm: PostCommentFormState}) => state.postCommentForm.formData);

    const handleInputChange = (e: handleInputChangeEventType) => {
        e.preventDefault();
        const { name, value } = e.target;
        dispatch(setPostCommentFormData({ name, value }));
    }

    const handleCreatingComment = async () => {
        const response = await createComment(entryId, formData)
        dispatch(addComment({comment: response}))
        dispatch(resetPostCommentForm())
    }

    const inputs = [
        {type: "textarea", placeholder:"Comment", name: "content", handleInputChange: handleInputChange, value: formData.content},
    ]

    const buttons = [
        {name: 'Cancel', onClick: () => {dispatch(togglePostCommentFormVisibility())}},
        {name: 'Clear', onClick: () => {dispatch(resetPostCommentForm())}},
        {name: 'Submit', onClick: handleCreatingComment}
    ]

    return (
        <PostForm inputs={inputs} buttons={buttons}/>
    )
}

export const EditCommentForm = ({editCommentFormData}:{editCommentFormData: EditCommentFormInterface}) => {
    const dispatch = useDispatch();
    const handleInputChange = (e: handleInputChangeEventType) => {
        e.preventDefault();
        const { name, value } = e.target;
        dispatch(setEditCommentFormData({ name, value }));
    }

    const handleConfirmEdit = () => {
        dispatch(updateComment(editCommentFormData)).then(() => {
            dispatch(resetEditCommentForm());
        })
    }

    const handleResetForm = () => {dispatch(resetEditCommentForm())}

    const inputs = [
        {type: "textarea", placeholder:"New Content", name: "content", handleInputChange: handleInputChange, value: editCommentFormData.content}
    ]

    const buttons = [
        {name: "Cancel", onClick: handleResetForm},
        {name: "Accept", onClick: handleConfirmEdit}
    ]

    return  (
        <PostForm inputs={inputs} buttons={buttons}/>
    )
}