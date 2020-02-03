import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import {render, fireEvent} from '@testing-library/react'
import SimpleBlog from './SimpleBlog'

describe('<SimpleBlog />', () => {

    let component
    const onClick = jest.fn()

    beforeEach(() => {

        component = render(
            <SimpleBlog 
                blog = {
                    {
                    title : 'Do androids dream of electric sheeps?',
                    author: 'Tester Testington',
                    likes: '100'
                    }
                }
                onClick = {onClick}
            />
        )
    })

    test('renders title, author and amount of likes', () => {
       
        const titleAuthor = component.container.querySelector('.titleAuthor')
        expect(titleAuthor).toHaveTextContent(
            'Do androids dream of electric sheeps? Tester Testington'
        )
        
        const likes = component.container.querySelector('.likes')
        expect(likes).toHaveTextContent(
            'blog has 100 likes'
        )
    })

    test('like button is clicked twice', () => {

        const likeButton = component.container.querySelector('.likes button')
        fireEvent.click(likeButton)
        fireEvent.click(likeButton)
        expect(onClick.mock.calls.length).toBe(2)
    })
})