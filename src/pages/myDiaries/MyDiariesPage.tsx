import { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDiaries } from "../../app/diaries/diariesSlice";
import { ToggleFormButton } from "../../components/ToggleButton";
import { toggleDiaryFormVisibility, DiaryFormState } from "../../app/diaries/diaryFormSlice";
import { DiaryForm} from "./MyDiariesForms";
import { DiaryList } from "./DiaryList";
import { FilterInput } from "../../components/FilterInput";

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
            <FilterInput types={['title', 'description', 'date', 'category']}/>
            <DiaryList/>
        </div>
    );
}


