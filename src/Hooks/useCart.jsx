import axios from "axios"

import { useQuery } from "@tanstack/react-query";

export default function useCart() {

    function getCart(){
        return   axios.get(`https://ecommerce.routemisr.com/api/v1/cart`,{
            headers:{Authorization: `Bearer ${localStorage.getItem('UserToken')}`}
        }) }
    let APIResponse = useQuery({
      queryKey:['cart'],
      queryFn:getCart,
    })
  return APIResponse;
}
