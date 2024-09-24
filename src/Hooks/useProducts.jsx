import axios from "axios"
import { useContext } from "react";
import { dataContext } from "../context/dataContext";
import { useQuery } from "@tanstack/react-query";

export default function useProducts() {
    const { BaseURL } = useContext(dataContext);

    function getAll(){
        return   axios.get(`${BaseURL}/api/v1/products`)
      }
    let APIResponse = useQuery({
      queryKey:['products'],
      queryFn:getAll,
    })
  return APIResponse;
}
