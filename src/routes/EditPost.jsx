/* eslint-disable react-hooks/exhaustive-deps */
import blogFetch from '../axios/config';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const EditPost = () => {

  const [title, setTitle] = useState();
  const [body, setBody] = useState();

  const { id } = useParams()

  const getPost = async () => {
    try {
      const response = await blogFetch.get(`/posts/${id}`);

      const data = response.data;

      setTitle(data.title);
      setBody(data.body);

    } catch (error) {
      console.log(error);
    }
  };

  const editarPost = async (e) => {
    e.preventDefault()
    console.log("editando");

    const post = { title, body, userId: 1 };

    await blogFetch.put(`/posts/${id}`,{body: post})
  }
  
  useEffect(() => {
    getPost();
  }, []);
  
  return (
    <div className='new-post'>
      <h1>Editando:</h1>
      <h2>{title}</h2>
      <form onSubmit={(e) => editarPost(e)}>
        <div className='form-control'>
          <label htmlFor='title'>Título:</label>
          <input
            type='text'
            name='title'
            id='title'
            placeholder='Digite o título'
            onChange={(e) => setTitle(e.target.value)}
            value={title || ""}
          />
        </div>
        <div className='form-control'>
          <label htmlFor='body'>Conteúdo:</label>
          <textarea
            name='body'
            id='body'
            placeholder='Digite o conteúdo'
            onChange={(e) => setBody(e.target.value)}
            value={body || ""}
          ></textarea>
        </div>
        <input type='submit' value='Salvar Post' className='btn' />
      </form>
    </div>
  )
}

export default EditPost
