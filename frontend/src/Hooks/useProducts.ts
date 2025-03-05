import {api} from "../api"
import { useQuery } from "@tanstack/react-query";
import {Product} from "../Types/Product"


const getProductData=async (): Promise<Product[]> => {
    const response = await api.get("/products/");
    return response.data;
  }


export const useProduct =()=>{
    return  useQuery<Product[]>({
        queryKey: ["product"],
        queryFn:getProductData,
      });
}