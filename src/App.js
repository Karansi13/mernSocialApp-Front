import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header/Header.jsx";
import Login from "./Components/Login/Login.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { loadUser } from "./Actions/User";
import Home from "./Components/Home/Home.jsx";
import Account from "./Components/Account/Account.jsx";
import NewPost from "./Components/NewPost/NewPost.jsx";
import Register from "./Components/Register/Register.jsx";
import UpdateProfile from "./Components/UpdateProfile/UpdateProfile.jsx";
import UpdatePassword from "./Components/UpdatePassword/UpdatePassword.jsx";
import ForgotPassword from "./Components/ForgotPassword/ForgotPassword.jsx";
import ResetPassword from "./Components/ResetPassword/ResetPassword.jsx";
import UserProfile from "./Components/UserProfile/UserProfile.jsx";
import Search from "./Components/Search/Search.jsx";
import NotFound from "./Components/NotFound/NotFound.jsx";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  const { isAuthenticated } = useSelector((state) => state.user);

  return (
    <Router>
      {isAuthenticated && <Header />}
      <Routes>
        <Route path="/" element={isAuthenticated ? <Home /> : <Login />} />
        <Route
          path="/account"
          element={isAuthenticated ? <Account /> : <Login />}
        />
        <Route
          path="/newpost"
          element={isAuthenticated ? <NewPost /> : <Login />}
        />
        <Route
          path="/register"
          element={isAuthenticated ? <Account /> : <Register />}
          />
        <Route
          path="/update/profile"
          element={isAuthenticated ? <UpdateProfile /> : <Login />}
          />
        <Route
          path="/update/password"
          element={isAuthenticated ? <UpdatePassword/> : <Login />}
          />
        <Route
          path="/forgot/password"
          element={isAuthenticated ? <UpdatePassword/> : <ForgotPassword />}
          />
        <Route
          path="/password/reset/:token"
          element={isAuthenticated ? <UpdatePassword/> : <ResetPassword />}
          />
        <Route
          path="/user/:id"
          element={isAuthenticated ? <UserProfile/> : <Login />}
          />
          <Route path="/search" element={isAuthenticated ? <Search /> : <Login />} />

          <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
