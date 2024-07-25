import { FormButtonType, FormInputType } from "../common/types/FormTypes"

export const PostForm = ({inputs, buttons}:{inputs: FormInputType[], buttons: FormButtonType[]} ) => {
    return (
        <div className="FormContainer">
            {
                inputs.map((input) => {
                    if (input.type === "text") {
                        return (
                            <div className="InputContainer" key={input.name}>
                                <input type="text" name={input.name} placeholder={input.placeholder} onChange={input.handleInputChange} value={input.value}/>
                            </div>
                        )
                    }else if (input.type === "textarea") {
                        return (
                            <div className="InputContainer" key={input.name}>
                                <textarea className="LongTextInput" name={input.name} placeholder={input.placeholder} onChange={input.handleInputChange} value={input.value}/>
                            </div>
                        )
                    }else if (input.type === "password") {
                        return (
                            <div className="InputContainer" key={input.name}>
                                <input type="password" name={input.name} placeholder={input.placeholder} onChange={input.handleInputChange} value={input.value}/>
                            </div>
                        )
                    }
                })
            }
            <div className="ButtonsContainer">
                {
                    buttons.map((button) => {
                        return (
                            <button onClick={button.onClick} key={button.name}>{button.name}</button>
                        )
                    })
                }
            </div>
        </div>

    )
}
