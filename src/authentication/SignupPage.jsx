import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { auth, googleProvider } from "../firebase-config";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { toast } from "react-toastify";
export default function Signup() {
  const [passwordsAreNotEqual, setPasswordsAreNotEqual] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");

  const { logIn } = useAuth(); // Get logIn function from context
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      createUserWithEmailAndPassword(auth, email, password, fname, lname).then(
        async (result) => {
          console.log(result);
          if (result.user) {
            toast.success("You have successfully signed up", {
              position: "top-center",
            });
            window.location.href = "/";
          }
        }
      );
    } catch (error) {
      console.log(error.message);
    }
    const fd = new FormData(event.target);
    const data = Object.fromEntries(fd.entries());
    if (data.password !== data["confirm-password"]) {
      setPasswordsAreNotEqual(true);
      return;
    }
  };
  const logInWithGoogle = async () => {
    try {
      const userCredential = await signInWithPopup(auth, googleProvider);
      logIn(userCredential.user); // Log in the user
      toast.success("You have logged in successfully", {
        position: "top-center",
      });
      window.location.href = "/"; // Redirect to home or another page
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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
            placeholder="Re-enter you password"
            id="confirm-password"
            type="password"
            name="confirm-password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="control-error">
            {passwordsAreNotEqual && <p>Passwords must match</p>}
          </div>
        </div>
      </div>

      <hr />

      <div className="control-row">
        <div className="control">
          <label htmlFor="first-name">First Name</label>
          <input
            placeholder="Enter your first name"
            type="text"
            id="first-name"
            name="first-name"
            onChange={(e) => setFname(e.target.value)}
            required
          />
        </div>

        <div className="control">
          <label htmlFor="last-name">Last Name</label>
          <input
            placeholder="Enter your second name"
            type="text"
            id="last-name"
            name="last-name"
            onChange={(e) => setLname(e.target.value)}
            required
          />
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
