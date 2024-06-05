"use client"

import { FC, useState } from "react"
import TextInput from "../inputs/TextInput"
import Modal from "./Modal";
import { countries } from "countries-list";
import { BsSend } from "react-icons/bs"
import axios from "axios";
import toast from "react-hot-toast";
import { PROD_URL } from '@/utils/constants';

export type AddressType = {
    _id?: string;
    phone: string,
    street: string,
    city: string,
    wardNumber: string,
}

interface IAddressModalProps {
    title: string;
    isOpen: boolean;
    onClose: () => void;
    onSubmit?: () => void;
    address: AddressType
}

const AddressModal: FC<IAddressModalProps> = ({ title, isOpen, onClose, address }) => {

    const cntrs = Object.values(countries);

    const [phone, setPhone] = useState(address?.phone || "")
    const [street, setStreet] = useState(address?.street || "")
    const [city, setCity] = useState(address?.city || "")
    const [wardNumber, setWardNumber] = useState(address?.wardNumber || "")

    const emptyAddress = Object.keys(address).length === 0;

    const handleSubmit = (e: any) => {
        e.preventDefault()

        let apiAddr

        if (emptyAddress) {
            apiAddr = axios.post(`${PROD_URL}/api/address`, { phone, street, city, wardNumber })
        } else {
            apiAddr = axios.put(`${PROD_URL}/api/address`, { id: address._id, phone, street, city, wardNumber })
        }

        toast.promise(apiAddr, {
            loading: "Adding delivery Address",
            success: () => {
                onClose()
                return "Delivery address added"
            },
            error: "Error when adding address"
        })
    }



    const modalAddrForm = (
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
            <TextInput label="Enter Phone"
                placeHolder="Enter your phone"
                type="number"
                required={true}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
            />
            <TextInput label="Enter Street Adress"
                placeHolder="Enter your street"
                type="text"
                required={true}
                value={street}
                onChange={(e) => setStreet(e.target.value)}
            />

            <div>
                <label className="label">
                    <span className="label-text">Select your city</span>
                </label>
                <select className="select select-bordered w-full max-w-xs" value={city} required defaultValue={"Bharatpur"}
                    onChange={(e) => setCity(e.target.value)}>
                    <option value="">
                        Select city
                    </option>
                    <option value="Bharatpur">
                        Bharatpur
                    </option>
                </select>
            </div>

            <TextInput label="Enter Ward Number"
                placeHolder="Ward number"
                type="number"
                required={true}
                value={wardNumber}
                onChange={(e) => setWardNumber(e.target.value)}
            />

            <button className="btn btn-primary btn-sm mt-3" type="submit"
                disabled={!(phone.length > 0 && city.length > 0 && wardNumber.length > 0 && street.length > 0)}
            >
                <BsSend />
                Submit
            </button>
        </form>
    )


    return (
        <Modal isOpen={isOpen} title={title} modalBody={modalAddrForm} onClose={onClose} />
    )
}

export default AddressModal