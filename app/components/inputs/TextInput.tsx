import { Dispatch, FC, SetStateAction } from "react"

interface IInputProps {
    label: string;
    required?: boolean;
    value?: string | number;
    onChange?: (e: any) => void
    placeHolder: string;
    type: string;
    id?: string;
    minLength?: number
    disabled?: boolean;
}

const TextInput: FC<IInputProps> = ({ id, label, required, value, onChange, placeHolder, type, minLength, disabled }) => {
    return (
        <div>
            <label className="label">
                <span className="label-text">{label}</span>
            </label>
            <input className="input input-bordered w-full"
                id={id}
                type={type}
                placeholder={placeHolder}
                value={value}
                onChange={onChange}
                required={required}
                minLength={minLength}
                disabled={disabled}
            />
        </div>
    )
}

export default TextInput