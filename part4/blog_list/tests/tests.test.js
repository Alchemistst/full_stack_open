const listHelper = require('../utils/list_helper');
const values = require('./test_values');

describe('dummy', () => {
  test('dummy returns one', () => {
    const blogs = [];

    const result = listHelper.dummy(blogs);

    expect(result).toBe(blogs);
  });
});

describe('total likes', () => {
  test('input with zero blogs list returns zero', () => {
    expect(listHelper.totalLikes([])).toBe(0);
  });

  test('input with one blog list returns likes of that blog', () => {
    expect(listHelper.totalLikes(values.listWithOneBlog)).toBe(values.listWithOneBlog[0].likes);
  });

  test('input with several blogs list returns sum of likes', () => {
    expect(listHelper.totalLikes(values.listWithManyBlogs)).toBe(values.sumOfLikes);
  });
});

describe('favourite blogs', () => {
  test('input with zero blogs list returns empty object', () => {
    expect(listHelper.favourites([])).toEqual({});
  });

  test('input with one blog list returns that blog', () => {
    expect(listHelper.favourites(values.listWithOneBlog)).toEqual(values.listWithOneBlog[0]);
  });

  test('input with more than one blog returns the most liked', () => {
    expect(listHelper.favourites(values.listWithManyBlogs)).toEqual(values.mostLiked);
  });

  test('input with blogs with equal likes returns first occurence of most liked', () => {
    expect(listHelper.favourites(values.listWithLikesDispute)).toEqual(values.firstOccurence);
  });
});

describe('most blogs', () => {
  test('input with zero blogs list returns empty object', () => {
    expect(listHelper.mostBlogs([])).toEqual({});
  });
  test('input with one blog list returns the author of that blog', () => {
    expect(listHelper.mostBlogs(values.listWithOneBlog)).toEqual(values.mostBlogsLWOB);
  });
  test('input with more than one blog return author with most blogs', () => {
    expect(listHelper.mostBlogs(values.listWithManyBlogs)).toEqual(values.mostBlogsLWMB);
  });
  test('input with blogs with equal number of blogs returns first occurrence', () => {
    expect(listHelper.mostBlogs(values.listWithBlogsDispute)).toEqual(values.mostBlogsLWOB);
  });
});

describe('most likes', () => {
  test('input with zero blogs list returns empty object', () => {
    expect(listHelper.mostLikes([])).toEqual({});
  });
  test('input with one blog list returns the author of that blog', () => {
    expect(listHelper.mostLikes(values.listWithOneBlog)).toEqual(values.mostLikesLWOB);
  });
  test('input with more than one blog return author with most likes', () => {
    expect(listHelper.mostLikes(values.listWithManyBlogs)).toEqual(values.mostLikesLWMB);
  });
  test('input with blogs with equal number of blogs written by same author returns first occurrence', () => {
    expect(listHelper.mostLikes(values.listWithBlogsDispute)).toEqual(values.mostLikesLWMB);
  });
});
