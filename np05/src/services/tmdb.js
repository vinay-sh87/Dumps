import axios from 'axios'
const tmdb = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyYjMyNjA5MGQyY2UxN2I5ZDJhYTU2YjZiMzQ1ZGY3MiIsIm5iZiI6MTc2NTg2MTI0Ny4yNDUsInN1YiI6IjY5NDBlNzdmMTZiNTMzNDcxMjQ2N2RkZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.0tmraVzNPaiedR-Ln_0QiGufJLyGOZgeQ0F5-Xc592k`,
        accept: 'application/json'
    }
});
export default tmdb