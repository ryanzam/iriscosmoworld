import ProductDetails from "@/app/components/products/ProductDetails";
import axios from "axios";

interface IParams {
    productId: string;
}

const getProduct = async (pid: string) => {
    const { data } = await axios.get(`${process.env.BASE_URL}/api/products/${pid}`)
    return data;
}

export default async function ProductPage({ params }:  {params: IParams}) {

    const product = await getProduct(params.productId);

    return (
        <ProductDetails product={product}/>
    )
}