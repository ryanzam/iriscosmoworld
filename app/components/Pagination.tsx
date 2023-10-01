"use client"

import { useRouter, useSearchParams } from 'next/navigation';
import Paginate from 'rc-pagination';
import { FC, useCallback } from 'react';
import "rc-pagination/assets/index.css";

interface IPaginationProps {
    pageSize: number;
    total: number;
}

const Pagination:FC<IPaginationProps> = ({ pageSize, total, }: IPaginationProps) => {

    const router = useRouter()
    const searchParams = useSearchParams()

    let page = searchParams.get("page") ?? 1
    let current = Number(page)

    const createQueryString = useCallback(
        (name: string, value: string) => {
          const params = new URLSearchParams(searchParams)
          params.set(name, value)
     
          return params.toString()
        },
        [searchParams]
      )
      
    const handlePageChange = (page: number, pageSize: number) => {
        router.push("/" + '?' + createQueryString('page', page.toString()))
    }

    return (
        <Paginate current={current} total={total} pageSize={ pageSize } onChange={handlePageChange} />
    )
}

export default Pagination