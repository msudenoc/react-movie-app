package infrastructure

import (
	"encoding/json"
	"fmt"
	"os"
)

type AppConfig struct {
	TmDbApi ApiConfig
}

type ApiConfig struct {
	BaseUrl string
	Key     string
}

var config *AppConfig
var isRead bool = false

func GetAppConfig() *AppConfig {
	if isRead {
		return config
	}

	file, err := os.Open("config.json")
	fmt.Println(err)
	defer file.Close()

	isRead = true
	config = &AppConfig{}
	json.NewDecoder(file).Decode(&config)

	return config
}
