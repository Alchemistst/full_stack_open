const _ = require('lodash')

const dummy = (blogs) => 1;

const totalLikes = (blogs) => blogs.reduce((sum, blog) => sum + blog.likes,0)

const favourites = (blogs) => {

    if(blogs.length > 0){
        let mostLiked = {   
            likes: 0
        }

        blogs.forEach(blog => {
            mostLiked = blog.likes > mostLiked.likes ? blog : mostLiked
        })

        return mostLiked
    }
    
    return {}
}

const mostBlogs = (blogs) => {

    if(blogs.length > 0){

        const results = _.countBy(blogs, 'author')

        let max = {
            author: "",
            blogs : 0}

        _.forEach(results, (v,k) => {
            if( v > max.blogs){
                max.author = k
                max.blogs = v
            }
        })

        return max

    }

    return {}
}

const mostLikes = (blogs) => {

    if(blogs.length > 0){

        let max = {
            author: "",
            likes : 0}
        
        blogs.forEach(blog => {

            
            if( blog.likes > max.likes){
                max.author = blog.author
                max.likes = blog.likes
            }
            

        })
        

        return max

    }

    return {}
}

module.exports = {
  dummy,
  totalLikes,
  favourites,
  mostBlogs,
  mostLikes
};
