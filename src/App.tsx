import Movie from './components/Movie'
import Search from './components/Search'

import React, { useEffect, useState } from 'react'
import { useDebounce } from 'use-debounce'
import './App.scss'

const API_KEY = '5a834e2c'

const App: React.FC = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [data, setData] = useState(null)
    const [search, setSearch] = useState('bruce')
    const [debouncedSearch] = useDebounce(search, 500)

    useEffect(() => {
        setLoading(true)
        setError(null)
        setData(null)

        /* TODO: should use graphql */
        fetch(`http://www.omdbapi.com/?s=${search}&apikey=${API_KEY}`)
            .then((success) => success.json())
            .then((response) => {
                console.log(JSON.stringify(response))
                if (response.Response === 'False') {
                    setError(response.Error)
                } else {
                    setData(response.Search)
                }

                setLoading(false)
            })
            .catch(({ message }) => {
                setError(message)
                setLoading(false)
            })
    }, [debouncedSearch])

    return (
        <div className="App">
            <div className="searchForm">
                <Search searchHandler={setSearch} />
            </div>

            {loading && (
                <>
                    <div className="spinner"></div>
                    <span>Loading...</span>
                </>
            )}

            {error !== null && (
                <div>
                    <p>{error}</p>
                </div>
            )}

            <div className="movieList">
                {data !== null &&
                    data.length > 0 &&
                    data.map((result, index) => (
                        <Movie
                            title={result.Title}
                            image={result.Poster}
                            key={index}
                        />
                    ))}
            </div>
        </div>
    )
}

export default App
