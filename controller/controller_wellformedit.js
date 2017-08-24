const menuResolver = require( require("path").join(process.cwd(), "service", "menuResolver.js") ).menuResolver;
const contentResolver = require( require("path").join(process.cwd(), "service", "contentResolver.js") ).contentResolver;

const queryManager = require( require("path").join(process.cwd(), "modeler", "queryManager.js") ).queryManager;
const oQueryManager = new queryManager();

exports.control = function( req, res ){
  var oMenuResolver = new menuResolver();
  var oContentResolver = new contentResolver();

  var promises = [];


  return new Promise( function(resolve, reject){

    pool.getConnection( function(err, connection){
      oMenuResolver.resolveMenu( connection, req, res )
      .then( setModelWithObject.bind(null, {}) )
      .then( function( model ){
        oQueryManager.getDiscussionStatus(connection)
        .then( function(results){
          model.topicStatus = results[0];
          model.cheatsheetStatus = results[1];
        } )
        .then( function(){
          oQueryManager.getPopularSearchWord(connection)
          .then( function(_results){
            model.popularSearchWord = _results[0];
          } )
          .then( function(){
            connection.release();

            resolve( model );
          } );
        } );
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
      resolve( model );
    } catch(err){
      throw err;
    }
  } );
}
