import { useMutation } from "@tanstack/react-query";
import { signup as signupApi} from "../auth/apiAuth";
import toast from "react-hot-toast";

export function useSignup(){
    const {mutate : signup,isLoading}=useMutation({
        mutationFn:signupApi,
        onSuccess:(user)=>{
           toast.success(
            "Account Successfully Created"
           );
        },
    });

    return {signup,isLoading};
}