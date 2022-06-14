import React, { useEffect, useState } from "react";
import s from "./index.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth } from "../../firebase-config";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { changeAuthStatus } from "../../redux/authSlice";

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const auth = useAppSelector<boolean>((state) => state.authSlice.auth);

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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      signInWithEmailAndPassword(firebaseAuth, email, password).then(
        console.log
      );
      dispatch(changeAuthStatus(!auth));
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={s.container}>
      <Link to="/">home</Link>
      <Link to="/register">register</Link>
      <form className={s.registerForm} onSubmit={handleSubmit}>
        <h1>Login Form</h1>
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
        <span className={s.linkToLogin}>
          Don't have an account yet?
          <Link className={s.link} to="/register">
            Register
          </Link>
        </span>
        <button type="submit" className={s.btn}>
          Login
        </button>
      </form>
    </div>
  );
};
