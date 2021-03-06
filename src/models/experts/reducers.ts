/* eslint-disable */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPost, LoadingStatusEnum } from '../../old/lib/types';
import { IExpertsState } from './types';
import { IMaterialsDataWithFilters } from '../materials/types';
import { fetchExpertMaterials, fetchExperts } from './asyncActions';
import { getAsyncActionsReducer } from '../helpers/asyncActions';

const initialMaterialsState: IMaterialsDataWithFilters = {
  data: {
    postIds: [],
    posts: {},
    meta: {
      isLastPage: false,
      pageNumber: 0,
      totalElements: 0,
      totalPages: 0,
    },
  },
  filters: {},
};

const initialState: IExpertsState = {
  data: {
    expertIds: [],
    experts: {},
    meta: {
      totalPages: 0,
      pageNumber: 0,
      isLastPage: false,
      totalElements: 0,
    },
  },
  loading: LoadingStatusEnum.idle,
  error: null,
  posts: initialMaterialsState,
};

export const expertsSlice = createSlice({
  name: 'experts',
  initialState,
  reducers: {
    resetMaterials: (state) => {
      state.posts = initialMaterialsState;
    },
    loadPosts: (state, action: PayloadAction<IPost[]>) => {
      action.payload.forEach((post) => {
        if (state.posts.data.posts && post.id) {
          state.posts.data.posts[post.id] = post;
        }
      });
    },
    setPending: (state) => {
      state.loading = LoadingStatusEnum.pending;
    },
  },
  extraReducers: {
    ...getAsyncActionsReducer(fetchExperts as any),
    ...getAsyncActionsReducer(fetchExpertMaterials as any, 'posts'),
  },
});

export const { resetMaterials, loadPosts, setPending } = expertsSlice.actions;

export const expertsReducer = expertsSlice.reducer;
