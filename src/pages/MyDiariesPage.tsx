import { useEffect, useState } from "react";
import { DiaryType } from "../types/diaryType";
import { useDispatch, useSelector } from "react-redux";
import { DiariesState, fetchDiaries } from "../app/diaries/diariesSlice";
import { useNavigate } from "react-router-dom";

export const MyDiariesPage = () => {

    return (
        <div>
            <DiaryList />
        </div>
    );
}

const DiaryList = () => {
    const dispatch = useDispatch();
    const diaries = useSelector((state: {diaries: DiariesState}) =>  state.diaries.diaries);
    const loading = useSelector((state: {diaries: DiariesState}) => state.diaries.loading);
    const error = useSelector((state: {diaries: DiariesState}) => state.diaries.error);
    console.log(`diaries are ${diaries}`)
    console.log(`loading is ${loading}`)
    console.log(`error is ${error}`)

    useEffect(() => {
        console.log("fetching diaries")
        dispatch(fetchDiaries());
    }, [dispatch]);
    
    if (loading || diaries === undefined) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
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