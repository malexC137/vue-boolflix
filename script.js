new Vue({
    el: "#app",
    data: {
        querySearch: "",
        myTmdbKey: "bc6f81aaa58a9888c0efcd14fa367c64",
        moviesList: []
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
        }
    },
})