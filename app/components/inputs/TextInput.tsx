import { Dispatch, FC, SetStateAction } from "react"

interface IInputProps {
    label: string;
    required?: boolean;
    value?: string | number;
    onChange?:(e: any) => void
    placeHolder: string;
    type: string;
    minLength?: number
}

const TextInput: FC<IInputProps> = ({ label, required, value, onChange, placeHolder, type, minLength }) => {
    return (
        <div>
            <label className="label">
                <span className="label-text">{label}</span>
            </label>
            <input className="input input-bordered w-full"
                type={type}
                placeholder={placeHolder}
                value={value}
                onChange={onChange}
                required={required}
                minLength={minLength}
            />
        </div>
    )
}

export default TextInput