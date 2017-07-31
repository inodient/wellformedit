exports.contentResolver = function(){
  const contentGenerator = require( require("path").join(process.cwd(), "service", "contentGenerator.js") ).contentGenerator;
  const oContentGenerator = new contentGenerator();

  const contentModelValueResolver = require( require("path").join(process.cwd(), "service", "contentModelValueResolver.js") ).contentModelValueResolver;
  const oContentModelValueResolver = new contentModelValueResolver();

  const queryManager = require( require("path").join(process.cwd(), "modeler", "queryManager.js") ).queryManager;
  const oQueryManager = new queryManager();

  this.resolveContentList = function(connection, req, res){
    return new Promise( function(resolve, reject){
      oQueryManager.getContentList( connection )
      .then( oContentGenerator.getContentSelectList )
      .then( function( results ){
        resolve( results );
      } )
      .catch( console.error );
    } );
  }

  this.resolveTopMenuList = function( connection, req, res ){
    return new Promise( function(resolve, reject){
      oQueryManager.getTopMenuList( connection )
      .then( oContentGenerator.getTopMenuSelectList )
      .then( function( results ){
        resolve( results );
      } )
      .catch( console.error );
    } );
  }

  this.resolveSavedContent = function(connection, req, res ){
    var contentId = req.body.content_id;

    var promises = [];

    promises.push( oQueryManager.getSavedContent(connection, contentId) );
    promises.push( oQueryManager.getSavedKeywords(connection, contentId) );

    return new Promise( function(resolve, reject){

      Promise.all( promises )
      .then( function(){
        var argv = arguments[0];

        argv[0][0].keywords = argv[1];
        resolve( argv[0] );
      } )
      .catch( console.error );

    } );
  }

  this.resolveContent = function( connection, req, res ){
    return new Promise( function(resolve, reject){

      var contentId = "";
      var contentTitle = "";
      var promises = [];

      if( req.query.contentid ){
        contentId = req.query.contentid;
        promises.push( oQueryManager.getSpecificContent(connection, contentId) );
        promises.push( oQueryManager.getSpecificSideMenuList(connection, contentId) );
        promises.push( oContentModelValueResolver.getSpecificModelValue(connection, contentId) );
        promises.push( oQueryManager.getSpecificContentImageInfo(connection, contentId) );
        promises.push( oQueryManager.updateDirectContentHitCount(connection, contentId) );

      } else{
        contentId = req._parsedUrl.pathname;
        promises.push( oQueryManager.getDefaultContent(connection, contentId) );
        promises.push( oQueryManager.getDefaultSideMenuList(connection, contentId) );
        promises.push( oContentModelValueResolver.getDefaultModelValue(connection, contentId) );
        promises.push( oQueryManager.getDefaultContentImageInfo(connection, contentId) );
      }


      Promise.all( promises )
      .then( function(){
        var argv = arguments[0];

        oContentGenerator.setContentsNavId( argv[0], argv[1] )
        .then( oContentGenerator.setContentsModelValue.bind( null, argv[2] ) )
        .then( oContentGenerator.setContentsImageId.bind( null, argv[3] ) )
        .then( function(content){

          resolve( content );
        } );

      } )
      .catch( console.error );
    } );
  }

  this.resolveCheatsheet = function( connection, searchWordObject ){
    return new Promise( function(resolve,reject){
      oQueryManager.getCheatsheet( connection, searchWordObject )
      .then( oQueryManager.updateCheatsheetHitCount.bind(null, connection) )
      .then( oQueryManager.updateContentHitCount.bind(null, connection) )
      .then( oContentGenerator.getCheatsheetCode )
      .then( function(results){
        // console.log( "resolveCheatsheet" );
        // console.log( searchWordObject );
        resolve( results );
      } );
    } );
  }


}
