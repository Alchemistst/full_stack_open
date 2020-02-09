
const blogs = [
    {
        id: '1',
        title : 'Test blog one',
        author: 'Tester McTestingtay',
        url: 'www.test.com',
        likes: 101,
        user:{
            username:"test",
            id:"12345",
            name:"Tester"
        }
    },
    {
        id: '2',
        title : 'Test blog two',
        author: 'Tester Testington',
        url: 'www.test.com',
        likes: 102,
        user:{
            username:"test",
            id:"12345",
            name:"Tester"
        }
    },
    {
        id: '3',
        title : 'Test blog three',
        author: 'Tester McTestingtay',
        url: 'www.test.com',
        likes: 103,
        user:{
            username:"test",
            id:"12345",
            name:"Tester"
        }
    },
    {
        id: '4',
        title : 'Test blog four',
        author: 'Tester Testington',
        url: 'www.test.com',
        likes: 104,
        user:{
            username:"test",
            id:"12345",
            name:"Tester"
        }
    }
]

const getAll = () => {
    return Promise.resolve(blogs)
}

let token = null;

const getToken = (newToken) => {
  token = `bearer ${newToken}`;
};


export default { getAll, getToken }