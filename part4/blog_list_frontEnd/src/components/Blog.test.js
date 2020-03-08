import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import {render, fireEvent} from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {

    let component

    beforeEach(() => {
        component = render(
            <Blog 
                blog = {{
                    title: 'This is a test',
                    author: 'Tester McTestingtay',
                    url: 'test.com',
                    likes: 100,
                    user: {
                        username: 'testPasser45'
                    }
                }}
                permission = {true}
            />
        )
    })

    test('only title and author are rendered by default', () => {
        const extraInfo = component.container.querySelector('.info')
        expect(extraInfo).toBe(null)
        expect(component.container).toHaveTextContent('THIS IS A TEST')
        expect(component.container).toHaveTextContent('Tester McTestingtay')
        expect(component.container).not.toHaveTextContent('test.com')
    })

    test('when show is clicked info is visible', () => {
        const showHide = component.container.querySelector('.showHide')
        fireEvent.click(showHide)

        expect(component.container).toHaveTextContent('test.com')
        expect(component.container).toHaveTextContent('likes')
        const likeButton = component.container.querySelector('.like')
        expect(likeButton).toHaveTextContent('Like')
        const deleteButton = component.container.querySelector('.delete')
        expect(deleteButton).toHaveTextContent('Delete') 
    })
})