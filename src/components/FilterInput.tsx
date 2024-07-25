import { useDispatch, useSelector } from "react-redux";
import { FilterState, setFilterType, setFilterValue } from "../app/filter/filterSlice";

export const FilterInput = ({types}:{types: string[]}) => {
    const dispatch = useDispatch();
    const filterValue = useSelector((state: {filter: FilterState}) => state.filter.value);
    const filterType = useSelector((state: {filter: FilterState}) => state.filter.type);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        e.preventDefault();
        const { value } = e.target;
        dispatch(setFilterValue(value));
    };

    const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault();
        const { value } = e.target;
        dispatch(setFilterType(value));
    }

    return (
        <div className="Filter">
            <input type="text" placeholder="Filter by name" onChange={handleInputChange} value={filterValue}/>
            <select value={filterType} onChange={handleTypeChange} className="SelectInput">
                {types.map((type) => (
                    <option key={type} value={type}>
                        {type}
                    </option>
                ))}
            </select>
        </div>
    )
}