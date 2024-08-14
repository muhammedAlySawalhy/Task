import React, { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { redirect, useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import Button from "../components/Button";
import InputGroup from "../components/InputGroup";
import Spinner from "../components/Spinner";
import { register, reset } from "../features/auth/authSlice";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const { name, email, password, password2 } = formData;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const onChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess) {
      toast.success("Successfully registered");
      navigate("/login");
    }
    dispatch(reset());
  }, [isError, isSuccess, message, navigate, dispatch]);

  const submit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      toast.error("Passwords do not match");
    } else {
      const userData = { name, email, password };
      dispatch(register(userData));
    }
  };

  if (isLoading) return <Spinner />;

  return (
    <div className="h-full flex flex-col p-4 items-center ">
      <section>
        <h1 className="text-4xl flex justify-center p-2">
          <FaUser color="#00b7c6" />
          Register
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
            label="name"
            id="name"
            name="name"
            onChange={onChange}
            required
          />
          <InputGroup
            label="email"
            id="email"
            name="email"
            onChange={onChange}
            required
          />
          <InputGroup
            label="password"
            id="password"
            name="password"
            onChange={onChange}
            required
          />
          <InputGroup
            label="confirm password"
            id="password2"
            name="password2"
            onChange={onChange}
            required
          />
          <Button type="submit">Submit</Button>
        </form>
      </section>
    </div>
  );
}

export default Register;
