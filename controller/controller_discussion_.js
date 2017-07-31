const pool = mysql.createPool( require( require("path").join(process.cwd(), "properties", "db.json") ));
const menuGenerator = require( require("path").join( process.cwd(), "service", "menuGenerator.js" ) ).menuGenerator;
const contentGenerator = require( require("path").join( process.cwd(), "service", "contentGenerator.js" ) ).contentGenerator;


exports.control = function( req, res ){
  var model = {};
  var menu = new menuGenerator();
  var contGen = new contentGenerator();

  return new Promise( function(resolve, reject){
    var promises = [];

    promises.push( getMenuList() );
    promises.push( getSubMenuList( req._parsedUrl.pathname ) );
    promises.push( getSpecificMenuList( req._parsedUrl.pathname ) );
    promises.push( getMenuDescription( req._parsedUrl.pathname ) );
    promises.push( getKeywordList() );

    if( req.query.contentid ){
      promises.push( getContent(req.query.contentid) );
      promises.push( getContentSpecifics(req.query.contentid) );
      promises.push( getKeyword(req.query.contentid) );
      promises.push( getContentHeader(req.query.contentid) );
      promises.push( getSpecificContentHeader(req.query.contentid) );
    } else{
      promises.push( getContent("main_discussion") );
    }

    Promise.all( promises )
    .then( function(){
      var argv = arguments[0];

      var menuList = menu.createMenuList( argv[0], req._parsedUrl.pathname );

      setModel( model, "menuList", menuList.innerMenuCodes );
      setModel( model, "systemTitle", menuList.innerTitleCodes );
      setModel( model, "rightMenuList", menuList.innerRightMenuCodes );
      setModel( model, "subMenuList", menu.createSubMenuList( argv[1], argv[2], req._parsedUrl.pathname ) );
      setModel( model, "menuDescription", menu.createMenuDescription( argv[3] ), req._parsedUrl.pathname );
      setModel( model, "keywordList", menu.createKeywordList( argv[4] ) );
      setModel( model, "reqPath", req._parsedUrl.pathname );

      if( argv.length == 6 ){
        console.log( "HERE", argv[5] );

        setModel( model, "content", argv[5] );
        setModel( model, "contentSpecific", null );
        setModel( model, "keywordList", null );
        setModel( model, "specificSubMenuList", null );
      }
      // if( argv.length == 7 ){
      //   setModel( model, "content", argv[5] );
      //   setModel( model, "contentSpecific", argv[6] );
      // }
      // if( argv.length == 8 ){
      //   setModel( model, "content", argv[5] );
      //   setModel( model, "contentSpecific", argv[6] );
      //   setModel( model, "keyword", argv[7] );
      // }
      else if( argv.length == 10 ){
        var content = contGen.setContentSpecificID( argv[5], argv[9] );
        setModel( model, "content", argv[5] );
        setModel( model, "contentSpecific", argv[6] );
        setModel( model, "keywordList", argv[7] );
        setModel( model, "specificSubMenuList", menu.createSubMenuList(argv[8], argv[9], req._parsedUrl.pathname, "discussion") );
      } else{
        setModel( model, "content", null );
        setModel( model, "contentSpecific", null );
        setModel( model, "keywordList", null );
        setModel( model, "specificSubMenuList", null );
      }

      setModel( model, "contentid", req.query.contentid );

    }).then( function(){
      resolve( model );
    }).catch( console.error );
  } );
}

function getMenuList(){
  return new Promise( function(resolve, reject){
    pool.query( "select id, level, parent, sequence, name, displayName, redirectPath from wellformedit.TB_MENU where TB_MENU.usage = 'Y' and TB_MENU.level <= 0 group by level, parent, sequence;", function( err, results, fields ){
      resolve( results );
      if( err ) reject(err);
    } );
  } );
}

function getSubMenuList( path ){
  return new Promise( function(resolve, reject){
    var queryString = `select id, level, parent, sequence, name, displayName, redirectPath from wellformedit.TB_MENU where TB_MENU.usage = 'Y' and TB_MENU.parent = (select id from wellformedit.TB_MENU where redirectPath = '` + path + `') group by level, parent, sequence;`;

    pool.query( queryString, function(err, results, fields){
      resolve( results );
      if( err ) reject(err);
    } );
  } );
}

function getSpecificMenuList( path ){
  return new Promise( function(resolve, reject){
    var queryString = `
    select id, level, parent, sequence, name, displayName, redirectPath
      from wellformedit.TB_MENU
      where TB_MENU.usage = 'Y'
      and (
        TB_MENU.parent in (
          select id from wellformedit.TB_MENU where parent in (  select id from wellformedit.TB_MENU where redirectPath = '` + path + `')
        )
      )
      group by level, parent, sequence;`;

    pool.query( queryString, function(err, results, fields){
      resolve( results );
      if( err ) reject(err);
    } );
  } );
}


function getMenuDescription( path ){
  return new Promise( function(resolve, reject){
    var queryString = "select id, name, displayName, redirectPath, description from wellformedit.TB_MENU where TB_MENU.usage = 'Y' and TB_MENU.redirectPath = '" + path + "';"

    pool.query( queryString, function( err, results, fields ){
      resolve( results );
      if( err ) reject(err);
    } )
  } );
}

function getKeywordList(){
  return new Promise( function(resolve, reject){
    pool.query( "select id, level, parent, sequence, name, displayName from wellformedit.TB_KEYWORD where TB_KEYWORD.usage = 'Y' group by parent, level, sequence;", function( err, results, fields ){
      resolve( results );
      if( err ) reject(err);
    } );
  } );
}




function getContentHeader( contentID ){
  return new Promise( function(resolve, reject){
    let queryString = `
      select id, 1 as level, '' as parent, 0, replace(lower(title), ' ', '') as name, title as displayName, '#' as redirectPath from wellformedit.TB_CONTENT where id = '` + contentID + `';
    `;

    pool.query( queryString, function(err, results, fields){
      resolve( results );
    } );
  } );
}

function getSpecificContentHeader( contentID ){
  return new Promise( function(resolve, reject){
    let queryString = `
      select id, 2 as level, '` + contentID + `' as parent, sequence, replace(lower(header), ' ', '') as name, header as displayName, concat('#', id, '_redirect') as redirectPath from wellformedit.TB_CONTENT_SPECIFIC where content_id = '` + contentID + `' order by sequence;
    `;

    pool.query( queryString, function(err, results, fields){
      resolve( results );
    } );
  } );
}


function getContent( contentID ){
  return new Promise( function(resolve, reject){
    let queryString = "select * from wellformedit.TB_CONTENT where id = '" + contentID + "';";

    pool.query( queryString, function(err, results, fields){
      resolve( results );
    } );
  } );
}

function getContentSpecifics( contentID ){
  return new Promise( function(resolve, reject){
    let queryString = "select * from wellformedit.TB_CONTENT_SPECIFIC where content_id = '" + contentID + "' order by sequence;";

    pool.query( queryString, function(err, results, fields){
      resolve( results );
    } );
  } );
}

function getKeyword( contentID ){
  return new Promise( function(resolve, reject){
    let queryString = "select * from wellformedit.TB_KEYWORD where id in ( select keyword_id from wellformedit.TB_CONTENT_KEYWORD where content_id = '" + contentID + "' );";

    pool.query( queryString, function(err, results, fields){
      resolve( results );
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
