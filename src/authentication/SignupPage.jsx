import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { auth, googleProvider, firestore } from "../firebase-config";
import { doc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { toast } from "react-toastify";
import { BiArrowBack } from "react-icons/bi";

export default function Signup() {
  const [passwordsAreNotEqual, setPasswordsAreNotEqual] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const { logIn } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setPasswordsAreNotEqual(true);
      return;
    }
    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (userCredential.user) {
        // Store user data in Firestore
        await setDoc(doc(firestore, "users", userCredential.user.uid), {
          email: userCredential.user.email,
          // Add more fields as needed
        });

        // Log in the user and redirect
        logIn(userCredential.user);
        toast.success("You have successfully signed up", {
          position: "top-center",
        });
        navigate("/");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const logInWithGoogle = async () => {
    try {
      const userCredential = await signInWithPopup(auth, googleProvider);
      if (userCredential.user) {
        // Store user data in Firestore
        await setDoc(doc(firestore, "users", userCredential.user.uid), {
          email: userCredential.user.email,
          displayName: userCredential.user.displayName || "",
          // Add more fields as needed
        });

        // Log in the user and redirect
        logIn(userCredential.user);
        toast.success("You have logged in successfully", {
          position: "top-center",
        });
        navigate("/");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="back-arrow" onClick={() => navigate("/")}>
        <BiArrowBack />
      </div>
      <h2 className="login-header">Welcome on board!</h2>
      <p className="login-header">
        We just need a little bit of data from you to get you started 🚀
      </p>
      <br></br>
      <div className="control">
        <label htmlFor="email">Email</label>
        <input
          placeholder="Enter your e-mail"
          id="email"
          type="email"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="control-row">
        <div className="control">
          <label htmlFor="password">Password</label>
          <input
            placeholder="Enter your password"
            id="password"
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
          />
        </div>

        <div className="control">
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            placeholder="Re-enter your password"
            id="confirm-password"
            type="password"
            name="confirm-password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <div className="control-error">
            {passwordsAreNotEqual && <p>Passwords must match</p>}
          </div>
        </div>
      </div>

      <p className="form-actions">
        <button type="reset" className="button button-flat">
          Reset
        </button>
        <button type="submit" className="button button-flat">
          Sign up
        </button>
        <button
          type="button"
          className="button button-flat"
          onClick={logInWithGoogle}
        >
          Sign in with Google
        </button>
      </p>
      <button
        type="button"
        className="link-button"
        onClick={() => navigate("/login")}
      >
        Already created an account? Click here
      </button>
    </form>
  );
}
