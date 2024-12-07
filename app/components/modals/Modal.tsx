import { FC } from "react";

interface IModalProps {
    title: string;
    modalBody?: React.ReactNode;
    isOpen: boolean;
    onClose?: () => void;
    onSubmit?: () => void;
}

const Modal: FC<IModalProps> = ({ title, modalBody, isOpen, onClose, onSubmit }) => {
    return (
        <dialog id="my_modal_1" className="modal" open={isOpen}>
            <div className="modal-box shadow-[rgba(0,_0,_0,_0.4)_00px_20px_100px]">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-4" onClick={onClose}>✕</button>

                <h3 className='my-3' className="font-bold text-lg">{title}</h3>
                <div className="py-4">
                    {modalBody}
                </div>
            </div>
        </dialog>
    )
}

export default Modal