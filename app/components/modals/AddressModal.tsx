"use client"

import { FC, useState } from "react"
import TextInput from "../inputs/TextInput"
import Modal from "./Modal";
import { countries } from "countries-list";
import { BsSend } from "react-icons/bs"
import axios from "axios";
import toast from "react-hot-toast";

export type AddressType = {
    _id?: string;
    phone: string,
    street: string,
    city: string,
    postalCode: string,
    country: string,
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
    const [city, setCity] = useState(address?.city ||"" )
    const [postalCode, setPostalCode] = useState(address?.postalCode ||"")
    const [country, setCountry] = useState(address?.country ||"")

    const emptyAddress =  Object.keys(address).length === 0;

    const handleSubmit = (e: any) => {
        e.preventDefault()

        let apiAddr
        
        if(emptyAddress) {
            apiAddr = axios.post(`/api/address`, { phone, street, city, postalCode, country })
        } else {
            console.log("===" , address)
            apiAddr = axios.put(`/api/address`, { id: address._id, phone, street, city, postalCode, country })
        }

        toast.promise(apiAddr, {
            loading: "Submitting Address",
            success: () => {
                onClose()
                return "Address saved"
            },
            error: "Error when adding address"
        })
    }



    const modalAddrForm = (
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
            <TextInput label="Enter phone"
                placeHolder="Phone"
                type="number"
                required={true}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
            />
            <TextInput label="Enter Street"
                placeHolder="Street"
                type="text"
                required={true}
                value={street}
                onChange={(e) => setStreet(e.target.value)}
            />
            <TextInput label="Enter City"
                placeHolder="City"
                type="text"
                required={true}
                value={city}
                onChange={(e) => setCity(e.target.value)}
            />
            <TextInput label="Enter PostalCode"
                placeHolder="PostalCode"
                type="PostalCode"
                required={true}
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
            />
            <div>
                <label className="label">
                    <span className="label-text">Select your country</span>
                </label>
                <select className="select select-bordered w-full max-w-xs" value={country} required
                    onChange={(e) => setCountry(e.target.value)}>
                    {cntrs.map((c) => (
                        <option key={c.name} value={c.name}>
                            {c.name}
                        </option>
                    ))}
                </select>
            </div>
            <button className="btn btn-primary mt-3" type="submit"
                disabled={!(phone.length > 0 && city.length > 0 && postalCode.length > 0 && street.length > 0)}
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