new Vue({
    el: "#app",
    data: {
        querySearch: "",
        myTmdbKey: "bc6f81aaa58a9888c0efcd14fa367c64",
        moviesList: [],
        seriesList: [],
        imgUrlBasic: "https://image.tmdb.org/t/p/",
        sizeUrl: "w154",
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
                }),
                axios.get("https://api.themoviedb.org/3/search/tv?", axiosParams)
                    .then((result) => {
                        this.seriesList = result.data.results
                    })
        },

    },
    computed: {
        // fullStars() {
        //     const fullStarsArr = [];
        //     const fullStars = []
        //     this.moviesList.find((element) => {
        //         let voteNum = Math.ceil(element.vote_average / 2)
        //         for (var i = 0; i < voteNum; i++) {
        //             fullStarsArr.push(i)
        //             if (fullStarsArr.length === voteNum) {
        //                 return fullStars.push(fullStarsArr)
        //             }

        //         }

        //     })
        //     return fullStars







            // this.moviesList.filter((element) => {
            //     const voteNum = Math.ceil(element.vote_average / 2)
            //     for (let i = 0; i < this.moviesList.length; i++) {
            //         fullStarsArr.push(voteNum)
            //         for (let j = 0; j < voteNum; j++) {
            //             fullStars.push(j)
            //         }

            //     }

            // })
            // return fullStars




            // for (let i = 0; i < voteNum; i++) {
            //     fullStarsArr.push(voteNum)
            // }
            // return fullStarsArr
            // const fullStarsArr = [];





        // }
    }

})
