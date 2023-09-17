import { useState } from "react";
import { useLogin } from "../customhook/useLogin"
import mbwlogologo from '../assets/img/weather-icon/mbwlogologo.png';
import toast from "react-hot-toast";
import FormRowlogin from "./FormRowlogin";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading } = useLogin();
  const navigate=useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) return toast.error("Missing Email or Password")
    if (!email ) return toast.error("Missing Email ")
    if (!password) return toast.error("Missing Password")
    
    login(
      { email, password },
      {
        onSuccess: () => {
          navigate("/home")
        },
      }
    );
  }
  function handleSignup(e){
    e.preventDefault();
    navigate("/signup")

  }

  return (
    <div className="  grid place-items-center mt-20">
      <img className="rounded w-18 object-scale-down h-18" src={mbwlogologo} alt={mbwlogologo}/>
       <h2 className="text-3xl font-bold text-center  pt-14 mt-30 mb-0">Log in</h2>
    <form className=" text-black max-w-[400px] w-full  p-10 px-8 rounded-lg bg-gray-400 mt-12" onSubmit={handleSubmit}>
     
      <FormRowlogin label="Email address">
        <input
          type="email"
          id="email"
          className="mt-0 mb-6 bg-gray-700 rounded border-blue text-black focus:border-blue focus:bg-gray-500 focus:outline-none"
          // This makes this form better for password managers
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
         
        />
      </FormRowlogin>

      <FormRowlogin label="Password">
        <input
          type="password"
          id="password"
          className="mt-0 mb-6 bg-gray-700 rounded border-blue focus:border-blue focus:bg-gray-500 focus:outline-none"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
        />
      </FormRowlogin>
      <FormRowlogin>
       
        <button className="bg-blue rounded shadow-sm shadow-blue py-2 mb-4 " disabled={isLoading}>
          Log in
        </button>
        <div className="flex flex-col ">
        <span className="text-xs flex flex-col absolute mt-0.5">New User?</span>
        <button onClick={handleSignup} className="border-gray-400 border-2 text-xs hover:border-b-blue rounded absolute ml-16 mt-0 mb-4 flex flex-col justify-center   shadow-sm " disabled={isLoading} >
          Sign Up
        </button>
        </div>
        
      </FormRowlogin>
      
      
    </form>
    </div>
  );
}

export default LoginForm;
