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