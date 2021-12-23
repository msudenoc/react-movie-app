package tmdb

import (
	"encoding/json"
	"fmt"
	"net/http"
	"react-movie-app/infrastructure"
	"react-movie-app/models"
)

func Search(searchTerm string, page int) (*models.Movies, error) {
	tmbdconf := infrastructure.GetAppConfig().TmDbApi
	url := fmt.Sprintf("%ssearch/movie?api_key=%s&language=en-US&query=%s&page=%d", tmbdconf.BaseUrl, tmbdconf.Key, searchTerm, page)
	return fetchMovies(url)
}

func GetPopular(page int) (*models.Movies, error) {
	tmbdconf := infrastructure.GetAppConfig().TmDbApi
	url := fmt.Sprintf("%smovie/popular?api_key=%s&language=en-US&page=%d", tmbdconf.BaseUrl, tmbdconf.Key, page)
	return fetchMovies(url)
}

func GetMovie(movieId int64) (*models.Movie, error) {
	tmbdconf := infrastructure.GetAppConfig().TmDbApi
	url := fmt.Sprintf("%smovie/%d?api_key=%s", tmbdconf.BaseUrl, movieId, tmbdconf.Key)
	result := models.Movie{}
	err := httpGet(url, &result)
	return &result, err
}

func GetCredits(movieId int64) (*models.Credits, error) {
	tmbdconf := infrastructure.GetAppConfig().TmDbApi
	url := fmt.Sprintf("%smovie/%d/credits?api_key=%s", tmbdconf.BaseUrl, movieId, tmbdconf.Key)
	result := models.Credits{}
	err := httpGet(url, &result)
	return &result, err
}

func fetchMovies(url string) (*models.Movies, error) {
	result := models.Movies{
		Results: []models.Movie{},
	}

	err := httpGet(url, &result)
	return &result, err
}

func httpGet(url string, v interface{}) error {
	response, httpErr := http.Get(url)
	if httpErr != nil {
		return httpErr
	}

	defer response.Body.Close()

	jsonErr := json.NewDecoder(response.Body).Decode(v)
	if jsonErr != nil {
		return jsonErr
	}

	return jsonErr
}
