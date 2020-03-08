import _ from 'lodash';
import blogServices from '../services/blogs';

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_BLOGS': {
      return action.data.result; }
    case 'NEW_BLOG': {
      return state.concat(action.data.result); }
    case 'LIKE_BLOG': {
      const likedState = _.cloneDeep(state);
      const indexLiked = state.findIndex((b) => b === action.data.blog);
      likedState[indexLiked].likes += 1;
      return likedState; }
    case 'DEL_BLOG': {
      const toDelete = [...state];
      toDelete.splice(state.indexOf(action.data.blog), 1);
      return toDelete; }
    case 'ADD_COMMENT': {
      const commentState = _.cloneDeep(state);
      const commentIndex = state.findIndex((b) => b === action.data.blog);
      commentState[commentIndex].comments.push(action.data.comment);
      return commentState; }
    default: {
      return state; }
  }
};


export const initBlogs = () => async (dispatch) => {
  const result = await blogServices.getAll();
  dispatch({
    type: 'INIT_BLOGS',
    data: { result },
  });
};

export const likeBlog = (blog) => async (dispatch) => {
  await blogServices.addLikes(blog);
  dispatch({
    type: 'LIKE_BLOG',
    data: { blog },
  });
};

export const addComment = (blog, comment) => async (dispatch) => {
  await blogServices.addComment(blog, comment);
  dispatch({
    type: 'ADD_COMMENT',
    data: { blog, comment },
  });
};

export const delBlog = (blog) => async (dispatch) => {
  await blogServices.deleteBlog(blog);
  dispatch({
    type: 'DEL_BLOG',
    data: { blog },
  });
};

export const newBlog = (blog) => async (dispatch) => {
  const result = await blogServices.newBlog(blog);
  dispatch({
    type: 'NEW_BLOG',
    data: { result },
  });
};

export default reducer;
