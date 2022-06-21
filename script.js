
const APIURL =
    "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=858dfee7a1263ab91aa24fb272982973&page=2";
const IMGPATH = "https://image.tmdb.org/t/p/w500";
const SEARCHAPI =
    "https://api.themoviedb.org/3/search/movie?&api_key=858dfee7a1263ab91aa24fb272982973&query=";

// list api
const POPULAR_API =
    "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=858dfee7a1263ab91aa24fb272982973&page1";

const KIDS_API =
    "https://api.themoviedb.org/3/discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc&api_key=858dfee7a1263ab91aa24fb272982973&page1";

const DRAMA_API =
    "https://api.themoviedb.org/3/discover/movie?with_genres=18&sort_by=vote_average.desc&vote_count.gte=10&api_key=858dfee7a1263ab91aa24fb272982973&page1";

const COMEDY_API =
    "https://api.themoviedb.org/3//discover/movie?with_genres=35&sort_by=vote_average.desc&vote_count.gte=8&api_key=858dfee7a1263ab91aa24fb272982973&page1"

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");
const popular = document.getElementById("popular");

// inisialisasi mendapat film yang di cari
getMovies(APIURL);

async function getMovies(url) {
    const resp = await fetch(url);
    const respData = await resp.json();

    console.log(respData);

    showMovies(respData.results);
}

function showMovies(movies) {
    // clear main
    main.innerHTML = "";

    movies.forEach((movie) => {
        const { poster_path, title, vote_average, overview } = movie;

        const movieEl = document.createElement("div");
        movieEl.classList.add("movie");

        movieEl.innerHTML = `
            <img
                src="${IMGPATH + poster_path}"
                alt="${title}"
            />
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getClassByRate(
                    vote_average
                )}">${vote_average}★</span>
            </div>
            <div class="overview">
                <h3>Synopsis</h3>
                ${overview}
            </div>
        `;

        main.appendChild(movieEl);
    });
}

function getClassByRate(vote) {
    if (vote >= 8) {
        return "green";
    } else if (vote >= 5) {
        return "orange";
    } else {
        return "red";
    }
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const searchTerm = search.value;

    if (searchTerm) {
        getMovies(SEARCHAPI + searchTerm);

        search.value = "";
    }
});
