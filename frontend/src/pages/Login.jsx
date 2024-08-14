import React, { useEffect, useState } from "react";
import { FaSign } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "../components/Button";
import InputGroup from "../components/InputGroup";
import Spinner from "../components/Spinner";

import { login, reset } from "../features/auth/authSlice";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { user, isloading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess || user) {
      if (user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    }
    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);
  const onChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const submit = (e) => {
    e.preventDefault();
    dispatch(login(formData));
  };
  if (isloading) return <Spinner />;
  return (
    <div className="h-full flex flex-col p-4 items-center ">
      <section>
        <h1 className="text-4xl flex justify-center p-2">
          <FaSign color="#00b7c6" />
          Login
        </h1>
        <p className="text-gray-500 text-lg">Please Create an Account</p>
        <hr />
      </section>

      <section>
        <form
          className="flex rounded-md flex-col p-10 m-10 bg-gray-50 shadow-md"
          onSubmit={submit}
        >
          <InputGroup
            label="email"
            id="email"
            name={"email"}
            onChange={onChange}
            required
          />
          <InputGroup
            label="passwod"
            id="password"
            name={"password"}
            onChange={onChange}
            required
          />

          <Button type="submit">Submit</Button>
        </form>
      </section>
    </div>
  );
}
export default Login;
