import { useEffect} from "react";
import { DiaryType } from "../common/types/diaryType";
import { useDispatch, useSelector } from "react-redux";
import { DiariesState, fetchDiaries, addDiary, delDiary, updateMyDiary } from "../app/diaries/diariesSlice";
import { useNavigate } from "react-router-dom";
import { ToggleFormButton } from "../components/ToggleButton";
import { toggleDiaryFormVisibility, setDiaryFormData, resetDiaryForm, DiaryFormState, DiaryFormData } from "../app/forms/diaryFormSlice";
import { createDiary } from "../services/diaries";
import moment from "moment";
import { EditDiaryFormInterface, EditDiaryFormState, getEditDiaryFormData, resetEditDiaryForm, setEditDiaryFormData, toggleDiaryPrivacy } from "../app/forms/editDiaryFormSlice";


export const MyDiariesPage = () => {
    const dispatch = useDispatch();
    const diaries = useSelector((state: {diaries: DiariesState}) =>  state.diaries.diaries);
    const loading = useSelector((state: {diaries: DiariesState}) => state.diaries.loading);
    const error = useSelector((state: {diaries: DiariesState}) => state.diaries.error);
    const isVisible = useSelector((state: {diaryForm: DiaryFormState}) => state.diaryForm.isVisible);
    const formData = useSelector((state: {diaryForm: DiaryFormState}) => state.diaryForm.formData);
    const editDiaryFormData = useSelector((state: {editDiaryForm: EditDiaryFormState}) => state.editDiaryForm.formData);

    useEffect(() => {
        console.log("fetching diaries")
        dispatch(fetchDiaries());
    }, [dispatch]);
    
    if (loading || diaries === undefined) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    const handleFormToggle = () => {
        dispatch(toggleDiaryFormVisibility())
    }

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

    return (
        <div className="Page">
            <ToggleFormButton onClick={handleFormToggle}/>
            {isVisible ? <DiaryForm handleInputChange={handleInputChange} handleFormReset={handleFormReset} formData={formData} handleCreatingEntry={handleCreatingEntry}/>: <></>}
            <DiaryList diaries={diaries} editDiaryFormData={editDiaryFormData}/>
        </div>
    );
}

const DiaryForm = ({handleInputChange, handleFormReset, formData, handleCreatingEntry}: {handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void, handleFormReset: ()=>void, formData: DiaryFormData, handleCreatingEntry: ()=>void} ) => {
    return (
        <div className="FormContainer">
            <div className="InputContainer">
                <input type="text" name="title" placeholder="Title" onChange={handleInputChange} value={formData.title}/>
            </div>
            <div className="InputContainer">
                <textarea className='LongTextInput' name="description" placeholder="Description" onChange={handleInputChange} value={formData.description}/>
            </div>
            <div className="ButtonsContainer">
                <button onClick={handleFormReset}>Reset Form</button>
                <button onClick={handleCreatingEntry}>Submit</button>
            </div>
            
        </div>
    )
}

const DiaryList = ({diaries, editDiaryFormData}: {diaries: DiaryType[], editDiaryFormData: EditDiaryFormInterface}) => {
    return (
        <div className="EntityList">
            {diaries.map((diary) => editDiaryFormData.id === diary.id ? <EditDiaryForm editDiaryFormData={editDiaryFormData} key={diary.id}/>:<Diary key={diary.id} diary={diary}/>)}
        </div>
    );
}

const Diary = ({ diary }: {diary: DiaryType}) => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    return(
        <div className="EntityContainer">
            <div>
            <p className="TitleP">{diary.title}</p>
            <p>{diary.category}</p>
            <p>{diary.isPrivate ? "Private" : "Public"}</p>
            <p className="TimeP">Updated at {moment(diary.updatedAt).format('YYYY-MM-DD HH:mm')}</p>
            <p>{diary.description.length > 50 ? diary.description.slice(0,50)+'...': diary.description}</p>
            </div>
            <div className="ButtonsContainer">
                <button onClick={() => {navigate(`/diary/${diary.id}`)}}>Read Diary</button>
                <button onClick={() => {dispatch(getEditDiaryFormData(diary))}}>Update Diary</button>
                <button onClick={() => {dispatch(delDiary(diary.id))}}>Delete Diary</button>
            </div>
        </div>
    )
}

const EditDiaryForm = ({editDiaryFormData}:{editDiaryFormData: EditDiaryFormInterface}) => {
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

    return  (
        <div className="EntityContainer">
            <div>
            <p>New title:</p>
            <p><input className="ShortTextInput" type="text" name="title" placeholder="Title" onChange={handleEditDiaryFormInputChange} value={editDiaryFormData.title}/></p>
            <p>New description:</p>
            <p><textarea className="LongTextInput" name="description" placeholder="Description" onChange={handleEditDiaryFormInputChange} value={editDiaryFormData.description}/></p>
            <span className="ToggleSpan" onClick={()=>{dispatch(toggleDiaryPrivacy())}}>{editDiaryFormData.isPrivate ? 'Private':'Public'}</span>
            </div>
            <div className="ButtonsContainer">
                <button onClick={() => {dispatch(resetEditDiaryForm())}}>Cancel</button>
                <button onClick={handleConfirmEdit}>Accept</button>
            </div>
        </div>
    )
}