package main

import (
	"fmt"
	config "react-movie-app/infrastructure"
	"react-movie-app/models"
)

func main() {
	x := models.Movie{}
	y := config.Get()
	fmt.Println(x)
	fmt.Println(*y)
}

// import (
// 	"fmt"
// 	"io/ioutil"
// 	"log"
// 	"net/http"
// 	"os"
// )

// func main() {
// 	response, err := http.Get("http://pokeapi.co/api/v2/pokedex/kanto/")

// 	if err != nil {
// 		fmt.Print(err.Error())
// 		os.Exit(1)
// 	}

// 	responseData, err := ioutil.ReadAll(response.Body)
// 	if err != nil {
// 		log.Fatal(err)
// 	}

// 	fmt.Println(string(responseData))
// }
