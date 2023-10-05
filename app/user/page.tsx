"use client"

import { useContext, useEffect, useState } from "react";
import { AuthenticationContext } from "@/context/AuthenticationContext";
import AddressModal from "../components/modals/AddressModal";
import axios from "axios";
import toast from "react-hot-toast";

type AddressType = {
    phone: string,
    street: string,
    city: string,
    postalCode: string,
    country: string,
}

const UserPage = () => {

    const { user } = useContext(AuthenticationContext);
    const [showAddrModal, setShowAddrModal] = useState(false)
    const [address, setDAddress] = useState<AddressType[]>([]);

    useEffect(() => {
        axios.get(`/api/address`)
            .then((res: any) => {
                setDAddress(res.data)
            }).catch(err => toast.error("Error fetching address :", err.nessage))
    }, [])

    const onAddrModalClose = () => {
        setShowAddrModal(!showAddrModal)
    }

    return (
        <>
            <div className="p-3 border">
                <div className="flex items-start sm:items-center p-3">
                    <img
                        className="w-20 h-20 rounded-full mb-auto"
                        src={user?.avatar ? user?.avatar?.url : "/profile.jpg"}
                        alt={user?.name}
                    />
                    <div className="w-full">
                        <div>
                            <h5 className="font-semibold text-lg">{user?.name}</h5>
                            <h5 className="font-semibold">Email: <span className="font-light">{user?.email}</span></h5>
                            <h5 className="font-semibold">Created on: <span className="font-light text-sm">{user?.createdAt.split('T')[0]}</span></h5>
                        </div>

                        <hr className="my-4" />

                        <div className="flex items-center">
                            {address.length === 0 ?
                                <p className="italic">No address found</p> :
                                <div>
                                    <h6 className="font-medium">{address[0]?.phone}</h6>
                                    <h6 className="font-medium">{address[0]?.street}</h6>
                                    <h6 className="font-medium">{address[0]?.city}, {address[0]?.postalCode}, {address[0]?.country}</h6>
                                </div>
                            }
                            <button className={`btn ml-auto
                                ${address.length === 0 ? "btn-primary" : ""}
                                `} onClick={() => setShowAddrModal(true)}
                                >
                                {address.length === 0 ? "Add new address" : "Update address"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {showAddrModal &&
                <AddressModal isOpen={showAddrModal} title="Add new address" onClose={onAddrModalClose} />
            }
        </>
    )
}

export default UserPage