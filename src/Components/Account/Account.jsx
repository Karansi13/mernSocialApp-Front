import React, { useEffect, useState } from "react";
import "./Account.css";
import { useDispatch, useSelector } from "react-redux";
import { deleteMyProfile, getMyPosts, logoutUser } from "../../Actions/User";
import Loader from "../Loader/Loader";
import Post from "../Post/Post";
import { Avatar, Button, Dialog, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import User from "../User/User";

import { useAlert } from "react-alert";

const Account = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { user, loading: userLoading } = useSelector((state) => state.user);

  const { loading, error, posts } = useSelector((state) => state.myPosts);

  const { error: likeError, message, loading: deleteLoading } = useSelector((state) => state.like);

  const [followersToggle, setfollowersToggle] = useState(false);
  const [followingToggle, setfollowingToggle] = useState(false);

  const logOutHandler = () => {
    dispatch(logoutUser());
    alert.success("Logged Out Successfully");
  };

  const deleteProfileHandler = async () => {
    await dispatch(deleteMyProfile());
    dispatch(logoutUser());
  }
 
  useEffect(() => {
    dispatch(getMyPosts());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({ type: "clearErrors" });
    }
   
    if (likeError) {
      alert.error(likeError);
      dispatch({ type: "clearErrors" });
    }
    if (message) {
      alert.success(message);
      dispatch({ type: "clearMessage" });
    }
  }, [alert, error, message, likeError, dispatch]);

  return loading === true || userLoading === true ? (
    <Loader />
  ) : (
    <div className="account">
      <div className="accountleft">
        {posts && posts.length > 0 ? (
          posts.map((post) => (
            <Post
            key={post._id}
            postId={post._id}
            caption={post.caption}
            postImage={post.image.url}
            likes={post.likes}
            comments={post.comments}
            ownerImage={post.owner.avatar.url}
            ownerName={post.owner.name}
            ownerId={post.owner._id}
            isAccount={true}
            isDelete={true}
            // page={"false"}
            />
          ))
        ) : (
          <Typography variant="h6" style={{color: "white"}}>You have not made any post</Typography>
        )}
      </div>
      <div className="accountright">
        <Avatar
          src={user.avatar.url}
          sx={{ height: "8vmax", width: "8vmax" , border: "2px solid white"}}
        />

        <Typography variant="h6" style={{ color: "white" }}>{user.name}</Typography>

        <div>
          <button onClick={() => setfollowersToggle(!followersToggle)}>
            <Typography>Followers</Typography>
          </button>
          <Typography style={{ color: "white"}}>{user.followers.length}</Typography>
        </div>
        <div>
          <button onClick={() => setfollowingToggle(!followingToggle)}>
            <Typography>Following</Typography>
          </button>
          <Typography style={{ color: "white"}}>{user.following.length}</Typography>
        </div>
        <div>
          <Typography style={{ color: "white"}}>Posts</Typography>
          <Typography style={{ color: "white"}}>{user.posts.length}</Typography>
        </div>

        <Button variant="contained" onClick={logOutHandler}>
          Logout
        </Button>

        <Link to="/update/profile">Edit Profile</Link>
        <Link to="/update/password">Change Password</Link>

        <Button
          variant="text"
          style={{ color: "red", margin: "2vmax" }}
          onClick={deleteProfileHandler}
          disabled={deleteLoading}
        >
          Delete My Profile
        </Button>

        <Dialog
          open={followersToggle}
          onClose={() => setfollowersToggle(!followersToggle)}
        >
          <div className="DialogBox">
            <Typography variant="h4">Followers</Typography>
            {user && user.followers.length > 0 ? (
              user.followers.map((follower) => (
                <User
                  key={follower._id}
                  userId={follower._id}
                  name={follower.name}
                  avatar={follower.avatar.url}
                />
              ))
            ) : (
              <Typography style={{ margin: "2vmax" }}>
                You have no followers
              </Typography>
            )}
          </div>
        </Dialog>

        <Dialog
          open={followingToggle}
          onClose={() => setfollowingToggle(!followingToggle)}
        >
          <div className="DialogBox">
            <Typography variant="h4">Following</Typography>
            {user && user.following.length > 0 ? (
              user.following.map((follow) => (
                <User
                  key={follow._id}
                  userId={follow._id}
                  name={follow.name}
                  avatar={follow.avatar.url}
                />
              ))
            ) : (
              <Typography style={{ margin: "2vmax" }}>
                You are not following anyone!
              </Typography>
            )}
          </div>
        </Dialog>
      </div>
    </div>
  );
};

export default Account;
