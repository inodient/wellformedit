exports.contentModelValueFunction = function(){
  const queryManager = require( require("path").join(process.cwd(), "modeler", "queryManager.js") ).queryManager;
  const oQueryManager = new queryManager();

  this.functionArray = [];

  this.functionArray[ "default" ] = function(){
    return new Promise( function(resolve, reject){
      resolve( [] );
    } );
  }

  this.functionArray[ "wholetopiclist" ] = function(connection){
    return new Promise( function(resolve, reject){
      oQueryManager.getWholeTopicList(connection)
      .then( function(results){
        resolve( results );
      } );
    } );
  }

  this.functionArray[ "recenttopics" ] = function(connection){
    return new Promise( function(resolve, reject){
      oQueryManager.getRecentTopicList(connection)
      .then( function(results){
        resolve( results );
      } );
    } );
  }

  this.functionArray[ "populartopics" ] = function(connection){
    return new Promise( function(resolve, reject){
      oQueryManager.getPopularTopicList(connection)
      .then( function(results){
        resolve( results );
      } );
    } );
  }

  this.functionArray[ "recentcheatsheets" ] = function( connection, contentId ){
    return new Promise( function(resolve, reject){
      oQueryManager.getMostRecentImgs(connection)
      .then( function(results){
        resolve( results );
      } );
    } );
  }

  this.functionArray[ "popularcheatsheets" ] = function( connection, arguments ){
    return new Promise( function(resolve, reject){
      oQueryManager.getMostPopularImgs(connection)
      .then( function(results){

        resolve( results );
      } );
    } );
  }

  this.functionArray[ "cheatsheettop10" ] = function( connection ){
    return new Promise( function(resolve, reject){
      oQueryManager.getTop10SearchWords(connection)
      .then( function(results){

        resolve( results );
      });
    } );
  }

  this.functionArray[ "keywordsranking" ] = function(connection){
    return new Promise( function(resolve, reject){
      oQueryManager.getKeywordsRanking(connection)
      .then( function(results){

        resolve( results );
      } );
    } );
  }

  this.functionArray[ "contentsranking" ] = function(connection){
    return new Promise( function(resolve, reject){
      oQueryManager.getContentsRanking(connection)
      .then( function(results){

        resolve( results );
      } );
    } );
  }

  this.functionArray[ "discussionkeywordsranking" ] = function(connection){
    return new Promise( function(resolve, reject){
      oQueryManager.getDiscussionKeywordsRanking(connection)
      .then( function(results){

        resolve( results );
      } );
    } );
  }

  this.functionArray[ "discussionhitcountranking" ] = function(connection){
    return new Promise( function(resolve, reject){
      oQueryManager.getDiscussionHitCountRanking(connection)
      .then( function(results){

        resolve( results );
      } );
    } );
  }



  this.functionArray[ "discussioncontentslist" ] = function(connection){
    return new Promise( function(resolve, reject){
      oQueryManager.getDiscussionContentsList(connection)
      .then( function(results){

        resolve( results );
      } );
    } );
  }

  this.functionArray[ "listarchitecture" ] = function(connection){
    return new Promise( function(resolve, reject){
      oQueryManager.getListArchitecture(connection)
      .then( function(results){

        resolve( results );
      } );
    } );
  }

  this.functionArray[ "listcomputerarchitecture" ] = function(connection){
    return new Promise( function(resolve, reject){
      oQueryManager.getListComputerArchitecture(connection)
      .then( function(results){

        resolve( results );
      } );
    } );
  }

  this.functionArray[ "listsignaltransfer" ] = function(connection){
    return new Promise( function(resolve, reject){
      oQueryManager.getListSignalTransfer(connection)
      .then( function(results){

        resolve( results );
      } );
    } );
  }

  this.functionArray[ "listinterpretationanalysis" ] = function(connection){
    return new Promise( function(resolve, reject){
      oQueryManager.getListInterpretationNAnalysis(connection)
      .then( function(results){

        resolve( results );
      } );
    } );
  }

  this.functionArray[ "listmath" ] = function(connection){
    return new Promise( function(resolve, reject){
      oQueryManager.getListMath(connection)
      .then( function(results){

        resolve( results );
      } );
    } );
  }

  this.functionArray[ "listdatastructure" ] = function(connection){
    return new Promise( function(resolve, reject){
      oQueryManager.getListDataStructure(connection)
      .then( function(results){

        resolve( results );
      } );
    } );
  }

  this.functionArray[ "listalgorithm" ] = function(connection){
    return new Promise( function(resolve, reject){
      oQueryManager.getListAlgorithm(connection)
      .then( function(results){

        resolve( results );
      } );
    } );
  }

  this.functionArray[ "listdesignprogramming" ] = function(connection){
    return new Promise( function(resolve, reject){
      oQueryManager.getListDesignNProgramming(connection)
      .then( function(results){

        resolve( results );
      } );
    } );
  }

  this.functionArray[ "listc" ] = function(connection){
    return new Promise( function(resolve, reject){
      oQueryManager.getListC(connection)
      .then( function(results){

        resolve( results );
      } );
    } );
  }

  this.functionArray[ "listc++" ] = function(connection){
    return new Promise( function(resolve, reject){
      oQueryManager.getListCPlusPlus(connection)
      .then( function(results){

        resolve( results );
      } );
    } );
  }

  this.functionArray[ "listjava" ] = function(connection){
    return new Promise( function(resolve, reject){
      oQueryManager.getListJava(connection)
      .then( function(results){

        resolve( results );
      } );
    } );
  }

  this.functionArray[ "listjavascript" ] = function(connection){
    return new Promise( function(resolve, reject){
      oQueryManager.getListJavascript(connection)
      .then( function(results){

        resolve( results );
      } );
    } );
  }

  this.functionArray[ "listhtml5" ] = function(connection){
    return new Promise( function(resolve, reject){
      oQueryManager.getListHtml5(connection)
      .then( function(results){

        resolve( results );
      } );
    } );
  }

  this.functionArray[ "listcss3" ] = function(connection){
    return new Promise( function(resolve, reject){
      oQueryManager.getListCss3(connection)
      .then( function(results){

        resolve( results );
      } );
    } );
  }

  this.functionArray[ "listuml" ] = function(connection){
    return new Promise( function(resolve, reject){
      oQueryManager.getListUml(connection)
      .then( function(results){

        resolve( results );
      } );
    } );
  }

  this.functionArray[ "listframeworkstructure" ] = function(connection){
    return new Promise( function(resolve, reject){
      oQueryManager.getListFrameworkNArchitecture(connection)
      .then( function(results){

        resolve( results );
      } );
    } );
  }

  this.functionArray[ "listwebapplicationarchitecture" ] = function(connection){
    return new Promise( function(resolve, reject){
      oQueryManager.getListWebApplicationArchitecture(connection)
      .then( function(results){

        resolve( results );
      } );
    } );
  }

  this.functionArray[ "listspring" ] = function(connection){
    return new Promise( function(resolve, reject){
      oQueryManager.getListSpring(connection)
      .then( function(results){

        resolve( results );
      } );
    } );
  }

  this.functionArray[ "listbootstrap" ] = function(connection){
    return new Promise( function(resolve, reject){
      oQueryManager.getListBootstrap(connection)
      .then( function(results){

        resolve( results );
      } );
    } );
  }

  this.functionArray[ "listnodejs" ] = function(connection){
    return new Promise( function(resolve, reject){
      oQueryManager.getListNodejs(connection)
      .then( function(results){

        resolve( results );
      } );
    } );
  }

  this.functionArray[ "listjquery" ] = function(connection){
    return new Promise( function(resolve, reject){
      oQueryManager.getListJquery(connection)
      .then( function(results){

        resolve( results );
      } );
    } );
  }

  this.functionArray[ "listconnectioncommunication" ] = function(connection){
    return new Promise( function(resolve, reject){
      oQueryManager.getListConnectionNCommunication(connection)
      .then( function(results){

        resolve( results );
      } );
    } );
  }

  this.functionArray[ "listnetwork" ] = function(connection){
    return new Promise( function(resolve, reject){
      oQueryManager.getListNetwork(connection)
      .then( function(results){

        resolve( results );
      } );
    } );
  }

  this.functionArray[ "listcloud" ] = function(connection){
    return new Promise( function(resolve, reject){
      oQueryManager.getListCloud(connection)
      .then( function(results){

        resolve( results );
      } );
    } );
  }

  this.functionArray[ "listdicussionhotpotato" ] = function(connection){
    return new Promise( function(resolve, reject){
      oQueryManager.getListDiscussionNHotPotato(connection)
      .then( function(results){

        resolve( results );
      } );
    } );
  }

  this.functionArray[ "listbigdata" ] = function(connection){
    return new Promise( function(resolve, reject){
      oQueryManager.getListBigdata(connection)
      .then( function(results){

        resolve( results );
      } );
    } );
  }

  this.functionArray[ "listsecurity" ] = function(connection){
    return new Promise( function(resolve, reject){
      oQueryManager.getListSecurity(connection)
      .then( function(results){

        resolve( results );
      } );
    } );
  }

  this.functionArray[ "listmachinelearning" ] = function(connection){
    return new Promise( function(resolve, reject){
      oQueryManager.getListMachineLearning(connection)
      .then( function(results){

        resolve( results );
      } );
    } );
  }


  // Discussion Main - Start
  this.functionArray[ "discussionstatus" ] = function(connection){
    return new Promise( function(resolve, reject){
      oQueryManager.getDiscussionStatus(connection)
      .then( function(results){
        resolve( results );
      } );
    } );
  }

  // this.functionArray[ "topiclist" ] = function(connection){
  //   return new Promise( function(resolve, reject){
  //     oQueryManager.getTopicList(connection)
  //     .then( function(results){
  //       resolve( results );
  //     } );
  //   } );
  // }

  this.functionArray[ "topictable" ] = function(connection){
    return new Promise( function(resolve, reject){
      oQueryManager.getTopicListTable(connection)
      .then( function(results){
        resolve( results );
      } );
    } );
  }

  this.functionArray[ "keywordsstructure_architecture" ] = function(connection){
    return new Promise( function(resolve, reject){

      let promises = [];

      promises.push( oQueryManager.getKeywordsInfo( connection, "Architecture" ) );
      promises.push( oQueryManager.getContentTop1( connection, "Architecture" ) );

      Promise.all( promises )
      .then( function(){
        let argv = arguments[0];

        let keywordsInfo = argv[0];
        let contentTop1 = argv[1];

        resolve( { "keywordsInfo" : keywordsInfo, "contentTop1" : contentTop1 } );
      } );
    } );
  }

  this.functionArray[ "keywordsstructure_interpretationanalysis" ] = function(connection){
    return new Promise( function(resolve, reject){

      let promises = [];

      promises.push( oQueryManager.getKeywordsInfo( connection, "Interpretation & Analysis" ) );
      promises.push( oQueryManager.getContentTop1( connection, "Interpretation & Analysis" ) );

      Promise.all( promises )
      .then( function(){
        let argv = arguments[0];

        let keywordsInfo = argv[0];
        let contentTop1 = argv[1];

        resolve( { "keywordsInfo" : keywordsInfo, "contentTop1" : contentTop1 } );
      } );
    } );
  }

  this.functionArray[ "keywordsstructure_designprogramming" ] = function(connection){
    return new Promise( function(resolve, reject){

      let promises = [];

      promises.push( oQueryManager.getKeywordsInfo( connection, "Design & Programming" ) );
      promises.push( oQueryManager.getContentTop1( connection, "Design & Programming" ) );

      Promise.all( promises )
      .then( function(){
        let argv = arguments[0];

        let keywordsInfo = argv[0];
        let contentTop1 = argv[1];

        resolve( { "keywordsInfo" : keywordsInfo, "contentTop1" : contentTop1 } );
      } );
    } );
  }

  this.functionArray[ "keywordsstructure_frameworkstructure" ] = function(connection){
    return new Promise( function(resolve, reject){

      let promises = [];

      promises.push( oQueryManager.getKeywordsInfo( connection, "Framework & Structure" ) );
      promises.push( oQueryManager.getContentTop1( connection, "Framework & Structure" ) );

      Promise.all( promises )
      .then( function(){
        let argv = arguments[0];

        let keywordsInfo = argv[0];
        let contentTop1 = argv[1];

        resolve( { "keywordsInfo" : keywordsInfo, "contentTop1" : contentTop1 } );
      } );
    } );
  }

  this.functionArray[ "keywordsstructure_connectioncommunication" ] = function(connection){
    return new Promise( function(resolve, reject){

      let promises = [];

      promises.push( oQueryManager.getKeywordsInfo( connection, "Connection & Communication" ) );
      promises.push( oQueryManager.getContentTop1( connection, "Connection & Communication" ) );

      Promise.all( promises )
      .then( function(){
        let argv = arguments[0];

        let keywordsInfo = argv[0];
        let contentTop1 = argv[1];

        resolve( { "keywordsInfo" : keywordsInfo, "contentTop1" : contentTop1 } );
      } );
    } );
  }

  this.functionArray[ "keywordsstructure_discussionhotpotato" ] = function(connection){
    return new Promise( function(resolve, reject){

      let promises = [];

      promises.push( oQueryManager.getKeywordsInfo( connection, "Discussion & Hot Potato" ) );
      promises.push( oQueryManager.getContentTop1( connection, "Discussion & Hot Potato" ) );

      Promise.all( promises )
      .then( function(){
        let argv = arguments[0];

        let keywordsInfo = argv[0];
        let contentTop1 = argv[1];

        resolve( { "keywordsInfo" : keywordsInfo, "contentTop1" : contentTop1 } );
      } );
    } );
  }

  // this.function[ "keywordsstructure_architecture" ] = function(){
  //   return new Promise( function(resolve, reject){
  //     oQueryManager.getKeywordsInfo( "Architecture" )
  //     .then( function(results){
  //       resolve( results );
  //     } );
  //   } );
  // }
  // Discussion Main - End

  this.functionArray[ "dependencyinfo" ] = function(connection){
    return new Promise( function(resolve, reject){
      oQueryManager.getDependencyInfo(connection)
      .then( function(results){
        resolve( results );
      } );
    } );
  }

  this.functionArray[ "releasehistory" ] = function(connection){
    return new Promise( function(resolve, reject){
      oQueryManager.getReleaseHistory(connection)
      .then( function(results){
        resolve( results );
      } );
    } );
  }
}
