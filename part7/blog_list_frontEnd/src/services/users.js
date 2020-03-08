import axios from 'axios';

const baseUrl = 'http://localhost:3003/api/users';

const getStats = async () => {
  const result = await axios.get(baseUrl);
  return result.data.map((user) => ({
    id: user.id,
    name: user.name,
    blogs: user.blogs,
  }));
};

export default { getStats };
