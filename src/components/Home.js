import React, { useState } from 'react';
import { IMAGE_BASE_URL, BACKDROP_SIZE, POSTER_SIZE, POPULAR_BASE_URL, SEARCH_BASE_URL } from '../config';

// Import Components
import HeroImage from './elements/HeroImage';
import SearchBar from './elements/SearchBar';
import Grid from './elements/Grid';
import MovieThumb from './elements/MovieThumb';
import LoadMoreButton from './elements/LoadMoreBtn';
import Spinner from './elements/Spinner';
import useHomeFetch from './hooks/useHomeFetch';

import NoImage from './images/no_image.jpg';

const Home = () => {
	const [search, setSearch] = useState('');
	const [
		{
			state: { movies, currentPage, totalPages, heroImage },
			loading,
			error,
		},
		fetchMovies,
	] = useHomeFetch(search);

	if (error) return <div>Something went wrong</div>;
	if (!movies[0]) return <Spinner />;

	const searchMovies = (search) => {
		const endpoint = search ? SEARCH_BASE_URL + search : POPULAR_BASE_URL;

		setSearch(search);
		fetchMovies(endpoint);
	};

	const loadMoreMovies = () => {
		const searchEndpoint = `${SEARCH_BASE_URL}${SEARCH_BASE_URL}&query=${search}&page=${currentPage + 1}`;
		const popularEndpoint = `${POPULAR_BASE_URL}&page=${currentPage + 1}`;

		const endpoint = search ? searchEndpoint : popularEndpoint;

		fetchMovies(endpoint);
	};

	return (
		<>
			{!search && (
				<HeroImage
					image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${heroImage.backdrop_path}`}
					title={heroImage.original_title}
					text={heroImage.overview}
				/>
			)}
			<SearchBar callback={searchMovies} />
			<Grid header={search ? 'Search Result' : 'Popular Movies'}>
				{movies.map((movie) => (
					<MovieThumb
						key={movie.id}
						clickable
						image={movie.poster_path ? `${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}` : NoImage}
						movieId={movie.id}
						movieName={movie.original_title}
					/>
				))}
			</Grid>
			{loading && <Spinner />}
			{currentPage < totalPages && !loading && <LoadMoreButton text="Load More" callback={loadMoreMovies} />}
		</>
	);
};
export default Home;
