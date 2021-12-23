package models

type Movie struct {
	BackdropPath  string  `json:"backdrop_path" bson:"backdrop_path,omitempty"`
	Id            int64   `json:"id" bson:"_id,omitempty"`
	OriginalTitle string  `json:"original_title" bson:"original_title,omitempty"`
	Overview      string  `json:"overview" bson:"overview,omitempty"`
	Popularity    float32 `json:"popularity" bson:"popularity,omitempty"`
	PosterPath    string  `json:"poster_path" bson:"poster_path,omitempty"`
	Title         string  `json:"title" bson:"title,omitempty"`
	VoteAverage   float32 `json:"vote_average" bson:"vote_average,omitempty"`
	VoteCount     int64   `json:"vote_count" bson:"vote_count,omitempty"`
	Budget        float64 `json:"budget" bson:"budget,omitempty"`
	Runtime       float32 `json:"runtime" bson:"runtime,omitempty"`
	Revenue       float64 `json:"revenue" bson:"revenue,omitempty"`
}

type Movies struct {
	Page         int32   `json:"page"`
	Results      []Movie `json:"results"`
	TotalPages   int32   `json:"total_pages"`
	TotalResults int32   `json:"total_results"`
}

type Cast struct {
	Character   string `json:"character"`
	CreditId    string `json:"credit_id"`
	Name        string `json:"name"`
	ProfilePath string `json:"profile_path"`
}

type Crew struct {
	Job      string `json:"job"`
	Name     string `json:"name"`
	CreditId string `json:"credit_id"`
}

type Credits struct {
	Id   int64  `json:"id"`
	Cast []Cast `json:"cast"`
	Crew []Crew `json:"crew"`
}
