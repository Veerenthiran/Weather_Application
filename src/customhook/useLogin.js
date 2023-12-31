import { useMutation, useQueryClient } from '@tanstack/react-query';
import { login as loginApi } from "../auth/apiAuth"

import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export function useLogin() {
  const queryClient=useQueryClient();
  const navigate = useNavigate();

  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (user) => {
      toast.success("Login Successfully")
   queryClient.setQueryData(["user"],user.user)
      navigate('/home',{replace:true});
    },
    onError: (err) => {
      toast.error('Provided email or password are incorrect');
    },
  });

  return { login, isLoading };
}
