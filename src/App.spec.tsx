import React from 'react'
import fetchMock from 'fetch-mock'
import {
    render,
    screen,
    wait,
    fireEvent,
    waitFor,
    waitForDomChange,
} from '@testing-library/react'
import App from './App'
import { act } from 'react-dom/test-utils'

const mockSuccess = {
    Search: [
        {
            Title: 'Bruce Almighty',
            Year: '2003',
            imdbID: 'tt0315327',
            Type: 'movie',
            Poster:
                'https://m.media-amazon.com/images/M/MV5BNzMyZDhiZDUtYWUyMi00ZDQxLWE4NDQtMWFlMjI1YjVjMjZiXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg',
        },
        {
            Title: 'Dragon: The Bruce Lee Story',
            Year: '1993',
            imdbID: 'tt0106770',
            Type: 'movie',
            Poster:
                'https://m.media-amazon.com/images/M/MV5BMjA1MTQxNzAtM2MyOC00NDBhLWFlNmEtOWZlM2E5MjNlODU2XkEyXkFqcGdeQXVyNDAxNjkxNjQ@._V1_SX300.jpg',
        },
        {
            Title: 'My Name Is Bruce',
            Year: '2007',
            imdbID: 'tt0489235',
            Type: 'movie',
            Poster:
                'https://m.media-amazon.com/images/M/MV5BMTQxMDg2Nzk2Nl5BMl5BanBnXkFtZTcwNDg4NjI5MQ@@._V1_SX300.jpg',
        },
        {
            Title: "Get Smart's Bruce and Lloyd Out of Control",
            Year: '2008',
            imdbID: 'tt1018723',
            Type: 'movie',
            Poster:
                'https://m.media-amazon.com/images/M/MV5BMjE3MDI5MDI1OF5BMl5BanBnXkFtZTgwMDU0NzAwNzE@._V1_SX300.jpg',
        },
        {
            Title: 'I Am Bruce Lee',
            Year: '2012',
            imdbID: 'tt1954299',
            Type: 'movie',
            Poster:
                'https://m.media-amazon.com/images/M/MV5BMTcyNTgzMzUwNl5BMl5BanBnXkFtZTcwMDU1MTkyNw@@._V1_SX300.jpg',
        },
        {
            Title: "Bruce Lee: A Warrior's Journey",
            Year: '2000',
            imdbID: 'tt0297814',
            Type: 'movie',
            Poster:
                'https://m.media-amazon.com/images/M/MV5BMTI4MDYzMTAxNF5BMl5BanBnXkFtZTcwMTE4MjAyMQ@@._V1_SX300.jpg',
        },
        {
            Title: 'Robert the Bruce',
            Year: '2019',
            imdbID: 'tt8000908',
            Type: 'movie',
            Poster:
                'https://m.media-amazon.com/images/M/MV5BY2MyZjRiMzktZmIwMS00OTU3LTkxNDEtMjM2MjNkNWMxZDA5XkEyXkFqcGdeQXVyNDExMzMxNjE@._V1_SX300.jpg',
        },
        {
            Title: 'Young Bruce Lee',
            Year: '2010',
            imdbID: 'tt1482989',
            Type: 'movie',
            Poster:
                'https://m.media-amazon.com/images/M/MV5BMjIxODU4MjM2OF5BMl5BanBnXkFtZTcwODg1MTYxNQ@@._V1_SX300.jpg',
        },
        {
            Title: 'Bruce Lee - The Fighter',
            Year: '2015',
            imdbID: 'tt5038448',
            Type: 'movie',
            Poster:
                'https://m.media-amazon.com/images/M/MV5BNGUyYmFmODUtYTQwMy00YzE2LWJmZjQtMzNlMWU1OGQ2NGYxXkEyXkFqcGdeQXVyNjQ4Nzg0NTE@._V1_SX300.jpg',
        },
        {
            Title: 'Comedy Central Roast of Bruce Willis',
            Year: '2018',
            imdbID: 'tt8301054',
            Type: 'movie',
            Poster:
                'https://m.media-amazon.com/images/M/MV5BNTc4Mzc1YTItZDAxZi00YTJjLWEyNDctN2QwNjE0MmMwOGM0XkEyXkFqcGdeQXVyNjU0NTI0Nw@@._V1_SX300.jpg',
        },
    ],
    totalResults: '303',
    Response: 'True',
}

const mockFail = {
    Response: 'False',
    Error: 'Incorrect IMDb ID.',
}

fetchMock.mock('http://www.omdbapi.com/?s=bruce&apikey=5a834e2c', mockSuccess)
fetchMock.mock('http://www.omdbapi.com/?s=&apikey=5a834e2c', mockFail)

it('renders without crashing', () => {
    const rendered = render(<App />)
    expect(rendered).toBeTruthy()
})

it('shows loading spinner', () => {
    render(<App />)
    expect(screen.getByText('Loading...')).toBeInTheDocument()
})

it('loads movies', async () => {
    render(<App />)
    await waitFor(() => {
        mockSuccess.Search.forEach((movie) =>
            expect(screen.getByText(movie.Title)).toBeInTheDocument()
        )
    })
})

it('updates list on search', async () => {
    const rendered = render(<App />)
    const searchBar = rendered.getByTestId('search-bar')
    fireEvent.change(searchBar, { target: { value: 'bruce' } })
    await waitFor(() => {
        mockSuccess.Search.forEach((movie) =>
            expect(screen.getByText(movie.Title)).toBeInTheDocument()
        )
    })
})
