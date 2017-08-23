const menuResolver = require( require("path").join(process.cwd(), "service", "menuResolver.js") ).menuResolver;
const oMenuResolver = new menuResolver();

const contentResolver = require( require("path").join(process.cwd(), "service", "contentResolver.js") ).contentResolver;
const oContentResolver = new contentResolver();

const searchWordParser = require( require("path").join(process.cwd(), "service", "searchWordParser.js") ).searchWordParser;
const oSearchWordParser = new searchWordParser();

const contentSaver = require( require("path").join(process.cwd(), "service", "contentSaver.js") ).contentSaver;
const oContentSaver = new contentSaver();

const queryManager = require( require("path").join(process.cwd(), "modeler", "queryManager.js") ).queryManager;
const oQueryManager = new queryManager();

exports.control = function( req, res ){
  var model = {};
  var promises = [];

  return new Promise( function(resolve, reject){

    if( !req.query.searchWord ){

      pool.getConnection( function(err, connection){
        promises.push( oMenuResolver.resolveMenu(connection, req, res) );
        promises.push( oContentResolver.resolveContent(connection, req, res) );


        Promise.all( promises )
        .then( function(){
          var argv = arguments[0];

          model = argv[0];
          setModelWithObject( model, argv[0] );
          setModelWithObject( model, argv[1] );
          model.searchWord = "";
          model.cheatsheet = "";

          let openGraph = `
            <meta name="twitter:card" content="summary" />
            <meta name="twitter:site" content="@wellformedit" />
            <meta name="twitter:creator" content="@wellformedit" />

            <meta property="fb:app_id" content="1910794212495192" />

            <meta property="og:url"                content="http://www.wellformedit.com/topic" />
            <meta property="og:type"               content="blog" />
            <meta property="og:title"              content="Well Formed IT's topic" />
            <meta property="og:description"        content="[Well Formed IT]'s only one goal is to introduce IT concepts as structural as possible. There are so many approaches and analysis methodologies doing that. [Well Formed IT] predefine a keyword map to assign each concept with that. Such concept discussion would be wrapped as Topic and Cheat sheet, and each topic would be assigned at keyword map." />
            <meta property="og:image"              content="http://www.wellformedit.com/wellformedit_logo.png" />
          `;

          model.openGraph = openGraph;
        } )
        .then( function(){
          connection.release();

          resolve( model );
        } )
        .catch( console.err );
      } );

    } else{

      controlOpenWithSearchTopic( req, res )
      .then( function(resultModel){
        resolve( resultModel );
      } );
    }
  } );
}

function controlOpenWithSearchTopic( req, res ){
  var model = {};
  var promises = [];

  return new Promise( function(resolve, reject){

    pool.getConnection( function(err, connection){
      promises.push( oMenuResolver.resolveMenu(connection, req, res) );
      promises.push( oContentResolver.resolveContent(connection, req, res) );
      promises.push( getSearchTopicResult(connection, req, res) );

      Promise.all( promises )
      .then( function(){
        var argv = arguments[0];

        model = argv[0];
        setModelWithObject( model, argv[0] );
        setModelWithObject( model, argv[1] );
        model.cheatsheet = argv[2];
        model.searchWord = req.query.searchWord;
      } )
      .then( function(){
        connection.release();

        resolve( model );
      } )
      .catch( console.err );
    } );
  } );
}

function getSearchTopicResult( connection, req, res ){
  return new Promise( function(resolve, reject){
    pool.getConnection( function(err, connection){
      var model = {};

      let searchWord = '';

      if( req.body.searchWord ){
        searchWord = req.body.searchWord;
      } else if( req.query.searchWord ){
        searchWord = req.query.searchWord;
      }

      oSearchWordParser.parseSearchWords( searchWord )
      .then( oContentSaver.saveSearchWord.bind(null, connection) )
      .then( oContentResolver.resolveCheatsheet.bind(null, connection) )
      .then( function(results){
        connection.release();

        resolve( results );
      } );
    } );

  } );
}

exports.controlSearchTopic = function( req, res ){
  return new Promise( function(resolve, reject){

    pool.getConnection( function(err, connection){
      var model = {};

      let searchWord = '';

      if( req.body.searchWord ){
        searchWord = req.body.searchWord;
      } else if( req.query.searchWord ){
        searchWord = req.query.searchWord;
      }

      oSearchWordParser.parseSearchWords( searchWord )
      .then( oContentSaver.saveSearchWord.bind(null, connection) )
      .then( oContentResolver.resolveCheatsheet.bind(null, connection) )
      .then( function(results){
        connection.release();

        model.cheatsheet = results;
        resolve( model );
      } );
    } );
  } );
}

exports.controlGetContentIdByImg = function( req, res ){
  return new Promise( function(resolve, reject){

    pool.getConnection( function(err, connection){
      let imgId = req.body.imgid;

      oQueryManager.getContentIdByImg( connection, imgId )
      .then( function(results){
        connection.release();

        resolve( results );
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
