export type FormInputType = {
    type: string,
    placeholder: string,
    name: string,
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
    value: string
}

export type FormButtonType = {
    name: string,
    onClick: () => void
}

export type FormToggleType = {
    name: string,
    onClick: () => void,
    trueText: string,
    falseText: string,
    value: boolean
}

export type FormSelectType = {
    name: string,
    options: string[],
    handleSelectChange: (e: React.ChangeEvent<HTMLSelectElement>) => void,
    value: string
}