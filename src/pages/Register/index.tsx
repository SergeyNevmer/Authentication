import React, { useState } from "react";
import s from "./index.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth } from "../../firebase-config";

export const Register: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [secondPassword, setSecondPassword] = useState<string>("");

  const handleChangeEmail = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setEmail(event.target.value);
  };

  const handleChangePassword = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setPassword(event.target.value);
  };

  const handleChangeSecondPassword = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setSecondPassword(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password !== secondPassword) {
      console.log("password does not match");
      return;
    }

    try {
      await createUserWithEmailAndPassword(firebaseAuth, email, password);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={s.container}>
      <Link to="/">home</Link>
      <Link to="/login">login</Link>
      <form className={s.registerForm} onSubmit={handleSubmit}>
        <h1>Registration Form</h1>
        <div className={s.wrapper}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={handleChangeEmail}
          />
        </div>
        <div className={s.wrapper}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={handleChangePassword}
          />
        </div>
        <div className={s.wrapper}>
          <label htmlFor="confirmPassword">Confirm password</label>
          <input
            id="confirmPassword"
            type="password"
            value={secondPassword}
            onChange={handleChangeSecondPassword}
          />
        </div>
        <span className={s.linkToLogin}>
          Already have an account?
          <Link className={s.link} to="/login">
            Login
          </Link>
        </span>
        <button type="submit" className={s.btn}>
          Register
        </button>
      </form>
    </div>
  );
};
