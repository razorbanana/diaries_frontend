import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { DiaryType } from "../../common/types/diaryType";
import moment from "moment";
import { EditDiaryFormState, getEditDiaryFormData } from "../../app/forms/editDiaryFormSlice";
import { delDiary, DiariesState } from "../../app/diaries/diariesSlice";
import { EditDiaryForm } from "./MyDiariesForms";

export const DiaryList = ({}) => {
    const diaries = useSelector((state: {diaries: DiariesState}) =>  state.diaries.diaries);
    const editDiaryFormData = useSelector((state: {editDiaryForm: EditDiaryFormState}) => state.editDiaryForm.formData);
    const loading = useSelector((state: {diaries: DiariesState}) => state.diaries.loading);
    const error = useSelector((state: {diaries: DiariesState}) => state.diaries.error);
    
    if (loading || diaries === undefined) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
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