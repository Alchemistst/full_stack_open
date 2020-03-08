import axios from 'axios';

const baseUrl = 'http://localhost:3003/api/';

let token = null;

const getToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = async () => {
  const result = await axios.get(`${baseUrl}blogs/`);
  return result.data;
};

const logIn = async (credentials) => {
  const result = await axios
    .post(`${baseUrl}login/`, credentials);

  getToken(result.data.token);

  return result.data;
};

const logOut = () => {
  token = null;
};

const newBlog = async (data) => {
  const result = await axios
    .post(`${baseUrl}blogs/`, data, { headers: { Authorization: token } });

  return result.data;
};

const addLikes = async (blog) => {
  const updatedBlog = { ...blog };
  updatedBlog.user = blog.user.id;
  updatedBlog.likes += 1;
  await axios
    .put(`${baseUrl}blogs/${blog.id}`, updatedBlog, { headers: { Authorization: token } });
};

const addComment = async (blog, comment) => {
  const updatedBlog = { ...blog };
  updatedBlog.comments = [...updatedBlog.comments];
  updatedBlog.comments.push(comment);
  await axios
    .put(`${baseUrl}blogs/${blog.id}`, updatedBlog, { headers: { Authorization: token } });
};

const deleteBlog = async (blog) => {
  await axios
    .delete(`${baseUrl}blogs/${blog.id}`, { headers: { Authorization: token } });
};

export default {
  token, getAll, logIn, newBlog, getToken, addLikes, logOut, deleteBlog, addComment,
};
