import React, { useState } from "react";
import loginIcons from "../assets/signin.gif";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import imageTobase64 from "../helpers/imageTobase64";
import SummaryApi from "../common";
import { toast } from "react-toastify";

const SignUp = () => {
  const [showPasswrod, setShowPassword] = useState(false);
  const [showConfirmPasswrod, setShowConfirmPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
    profilePic: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (data.password === data.confirmPassword) {
      const res = await fetch(SummaryApi.signUP.url, {
        method: SummaryApi.signUP.method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const api = await res.json();
      if (api.success) {
        toast.success(api.message);
        navigate("/login");
      }
      if (api.error) {
        toast.error(api.message);
      }
    } else {
      toast.error("Please check password and confirm password");
    }
  };

  const handleUploadPic = async (e) => {
    const file = e.target.files[0];
    const imagePic = await imageTobase64(file);
    setData((preve) => {
      return {
        ...preve,
        profilePic: imagePic,
      };
    });
  };

  return (
    <section id="signup">
      <div className="mx-auto container p-4">
        <div className="bg-white p-5 w-full max-w-sm mx-auto shadow-2xl">
          <div className="w-20 h-20 mx-auto relative overflow-hidden rounded-full">
            <div>
              <img src={data.profilePic || loginIcons} alt="login icon" />
            </div>
            <form>
              <label>
                <div className="text-xs bg-opacity-80 bg-slate-200 pb-4 pt-2 cursor-pointer text-center absolute bottom-0 w-full">
                  Upload photo
                </div>
                <input
                  type="file"
                  className="hidden"
                  onChange={handleUploadPic}
                />
              </label>
            </form>
          </div>

          <form className="pt-6 flex flex-col gap-2" onSubmit={handleSubmit}>
            <div className="grid">
              <label>Name :</label>
              <div className="bg-slate-100 p-2">
                <input
                  type="name"
                  placeholder="Enter your name"
                  className="w-full h-full outline-none bg-transparent"
                  required
                  name="name"
                  value={data.name}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="grid">
              <label>Email :</label>
              <div className="bg-slate-100 p-2">
                <input
                  type="email"
                  placeholder="Enter Email"
                  className="w-full h-full outline-none bg-transparent"
                  required
                  name="email"
                  value={data.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label>Password :</label>
              <div className="bg-slate-100 p-2 flex">
                <input
                  type={showPasswrod ? "text" : "password"}
                  placeholder="Enter Password"
                  className="w-full h-full outline-none bg-transparent"
                  required
                  name="password"
                  value={data.password}
                  onChange={handleChange}
                />
                <div
                  className="cursor-pointer text-xl"
                  onClick={() => setShowPassword((preveious) => !preveious)}
                >
                  <span>{showPasswrod ? <FaEyeSlash /> : <FaEye />}</span>
                </div>
              </div>
            </div>

            <div>
              <label>Confirm Password :</label>
              <div className="bg-slate-100 p-2 flex">
                <input
                  type={showConfirmPasswrod ? "text" : "password"}
                  placeholder="Enter Confirm Password"
                  className="w-full h-full outline-none bg-transparent"
                  required
                  name="confirmPassword"
                  value={data.confirmPassword}
                  onChange={handleChange}
                />
                <div
                  className="cursor-pointer text-xl"
                  onClick={() =>
                    setShowConfirmPassword((preveious) => !preveious)
                  }
                >
                  <span>
                    {showConfirmPasswrod ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              </div>
            </div>

            <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6 ">
              Sign up
            </button>
          </form>
          <p className="my-5">
            Already have account ?
            <Link
              to={"/login"}
              className="text-red-600 hover:text-red-700 hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
