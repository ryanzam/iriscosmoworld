"use client"

import { FC, useState } from "react"
import TextInput from "../inputs/TextInput"
import Modal from "./Modal";
import { BsSend } from "react-icons/bs"
import axios from "axios";
import toast from "react-hot-toast";
import { UserType } from "./ProfileModal";

interface IUserModalProps {
    title: string;
    isOpen: boolean;
    onClose: (reload: boolean) => void;
    onSubmit?: () => void;
    User: UserType
}

export enum UserRole {
    USER = "user",
    ADMIN = "admin"
}

const UserModal: FC<IUserModalProps> = ({ title, isOpen, onClose, User }) => {

    const [name, setName] = useState(User.name)
    const [email, setEmail] = useState(User.email)
    const [role, setRole] = useState(User.role)

    const handleSubmit = (e: any) => {
        e.preventDefault()

        const updateUser = axios.put(`${process.env.BASE_URL}/api/admin/users`, { id: User._id, name, role })

        toast.promise(updateUser, {
            loading: "Submitting User",
            success: () => {
                onClose(true)
                return "User saved"
            },
            error: "Error while adding User"
        })
    }

    const modalUserForm = (
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
            <TextInput label="Enter Name"
                placeHolder="Name"
                type="text"
                required={true}
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <TextInput label="Email address"
                placeHolder="Email"
                type="text"
                required={true}
                value={email}
                disabled={true}
                onChange={(e) => setEmail(e.target.value)}
            />
            <div>
                <label className="label">
                    <span className="label-text">Select user role</span>
                </label>
                <select className="select select-secondary w-full"
                    value={role}
                    onChange={(e: any) => setRole(e.target.value)} required>
                    {Object.values(UserRole).map(s => (
                        <option key={s}>{s}</option>
                    ))}
                </select>
            </div>
            <button className="btn btn-primary btn-sm mt-3" type="submit" >
                <BsSend />
                Submit
            </button>
        </form>
    )

    return (
        <Modal isOpen={isOpen} title={title} modalBody={modalUserForm} onClose={() => onClose(false)} />
    )
}

export default UserModal