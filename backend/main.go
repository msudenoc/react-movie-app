package main

import (
	"net/http"
	"react-movie-app/db"
	"react-movie-app/httpmanage"
	"react-movie-app/models"
	"react-movie-app/tmdb"

	"github.com/gin-contrib/static"
	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()

	router.Use(static.Serve("/", static.LocalFile("../client-app/build", false)))

	api := router.Group("/api")
	movies := api.Group("/movie")
	{
		movies.GET("/search", handleSearch)
		movies.GET("/popular", handlePopular)
		movies.GET("/:movieId", handleMovie)
		movies.GET("/:movieId/credits", handleCredits)
	}

	router.Run(":3000")
}

func handleSearch(c *gin.Context) {
	page := getPage(c)
	searchTerm := ""
	if searchTermParam, ok := c.GetQuery("searchTerm"); ok {
		searchTerm = searchTermParam
	}

	movies, err := tmdb.Search(searchTerm, page)
	if err == nil {
		go saveResults(&movies.Results)
	}

	respond(c, movies, err)
}

func handlePopular(c *gin.Context) {
	page := getPage(c)
	movies, err := tmdb.GetPopular(page)
	if err == nil {
		go saveResults(&movies.Results)
	}

	respond(c, movies, err)
}

func handleMovie(c *gin.Context) {
	movieId, _ := httpmanage.GetParamInt64(c, "movieId")
	if movie, err := db.GetMovie(movieId); err == nil {
		respond(c, movie, err)
	} else {
		movie, err := tmdb.GetMovie(movieId)
		if err == nil {
			go db.StoreMovie(movie)
		}

		respond(c, movie, err)
	}
}

func handleCredits(c *gin.Context) {
	movieId, _ := httpmanage.GetParamInt64(c, "movieId")
	movie, err := tmdb.GetCredits(movieId)
	respond(c, movie, err)
}

func respond(c *gin.Context, d interface{}, e error) {
	if e != nil {
		body := httpmanage.BuildError(http.StatusInternalServerError, "An error occured when calling TMDB", e.Error())
		c.JSON(http.StatusInternalServerError, body)
	} else {
		c.JSON(http.StatusOK, d)
	}
}

func getPage(c *gin.Context) int {
	page := 1
	if pageParam, ok := httpmanage.GetQueryInt(c, "page"); ok {
		page = pageParam
	}

	return page
}

func saveResults(movies *[]models.Movie) {
	for i := 0; i < len(*movies); i++ {
		db.StoreMovie(&((*movies)[i]))
	}
}
