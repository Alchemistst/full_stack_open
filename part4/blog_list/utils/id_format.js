const _ = require('lodash')

const id_format = (blogs) => {
    const blogsResult = _.cloneDeep(blogs)
    blogsResult.map(blog => {
        blog.id = blog._id
        delete blog._id
        delete blog.__v
    })
    return blogsResult
}

module.exports = id_format