import React from 'react'

type MovieProps = {
    title: string
    image: string
}

const Movie: React.FC<MovieProps> = (props: MovieProps) => {
    return (
        <div className="movie">
            <img
                src={
                    props.image !== 'N/A'
                        ? props.image
                        : 'https://picsum.photos/200/200'
                }
                alt={`${props.title}`}
            />
            <h2 className="movie__title">{props.title}</h2>
        </div>
    )
}

export default Movie
