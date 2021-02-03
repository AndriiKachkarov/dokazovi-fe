import { useSelector } from 'react-redux';
import { IPost } from '../types';
import { RootStateType } from '../../store/rootReducer';

const usePostPreviewData = () => {
  const { user } = useSelector((state: RootStateType) => state.currentUser);

  const post = {
    author: {
      ...user,
    },
    id: 0, // mock post id, new posts id will be generated by the server
    createdAt: new Date().toLocaleDateString('en-GB').split('/').join('.'),
    title: '',
  } as IPost;

  return post;
};

export default usePostPreviewData;
