/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import blogFetch from '../axios/config';
import { useParams } from 'react-router-dom';

import './Post.css';

const Post = () => {

  const [post, setPost] = useState({});

  const { id } = useParams();

  const getPost = async () => {
    try {
      const response = await blogFetch.get(`/posts/${id}`);

      const data = response.data;

      setPost(data)

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPost();
  },[]);

  return (
    <div className='post-conatiner'>
      {!post.title ? (
        <p>Carregando...</p>
      ) : (
        <div className='posts'>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
        </div>
      )}
    </div>
  );
};

export default Post;
