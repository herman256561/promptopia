"use client";
import React from 'react'
import { useState, useEffect } from 'react';
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

  const handleSearchChange = (e) =>{

  }
  const idd = "66c604972020b851d45fcb71";
  const fetchPosts = async () => {
    const response = await fetch(`/api/users/${idd}/posts`);
    if (!response.ok) {
      throw new Error('Failed to fetch: ' + response.statusText);
    }
    const data = await response.json();
    setPosts(data);
  };

  useEffect(() => {
    fetchPosts(); // Initial fetch
  }, []);

  // useEffect(()=>{
    
  //   const fetchPosts = async() => {
  //     const response = await fetch('/api/prompt');
  //     const data = await response.json();
      
  //     setPosts(data);
  //   }
    
  //   fetchPosts();
  // }, []);

  return (
    <section className='feed'>
      <button onClick={fetchPosts} className='text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700'>Refresh Posts</button>
      <PromptCardList 
        data={posts}
        handleTagClick = {()=>{}}
      />
    </section>
  )
}

export default Feed
