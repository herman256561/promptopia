import React from 'react';
import PromptCard from './PromptCard';

// A Profile component contains PromptCards that shows the posts created by certain creator.
// The parameter "data" is set in /app/profile/page.jsx file. 
// The parameter "data" is obtained by fetching the endpoint /app//api/users/${session?.user.id}/posts/route.js
const Profile = ({name, desc, data, handleEdit, handleDelete}) => {
  
  return (
    <section className='w-full'>
      <h1 className='head_text text-left'><span className='blue_gradient'>{name} Profile</span></h1>
      <p className='desc text-left'>{desc}</p>
      <div className='mt-10 prompt_layout'>
      {data.map((post)=>(
        <PromptCard 
          key = {post._id}
          post = {post}
          handleTagClick={()=>handleTagClick && handleTagClick}
          handleEdit = {()=>handleEdit && handleEdit(post)}
          handleDelete = {()=> handleDelete && handleDelete(post)}
        />)
        )}
    </div>
    </section>
  )
}

export default Profile