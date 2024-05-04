// Inside your component where you have the "Forgot Password" link/button
import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../providers/AuthProviders";

const ForgotPassword = () => {
  const { forgotPassword } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    // console.log(e.currentTarget);
    const form = e.target;
    const email = form.email.value;
    try {
      await forgotPassword(email);
      console.log("Password reset email sent successfully.");
      Swal.fire({
        icon: "success",
        title: "Password reset email sent successfully.",
      });
      navigate(location?.state ? location.state : "/login");
    } catch (error) {
      Swal.fire({
        icon: "success",
        title: `${("Error sending password reset email:", error)}`,
      });
    }
  };

  return (
    <div className="pb-24">
      <div>
        <h1
          className="text-4xl mt-10 font-bold text-center"
          data-aos="fade-down"
        >
          Reset your password!
        </h1>
        <form
          onSubmit={handleForgotPassword}
          className="card-body md:w-3/4 lg:w-1/2 mx-auto"
        >
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
          <div className="form-control mt-4">
            <button className="btn btn-primary">Send Reset Password</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
