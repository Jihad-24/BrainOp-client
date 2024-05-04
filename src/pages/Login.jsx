import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../hooks/useAuth";

const Login = () => {
  const { signIn, signInGoogle } = useAuth();
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    console.log(e.currentTarget);
    const form = new FormData(e.currentTarget);
    const email = form.get("email");
    const password = form.get("password");
    // console.log(email, password);

    // login user
    signIn(email, password)
      .then((result) => {
        // console.log(result.user);
        // success alert
        if (result?.user) {
          Swal.fire({
            icon: "success",
            title: "User Login Successfull",
          });
        }
        navigate("/postlisting");
      })
      .catch((error) => {
        setLoginError(error.message);
        // error alert
        Swal.fire({
          icon: "error",
          title: `${error.message}`,
        });
      });
  };
  const handleGoogleSignIn = () => {
    signInGoogle()
      .then((result) => {
        // console.log(result.user)
        const email = result?.user?.email;
        const displayName = result?.user?.displayName;
        const user = { email, displayName };
        // console.log(user);

        fetch("https://brain-op-server.vercel.app/users", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(user),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data.insertedId) {
              console.log("User Added in DataBase");
              // success alert
              Swal.fire({
                icon: "success",
                title: "User Login Successfull",
              });
            }
          });

        navigate("/postlisting");
      })
      .catch((error) => {
        // error alert
        Swal.fire({
          icon: "error",
          title: `${error.message}`,
        });
      });
  };

  return (
    <div className="pb-24">
      <div>
        <h1
          className="text-4xl mt-10 font-bold text-center"
          data-aos="fade-down"
        >
          Login your account!
        </h1>
        <form
          onSubmit={handleLogin}
          className="card-body md:w-3/4 lg:w-1/2 mx-auto"
        >
          {loginError && <p className="text-red-700">{loginError}</p>}
          <div className="form-control " data-aos="fade-right">
            <label className="label">
              <span className="label-text">Email Address</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter Your Email Address"
              className="input input-bordered bg-slate-200"
              required
            />
          </div>
          <div className="form-control relative" data-aos="fade-left">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter Your Password"
              className="input input-bordered bg-slate-200"
              required
            />
            <span
              className="absolute top-[3.2rem] right-3"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>}
            </span>
            <label className="label">
              <Link to="/forgot" className="label-text-alt link link-hover">
                Forgot password?
              </Link>
            </label>
          </div>
          <div className="form-control mt-4">
            <button className="btn btn-primary">Login</button>
            <button
              onClick={handleGoogleSignIn}
              className="btn btn-neutral mt-6"
            >
              {" "}
              <svg
                className="w-4 h-auto"
                width="46"
                height="47"
                viewBox="0 0 46 47"
                fill="none"
              >
                <path
                  d="M46 24.0287C46 22.09 45.8533 20.68 45.5013 19.2112H23.4694V27.9356H36.4069C36.1429 30.1094 34.7347 33.37 31.5957 35.5731L31.5663 35.8669L38.5191 41.2719L38.9885 41.3306C43.4477 37.2181 46 31.1669 46 24.0287Z"
                  fill="#4285F4"
                />
                <path
                  d="M23.4694 47C29.8061 47 35.1161 44.9144 39.0179 41.3012L31.625 35.5437C29.6301 36.9244 26.9898 37.8937 23.4987 37.8937C17.2793 37.8937 12.0281 33.7812 10.1505 28.1412L9.88649 28.1706L2.61097 33.7812L2.52296 34.0456C6.36608 41.7125 14.287 47 23.4694 47Z"
                  fill="#34A853"
                />
                <path
                  d="M10.1212 28.1413C9.62245 26.6725 9.32908 25.1156 9.32908 23.5C9.32908 21.8844 9.62245 20.3275 10.0918 18.8588V18.5356L2.75765 12.8369L2.52296 12.9544C0.909439 16.1269 0 19.7106 0 23.5C0 27.2894 0.909439 30.8731 2.49362 34.0456L10.1212 28.1413Z"
                  fill="#FBBC05"
                />
                <path
                  d="M23.4694 9.07688C27.8699 9.07688 30.8622 10.9863 32.5344 12.5725L39.1645 6.11C35.0867 2.32063 29.8061 0 23.4694 0C14.287 0 6.36607 5.2875 2.49362 12.9544L10.0918 18.8588C11.9987 13.1894 17.25 9.07688 23.4694 9.07688Z"
                  fill="#EB4335"
                />
              </svg>
              Login With Google
            </button>
          </div>
        </form>
        <p className="text-center text-[#706F6F] font-medium">
          Don’t Have An Account ?
          <Link to={"/register"} className="text-[#F75B5F] font-bold">
            {" "}
            Register
          </Link>{" "}
        </p>
      </div>
    </div>
  );
};

export default Login;
