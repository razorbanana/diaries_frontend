import { FormButtonType, FormInputType, FormSelectType, FormToggleType } from "../common/types/FormTypes"

export const PostForm = ({inputs=[], buttons=[], toggles=[], selects=[]}:{inputs?: FormInputType[], buttons?: FormButtonType[], toggles?: FormToggleType[], selects?: FormSelectType[]} ) => {
    return (
        <div className="FormContainer">
            <Inputs inputs={inputs}/>
            <Toggles toggles={toggles}/>
            <Selects selects={selects}/>
            <Buttons buttons={buttons}/>
        </div>

    )
}

const Inputs = ({inputs}:{inputs: FormInputType[]}) => {
    return(
        <div>
            {
                inputs.map((input) => {
                    if (input.type === "text") {
                        return (
                            <div className="InputContainer" key={input.name}>
                                <label>{input.placeholder}: </label>
                                <input type="text" name={input.name} placeholder={input.placeholder} onChange={input.handleInputChange} value={input.value}/>
                            </div>
                        )
                    }else if (input.type === "textarea") {
                        return (
                            <div className="InputContainer" key={input.name}>
                                <label>{input.placeholder}: </label>
                                <textarea className="LongTextInput" name={input.name} placeholder={input.placeholder} onChange={input.handleInputChange} value={input.value}/>
                            </div>
                        )
                    }else if (input.type === "password") {
                        return (
                            <div className="InputContainer" key={input.name}>
                                <label>{input.placeholder}: </label>
                                <input type="password" name={input.name} placeholder={input.placeholder} onChange={input.handleInputChange} value={input.value}/>
                            </div>
                        )
                    }
                })
            }
        </div>
    )
}

const Toggles = ({toggles}:{toggles: FormToggleType[]}) => {
    return(
        <div>
            {
                toggles.map((toggle) => {
                    return (
                        <p>{toggle.name}: <span className="ToggleSpan" onClick={toggle.onClick}>{toggle.value ? toggle.trueText:toggle.falseText}</span></p>
                    )
                })
            }
        </div>
    )

}

const Selects = ({selects}:{selects: FormSelectType[]}) => {
    return (
        <div>
            {
                selects.map((select) => {
                    return (
                        <div key={select.name}>
                            <label>{select.name}:</label>
                            <select name={select.name} onChange={select.handleSelectChange} value={select.value} className="SelectInput">
                                {
                                    select.options.map((option) => {
                                        return (
                                            <option key={option} value={option}>{option}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                    )
                })
            }
        </div>
    )
}

const Buttons = ({buttons}:{buttons: FormButtonType[]}) => {
    return(
        <div className="ButtonsContainer">
            {
                buttons.map((button) => {
                    return (
                        <button onClick={button.onClick} key={button.name}>{button.name}</button>
                    )
                })
            }
        </div>  
    )
}
