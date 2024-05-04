import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../hooks/useAuth";

const Register = () => {
  const { createUser, signInGoogle } = useAuth();
  const navigate = useNavigate();

  const [registerError, setRegisterError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();
    // console.log(e.currentTarget);
    const form = e.target;
    const terms = form.terms.checked;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const Confirm = form.Confirm.value;

    // reset error & success
    setRegisterError("");
    setSuccess("");

    // validition of password and term
    if (password.length < 6) {
      setRegisterError("Password should be at least 6 characters or longer!");
      return;
    } else if (!/^(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).+$/.test(password)) {
      setRegisterError(
        "Your password should have at least one uppercase and one special character!"
      );
      return;
    } else if (!terms) {
      setRegisterError("Please Accept Our Terms and Condition!");
      return;
    } else if (!name) {
      setRegisterError("please provide your Name");
    } else if (password != Confirm) {
      setRegisterError("Password and Confirm password do not match");
    }

    // create User
    createUser(email, password)
      .then((result) => {
        console.log(result.user);
        setSuccess("User Created Successfully");
        const user = { name, email, password };
        fetch("https://brain-op-server.vercel.app/users", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(user),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.insertedId) {
              console.log("User Added in DataBase");
              // success alert
              Swal.fire({
                icon: "success",
                title: "User Created Successfully",
              });
            }
          });

        navigate("/postlisting");
      })
      .catch((error) => {
        setRegisterError(error.message);
        //  error alert
        Swal.fire({
          icon: "error",
          title: `${error.message}`,
        });
      });
  };

  const handleGoogleSignIn = () => {
    signInGoogle()
      .then((result) => {
        console.log(result.user);
        const email = result?.user?.email;
        const displayName = result?.user?.displayName;
        const photoURL = result?.user?.photoURL;
        const user = { email, displayName, photoURL };
        console.log(user);
        fetch("https://brain-op-server.vercel.app/user", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(user),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.insertedId) {
              // console.log('User Added in DataBase')
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
      <div className="">
        <h1
          className="text-4xl mt-10 font-bold text-center"
          data-aos="fade-down"
        >
          Register your account!
        </h1>
        <form
          onSubmit={handleRegister}
          className="card-body md:w-3/4 lg:w-1/2 mx-auto"
        >
          {registerError && <p className="text-red-700">{registerError}</p>}
          {success && <p className="text-green-700">{success}</p>}
          <div className="form-control " data-aos="fade-left">
            <label className="label">
              <span className="label-text">Your Name</span>
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              className="input input-bordered bg-slate-200"
              required
            />
          </div>
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
          </div>
          <div className="form-control relative" data-aos="fade-left">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="Confirm"
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
          </div>

          <div className="flex gap-2 my-1">
            <input type="checkbox" name="terms" id="terms" />
            <label htmlFor="terms">
              <a href="#">Acceept our Terms and Condition</a>
            </label>
          </div>
          <div className="form-control mt-4">
            <button className="btn btn-primary">Register</button>
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
          Already Have An Account ?
          <Link to={"/login"} className="text-[#F75B5F] font-bold">
            {" "}
            Login Now!
          </Link>{" "}
        </p>
      </div>
    </div>
  );
};

export default Register;
