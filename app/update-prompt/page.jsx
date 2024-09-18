"use client";
import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Form from '@components/Form';

const EditPrompt = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchParamsComponent />
    </Suspense>
  );
}

const SearchParamsComponent = () => {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({ prompt: '', tag: '' });
  const searchParams = useSearchParams();
  const promptId = searchParams.get('id');

  // Ensure that the useEffect does not trigger continuous re-fetches
  useEffect(() => {
    if (!promptId) return; // Exit if no ID

    const getPromptDetails = async () => {
      const response = await fetch(`/api/prompt/${promptId}`);
      if (!response.ok) {
        console.error("Failed to fetch prompt details:", response.statusText);
        return;
      }
      const data = await response.json();
      setPost({
        prompt: data.prompt,
        tag: data.tag
      });
    };

    getPromptDetails();
  }, [promptId]); // Dependency array includes only promptId

  const updatePrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    if (!promptId) {
      alert("Prompt ID Not Found.");
      setSubmitting(false);
      return;
    }

    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        })
      });

      if (response.ok) {
        router.push('/');
      } else {
        console.error("Failed to update prompt:", response.statusText);
      }
    } catch (error) {
      console.error("Failed to update prompt:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  );
}

export default EditPrompt;

