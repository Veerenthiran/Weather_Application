import { useState } from "react";
import { useLogin } from "../customhook/useLogin";
import { default as logo } from "../assets/img/weather-icon/logo.svg";
import mbwlogologo from "../assets/img/weather-icon/mbwlogologo.png";
import toast from "react-hot-toast";
import FormRowlogin from "./FormRowlogin";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading } = useLogin();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) return toast.error("Missing Email or Password");
    if (!email) return toast.error("Missing Email ");
    if (!password) return toast.error("Missing Password");
    login(
      { email, password },
      {
        onSuccess: () => {
          navigate("/home");
        },
      }
    );
  }
  function handleSignup(e) {
    e.preventDefault();
    navigate("/signup");
  }

  return (
    <div className="flex flex-col justify-center items-center mt-8">
      <div className="items-center">
        <img
          className="rounded-xl object-contain"
          src={logo}
          alt="rain-illustration"
        />
      </div>

      <h2 className="my-4 font-bold text-3xl">Log in</h2>
      <form
        className="bg-white rounded-lg px-12 py-10 laptop:w-1/2"
        onSubmit={handleSubmit}
      >
        <FormRowlogin label="Email address">
          <input
            type="email"
            id="email"
            className="bg-gray-100 p-3 my-2 rounded-lg"
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
            className="bg-gray-100 p-3 my-2 rounded-lg"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
          />
        </FormRowlogin>
        <FormRowlogin>
          <button
            className="bg-blue rounded shadow-sm shadow-blue py-2 mb-4 text-white mt-4"
            disabled={isLoading}
          >
            Log in
          </button>
          <div className="flex flex-col ">
            <span className="text-xs flex flex-col absolute mt-0.5">
              New User?
            </span>
            <button
              onClick={handleSignup}
              className="text-blue font-semibold  text-sm hover:border-b-blue rounded absolute ml-16 mt-0 mb-4 flex flex-col justify-center   shadow-sm "
              disabled={isLoading}
            >
              Sign Up
            </button>
          </div>
        </FormRowlogin>
      </form>
    </div>
  );
}

export default LoginForm;
