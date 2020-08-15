module.exports = function(){
  const swaggerOptions = {
    definition: {
        openapi: '3.0.0', // Specification (optional, defaults to swagger: '2.0')
        info: {
          title: "Vidly API",
          description: "This is an app for renting movies",
          version: "1.0.0",
          contact: {
            name: "Saransh Chauhan",
            email: "chauhan.saransh@gmail.com"
          },
          host: "localhost:3000",
          basepath: '/'
      },
    },
    // Path to the API docs
    apis: ['./routes/genres.js'],
  };

  return swaggerOptions;
}