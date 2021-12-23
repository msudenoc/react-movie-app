package db

import (
	"context"
	"react-movie-app/models"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var uri string = "mongodb://localhost:27017"

func GetMovie(id int64) (*models.Movie, error) {
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	client, _ := mongo.Connect(ctx, options.Client().ApplyURI(uri))
	defer client.Disconnect(ctx)
	db := client.Database("react-movie-app")

	filter := models.Movie{Id: id}
	record := db.Collection("movies").FindOne(ctx, filter)
	if record.Err() != nil {
		return nil, record.Err()
	}

	res := &models.Movie{}
	record.Decode(res)
	return res, nil
}

func StoreMovie(movie *models.Movie) {
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	client, _ := mongo.Connect(ctx, options.Client().ApplyURI(uri))
	defer client.Disconnect(ctx)
	db := client.Database("react-movie-app")

	filter := models.Movie{Id: movie.Id}
	update := bson.D{{Key: "$set", Value: *movie}}
	opts := options.Update().SetUpsert(true)
	r, e := db.Collection("movies").UpdateOne(ctx, filter, update, opts)
	if r != nil {
		println(r.MatchedCount, r.UpsertedID)
	}

	if e != nil {
		println(e.Error())
	}
}
