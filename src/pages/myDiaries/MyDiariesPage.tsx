import { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDiaries } from "../../app/diaries/diariesSlice";
import { ToggleFormButton } from "../../components/ToggleButton";
import { toggleDiaryFormVisibility, DiaryFormState } from "../../app/forms/diaryFormSlice";
import { DiaryForm} from "./MyDiariesForms";
import { DiaryList } from "./DiaryList";

export const MyDiariesPage = () => {
    const dispatch = useDispatch();
    
    const isVisible = useSelector((state: {diaryForm: DiaryFormState}) => state.diaryForm.isVisible);
    

    useEffect(() => {
        console.log("fetching diaries")
        dispatch(fetchDiaries());
    }, [dispatch]);
    
    

    const handleFormToggle = () => {
        dispatch(toggleDiaryFormVisibility())
    }

    return (
        <div className="Page">
            <ToggleFormButton onClick={handleFormToggle}/>
            {isVisible ? <DiaryForm />: <></>}
            <DiaryList/>
        </div>
    );
}


