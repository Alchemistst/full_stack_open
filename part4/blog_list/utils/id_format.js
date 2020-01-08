const id_format = (blogs) => {
    blogs.map(blog => {
        blog.id = blog._id
        delete blog._id
    })
    return blogs
}

module.exports = id_format