import { FaArrowRight, FaSignInAlt, FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

import { Link, useNavigate } from "react-router-dom";
import { logout, reset } from "../features/auth/authSlice";

export const Header = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/register");
  };
  return (
    <header className="bg-gray-100 flex justify-between items-center p-2 shadow-md">
      <div className="ml-8">
        <Link className="no_underline" to="/">
          CHAT APP
        </Link>
      </div>
      <ul className="flex justify-items-end gap-4 mr-4">
        {!user ? (
          <>
            <li className="mr-2">
              <Link className="no_underline" to="/login">
                <FaSignInAlt /> Login
              </Link>
            </li>
            <li className="mr-2">
              <Link className="no_underline" to="/register">
                <FaUser /> Register
              </Link>
            </li>
          </>
        ) : (
          <li className="mr-2">
            <button onClick={onLogout}>
              <FaArrowRight /> Logout
            </button>
          </li>
        )}
      </ul>
    </header>
  );
};
