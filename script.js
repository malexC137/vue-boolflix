new Vue({
    el: "#app",
    data: {
        querySearch: "",
        myTmdbKey: "bc6f81aaa58a9888c0efcd14fa367c64",
        moviesList: [],
        seriesList: [],
        imgUrlBasic: "https://image.tmdb.org/t/p/",
        sizeUrl: "w185",
        selectedGenre: 'All',
        genresList: []
    },
    mounted() {
        const axiosOptions = {
            params: {
                api_key: this.myTmdbKey,
                language: "it-IT"
            }
        }

        axios.get(`https://api.themoviedb.org/3/genre/movie/list?`, axiosOptions)
            .then(resp => {
                this.genresList = resp.data.genres
            })
    },
    methods: {
        onSearchText() {
            const axiosParams = {
                params: {
                    api_key: this.myTmdbKey,
                    query: this.querySearch,
                    language: "it-IT"
                }
            }

            axios.get("https://api.themoviedb.org/3/search/movie?", axiosParams)
                .then((resp) => {
                    this.moviesList = resp.data.results
                })
            axios.get("https://api.themoviedb.org/3/search/tv?", axiosParams)
                .then((result) => {
                    this.seriesList = result.data.results
                })
        },

        getImg(movie) {

            if (movie.poster_path === null) {
                return "img/posterPlaceholder.PNG"
            } else {
                return this.imgUrlBasic + this.sizeUrl + movie.poster_path
            }
        },

        getFlag(movie) {
            const flagsMap = {
                en: "gb",
                ko: "kr",
                ja: "jp",
                xx: "cn",
                hi: "in",
            };

            if (flagsMap[movie.original_language]) {
                return flagsMap[movie.original_language];
            } else {
                return movie.original_language;
            }
        },

        getStars(movie) {
            const movieVote = Math.round(movie.vote_average / 2);
            const starsArr = [];

            for (i = 1; i <= 5; i++) {
                starsArr.push(i <= movieVote)
            }

            return starsArr
        },

        getCast(movie) {
            if (movie.actors) {
                return;
            }

            const axiosOptions = {
                params: {
                    api_key: this.myTmdbKey,
                    language: "it-IT"
                }

            }

            const movieType = movie.serie ? "tv" : "movie";

            axios.get(`https://api.themoviedb.org/3/${movieType}/${movie.id}/credits?`, axiosOptions)
                .then(resp => {
                    this.$set(movie, "actors", resp.data.cast);
                });
        }

    },
    computed: {
        // onSelectGenre() {
        //     const axiosParams = {
        //         params: {
        //             api_key: this.myTmdbKey,
        //             query: this.querySearch,
        //             language: "it-IT"
        //         }
        //     }

        //     axios.get("https://api.themoviedb.org/3/trending/movie/day?", axiosParams)
        //         .then((resp) => {
        //             if (this.selectedGenre = "All") {
        //                 this.moviesList.push(resp.data.results)
        //             }
        //         })
        //         return this.moviesList
        // },
    }
})
