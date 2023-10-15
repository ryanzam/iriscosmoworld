"use client"

import { FC, useCallback, useEffect, useState } from "react"
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai"
import Pagination from "../Pagination"

import { useRouter, useSearchParams } from "next/navigation"
import axios from "axios"
import toast from "react-hot-toast"

import { UserType } from "../modals/ProfileModal"
import UserModal, { UserRole } from "../modals/UserModal"

export type UsersDataType = {
    users: UserType[],
    pageSize: number,
    total: number
}


const UsersTable = () => {

    const [data, setData] = useState({} as UsersDataType)
    const [selectedUser, setSelectedUser] = useState<UserType>({} as UserType)
    const [showUserModal, setShowUserModal] = useState(false)
    const [loading, setLoading] = useState(false)

    const searchParams: any = useSearchParams()
    const router = useRouter()

    useEffect(() => {
        fetchUsers()
    }, [])

    const fetchUsers = useCallback(() => {
        axios.get(`/api/admin/users`, searchParams)
            .then(res => {
                setData(res.data)
            })
            .catch(err => toast.error(err.message))
            .finally(() => {
                setLoading(false)
            })
    }, [])

    if (loading) {
        return
    }

    const onEditUser = (user: UserType) => {
        setSelectedUser(user)
        setShowUserModal(true)
    }

    const onDeleteUser = (id: string) => {
        const confirm = window.confirm("Are you sure, you want to delete this user?")
        if (!confirm)
            return

        let productPromise = axios.delete(`/api/admin/users/` + id)
        toast.promise(productPromise, {
            loading: "Deleting user",
            success: () => {
                router.refresh()
                return "User deleted"
            },
            error: "Error while deleting user"
        })
    }

    const onCloseModal = (reload: boolean) => {
        setShowUserModal(false)
        if(reload) {
            fetchUsers()
            router.refresh()
        }
    }

    return (
        <div className="">
            {showUserModal &&
                <UserModal title="Update User" isOpen={showUserModal} onClose={(val: any) => onCloseModal(val)} User={selectedUser}/>
            }
            <table className="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Role</th>
                        <th>Created</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {data.users?.map(u => (
                        <tr key={u._id}>
                            <td>
                                <div className="font-bold">{u.name}</div>
                                <div className="text-sm opacity-50">{u.email}</div>
                            </td>
                            <td>
                                <div className={`${u.role === UserRole.ADMIN ? "badge badge-secondary badge-outline" : ""}
                                `}>
                                    {u.role}
                                </div>
                            </td>
                            <td>{u?.createdAt?.toString().split("T")[0]}</td>
                            <td className="join join-vertical lg:join-horizontal">
                                <button className="btn join-item btn-ghost" title="Edit order"
                                    onClick={() => onEditUser(u)}>
                                    <AiOutlineEdit size={18} />
                                </button>
                                <button className="btn join-item btn-ghost" title="Delete order"
                                    onClick={() => onDeleteUser(u._id)}
                                >
                                    <AiOutlineDelete size={18} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr><th>Total Users: {data.total}</th></tr>
                </tfoot>
            </table>
            <div className="mt-3">
                {data.pageSize && data.total && <Pagination total={data?.total} pageSize={data?.pageSize} />}
            </div>
        </div>
    )
}

export default UsersTable