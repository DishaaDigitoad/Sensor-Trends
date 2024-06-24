import React, { useState } from "react";
import { auth, googleProvider } from "../firebase-config";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { toast } from "react-toastify";
import "./Login.css";

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

  const { logIn } = useAuth(); // Get logIn function from context
  const navigate = useNavigate();

  const emailIsInvalid = didEdit.email && !enteredValues.email.includes("@");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        enteredValues.email,
        enteredValues.password
      );
      logIn(userCredential.user); // Log in the user
      toast.success("You have logged in successfully", {
        position: "top-center",
      });
      navigate("/"); // Redirect to home or another page
    } catch (error) {
      handleFirebaseError(error);
      console.log(error);
    }
  };

  const handleFirebaseError = (error) => {
    if (error.code === "auth/user-not-found") {
      setError("No user found with this email.");
    } else if (error.code === "auth/wrong-password") {
      setError("Incorrect password.");
    } else {
      setError("An error occurred. Please try again.");
    }
  };
  const logInWithGoogle = async () => {
    try {
      const userCredential = await signInWithPopup(auth, googleProvider);
      logIn(userCredential.user); // Log in the user
      toast.success("You have logged in successfully", {
        position: "top-center",
      });
      navigate("/"); // Redirect to home or another page
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

  return (
    <form onSubmit={handleSubmit}>
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
        <button type="submit" className="button button-flat" onClick={logIn}>
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
