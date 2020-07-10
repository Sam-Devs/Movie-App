import { useState, useEffect, useCallback } from "react";
import { API_KEY, API_URL } from '../../config';

export const useMovieFetch = (movieId) => {
    const [state, setState] = useState({});
    const [loading, setloading] = useState(true);
    const [error, setError] = useState(false);

    const fetchData = useCallback(async () => {
        setError(false);
        setloading(true);

        try {
            const endpoint = `${API_URL}movie/${movieId}?api_key=${API_KEY}`;
            const result = await (await fetch(endpoint)).json();
            const creditEndpoint = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;
            const creditResult = await (await fetch(creditEndpoint)).json();
            
            const directors = creditResult.crew.filter(
                member => member.job === "Director"
            )

            setState({
                ...result,
                actors: creditResult.cast,
                directors
            })
            
        } catch (error) {
            setError(true);
        }
        setloading(false);
    }, [movieId])

    useEffect(() => {
        if(localStorage[movieId]) {
            setState(JSON.parse(localStorage[movieId] ))
            setloading(false);
        } else {
            fetchData();
        }
    }, [fetchData, movieId])

    useEffect(() => {
        localStorage.setItem(movieId, JSON.stringify(state));
    }, [movieId, state]);

    return [state, loading, error];
}
 
// export default useMovieFetch;