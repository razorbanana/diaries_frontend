import { useDispatch, useSelector } from "react-redux";
import { EditDiaryFormInterface, resetEditDiaryForm, setEditDiaryFormData} from "../../app/forms/editDiaryFormSlice";
import { addDiary, updateMyDiary } from "../../app/diaries/diariesSlice";
import { DiaryFormState, resetDiaryForm, setDiaryFormData } from "../../app/forms/diaryFormSlice";
import { createDiary } from "../../services/diaries";
import { PostForm } from "../../components/PostForm";

export const EditDiaryForm = ({editDiaryFormData}:{editDiaryFormData: EditDiaryFormInterface}) => {
    const dispatch = useDispatch();
    const handleEditDiaryFormInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        e.preventDefault();
        const { name, value } = e.target;
        dispatch(setEditDiaryFormData({ name, value }));
    }

    const handleConfirmEdit = () => {
        dispatch(updateMyDiary(editDiaryFormData)).then(() => {
            dispatch(resetEditDiaryForm());
        })
    }

    const inputs = [
        {type: "text", placeholder:"New Title", name: "title", handleInputChange: handleEditDiaryFormInputChange, value: editDiaryFormData.title},
        {type: "textarea", placeholder:"New Description", name: "description", handleInputChange: handleEditDiaryFormInputChange, value: editDiaryFormData.description}
    ]

    const buttons = [
        {name: "Cancel", onClick: ()=>{dispatch(resetEditDiaryForm())}},
        {name: "Accept", onClick: handleConfirmEdit}
    ]

    return  (
        <PostForm inputs={inputs} buttons={buttons}/>
    )
}

export const DiaryForm = ({}) => {
    const dispatch = useDispatch();
    const formData = useSelector((state: {diaryForm: DiaryFormState}) => state.diaryForm.formData);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        e.preventDefault();
        const { name, value } = e.target;
        dispatch(setDiaryFormData({ name, value }));
    }

    const handleFormReset = () => {
        dispatch(resetDiaryForm());
    }

    const handleCreatingEntry = async () => {
        const response = await createDiary(formData)
        console.log(`CREATION RESPONSE`)
        console.log(response)
        dispatch(addDiary({diary: response}))
        handleFormReset()
    }

    const inputs = [
        {type: "text", placeholder:"Title", name: "title", handleInputChange: handleInputChange, value: formData.title},
        {type: "textarea", placeholder:"Description", name: "description", handleInputChange: handleInputChange, value: formData.description}
    ] 

    const buttons = [
        {name: "Reset Form", onClick: handleFormReset},
        {name: "Submit", onClick: handleCreatingEntry}
    ]

    return (
        <PostForm inputs={inputs} buttons={buttons} />
    )
}