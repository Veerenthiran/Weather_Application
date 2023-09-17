import { useForm } from "react-hook-form";
import FormRowVertical from "./FormRowVertical";
import FormRowButton from "./FormRowButton";
import mbwlogologo from '../assets/img/weather-icon/mbwlogologo.png';
import { useSignup } from "../customhook/useSignup";
import { useNavigate } from "react-router-dom";



// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
  // const { signup, isLoading } = useSignup();
  const { register, formState, getValues, handleSubmit} = useForm();
  const { errors } = formState;

  const{signup,isLoading}=useSignup();
  const navigate=useNavigate();

  // { fullName, email, password }
  function onSubmit({fullname,email,password}) {
    
    signup(
      { fullname, email, password },
      {
        onSuccess:()=>{
          navigate("/login")
        }
      }
    );
   }
   function handleLogin(e){
    e.preventDefault();
    navigate("/home")
   }

  return (
    <div className="  grid place-items-center mt-8">
       <img className="rounded w-18 object-scale-down h-18 " src={mbwlogologo} alt={mbwlogologo}/>
       <h2 className="text-3xl font-bold text-center pt-14 mt-30   ">Sign Up</h2>
    <form className=" text-black max-w-[400px] w-full  p-10 px-8 rounded-lg bg-gray-400 mt-8" onSubmit={handleSubmit(onSubmit)}>
      <FormRowVertical label="Full name" error={errors?.fullName?.message}>
        <input
          type="text"
          id="fullName"
          className="mt-0 mb-0 bg-white rounded border-blue text-black focus:border-blue focus:bg-gray-500 focus:outline-none"
          // disabled={isLoading}
          {...register("fullName", { required: "This field is required" })}
        />
      </FormRowVertical>

      <FormRowVertical label="Email address" error={errors?.email?.message}>
        <input
          type="email"
          id="email"
          className="mt-0 mb-0 bg-white rounded border-blue text-black focus:border-blue focus:bg-gray-500 focus:outline-none"
           disabled={isLoading}
          {...register("email", {
            required: "This field is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please provide a valid email address",
            },
          })}
        />
      </FormRowVertical>

      <FormRowVertical
        label="Password (min 8 characters)"
        error={errors?.password?.message}
      >
        <input
          type="password"
          id="password"
          className="mt-0 mb-0 bg-white rounded border-blue text-black focus:border-blue focus:bg-gray-500 focus:outline-none"
           disabled={isLoading}
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password needs a minimum of 8 characters",
            },
          })}
        />
      </FormRowVertical>

      <FormRowVertical label="Repeat password" error={errors?.passwordConfirm?.message}>
        <input
          type="password"
          id="passwordConfirm"
          className="mt-0 mb-0 bg-white rounded border-blue text-black focus:border-blue focus:bg-gray-500 focus:outline-none"
           disabled={isLoading}
          {...register("passwordConfirm", {
            required: "This field is required",
            validate: (value) =>
              value === getValues().password || "Passwords need to match",
          })}
        />
      </FormRowVertical>

      <FormRowButton>
        {/* type is an HTML attribute! */}
        <div>
        <span className="text-xs">Already registered User?</span>
        <button
          type="reset"
           disabled={isLoading}
          onClick={handleLogin}
          className="border-gray-400 hover:border-b-blue border-2 rounded shadow-sm py-0 px-0"
        >
          Log in
        </button>
        </div>
      <button className="bg-blue rounded shadow-sm py-3 px-4  shadow-blue" >Sign up</button>

          
      </FormRowButton>
    </form>
    </div>
  );
}

export default SignupForm;
