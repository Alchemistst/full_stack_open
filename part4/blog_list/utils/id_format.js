const _ = require('lodash');

const idFormat = (blogs) => {
  const blogsResult = _.cloneDeep(blogs);
  blogsResult.map((blog) => {
    blog.id = blog._id;
    delete blog._id;
    delete blog.__v;
    return blog;
  });
  return blogsResult;
};

module.exports = idFormat;
