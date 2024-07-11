import { useParams } from "react-router-dom"

export const DiaryPage = () => {
    const {id} = useParams()
    console.log(`diary id is ${id}`)
    return (
        <div>
            <h1>Diary Page {id}</h1>
        </div>
    )
}