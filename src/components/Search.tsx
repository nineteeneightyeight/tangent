import React, { Dispatch, SetStateAction } from 'react'

interface SearchProps {
    searchHandler: Dispatch<SetStateAction<string>>
}

const Search: React.FC<SearchProps> = ({ searchHandler }: SearchProps) => {
    return (
        <>
            <input
                placeholder="Enter your movie search"
                onChange={(input) => searchHandler(input.target.value)}
                className="search"
                data-testid="search-bar"
            />
        </>
    )
}

export default Search
