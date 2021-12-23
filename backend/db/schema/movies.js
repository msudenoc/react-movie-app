db.createCollection('movies', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      properties: {
        backdrop_path: {
          bsonType: 'string',
          description: 'optional',
        },
        original_title: {
          bsonType: 'string',
          description: 'optional',
        },
        overview: {
          bsonType: 'string',
          description: 'optional',
        },
        popularity: {
          bsonType: 'double',
          description: 'optional',
        },
        poster_path: {
          bsonType: 'string',
          description: 'optional',
        },
        title: {
          bsonType: 'string',
          description: 'optional',
        },
        vote_average: {
          bsonType: 'double',
          description: 'optional',
        },
        vote_count: {
          bsonType: 'long',
          description: 'optional',
        },
        budget: {
          bsonType: 'double',
          description: 'optional',
        },
        runtime: {
          bsonType: 'double',
          description: 'optional',
        },
        revenue: {
          bsonType: 'double',
          description: 'optional',
        },
      },
    },
  },
});
