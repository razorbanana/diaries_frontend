export const ReturnButton = () => {
    return (
        <div className="ReturnButton">
            <button onClick={() => {window.history.back()}}>{'<='}</button>
        </div>
    )
}