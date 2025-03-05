import {api} from "../api"
import { useQuery } from "@tanstack/react-query";
import {Banner} from "../Types/Slider"


const getSliderData=async (): Promise<Banner[]> => {
    const response = await api.get("/banners/");
    return response.data;
  }


export const useSlider =()=>{
    return  useQuery<Banner[]>({
        queryKey: ["banner"],
        queryFn:getSliderData,
      });
}