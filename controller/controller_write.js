const menuResolver = require( require("path").join(process.cwd(), "service", "menuResolver.js") ).menuResolver;
const contentResolver = require( require("path").join(process.cwd(), "service", "contentResolver.js") ).contentResolver;
const contentSaver = require( require("path").join(process.cwd(), "service", "contentSaver.js") ).contentSaver;

exports.controlLoadContent = function( req, res ){
  var oContentResolver = new contentResolver();

  // var model = {};

  var promises = [];

  return new Promise( function(resolve, reject){

    pool.getConnection( function(err, connection){
      promises.push( oContentResolver.resolveSavedContent(connection, req, res) );

      Promise.all( promises )
      .then( function(){
        connection.release();

        var argv = arguments[0];
        resolve( { "savedContent": argv[0] } );
      } )
      .catch( console.error );
    } );
  } );
}

exports.controlDisplay = function( req, res ){
  var oMenuResolver = new menuResolver();
  var oContentResolver = new contentResolver();

  // var model = {};

  var promises = [];

  return new Promise( function(resolve, reject){

    pool.getConnection( function(err, connection){
      promises.push( oMenuResolver.resolveMenu(connection, req, res) );
      promises.push( oContentResolver.resolveContentList(connection, req, res) );
      promises.push( oContentResolver.resolveTopMenuList(connection, req, res) );

      Promise.all( promises )
      .then( function(){
        var argv = arguments[0];

        let contentListObject = {};
        if( argv[1] ){
          contentListObject.contentList = argv[1];
        }

        let topMenuListObject = {};
        if( argv[2] ){
          topMenuListObject.topMenuList = argv[2];
        }

        let contentObject = argv[0];
        contentObject = Object.assign( contentObject, contentListObject, topMenuListObject );

        connection.release();

        resolve( contentObject );
      } )
      .catch( console.err );
    } );
  } );
}

exports.controlWrite = function( req, res ){
  var oContentSaver = new contentSaver();
  var promises = [];

  return new Promise( function(resolve, reject){

    pool.getConnection( function(err, connection){
      oContentSaver.saveContent(connection, req, res)
      .then( function( contentId ){
        connection.release();

        console.log( contentId );

        resolve( { "contentID" : contentId } );
      } )
      .catch( console.err );
    } );
  } );
}
