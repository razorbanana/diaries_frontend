import { useEffect} from "react";
import { DiaryType } from "../types/diaryType";
import { useDispatch, useSelector } from "react-redux";
import { DiariesState, fetchDiaries, addDiary } from "../app/diaries/diariesSlice";
import { useNavigate } from "react-router-dom";
import { ToggleFormButton } from "../components/ToggleButton";
import { toggleDiaryFormVisibility, setDiaryFormData, resetDiaryForm, DiaryFormState, DiaryFormData } from "../app/forms/diaryFormSlice";
import { createDiary } from "../services/diaries";


export const MyDiariesPage = () => {
    const dispatch = useDispatch();
    const diaries = useSelector((state: {diaries: DiariesState}) =>  state.diaries.diaries);
    const loading = useSelector((state: {diaries: DiariesState}) => state.diaries.loading);
    const error = useSelector((state: {diaries: DiariesState}) => state.diaries.error);
    const isVisible = useSelector((state: {diaryForm: DiaryFormState}) => state.diaryForm.isVisible);
    const formData = useSelector((state: {diaryForm: DiaryFormState}) => state.diaryForm.formData || {title:'', description:''});
    console.log(isVisible)

    useEffect(() => {
        console.log("fetching diaries")
        dispatch(fetchDiaries());
    }, [dispatch]);
    
    if (loading || diaries === undefined) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    const handleFormToggle = () => {
        dispatch(toggleDiaryFormVisibility())
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        const newDiary = {
            id: response.id,
            title: response.title,
            description: response.description,
            isPrivate: response.isPrivate
        }
        dispatch(addDiary({diary: newDiary}))
        handleFormReset()
    }

    return (
        <div>
            {isVisible ? <DiaryForm handleInputChange={handleInputChange} handleFormReset={handleFormReset} formData={formData} handleCreatingEntry={handleCreatingEntry}/>: <></>}
            <ToggleFormButton onClick={handleFormToggle}/>
            <DiaryList diaries={diaries}/>
        </div>
    );
}

const DiaryForm = ({handleInputChange, handleFormReset, formData, handleCreatingEntry}: {handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void, handleFormReset: ()=>void, formData: DiaryFormData, handleCreatingEntry: ()=>void} ) => {
    return (
        <div>
            <input type="text" name="title" placeholder="Title" onChange={handleInputChange} value={formData.title}/>
            <input type="text" name="description" placeholder="Description" onChange={handleInputChange} value={formData.description}/>
            <button onClick={handleFormReset}>Reset Form</button>
            <button onClick={handleCreatingEntry}>Submit</button>
        </div>
    )
}

const DiaryList = ({diaries}: {diaries: DiaryType[]}) => {
    return (
        <div>
            {diaries.map((diary) => <Diary key={diary.id} diary={diary}/>)}
        </div>
    );
}

const Diary = ({ diary }: {diary: DiaryType}) => {
    const navigate = useNavigate()
    return(
        <div>
            <div>
            {diary.title} {diary.isPrivate ? "Private" : "Public"}
            <p>{diary.description}</p>
            </div>
            <button onClick={() => {navigate(`/diary/${diary.id}`)}}>Read Diary</button>
        </div>
    )
}