import { signOut } from "firebase/auth";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import auth from "../firebase.init";
import Loading from "./Loading";

const MainNav = () => {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="navbar bg-base-300 mb-5">
      <div className="container mx-auto">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost normal-case text-xl">
            Todo List
          </Link>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal p-0">
            <li>
              {!user ? (
                <Link to="login">Login</Link>
              ) : (
                <button onClick={() => signOut(auth)}>Logout</button>
              )}
            </li>

            {!user && (
              <li>
                <Link to="signup">Signup</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MainNav;
