"use client"

import { FC, useState } from "react"
import TextInput from "../inputs/TextInput"
import Modal from "./Modal";
import { BsSend } from "react-icons/bs"
import axios from "axios";
import toast from "react-hot-toast";

export type AvatarType ={
    url?: string;
}

export type UserType = {
    _id: string;
    name: string;
    email: string;
    role: string;
    avatar?: AvatarType;
    createdAt?: Date;
}

interface IProfileModalProps {
    title: string;
    isOpen: boolean;
    onClose: () => void;
    onSubmit?: () => void;
    profile: UserType
}

const ProfileModal: FC<IProfileModalProps> = ({ title, isOpen, onClose, profile }) => {

    const [name, setName] = useState(profile.name)
    const [email, setEmail] = useState(profile.email)

    const handleSubmit = (e: any) => {
        e.preventDefault()

        const updateProfile = axios.put(`/api/profile`, { id: profile._id, name, email })

        toast.promise(updateProfile, {
            loading: "Submitting Profile",
            success: () => {
                onClose()
                return "Profile saved"
            },
            error: "Error while adding Profile"
        })
    }

    const modalProfileForm = (
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

            <button className="btn btn-primary mt-3" type="submit" >
                <BsSend />
                Submit
            </button>
        </form>
    )

    return (
        <Modal isOpen={isOpen} title={title} modalBody={modalProfileForm} onClose={onClose} />
    )
}

export default ProfileModal