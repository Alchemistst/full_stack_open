const mongoose = require('mongoose');
const supertest = require('supertest');
const _ = require('lodash');
const app = require('../app');
const Blog = require('../models/blog');
const User = require('../models/user');
const idFormat = require('../utils/id_format');
const unpopulate = require('../utils/unpopulate');

const api = supertest(app);

const listWithManyBlogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    user: '5e297089f94620184812af74',
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    user: '5e297089f94620184812af74',
    __v: 0,
  },
];

const listWithManyUsers = [
  {
    _id: '5e1b64ad8c9ad54f142d5a78',
    name: 'Pady',
    passhash: '$2a$10$bumqPhD3NwPfybIVMx58k.Ii.3CMRoPbJD71t7ePqOYwoGfcVSKki',
    username: 'wishkerlicker39',
    blogs: [],
  },
  {
    _id: '5e1b64ad8c9ad54f142d5a79',
    name: 'Angus',
    passhash: '$2a$10$MiM.aTwBGjyd5fDeIKh8xeLawftMk4grEPDKJcYnXRz4.uinRC9pu',
    username: 'bloodthirstycat76',
    blogs: [],
  },
];

const testBlog = {
  title: 'Test are good',
  author: 'Testing Testington',
  url: 'http://test.test.com/',
  likes: 99,
};

const testUser = {
  _id: '5e297089f94620184812af74',
  name: 'Tester McTestingtay',
  username: 'testPasser45',
  blogs: [],
  passhash: '$2a$10$v8XQw69WgbBWuO9RkXKxVuz7/EfybBbLgmo1IBjjwy4Fu.X1s7Hpu',
};


describe('Blog API tests', () => {
  beforeEach(async () => {
    await Blog.deleteMany({});
    await User.deleteMany({});

    const promises = listWithManyBlogs.map((blog) => {
      const newBlog = new Blog(blog);
      return newBlog.save();
    });

    await Promise.all(promises);

    const newTestUser = new User(testUser);
    await newTestUser.save();
  });

  test('All blogs can be requested', async () => {
    const results = await api.get('/api/blogs/')
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const resultsInFormat = results.body.map((r) => {
      r.user = unpopulate(r.user);
      return r;
    });

    idFormat(listWithManyBlogs).forEach((b) => {
      expect(resultsInFormat).toContainEqual(b);
    });
  });

  test('Adding a new blog works', async () => {
    await api.post('/api/blogs/')
      .set('Authorization', 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3RQYXNzZXI0NSIsImlkIjoiNWUyOTcwODlmOTQ2MjAxODQ4MTJhZjc0IiwiaWF0IjoxNTc5Nzc1NDY0fQ.pd1JGgD8GaxrbQY5jxlKWXXS3SBY9xlPoTTVpGIarAM')
      .send(testBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const results = await api.get('/api/blogs/');
    expect(results.body.length).toBe(listWithManyBlogs.length + 1);

    const resultsInFormat = results.body.map((r) => {
      delete r.id;
      r.user = unpopulate(r.user);
      return r;
    });

    const testBlogInFormat = { ...testBlog };
    testBlogInFormat.user = testUser._id;

    expect(resultsInFormat).toContainEqual(testBlogInFormat);
  });

  test('Adding a malformated blog returns error', async () => {
    await api.post('/api/blogs/')
      .set('Authorization', 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3RQYXNzZXI0NSIsImlkIjoiNWUyOTcwODlmOTQ2MjAxODQ4MTJhZjc0IiwiaWF0IjoxNTc5Nzc1NDY0fQ.pd1JGgD8GaxrbQY5jxlKWXXS3SBY9xlPoTTVpGIarAM')
      .send({})
      .expect(400);

    const results = await api.get('/api/blogs/');
    expect(results.body.length).toBe(listWithManyBlogs.length);
  });

  test('Unique id is named id', async () => {
    const results = await api.get('/api/blogs/');
    results.body.map((res) => expect(res.id).toBeDefined());
  });

  test('Blog with no likes defaults zero', async () => {
    const blogNoLikes = { ...testBlog };
    delete blogNoLikes.likes;
    await api.post('/api/blogs/')
      .set('Authorization', 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3RQYXNzZXI0NSIsImlkIjoiNWUyOTcwODlmOTQ2MjAxODQ4MTJhZjc0IiwiaWF0IjoxNTc5Nzc1NDY0fQ.pd1JGgD8GaxrbQY5jxlKWXXS3SBY9xlPoTTVpGIarAM')
      .send(blogNoLikes)
      .expect(201);

    const results = await api.get('/api/blogs/');
    expect(results.body[results.body.length - 1].likes).toBe(0);
  });

  test('Delete request works', async () => {
    const testID = listWithManyBlogs[0]._id;
    await api.delete(`/api/blogs/${testID}`)
      .set('Authorization', 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3RQYXNzZXI0NSIsImlkIjoiNWUyOTcwODlmOTQ2MjAxODQ4MTJhZjc0IiwiaWF0IjoxNTc5Nzc1NDY0fQ.pd1JGgD8GaxrbQY5jxlKWXXS3SBY9xlPoTTVpGIarAM')
      .expect(204);

    await api.get(`/api/blogs/${testID}`)
      .expect(404);
  });

  test('Put request works', async () => {
    const testID = listWithManyBlogs[0]._id;
    await api.put(`/api/blogs/${testID}`).send({ likes: 99999 })
      .expect(200);

    const doubleCheck = await api.get(`/api/blogs/${testID}`);
    expect(doubleCheck.body.likes).toBe(99999);
  });
});

describe('Users API tests', () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const promises = listWithManyUsers.map((user) => {
      const newUser = new User(user);
      return newUser.save();
    });

    await Promise.all(promises);
  });

  test('User database is correctly initialized', async () => {
    const users = await User.find({});
    expect(users.map((user) => user.toJSON())).toEqual(idFormat(listWithManyUsers));
  });

  test('Users can be created', async () => {
    const newUser = {
      name: 'Perry',
      username: 'hissingbastard78',
      pass: 'hissingbastard78',
    };

    const result = await api.post('/api/users/')
      .send(newUser)
      .expect(201);

    delete newUser.pass;

    expect(result.body).toMatchObject(newUser);
  });

  test('Information of all users is displayed', async () => {
    const result = await api.get('/api/users/')
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const correctFormat = _.cloneDeep(listWithManyUsers)
      .map((u) => {
        delete u.passhash;
        return u;
      });

    idFormat(correctFormat).map((user) => expect(result.body).toContainEqual(user));
  });

  test('Username must be given', async () => {
    const badUser = {
      name: 'badUser',
      username: '',
      pass: 'badUser',
    };

    const result = await api.post('/api/users/')
      .send(badUser)
      .expect(400);

    expect(result.body.error).toBe('Missing username or password.');

    const dbCheck = await User.find({ name: 'badUser' });
    expect(dbCheck).toEqual([]);
  });

  test('Password must be given', async () => {
    const badUser = {
      name: 'badUser',
      username: 'badUser',
      pass: '',
    };

    const result = await api.post('/api/users/')
      .send(badUser)
      .expect(400);

    expect(result.body.error).toBe('Missing username or password.');

    const dbCheck = await User.find({ name: 'badUser' });
    expect(dbCheck).toEqual([]);
  });

  test('Username must be unique', async () => {
    const duplicate = {
      name: 'duplicate',
      username: 'wishkerlicker39',
      pass: 'wishkerlicker39',
    };

    const result = await api.post('/api/users/')
      .send(duplicate)
      .expect(400);

    expect(result.body.error).toBe('User validation failed: username: Error, expected `username` to be unique. Value: `wishkerlicker39`');

    const dbCheck = await User.find({ name: 'duplicate' });
    expect(dbCheck).toEqual([]);
  });

  test('Password is at least 3 character long', async () => {
    const badUser = {
      name: 'badUser',
      username: 'badUser',
      pass: 'co',
    };

    const result = await api.post('/api/users/')
      .send(badUser)
      .expect(400);

    expect(result.body.error).toBe('Username or password too short.');

    const dbCheck = await User.find({ name: 'badUser' });
    expect(dbCheck).toEqual([]);
  });

  test('Username is at least 3 character long', async () => {
    const badUser = {
      name: 'badUser',
      username: 'co',
      pass: 'badUser',
    };

    const result = await api.post('/api/users/')
      .send(badUser)
      .expect(400);

    expect(result.body.error).toBe('Username or password too short.');

    const dbCheck = await User.find({ name: 'badUser' });
    expect(dbCheck).toEqual([]);
  });
});

afterAll(() => mongoose.connection.close());
