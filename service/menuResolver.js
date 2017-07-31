exports.menuResolver = function(){
  const queryManager = require( require("path").join(process.cwd(), "modeler", "queryManager.js") ).queryManager;
  const oQueryManager = new queryManager();

  const menuGenerator = require( require("path").join( process.cwd(), "service", "menuGenerator.js" ) ).menuGenerator;
  const oMenuGenerator = new menuGenerator();

  this.resolveMenu = function( connection, req, res ){
    var model = {};

    return new Promise( function(resolve, reject){
      var promises = [];

      promises.push( oQueryManager.getMenuList( connection ) );
      promises.push( oQueryManager.getSubMenuList( connection, req._parsedUrl.pathname ) );
      promises.push( oQueryManager.getSpecificMenuList( connection, req._parsedUrl.pathname ) );
      promises.push( oQueryManager.getMenuDescription( connection, req._parsedUrl.pathname ) );
      promises.push( oQueryManager.getKeywordList( connection ) );
      promises.push( oQueryManager.getDefaultSideMenuList( connection, req._parsedUrl.pathname ) );
      promises.push( oQueryManager.getSpecificSideMenuList( connection, req.query.contentid ) );


      Promise.all( promises )
      .then( function(){
        var argv = arguments[0];

        var subPromises = [];

        subPromises.push( oMenuGenerator.createMenuList( argv[0], req._parsedUrl.pathname ) );
        subPromises.push( oMenuGenerator.createSideMenu( argv[5], argv[6] ) );
        // subPromises.push( oMenuGenerator.getTopMenu( argv[0], req._parsedUrl.pathname ) );
        subPromises.push( oMenuGenerator.createSideManuCollapsed( argv[5], argv[6], argv[0], req._parsedUrl.pathname ) );
        subPromises.push( oMenuGenerator.createMenuDescription( argv[3], req._parsedUrl.pathname ) );
        subPromises.push( oMenuGenerator.createKeywordList( argv[4] ) );

        Promise.all( subPromises )
        .then( function(){
          var subArgv = arguments[0];
          var menuList = subArgv[0];

          setModel( model, "menuList", menuList.innerMenuCodes );
          setModel( model, "systemTitle", menuList.innerTitleCodes );
          setModel( model, "rightMenuList", menuList.innerRightMenuCodes );
          // setModel( model, "subMenuList", oMenuGenerator.createSubMenuList( argv[1], argv[2], req._parsedUrl.pathname ) );
          setModel( model, "subMenuList", subArgv[1] );
          setModel( model, "subMenuListCollapsed", subArgv[2] );
          setModel( model, "menuDescription", subArgv[3] );
          setModel( model, "keywordList", subArgv[4] );
          setModel( model, "reqPath", req._parsedUrl.pathname );
        } );

      }).then( function(){
        resolve( model );
      }).catch( console.error );
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
}
