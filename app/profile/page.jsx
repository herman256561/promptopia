"use client";

import {useState, useEffect} from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Profile from '@components/Profile';

const MyProfile = () => {
    const router = useRouter();
    const {data:session} = useSession();

    const [posts, setPosts] = useState([]);
    // To get the prompts that is created by current signed in user
    useEffect(()=>{
        const fetchPosts = async() => {
          const response = await fetch(`/api/users/${session?.user.id}/posts`);
          const data = await response.json();
          setPosts(data);
        }
        
        if(session?.user.id) fetchPosts();
      }, []);
  
  // handle the update of the prompt
  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  }
  // handle the deletion of the prompt
  const handleDelete = async(post) => {
    const hasConfirmed = confirm("Are you sure to delete this prompt?");

    if(hasConfirmed){
        try {
            await fetch(`/api/prompt/${post._id.toString()}`, {
                method: 'DELETE'
            });
            const filteredPosts = posts.filter((p)=> p._id !== post._id );

            setPosts(filteredPosts);
        } catch (error) {
            console.log(error);
        }
    }

  }

  // handleEdit and handleDelete will be passed to Profile component and then passed to PromptCard component.
  return (
    <Profile 
        name = "My"
        desc = "Welcome to your personalized profile page"
        data = {posts}
        handleEdit = {handleEdit}
        handleDelete = {handleDelete}
    />
  )
}

export default MyProfile;