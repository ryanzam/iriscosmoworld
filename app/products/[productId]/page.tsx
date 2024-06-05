import { PROD_URL } from "@/app/(root)/page";
import getSignedinUser from "@/app/actions/getSignedinUser";
import ProductDetails from "@/app/components/products/ProductDetails";
import axios from "axios";

interface IParams {
    productId: string;
}

const getProduct = async (pid: string) => {
    const { data } = await axios.get(`${PROD_URL}/api/products/${pid}`)
    return data;
}

export default async function ProductPage({ params }:  {params: IParams}) {

    const product = await getProduct(params.productId);
    const user = await getSignedinUser()

    return (
        <ProductDetails product={product} user={user}/>
    )
}