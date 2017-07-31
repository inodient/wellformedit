const menuResolver = require( require("path").join(process.cwd(), "service", "menuResolver.js") ).menuResolver;
const contentResolver = require( require("path").join(process.cwd(), "service", "contentResolver.js") ).contentResolver;


exports.control = function( req, res ){
  var oMenuResolver = new menuResolver();
  var oContentResolver = new contentResolver();

  var model = {};

  var promises = [];

  return new Promise( function(resolve, reject){

    pool.getConnection( function(err, connection){
      promises.push( oMenuResolver.resolveMenu(connection, req, res) );
      promises.push( oContentResolver.resolveContent(connection, req, res) );

      Promise.all( promises )
      .then( function(){
        var argv = arguments[0];

        model = argv[0];
        setModelWithObject( model, argv[0] );
        setModelWithObject( model, argv[1] );
      } )
      .then( function(){
        connection.release();

        resolve( model );
      } )
      .catch( console.err );
    } );
  } );
}




function setModel( model, fieldName, results ){
  return new Promise( function(resolve, reject){
    try{
      model[ fieldName ] = results;
    } catch( err ){
      throw err;
    }
  } );
}

function setModelWithObject( model, results ){
  return new Promise( function(resolve, reject){
    try{
      for( var name in results ){
        model[ name ] = results[ name ];
      }
    } catch(err){
      throw err;
    }
  } );
}
