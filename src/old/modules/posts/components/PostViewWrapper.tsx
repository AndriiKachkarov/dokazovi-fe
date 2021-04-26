import React, { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import { useHistory, useParams } from 'react-router-dom';
import { getPostById } from '../../../lib/utilities/API/api';
import { IPost } from '../../../lib/types';
import PostView from './PostView';
import { sanitizeHtml } from '../../../lib/utilities/sanitizeHtml';
import { PageTitle } from '../../../lib/components/Pages/PageTitle';

const PostViewWrapper: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const history = useHistory();

  const [loadedPost, setLoadedPost] = useState<IPost>();
  const [statusCode, setStatusCode] = useState<number>();

  const fetchPost = useCallback(async () => {
    try {
      const postResponse = await getPostById(Number(postId));
      const { content } = postResponse.data;
      const sanitizedData = {
        ...postResponse.data,
        content: sanitizeHtml(content),
      };
      setLoadedPost(sanitizedData);
    } catch (error) {
      setStatusCode(404);
    }
  }, [postId]);

  const handlePostDeletion = () => {
    if (!loadedPost) return;
    try {
      const response = 1; // Mock by status 1 =  success

      if (response === 1) {
        toast.success(
          `Видалення матеріалу "${loadedPost.title}" пройшло успішно!`,
        );
        history.go(-1);
      }
    } catch (e) {
      toast.success(`Видалити матеріал "${loadedPost.title}" не вдалося.`);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  if (statusCode === 404) {
    history.push('/error_404');
  }

  return (
    <>
      {loadedPost && (
        <>
          <PageTitle title={loadedPost.title} />

          <PostView
            post={loadedPost}
            modificationAllowed
            onDelete={handlePostDeletion}
          />
        </>
      )}
    </>
  );
};

export default PostViewWrapper;