import React, { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { firebaseAuth } from "../../firebase-config";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { changeAuthStatus } from "../../redux/authSlice";

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState<string>("");
  const auth = useAppSelector<boolean>((state) => state.authSlice.auth);

  useEffect(() => {
    if (!auth) navigate("/login");

    onAuthStateChanged(firebaseAuth, (user: any): void => {
      setEmail(user?.email);
    });
  });

  const logOut = (): void => {
    try {
      signOut(firebaseAuth);
      dispatch(changeAuthStatus(!auth));
    } catch (error) {
      console.log(error);
    }
  };

  return auth ? (
    <>
      <Link to="/login">login</Link>
      <Link to="/register">register</Link>
      <h1>Home page</h1>
      <button onClick={logOut}>Log out {email}</button>
    </>
  ) : null;
};
