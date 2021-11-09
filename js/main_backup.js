const renderMovies = movies => {
    document.querySelector('main.movies').innerHTML = '';
    for (const movie of movies) {
        renderMovie(movie);
    };
}

const renderMovie = movie => {
    document.querySelector('main.movies').innerHTML += getMovieHtml(movie);
}

const getMovieHtml = movie => {
    return `
        <div class="producto" onclick="getMovieDetail(${movie.id})">
            <h3>${movie.title}</h3>
            <img src="https://image.tmdb.org/t/p/w185${movie.poster_path}" alt="" />
        </div>
    `;
}

const getMovieDetailHtml = movie => {
    return `
        <div class="producto">
            <h3>${movie.title}</h3>
            <img src="https://image.tmdb.org/t/p/w185${movie.poster_path}" alt="Imagen de la pelicula" />
            <br/>
            <span>Popularidad: ${movie.popularity}</span>
            <p>Descripción: ${movie.overview}</p>
        </div>
    `;
}

const renderMovieDetail = movie => {
    document.querySelector('main.movies').innerHTML = getMovieDetailHtml(movie);
}

const getMovieDetail = movieId => {
    axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=cea68b520beecac6718820e4ac576c3a&language=es-ES`)
        .then(res => {
            const movie = res.data;
            renderMovieDetail(movie);
        }).catch(console.error);
}

const getPopularMovies = () => {
    fetch('https://api.themoviedb.org/3/movie/popular?api_key=cea68b520beecac6718820e4ac576c3a&language=es-ES')
        .then(res => res.json())
        .then(res => {
            const movies = res.results;
            renderMovies(movies);
        }).catch(error => console.error(error));
}

const getUpcomingMovies = async () => {
    try {
        const res = await axios.get('https://api.themoviedb.org/3/movie/upcoming?api_key=cea68b520beecac6718820e4ac576c3a&language=es-ES');
        const movies = res.data.results;
        renderMovies(movies);
    } catch (error) {
        console.error(error);
    }
}