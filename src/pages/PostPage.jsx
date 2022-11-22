import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import PostService from '../API/PostService';
import Loader from '../Components/UI/Loader/Loader';
import { useFetching } from '../hooks/useFetching';

const PostPage = () => {
  const params = useParams();
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [fetchPostById, isPostLoaded, postError] = useFetching( async (id) => {
    const response = await PostService.getById(id);
    setPost(response.data);
  });

  const [fetchCommentsPostById, isCommentsLoaded, commentsError] = useFetching( async (id) => {
    const response = await PostService.getCommentsById(id);
    setComments(response.data);
  });

  useEffect(() => {
    fetchPostById(params.id)
    fetchCommentsPostById(params.id)
  },[])

  return (
    <div>
      <h1>You are open post page with ID {params.id}</h1>
      {isPostLoaded
        ? <Loader/>
        : <h2>{post.id} {post.title}</h2>
      }
      <h2>Comments</h2>
      {isCommentsLoaded
        ? <Loader/>
        : <div>{comments.map((c) => 
            <div style={{marginTop:15}}>
              <h4>{c.email}</h4>
              <div>{c.body}</div>
            </div>
        )}</div>
      }
    </div>
  )
}

export default PostPage