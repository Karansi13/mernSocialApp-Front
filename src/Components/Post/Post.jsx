import React, { useEffect, useState } from 'react';
import {
    MoreVert,
    Favorite,
    FavoriteBorder,
    ChatBubbleOutline,
    DeleteOutline,
  } from "@mui/icons-material";
import { Avatar, Button, Typography, Dialog } from '@mui/material';
import { Link } from 'react-router-dom';
import "./Post.css"
import { useDispatch, useSelector } from 'react-redux';
import { addCommentOnPost, deletePost, likePost, updatePost } from '../../Actions/Post';
import { getFollowingPosts, getMyPosts, loadUser } from '../../Actions/User';
import User from '../User/User';
import CommentCard from '../CommentCard/CommentCard';

const Post = ({
  postId,
  caption,
  postImage,
  likes = [],
  comments = [],
  ownerImage,
  ownerName,
  ownerId,
  isDelete = false,
  isAccount = false,
  // page = "false"
}) => {

  const [ liked, setLiked ] = useState(false);
  // console.log(liked);
  const [ likesUser, setLikesUser ] = useState(false);
  const [ commentValue, setCommentValue ] = useState("");
  const [ commentToggle, setcommentToggle] = useState(false);

  const [ captionValue, setCaptionValue] = useState(caption);
  const [ captionToggle, setCaptionToggle] = useState(false);

  const dispatch = useDispatch();
  const  {user} = useSelector(state => state.user)


  const handlelike = async () => {
    setLiked(!liked)

    await dispatch(likePost(postId));

    if(isAccount){
      dispatch(getMyPosts())
    }
    else{

      dispatch(getFollowingPosts());
    }

    // if(page){
    //   dispatch(getUserPosts());
    // } else{
    //   dispatch(getFollowingPosts())
    // }

  }

  const addCommentHandler = async (e) => {
    // console.log("Add Comment");
    e.preventDefault()
    await dispatch(addCommentOnPost(postId, commentValue))

    if(isAccount){
      dispatch(getMyPosts())
    }
    else{

      dispatch(getFollowingPosts());
    }
  }

  const updateCaptionHandler = (e) => {
    e.preventDefault()
    dispatch(updatePost(captionValue, postId));
    dispatch(getMyPosts())
  }

  const deletePostHandler = async () => {
    await dispatch(deletePost(postId));
    dispatch(getMyPosts());
    dispatch(loadUser())
  }

  useEffect(()=> {
    likes.forEach(item => {
      if(item._id === user._id){
        setLiked(true)
      }
    })
  }, [likes, user._id])
  

  return (
    <div className="post">
      <div className="postHeader">
        {isAccount ? (
          <Button onClick={() => setCaptionToggle(!captionToggle)} >
            <MoreVert />
          </Button>
        ) : null}
        <img src={postImage} alt="Post" />

      </div>

      <div className="postDetails">

        <Avatar
          src={ownerImage}
          alt="User"
          sx={{
            height: "3vmax",
            width: "3vmax",
          }}
        />

        <Link to={`/user/${ownerId}`}>
          <Typography fontWeight={700}>{ownerName}</Typography>
        </Link>

        <Typography
          fontWeight={500}
          color="rgba(0, 0, 0, 0.799)"
          style={{ alignSelf: "center" }}
        >
          {caption}
        </Typography>
      </div>
      <button
        style={{
          border: "none",
          backgroundColor: "rgb(206 206 206)",
          cursor: "pointer",
          margin: "1vmax 2vmax",
        }}

        onClick={() => setLikesUser(!likesUser)}
        disabled={likes.length === 0 ? true : false}
      >
        <Typography>{likes.length} Likes</Typography>
      </button>

      <div className="postFooter">
        <Button onClick={handlelike}>
        {
          liked ? <Favorite style={{color: "red"}}/> : <FavoriteBorder />
        }
          
        </Button>

        <Button onClick={() => setcommentToggle(!commentToggle)}>
          <ChatBubbleOutline />
        </Button>

        {isDelete ? (
          <Button onClick={deletePostHandler}>
            <DeleteOutline />
          </Button>
        ) : null}
      </div>

          <Dialog open={likesUser} onClose={() => setLikesUser(!likesUser)}>
          <div className="DialogBox">
            <Typography variant='h4'>Liked By</Typography>
            {
              likes.map(like => (
                <User
                key={user._id}
                  userId={like._id}
                  name={like.name}
                  avatar={like.avatar.url}
                />
              ))
            }
          </div>
          </Dialog>

          <Dialog open={commentToggle} onClose={() => setcommentToggle(!commentToggle)}>
          <div className="DialogBox">
            <Typography variant='h4'>Comments</Typography>

            <form className='commentForm' onSubmit={addCommentHandler}> 

            <input type="text" value={commentValue} 
            onChange={(e) => setCommentValue(e.target.value)}
            placeholder='Comment Here..'
            required
            />

            <Button type='submit' variant='contained'>
              Add
            </Button>

            </form>

            {
              comments.length > 0 ? comments.map((item) => 
                <CommentCard 
                key={item._id}
                userId={item.user._id} // database me id save h but hum populate use krchuke h to user ke andr id nikalna padega
                name={item.user.name}
                avatar={item.user.avatar.url}
                comment={item.comment}
                commentId={item._id}
                postId={postId} 
                isAccount={isAccount}  // bydefault false hai
                // page={page}
                />
              ) : <Typography>No Comments Yet</Typography>
            }

          </div>
          </Dialog>


          <Dialog open={captionToggle} onClose={() => setCaptionToggle(!captionToggle)}>
          <div className="DialogBox">
            <Typography variant='h4'>Update Caption</Typography>

            <form className='commentForm' onSubmit={updateCaptionHandler}> 

            <input type="text" value={captionValue} 
            onChange={(e) => setCaptionValue(e.target.value)}
            placeholder='Caption Here..'
            required
            />

            <Button type='submit' variant='contained'>
              Update
            </Button>

            </form>



          </div>
          </Dialog>
    </div>
  )
}

export default Post
