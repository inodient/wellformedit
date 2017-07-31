const pool = mysql.createPool( require( require("path").join(process.cwd(), "properties", "db.json") ));
const menuGenerator = require( require("path").join( process.cwd(), "service", "menuGenerator.js" ) ).menuGenerator;

exports.control = function( req, res ){
  var model = {};
  var menu = new menuGenerator();

  return new Promise( function(resolve, reject){
    var promises = [];

    promises.push( getMenuList() );
    promises.push( getSubMenuList( req._parsedUrl.pathname ) );
    promises.push( getSpecificMenuList( req._parsedUrl.pathname ) );
    promises.push( getMenuDescription( req._parsedUrl.pathname ) );
    promises.push( getKeywordList() );

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

function setModel( model, fieldName, results ){
  return new Promise( function(resolve, reject){
    try{
      model[ fieldName ] = results;
    } catch( err ){
      throw err;
    }
  } );
}
