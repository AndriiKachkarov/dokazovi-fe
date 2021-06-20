import React from 'react';
import { Skeleton } from '@material-ui/lab';
import VisibilityIcon from '@material-ui/icons/Visibility';
import {
  IDirection,
  IOrigin,
  IPostType,
  LoadingStatusEnum,
} from '../../../old/lib/types';
import { useStyles } from './PostInfo.styles';

export interface IPostInfo {
  uniqueViewsCounterStatusCode?: LoadingStatusEnum;
  info: {
    directions: IDirection[];
    origins: IOrigin[];
    type: IPostType;
    publishedAt: string;
    uniqueViewsCounter?: number;
  };
}

export default function PostInfo({
  info,
  uniqueViewsCounterStatusCode,
}: IPostInfo): JSX.Element {
  const { directions, origins, type, publishedAt, uniqueViewsCounter } = info;

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <ul className={classes.topics}>
        {directions && directions.map((el) => <li key={el.id}>{el.label}</li>)}
      </ul>
      <ul className={classes.origins}>
        {origins &&
          origins.map(
            (el) =>
              el.name && (
                <li className={classes.origin} key={el.id}>
                  {el.name}
                </li>
              ),
          )}
        {type && <li className={classes.origin}>{type.name}</li>}
        <li className={classes.createdAt}>{publishedAt}</li>
        {uniqueViewsCounterStatusCode !== LoadingStatusEnum.failed && (
          <>
            <li className={classes.icon}>
              <VisibilityIcon fontSize="small" />
            </li>
            <li className={classes.counter}>
              {uniqueViewsCounterStatusCode === LoadingStatusEnum.pending ? (
                <Skeleton width={40} height={20} />
              ) : (
                uniqueViewsCounter
              )}
            </li>
          </>
        )}
      </ul>
    </div>
  );
}
