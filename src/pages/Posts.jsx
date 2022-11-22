import React, { useEffect, useState } from "react";
import PostForm from "../Components/PostForm";
import PostList from "../Components/PostList";
import PostFilter from "../Components/PostFilter";
import '../styles/App.css';
import MyModal from "../Components/UI/myModal/MyModal";
import MyButton from "../Components/UI/button/MyButton";
import { usePosts } from "../hooks/usePost";
import PostService from "../API/PostService";
import Loader from "../Components/UI/Loader/Loader";
import { useFetching } from "../hooks/useFetching";
import {getPageCount} from "../utils/pages"
import Pagination from "../Components/UI/pagination/Pagination";

function Posts() {

  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({sort: '', query: ''});
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
  const [modal, setModal] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);

  const [fetchPosts, isLoaded, postError] = useFetching(async () => {
    const response = await PostService.getAll(limit, page);
    setPosts(response.data);
    const totalCount = response.headers['x-total-count'];
    setTotalPages(getPageCount(totalCount, limit));
  });

  useEffect(()=>{
    fetchPosts()
  }, [page])

  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
    setModal(false)
  }

  const removePost = (post) => {
    setPosts([...posts.filter((p) => p.id !== post.id)])
  }

  const changePage = (p) => {
    setPage(p);
  }

  return (
    <div className="App">
      <button onClick={fetchPosts}>Get Posts</button>
      <MyButton style={{marginTop: 30}} onClick={()=>{setModal(true)}}>
        Create Post
      </MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost}/>
      </MyModal>
      <hr style={{margin: '15px 0'}}></hr>
      <PostFilter filter={filter} setFilter={setFilter}/>
      {
        postError&&
        <h2>Error {postError}</h2>
      }
      {
        isLoaded ? 
          <div style={{display:'flex', justifyContent:'center', marginTop:50}}>
            <Loader/>
          </div>
        :
          <PostList remove={removePost} posts={sortedAndSearchedPosts} title='Список постов Java Script'/>
      }
      <Pagination totalPages={totalPages} page={page} changePage={changePage}/>
    </div>
  );
}

export default Posts;