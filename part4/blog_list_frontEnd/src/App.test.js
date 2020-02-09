import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import {render, waitForElement} from '@testing-library/react'
import App from './App'

jest.mock('./services/blogs')

//DEV
import { prettyDOM } from '@testing-library/dom'

describe('<App />', () => {
    test('when no user is logged, login form is displayed', async () => {
        const component = render(<App />)
        component.rerender(<App />)

        const result = await waitForElement(
            () => component.container
        )
        
        expect(result.querySelector('.LogInForm')).not.toBe(null)
        expect(result.querySelector('.BlogDisplay')).toBe(null)
    })

    test('when user is logged, blog posts are rendered', async () => {
        const user = {
            username: 'test',
            toke: 'test1234',
            name: 'Robert Testaker'
        }

        localStorage.setItem('blogListUser', JSON.stringify(user))
        
        const component = render(<App />)
        component.rerender(<App />)

        const result = await waitForElement(
            () => component.container
        )

        expect(result.querySelector('.LogInForm')).toBe(null)
        expect(result.querySelector('.BlogDisplay')).not.toBe(null)
        //console.log(prettyDOM(result))
    })
})