const menuResolver = require( require("path").join(process.cwd(), "service", "menuResolver.js") ).menuResolver;
const contentResolver = require( require("path").join(process.cwd(), "service", "contentResolver.js") ).contentResolver;

const queryManager = require( require("path").join(process.cwd(), "modeler", "queryManager.js") ).queryManager;
const oQueryManager = new queryManager();

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
      .catch( console.err )
    } );
  } );
}

exports.controlGetContentIdByTitle = function( req, res ){
  return new Promise( function(resolve, reject){

    pool.getConnection( function(err, connection){
      let contentTitle = req.body.contenttitle;

      oQueryManager.getContentId( connection, contentTitle )
      .then( function(results){
        connection.release();

        resolve( results[0].id );
      } );
    } );
  } );
}

exports.controlGetKeywordLocation = function ( req, res ){
  return new Promise( function(resolve, reject){

    pool.getConnection( function(err, connection){
      let keywordTitle = req.body.keywordtitle;

      oQueryManager.getKeywordId( connection, keywordTitle )
      .then( function(results){
        connection.release();

        resolve( results[0] );
      } );
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
