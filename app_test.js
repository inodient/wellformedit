const express = require( "express" );

const app = express();

app.use( express.static("upload") );

app.listen( 3001, function(){
  console.log( "Listen 3001" );
});

app.get( "/*", function(req, res){
  res.send( "<h1>Hello Test</h1>" );
});
