import React from 'react';
import { IPostPreviewCardProps } from './types';
import { MediaPostPreviewCard } from './MediaPostPreviewCard/MediaPostPreviewCard';
import { TranslationPostPreviewCard } from './TranslationPostPreviewCard/TranslationPostPreviewCard';
import { ExpertOpinionPostPreviewCard } from './ExpertOpinionPostPreviewCard/ExpertOpinionPostPreviewCard';
import { VideoPostPreviewCard } from './VideoPostPreviewCard/VideoPostPreviewCard';

export const PostPreviewCard: React.FC<IPostPreviewCardProps> = ({
  post,
  shouldNotUseLink,
}) => {
  const EXPERT_OPINION_TYPE = 1;
  const VIDEO_TYPE = 2;
  const MEDIA_OPINION_TYPE = 2;
  const TRANSLATION_OPINION_TYPE = 3;

  switch (true) {
    case post.type && post.type.id === VIDEO_TYPE:
      return (
        <VideoPostPreviewCard post={post} shouldNotUseLink={shouldNotUseLink} />
      );
    case post.origins &&
      post.origins[0] &&
      post.origins[0].id === MEDIA_OPINION_TYPE:
      return (
        <MediaPostPreviewCard post={post} shouldNotUseLink={shouldNotUseLink} />
      );
    case post.origins &&
      post.origins[0] &&
      post.origins[0].id === TRANSLATION_OPINION_TYPE:
      return (
        <TranslationPostPreviewCard
          post={post}
          shouldNotUseLink={shouldNotUseLink}
        />
      );
    case post.origins &&
      post.origins[0] &&
      post.origins[0].id === EXPERT_OPINION_TYPE:
      return (
        <ExpertOpinionPostPreviewCard
          post={post}
          shouldNotUseLink={shouldNotUseLink}
        />
      );
    default:
      return (
        <ExpertOpinionPostPreviewCard
          post={post}
          shouldNotUseLink={shouldNotUseLink}
        />
      );
  }
};
