package models

type Movie struct {
	BackdropPath  string  `json:"backdrop_path"`
	Id            int64   `json:"id"`
	OriginalTitle string  `json:"original_title"`
	Overview      string  `json:"overview"`
	Popularity    float32 `json:"popularity"`
	PosterPath    string  `json:"poster_path"`
	Title         string  `json:"title"`
	VoteAverage   float32 `json:"vote_average"`
	VoteCount     int64   `json:"vote_count"`
	Budget        float64 `json:"budget"`
	Runtime       float32 `json:"runtime"`
	Revenue       float64 `json:"revenue"`
}

type Movies struct {
	Page         int32   `json:"id"`
	Results      []Movie `json:"results"`
	TotalPages   int32   `json:"total_pages"`
	TotalResults int32   `json:"total_results"`
}

type Cast struct {
	Character   string `json:"character"`
	CreditId    int64  `json:"credit_id"`
	Name        string `json:"name"`
	ProfilePath string `json:"profile_path"`
}

type Crew struct {
	Job      string `json:"job"`
	Name     string `json:"name"`
	CreditId int64  `json:"credit_id"`
}

type Credits struct {
	Id   int64  `json:"id"`
	Cast []Cast `json:"cast"`
	Crew []Crew `json:"crew"`
}
