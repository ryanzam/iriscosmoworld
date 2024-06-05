"use client"

import { FC, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { FaUserNinja } from "react-icons/fa"
import { GrMapLocation } from "react-icons/gr"
import { MdPassword } from "react-icons/md"
import AddressModal, { AddressType } from "../modals/AddressModal";
import ProfileModal, { UserType } from "../modals/ProfileModal";
import PasswordChangeModal from "../modals/PasswordChangeModal";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface IUserPRops {
    user: UserType
}

const User: FC<IUserPRops> = ({ user }) => {

    const [showAddrModal, setShowAddrModal] = useState(false)
    const [showProfileModal, setShowProfileModal] = useState(false)
    const [showPasswordChangeModal, setShowPasswordChangeModal] = useState(false)
    const [address, setDAddress] = useState<AddressType>({} as AddressType);

    const router = useRouter()

    useEffect(() => {
        axios.get(`https://iriscosmoworld.vercel.app/api/address`)
            .then((res: any) => {
                setDAddress({ ...res.data[0] })
            }).catch(err => toast.error("Error fetching address: ", err.nessage))
    }, [address.city, address.phone, address.wardNumber, address.street, showAddrModal, showProfileModal])

    const onAddrModalClose = () => {
        setShowAddrModal(!showAddrModal)
        router.refresh()
    }

    const onProfileModalClose = () => {
        setShowProfileModal(!showProfileModal)
        router.refresh()
    }

    const onPasswordChangeClose = () => {
        setShowPasswordChangeModal(!showPasswordChangeModal)
    }

    const emptyAddress = Object.keys(address).length === 0;

    return (
        <>
            <div className="card p-3 border xs:p-0">
                <div className="flex items-start p-3 xs:p-0 xs:flex-col xs:items-center">
                    <Image
                        className="w-20 h-20 rounded-full mb-auto"
                        src={user?.image ? user?.image : "/profile.jpg"}
                        alt={user?.name}
                        height={80}
                        width={80}
                    />
                    <div className="w-full">
                        <div className="flex">
                            <div>
                                <h5 className="font-semibold text-lg">{user?.name}</h5>
                                <h5 className="font-semibold">Email: <span className="font-light">{user?.email}</span></h5>
                                <h5 className="font-semibold">Created on: <span className="font-light text-sm">{user?.createdAt?.toISOString().split("T")[0]}</span></h5>
                            </div>
                            <div className="flex flex-col gap-2 ml-auto">
                                <button className="btn btn-outline btn-primary btn-sm" onClick={() => setShowProfileModal(true)} >
                                    <FaUserNinja size={20} /> <span className="xs:hidden">Update Profile</span>
                                </button>
                                <button className="btn btn-outline btn-sm" onClick={() => setShowPasswordChangeModal(true)} >
                                    <MdPassword size={20} />  <span className="xs:hidden">Change Password</span>
                                </button>
                            </div>
                        </div>


                        <hr className="my-4" />

                        <div className="flex items-center">
                            {emptyAddress ?
                                <p className="italic">No address found</p> :
                                <div>
                                    <h6 className="font-medium">{address?.phone}</h6>
                                    <h6 className="font-medium">{address?.street}</h6>
                                    <h6 className="font-medium">{address?.city}, {address?.wardNumber}</h6>
                                </div>
                            }
                            <button className={`btn ml-auto btn-outline btn-sm`}
                                onClick={() => setShowAddrModal(true)}
                            >
                                <GrMapLocation size={20} />
                                {emptyAddress ?
                                    <span className="xs:hidden">Add new address</span> :
                                    <span className="xs:hidden">Update address</span>}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {showAddrModal &&
                <AddressModal isOpen={showAddrModal} title={emptyAddress ? "Add delivery address" : "Update delivery address"} onClose={onAddrModalClose} address={address} />
            }
            {showProfileModal &&
                <ProfileModal isOpen={showProfileModal} title="Update profile" onClose={onProfileModalClose} profile={user} />
            }
            {
                showPasswordChangeModal &&
                <PasswordChangeModal isOpen={showPasswordChangeModal} title="Change password" onClose={onPasswordChangeClose} profile={user} />
            }
        </>
    )
}

export default User