"use client";
import React from 'react'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import PromptCard from './PromptCard';

const PromptCardList = ({data, handleTagClick}) => {
  
  return (
    <div className='mt-16 prompt_layout'>
      {data.map((post)=>{
        return(<PromptCard 
          key = {post._id}
          post = {post}
          handleTagClick = {handleTagClick}
        />)
        })}
    </div>
  )
}

const Feed = () => {
  const [searchText, setSearchText] = useState('');
  const [posts, setPosts] = useState([]);
  const router = useRouter;
  const handleSearchChange = (e) =>{

  }

  useEffect(()=>{
    
    const fetchPosts = async() => {
      const response = await fetch('/api/prompt');
      const data = await response.json();
      
      setPosts(data);
    }
    
    fetchPosts();
  }, [router.asPath]);

  return (
    <section className='feed'>

      <PromptCardList 
        data={posts}
        handleTagClick = {()=>{}}
      />
    </section>
  )
}

export default Feed

{/* <form className='relative w-full flex-center'>
<input 
  type="text"
  placeholder='Search for prompts'
  value={searchText}
  onChange={handleSearchChange}
  required
  className='search_input peer'
/>
</form> */}