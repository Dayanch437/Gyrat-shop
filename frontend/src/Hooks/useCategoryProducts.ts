import {api} from "../api"
import { useQuery } from "@tanstack/react-query";
import {Category} from "../Types/CategoryProducts"


const getCategoryProductsData=async (): Promise<Category[]> => {
    const response = await api.get("categories/");
    return response.data;
  }


export const useCategoryProducts =()=>{
    return  useQuery<Category[]>({
        queryKey: ["categoryProducts"],
        queryFn:getCategoryProductsData,
      });
}