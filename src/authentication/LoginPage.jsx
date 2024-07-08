// src/components/LoginPage.jsx
import React, { useState, useEffect } from "react";
import "./Login.css";
import { auth, googleProvider, firestore } from "../firebase-config";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { toast } from "react-toastify";
import { BiArrowBack } from "react-icons/bi";

const LoginPage = () => {
  const [enteredValues, setEnteredValues] = useState({
    email: "",
    password: "",
  });
  const [didEdit, setDidEdit] = useState({
    email: false,
    password: false,
  });
  const [error, setError] = useState("");
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const { logIn } = useAuth();

  const emailIsInvalid = didEdit.email && !enteredValues.email.includes("@");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        enteredValues.email,
        enteredValues.password
      );
      const userDoc = await getDoc(
        doc(firestore, "users", userCredential.user.uid)
      );
      if (userDoc.exists()) {
        const userData = userDoc.data();
        setUserData(userData);
        logIn(userCredential.user);
        toast.success("You have logged in successfully", {
          position: "top-center",
        });
        navigate("/");
      } else {
        toast.info("No user found with this email. Please sign up.", {
          position: "top-center",
        });
        navigate("/signup");
      }
    } catch (error) {
      handleFirebaseError(error);
      console.log(error);
    }
  };

  const handleFirebaseError = (error) => {
    if (error.code === "auth/user-not-found") {
      toast.info("No user found with this email. Please sign up.", {
        position: "top-center",
      });
      navigate("/signup");
    } else if (error.code === "auth/wrong-password") {
      toast.error("Incorrect password.", {
        position: "top-center",
      });
    } else {
      toast.error("An error occurred. Please try again.", {
        position: "top-center",
      });
    }
  };

  const logInWithGoogle = async () => {
    try {
      const userCredential = await signInWithPopup(auth, googleProvider);
      const user = userCredential.user;

      const userDoc = await getDoc(doc(firestore, "users", user.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        setUserData(userData);
        logIn(user);
        toast.success("You have logged in successfully", {
          position: "top-center",
        });
        navigate("/");
      } else {
        toast.info("No user found with this email. Please sign up.", {
          position: "top-center",
        });
        navigate("/signup");
      }
    } catch (err) {
      console.log(err);
    }
  };

  function handleInputChange(identifier, value) {
    setEnteredValues((prevValues) => ({
      ...prevValues,
      [identifier]: value,
    }));
    setDidEdit((prevEdit) => ({
      ...prevEdit,
      [identifier]: false,
    }));
  }

  function handleInputBlur(identifier) {
    setDidEdit((prevEdit) => ({
      ...prevEdit,
      [identifier]: true,
    }));
  }

  function handleReset() {
    setEnteredValues({
      email: "",
      password: "",
    });
    setDidEdit({
      email: false,
      password: false,
    });
    setError("");
  }

  useEffect(() => {
    if (userData) {
      setEnteredValues({
        email: userData.email,
        password: "",
      });
    }
  }, [userData]);

  return (
    <form onSubmit={handleSubmit}>
      <div className="back-arrow" onClick={() => navigate("/")}>
        <BiArrowBack />
      </div>
      <h2 className="login-header">Login</h2>

      <div className="control-row">
        <div className="control no-margin">
          <label htmlFor="email">Email</label>
          <input
            placeholder="Enter your e-mail"
            id="email"
            type="email"
            name="email"
            onChange={(event) => handleInputChange("email", event.target.value)}
            onBlur={() => handleInputBlur("email")}
            value={enteredValues.email}
          />
          <div className="control-error">
            {emailIsInvalid && <p>Please enter a valid email address</p>}
          </div>
        </div>

        <div className="control no-margin">
          <label htmlFor="password">Password</label>
          <input
            placeholder="Enter your password"
            id="password"
            type="password"
            name="password"
            onChange={(event) =>
              handleInputChange("password", event.target.value)
            }
            value={enteredValues.password}
          />
        </div>
      </div>

      <p className="form-actions">
        <button
          type="button"
          className="button button-flat"
          onClick={handleReset}
        >
          Reset
        </button>
        <button type="submit" className="button button-flat">
          Login
        </button>

        <button
          type="button"
          className="button button-flat"
          onClick={logInWithGoogle}
        >
          Sign in with Google
        </button>
      </p>
      <p>
        <button
          type="button"
          className="link-button"
          onClick={() => navigate("/signup")}
        >
          Or Sign Up here
        </button>
      </p>
    </form>
  );
};

export default LoginPage;
