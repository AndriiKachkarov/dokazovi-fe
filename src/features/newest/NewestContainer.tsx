import React, { useEffect, useState } from 'react';
import { useStyles } from './NewestContainer.style';
import { LoadingStatusEnum, LoadingStatusType } from '../../old/lib/types';
import { NewestPostsList } from './newestPostsList/NewestPostsList';
import {
  NewestPostResponseType,
  NewestTypeEnum,
} from '../../old/lib/utilities/API/types';
import { getNewestPosts } from '../../old/lib/utilities/API/api';

export const NewestContainer: React.FC = () => {
  const EXPERT_OPINION_POSTS_LIST_TITLE = 'Думки експертів';
  const MEDIA_POSTS_LIST_TITLE = 'Медитека';
  const TRANSLATION_POSTS_LIST_TITLE = 'Переклади';
  const VIDEO_POSTS_LIST_TITLE = 'Відео';
  const classes = useStyles();
  const [postsSets, setPostsSets] = useState<NewestPostResponseType[]>([]);
  const [loadingStatus, setLoadingStatus] = useState<LoadingStatusType>(
    LoadingStatusEnum.pending,
  );

  useEffect(() => {
    getNewestPosts()
      .then((res): void => {
        setPostsSets(res.data.content);
        setLoadingStatus(LoadingStatusEnum.succeeded);
      })
      .catch((): void => {
        setLoadingStatus(LoadingStatusEnum.failed);
      });
  }, []);

  return (
    <>
      <div className={classes.container}>
        <NewestPostsList
          loadingStatus={loadingStatus}
          postsListTitle={EXPERT_OPINION_POSTS_LIST_TITLE}
          postsListPath="materials?origins=1"
          postsList={
            postsSets[NewestTypeEnum.EXPERT_OPINION] &&
            postsSets[NewestTypeEnum.EXPERT_OPINION].postDTOS
          }
        />
        <NewestPostsList
          loadingStatus={loadingStatus}
          postsListTitle={MEDIA_POSTS_LIST_TITLE}
          postsListPath="materials?origins=2"
          postsList={
            postsSets[NewestTypeEnum.MEDIA] &&
            postsSets[NewestTypeEnum.MEDIA].postDTOS
          }
        />
        <NewestPostsList
          loadingStatus={loadingStatus}
          postsListTitle={TRANSLATION_POSTS_LIST_TITLE}
          postsListPath="materials?origins=3"
          postsList={
            postsSets[NewestTypeEnum.TRANSLATION] &&
            postsSets[NewestTypeEnum.TRANSLATION].postDTOS
          }
        />
        <NewestPostsList
          loadingStatus={loadingStatus}
          postsListTitle={VIDEO_POSTS_LIST_TITLE}
          postsListPath="materials?types=2"
          postsList={
            postsSets[NewestTypeEnum.VIDEO] &&
            postsSets[NewestTypeEnum.VIDEO].postDTOS
          }
        />
      </div>
    </>
  );
};
