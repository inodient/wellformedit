exports.contentModelValueGenerator = function(){
  this.functionArray = [];

  this.functionArray[ "default" ] = function(){
    return new Promise( function(resolve, reject){
      resolve( `` );
    } );
  }

  this.functionArray[ "gotocheatsheet" ] = function(){
    return new Promise( function(resolve, reject){
      resolve( `<button type="button" class="btn btn-important" onclick="javascript:window.location.href='./cheatsheet'">` + "Go To Cheat Sheet" + `</button>` );
    } );
  }

  this.functionArray[ "gotodiscussion" ] = function(){
    return new Promise( function(resolve, reject){
      resolve( `<button type="button" class="btn btn-important" onclick="javascript:window.location.href='./discussion'">` + "Go To Discussion" + `</button>` );
    } );
  }

  this.functionArray[ "gotoopensourceproject" ] = function(){
    return new Promise( function(resolve, reject){
      resolve( `<button type="button" class="btn btn-important" onclick="javascript:window.location.href='./opensourceproject'">` + "Go To Open Source Project" + `</button>` );
    } );
  }

  this.functionArray[ "gotonpmsummermvc" ] = function(){
    return new Promise( function(resolve, reject){
      resolve( `<button type="button" class="btn btn-important" onclick="javascript:window.location.href='https://www.npmjs.com/package/summer-mvc'">` + "NPM summer-mvc" + `</button>` );
    } );
  }

  this.functionArray[ "gotogithubsummermvc" ] = function(){
    return new Promise( function(resolve, reject){
      resolve( `<button type="button" class="btn btn-important" onclick="javascript:window.location.href='https://github.com/inodient/summer-mvc.git'">` + "Github summer-mvc" + `</button>` );
    } );
  }

  this.functionArray[ "gotogithubwellformedit" ] = function(){
    return new Promise( function(resolve, reject){
      resolve( `<button type="button" class="btn btn-important" onclick="javascript:window.location.href='https://github.com/inodient/wellformedit.git'">` + "Github well-formed-it" + `</button>` );
    } );
  }

  this.functionArray[ "gotokeywordcontent" ] = function(){
    return new Promise( function(resolve, reject){
      resolve( `<button type="button" class="btn btn-important" onclick="javascript:window.location.href='./discussion?contentid=id_content_0051'">` + "View Discussion List by Keyword" + `</button>` );
    } );
  }

  this.functionArray[ "gotokeywordcontent2" ] = function(){
    return new Promise( function(resolve, reject){
      resolve( `<button type="button" class="btn btn-important" onclick="javascript:window.location.href='./discussion?contentid=id_content_0051'">` + "View Discussion List by Keyword" + `</button>` );
    } );
  }

  this.functionArray[ "divider" ] = function(){
    return new Promise( function(resolve, reject){
      resolve( `<hr>` );
    } );
  }




  function createDiscussionTableCodes( modelValueData ){
    return new Promise( function(resolve, reject){

      if( modelValueData && modelValueData.length > 0 ){
        let subCodes = ``;

        for( let i=0; i<modelValueData.length; i++ ){
          subCodes += `<tr class="clickable-row" data-href="./discussion?contentid=` + modelValueData[i].content_id + `">`
          // subCodes += `<td>` + modelValueData[i].content_id + `</td>`;
          subCodes += `<td class="title_td" id="` + modelValueData[i].content_id + `">` + `<span>` + modelValueData[i].title + `</span>` + `<br>` + modelValueData[i].subtitle + `</td>`;
          subCodes += `<td>` + modelValueData[i].summary + `</td>`;
          // subCodes += `<td>` + modelValueData[i].writer + `<br>` + modelValueData[i].createdDate + `</td>`;
          subCodes += `<td>` + modelValueData[i].hitCount + `</td>`
          subCodes += `</tr>`;
        }

        let codes = `
          <table class="discussion_table table table table-condensed table-bordered table-hover">
            <thead>
              <tr>
                <th class="col-lg-4 col-md-4">Title</th>
                <th class="col-lg-6 col-md-6">Summary</th>
                <th class="col-lg-2 col-md-2">Hit Count</th>
              </tr>
            </thead>`
            + subCodes +
          `</table>
        `;

        resolve( codes );
      } else{
        resolve( "" );
      }


    } );
  }

  this.functionArray[ "listarchitecture" ] = function( modelValueData ){
    return new Promise( function(resolve, reject){
      createDiscussionTableCodes( modelValueData )
      .then( function(results){
        resolve( results );
      } );
    } );
  }

  this.functionArray[ "listcomputerarchitecture" ] = function( modelValueData ){
    return new Promise( function(resolve, reject){
      createDiscussionTableCodes( modelValueData )
      .then( function(results){
        resolve( results );
      } );
    } );
  }

  this.functionArray[ "listsignaltransfer" ] = function( modelValueData ){
    return new Promise( function(resolve, reject){
      createDiscussionTableCodes( modelValueData )
      .then( function(results){
        resolve( results );
      } );
    } );
  }

  this.functionArray[ "listinterpretationanalysis" ] = function( modelValueData ){
    return new Promise( function(resolve, reject){
      createDiscussionTableCodes( modelValueData )
      .then( function(results){
        resolve( results );
      } );
    } );
  }

  this.functionArray[ "listmath" ] = function( modelValueData ){
    return new Promise( function(resolve, reject){
      createDiscussionTableCodes( modelValueData )
      .then( function(results){
        resolve( results );
      } );
    } );
  }

  this.functionArray[ "listdatastructure" ] = function( modelValueData ){
    return new Promise( function(resolve, reject){
      createDiscussionTableCodes( modelValueData )
      .then( function(results){
        resolve( results );
      } );
    } );
  }

  this.functionArray[ "listalgorithm" ] = function( modelValueData ){
    return new Promise( function(resolve, reject){
      createDiscussionTableCodes( modelValueData )
      .then( function(results){
        resolve( results );
      } );
    } );
  }

  this.functionArray[ "listdesignprogramming" ] = function( modelValueData ){
    return new Promise( function(resolve, reject){
      createDiscussionTableCodes( modelValueData )
      .then( function(results){
        resolve( results );
      } );
    } );
  }

  this.functionArray[ "listc" ] = function( modelValueData ){
    return new Promise( function(resolve, reject){
      createDiscussionTableCodes( modelValueData )
      .then( function(results){
        resolve( results );
      } );
    } );
  }

  this.functionArray[ "listc++" ] = function( modelValueData ){
    return new Promise( function(resolve, reject){
      createDiscussionTableCodes( modelValueData )
      .then( function(results){
        resolve( results );
      } );
    } );
  }

  this.functionArray[ "listjava" ] = function( modelValueData ){
    return new Promise( function(resolve, reject){
      createDiscussionTableCodes( modelValueData )
      .then( function(results){
        resolve( results );
      } );
    } );
  }

  this.functionArray[ "listjavascript" ] = function( modelValueData ){
    return new Promise( function(resolve, reject){
      createDiscussionTableCodes( modelValueData )
      .then( function(results){
        resolve( results );
      } );
    } );
  }

  this.functionArray[ "listhtml5" ] = function( modelValueData ){
    return new Promise( function(resolve, reject){
      createDiscussionTableCodes( modelValueData )
      .then( function(results){
        resolve( results );
      } );
    } );
  }

  this.functionArray[ "listcss3" ] = function( modelValueData ){
    return new Promise( function(resolve, reject){
      createDiscussionTableCodes( modelValueData )
      .then( function(results){
        resolve( results );
      } );
    } );
  }

  this.functionArray[ "listuml" ] = function( modelValueData ){
    return new Promise( function(resolve, reject){
      createDiscussionTableCodes( modelValueData )
      .then( function(results){
        resolve( results );
      } );
    } );
  }

  this.functionArray[ "listframeworkstructure" ] = function( modelValueData ){
    return new Promise( function(resolve, reject){
      createDiscussionTableCodes( modelValueData )
      .then( function(results){
        resolve( results );
      } );
    } );
  }

  this.functionArray[ "listwebapplicationarchitecture" ] = function( modelValueData ){
    return new Promise( function(resolve, reject){
      createDiscussionTableCodes( modelValueData )
      .then( function(results){
        resolve( results );
      } );
    } );
  }

  this.functionArray[ "listspring" ] = function( modelValueData ){
    return new Promise( function(resolve, reject){
      createDiscussionTableCodes( modelValueData )
      .then( function(results){
        resolve( results );
      } );
    } );
  }

  this.functionArray[ "listbootstrap" ] = function( modelValueData ){
    return new Promise( function(resolve, reject){
      createDiscussionTableCodes( modelValueData )
      .then( function(results){
        resolve( results );
      } );
    } );
  }

  this.functionArray[ "listnodejs" ] = function( modelValueData ){
    return new Promise( function(resolve, reject){
      createDiscussionTableCodes( modelValueData )
      .then( function(results){
        resolve( results );
      } );
    } );
  }

  this.functionArray[ "listjquery" ] = function( modelValueData ){
    return new Promise( function(resolve, reject){
      createDiscussionTableCodes( modelValueData )
      .then( function(results){
        resolve( results );
      } );
    } );
  }

  this.functionArray[ "listconnectioncommunication" ] = function( modelValueData ){
    return new Promise( function(resolve, reject){
      createDiscussionTableCodes( modelValueData )
      .then( function(results){
        resolve( results );
      } );
    } );
  }

  this.functionArray[ "listnetwork" ] = function( modelValueData ){
    return new Promise( function(resolve, reject){
      createDiscussionTableCodes( modelValueData )
      .then( function(results){
        resolve( results );
      } );
    } );
  }

  this.functionArray[ "listcloud" ] = function( modelValueData ){
    return new Promise( function(resolve, reject){
      createDiscussionTableCodes( modelValueData )
      .then( function(results){
        resolve( results );
      } );
    } );
  }

  this.functionArray[ "listdicussionhotpotato" ] = function( modelValueData ){
    return new Promise( function(resolve, reject){
      createDiscussionTableCodes( modelValueData )
      .then( function(results){
        resolve( results );
      } );
    } );
  }

  this.functionArray[ "listbigdata" ] = function( modelValueData ){
    return new Promise( function(resolve, reject){
      createDiscussionTableCodes( modelValueData )
      .then( function(results){
        resolve( results );
      } );
    } );
  }

  this.functionArray[ "listsecurity" ] = function( modelValueData ){
    return new Promise( function(resolve, reject){
      createDiscussionTableCodes( modelValueData )
      .then( function(results){
        resolve( results );
      } );
    } );
  }

  this.functionArray[ "listmachinelearning" ] = function( modelValueData ){
    return new Promise( function(resolve, reject){
      createDiscussionTableCodes( modelValueData )
      .then( function(results){
        resolve( results );
      } );
    } );
  }

  this.functionArray[ "discussioncontentslist" ] = function( modelValueData ){
    return new Promise( function(resolve, reject){
      if( modelValueData && modelValueData.length > 0 ){
        let subCodes = ``;

        for( let i=0; i<modelValueData.length; i++ ){
          subCodes += `<tr class="clickable-row" data-href="./discussion?contentid=` + modelValueData[i].content_id + `">`
          // subCodes += `<td>` + modelValueData[i].content_id + `</td>`;
          subCodes += `<td>` + modelValueData[i].displayName + `</td>`;
          subCodes += `<td class="title_td" id="` + modelValueData[i].content_id + `">` + `<span>` + modelValueData[i].title + `</span>` + `<br>` + modelValueData[i].subtitle + `</td>`;
          subCodes += `<td class="mobile-hidden">` + modelValueData[i].summary + `</td>`;
          // subCodes += `<td>` + modelValueData[i].writer + `<br>` + modelValueData[i].createdDate + `</td>`;
          subCodes += `<td>` + modelValueData[i].hitCount + `</td>`
          subCodes += `</tr>`;
        }

        let codes = `
          <table class="discussion_table table table-condensed table-hover table-bordered">
            <thead>
              <tr>
                <th class="col-lg-2 col-md-2">Keyword</th>
                <th class="col-lg-3 col-md-3">Title</th>
                <th class="mobile-hidden col-lg-6 col-md-6">Summary</th>
                <th class="col-lg-1 col-md-1">Hit Count</th>
              </tr>
            </thead>`
            + subCodes +
          `</table>
        `;

        resolve( codes );
      } else{
        resolve( "" );
      }

    } );
  }




  this.functionArray[ "keywordstable" ] = function(){
    return new Promise( function(resolve, reject){
      resolve( `
          <table class="table table-condensed table-bordered">
            <tr>
              <td rowspan="2">Architecture & Composition</td>
              <td>Composition & Transfer</td>
            </tr>
            <tr>
              <td>Operating System</td>
            </tr>
            <tr>
              <td rowspan="3">Interpretation & Analysis Methods</td>
              <td>Math</td>
            </tr>
            <tr>
              <td>Data Structure</td>
            </tr>
            <tr>
              <td>Algorithm</td>
            </tr>
            <tr>
              <td rowspan="7">Design & Programming</td>
              <td>C</td>
            </tr>
            <tr>
              <td>C++</td>
            </tr>
            <tr>
              <td>Java</td>
            </tr>
            <tr>
              <td>Javascript</td>
            </tr>
            <tr>
              <td>HTML5</td>
            </tr>
            <tr>
              <td>CSS3</td>
            </tr>
            <tr>
              <td>UML</td>
            </tr>
            <tr>
              <td rowspan="5">Framework & Architecture</td>
              <td>Web Application Architecture</td>
            </tr>
            <tr>
              <td>Spring</td>
            </tr>
            <tr>
              <td>Bootstrap</td>
            </tr>
            <tr>
              <td>jQuery</td>
            </tr>
            <tr>
              <td>NodeJS</td>
            </tr>
            <tr>
              <td rowspan="2">Connection & Communication</td>
              <td>Network</td>
            </tr>
            <tr>
              <td>Cloud</td>
            </tr>
            <tr>
              <td rowspan="2">Discussion & Hot Potato</td>
              <td>Big Data</td>
            </tr>
            <tr>
              <td>Security</td>
            </tr>
          </table>
        ` );
    } );
  }


  this.functionArray[ "mostrecent" ] = function( modelValueData ){
    return new Promise( function(resolve, reject){

      let promises = [];

      promises.push( getCheatsheetListCode( modelValueData ) );
      promises.push( getCheatsheetModalCode( modelValueData ) );

      Promise.all( promises )
      .then( function(){
        let argv = arguments[0];

        let listCode = argv[0];
        let modalCode = argv[1];

        resolve( listCode + modalCode );
      } );
    } );
  }

  this.functionArray[ "mostpopular" ] = function( modelValueData ){
    return new Promise( function(resolve, reject){

      let promises = [];

      promises.push( getCheatsheetListCode( modelValueData ) );
      promises.push( getCheatsheetModalCode( modelValueData ) );

      Promise.all( promises )
      .then( function(){
        let argv = arguments[0];

        let listCode = argv[0];
        let modalCode = argv[1];

        resolve( listCode + modalCode );
      } );
    } );
  }

  function getCheatsheetListCode( modelValueData ){
    return new Promise( function(resolve, reject){
      var codes = `<hr>`;

      if( modelValueData ){
        for( var i=0; i<modelValueData.length; i++ ){
          if( i % 3 == 0 ){
            codes += `
              <div class="row search-result-row">`;
          }

          let ranking = i+1;

          let cheatsheetRedirectPath = '';
          let contentRedirectPath = '';

          if( modelValueData[i].content_type == "main" ){
            cheatsheetRedirectPath = modelValueData[i].topRedirect + `#` + modelValueData[i].id;
            contentRedirectPath = modelValueData[i].topRedirect;
          } else{
            cheatsheetRedirectPath = `./discussion?content_id=` + modelValueData[i].content_id + `#` + modelValueData[i].id;
            contentRedirectPath = `./discussion?content_id=` + modelValueData[i].content_id;
          }



          codes += `
            <div class="col-lg-4 col-md-4 search-result-content">
              <div class="mobile-show">
                <p><b><u>
                  Popular Ranking : ` + ranking + `
                </u></b></p>
              </div>
              <div class="mobile-show tablet-show thumbnail search-result-image">
                <img id="` + modelValueData[i].id + `" ratio="" src="` + modelValueData[i].thumbnailWithRatioFileName + `" />
              </div>
              <div class="mobile-hidden tablet-hidden thumbnail search-result-image">
                <img id="` + modelValueData[i].id + `" ratio="" src="` + modelValueData[i].thumbnailRectangleFileName + `" />
              </div>
              <div class="search-result-text">
                <a style="text-decoration:none;" href="` + cheatsheetRedirectPath + `"><h5 class="mobile-hidden tablet-hidden">` + modelValueData[i].title + `<br><small>` + modelValueData[i].subtitle + `</small>` + `</h5></a>
                <p class="mobile-show tablet-show"><b><u>[Cheat Sheet Info]</u></b></p>
                <a style="text-decoration:none;" href="` + cheatsheetRedirectPath + `"><h5 class="mobile-show tablet-show">` + modelValueData[i].title + `<br><small>` + modelValueData[i].subtitle + `</small>` + `</h5></a>
                <a style="text-decoration:none; color:#5a656f;" href="` + cheatsheetRedirectPath + `"><p class="mobile-show tablet-show">` + modelValueData[i].description + `</p></a><br>
                <p class="mobile-show tablet-show"><b><u>[Content Discussion Info]</u></b></p>
                <a style="text-decoration:none; color:#5a656f;" href="` + contentRedirectPath + `"><h5 class="mobile-show tablet_show"><b>` + modelValueData[i].content_title + `</b><br><small>` + modelValueData[i].content_subtitle + `</small>` + `</a></h5>
                <span>` + modelValueData[i].writer + `, ` + ( (modelValueData[i].savedDate).toISOString() ).substring( 0, 10 ) + `</span>
              </div>
            </div>
            <hr class="mobile-show">
          `;

          if( i % 3 == 2 || i == 8 ){
            codes += `</div>`;
          }
        }
      }

      resolve( codes );
    } );
  }

  function getCheatsheetModalCode( modelValueData ){
    return new Promise( function(resolve, reject){
      let modalCodes = '';

      if( modelValueData ){
        for( var i=0; i<modelValueData.length; i++ ){
          let ratio = modelValueData[i].ratio;

          let cheatsheetRedirectPath = '';
          let contentRedirectPath = '';

          if( modelValueData[i].content_type == "main" ){
            cheatsheetRedirectPath = modelValueData[i].topRedirect + `#` + modelValueData[i].id;
            contentRedirectPath = modelValueData[i].topRedirect;
          } else{
            cheatsheetRedirectPath = `./discussion?content_id=` + modelValueData[i].content_id + `#` + modelValueData[i].id;
            contentRedirectPath = `./discussion?content_id=` + modelValueData[i].content_id;
          }

          modalCodes += `
            <div class="modal modal_cheatsheet modal-center" role="dialog" id="modal_` + modelValueData[i].id + `" >
              <div class="modal-dialog modal-center">
                <div class="modal-content">
                  <div class="modal-content row">
                    <div data-col="6" class="col-lg-6 col-md-6 img_container">
                      <img id="modal_img_` + modelValueData[i].id + `" ratio="` + modelValueData[i].ratio + `" class="cheatsheet_img" src="` + modelValueData[i].savedFileName + `"/>
                    </div>
                    <div data-col="6" class="col-lg-6 col-md-6 info_container">
                      <div class="cheatsheet_info">
                        <!-- <button type="button" class="close cheatsheet_close" data-dismiss="modal">&times;</button> -->

                        <p><b>[Cheat Sheet Info]</b></p>
                        <h4>` + modelValueData[i].title + `<br><small>` + modelValueData[i].subtitle + `</small></h5>
                        <p>` + modelValueData[i].description + `</p>
                        <hr style="border-color:rgba(0,0,0,60)">
                        <p>Hit Count : ` + modelValueData[i].image_hitcount + `</p>
                        <p><a style="font-size: 16px; color:#b2b2b4" href="` + cheatsheetRedirectPath + `">Go To Image</a></p>
                        <hr style="border-color:rgba(0,0,0,60)">

                        <p style="margin-top:35px;"><b>[Discussion Info]</b></p>
                        <h4>` + modelValueData[i].content_title + `<br><small>` + modelValueData[i].content_subtitle + `</small></h5>
                        <p>` + modelValueData[i].content_summary + `</p>
                        <hr style="border-color:rgba(0,0,0,60)">
                        <p>Hit Count : </span>` + modelValueData[i].content_hitcount + `</p>
                        <p><a style="font-size: 16px; color:#b2b2b4" href="` + contentRedirectPath + `">Go To Content</a></p>
                        <hr style="border-color:rgba(0,0,0,60)">

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          `;
        }
      }

      resolve( modalCodes );
    } );
  }

  this.functionArray[ "cheatsheettop10" ] = function( modelValueData ){
    return new Promise( function(resolve, reject){
      var cheatsheetChartString = `[`;

      cheatsheetChartString += `[ "searchWord", "hitLevel" , {role : "style"} ], `;

      for( let i=0; i<modelValueData.length; i++ ){
        cheatsheetChartString += `[ "` + modelValueData[i].word +`", ` + modelValueData[i].hitLevel + `, 'color: #505050' ]`;
        if( i != modelValueData.length - 1 ){
          cheatsheetChartString += `,`;
        }
      }

      cheatsheetChartString += `]`;

      // console.log( cheatsheetChartString );


      let codes = `
        <script>
          var cheatsheetChartData = ` + cheatsheetChartString + `;
          var cheatsheetChartOptions = {
            chartArea: {width: '50%'},
            hAxis: {
              minValue: 0,
              range: 1,
              textStyle:{color: '#505050'}
            },
            vAxis: {
              textStyle:{color: '#505050'}
            },
            colors: [ "#505050" ],
            title: "Search Words Ranking",
            titleTextStyle: {
              color: '#505050',
              fontSize: 17
            },
            legend: {
              textStyle: { color: '#505050' }
            },
            bars: 'horizontal'

            // colors: [
            //   '#3e578a',
            //   '#822d19',
            //   '#7d571c',
            //   '#0e3510',
            //   '#3e163e',
            //   '#2e5d6b',
            //   '#6f3045',
            //   '#496323',
            //   '#8c2a2a',
            //   '#223e5a'
            // ],
            // pieHole:0.3,
            // pieSliceBorderColor : "#5A5A5A"
          }
        </script>

        <div class="row">
          <hr>
          <div id="id_cheatsheetChart" class="chart"></div>
          <hr>
        </div>
      `;

      resolve( codes );
    } );
  }

  this.functionArray[ "keywordsranking" ] = function( modelValueData ){
    return new Promise( function(resolve, reject){
      var keywordsChartString = `[`;

      keywordsChartString += `[ "Element", "# of Contents using with each Keyword", {role : 'style'} ],`

      for( let i=0; i<modelValueData.length; i++ ){
        keywordsChartString += `[ "` + modelValueData[i].displayName + `", ` + modelValueData[i].count + `, 'color: #505050' ]`

        if( i != modelValueData.length - 1 ){
          keywordsChartString += `,`;
        }
      }
      keywordsChartString += `]`;

      // console.log( keywordsChartString );

      let codes = `
        <script>
          var keywordsChartData = ` + keywordsChartString + `;
          var keywordsChartOptions = {
            chartArea: {width: '50%'},
            hAxis: {
              minValue: 0,
              range: 1,
              textStyle:{color: '#505050'}
            },
            vAxis: {
              textStyle:{color: '#505050'}
            },
            colors: [ "#505050" ],
            title: "Keywords Ranking",
            titleTextStyle: {
              color: '#505050',
              fontSize: 17
            },
            legend: {
              textStyle: { color: '#505050' }
            }
          };
        </script>

        <div class="row">
          <hr>
          <div id="id_keywordsChart" class="chart"></div>
          <hr>
        </div>
      `;

      // console.log( codes );

      resolve( codes );
    } );
  }

  this.functionArray[ "contentsranking" ] = function( modelValueData ){
    return new Promise( function(resolve, reject){
      var contentsChartString = `[`;

      contentsChartString += `[ "Element", "Contents Hit Count", {role : 'style'} ],`

      for( let i=0; i<modelValueData.length; i++ ){
        contentsChartString += `[ "` + modelValueData[i].title + `", ` + modelValueData[i].hitCount + `, 'color: #505050' ]`

        if( i != modelValueData.length - 1 ){
          contentsChartString += `,`;
        }
      }
      contentsChartString += `]`;

      // console.log( contentsChartString );

      let codes = `
        <script>
          var contentsChartData = ` + contentsChartString + `;
          var contentsChartOptions = {
            chartArea: {width: '50%'},
            hAxis: {
              minValue: 0,
              range: 1,
              textStyle:{color: '#505050'}
            },
            vAxis: {
              textStyle:{color: '#505050'}
            },
            colors: [ "#505050" ],
            title: "Discussion Content Ranking",
            titleTextStyle: {
              color: '#505050',
              fontSize: 17
            },
            legend: {
              textStyle: { color: '#505050' }
            }
          };
        </script>

        <div class="row">
          <hr>
          <div id="id_contentsChart" class="chart"></div>
          <hr>
        </div>
      `;

      // console.log( codes );

      resolve( codes );
    } );
  }

  this.functionArray[ "discussionkeywordsranking" ] = function( modelValueData ){
    return new Promise( function(resolve, reject){
      var keywordsChartString = `[`;

      keywordsChartString += `[ "Element", "# of Contents using with each Keyword", {role : 'style'} ],`

      for( let i=0; i<modelValueData.length; i++ ){
        keywordsChartString += `[ "` + modelValueData[i].displayName + `", ` + modelValueData[i].count + `, 'color: #505050' ]`

        if( i != modelValueData.length - 1 ){
          keywordsChartString += `,`;
        }
      }
      keywordsChartString += `]`;

      // console.log( keywordsChartString );

      let codes = `
        <script>
          var keywordsChartData = ` + keywordsChartString + `;
          var keywordsChartOptions = {
            chartArea: {width: '50%'},
            hAxis: {
              minValue: 0,
              range: 1,
              textStyle:{color: '#505050'}
            },
            vAxis: {
              textStyle:{color: '#505050'}
            },
            colors: [ "#505050" ],
            title: "Keywords Ranking",
            titleTextStyle: {
              color: '#505050',
              fontSize: 17
            },
            legend: {
              textStyle: { color: '#505050' }
            }
          };
        </script>

        <div class="row">
          <hr>
          <div id="id_discussion_keywordRanking" class="chart"></div>
          <hr>
        </div>
      `;

      // console.log( codes );

      resolve( codes );
    } );
  }

  this.functionArray[ "discussionhitcountranking" ] = function( modelValueData ){
    return new Promise( function(resolve, reject){
      var contentsChartString = `[`;

      contentsChartString += `[ "Element", "Contents Hit Count", {role : 'style'} ],`

      for( let i=0; i<modelValueData.length; i++ ){
        contentsChartString += `[ "` + modelValueData[i].title + `", ` + modelValueData[i].hitCount + `, 'color: #505050' ]`

        if( i != modelValueData.length - 1 ){
          contentsChartString += `,`;
        }
      }
      contentsChartString += `]`;

      // console.log( contentsChartString );

      let codes = `
        <script>
          var contentsChartData = ` + contentsChartString + `;
          var contentsChartOptions = {
            chartArea: {width: '50%'},
            hAxis: {
              minValue: 0,
              range: 1,
              textStyle:{color: '#505050'}
            },
            vAxis: {
              textStyle:{color: '#505050'}
            },
            colors: [ "#505050" ],
            title: "Hit Count Ranking",
            titleTextStyle: {
              color: '#505050',
              fontSize: 17
            },
            legend: {
              textStyle: { color: '#505050' }
            }
          };
        </script>

        <div class="row">
          <hr>
          <div id="id_discussion_hitCountRanking" class="chart" ></div>
          <hr>
        </div>
      `;

      // console.log( codes );

      resolve( codes );
    } );
  }

  // discussion - start
  this.functionArray[ "discussionstatus" ] = function( modelValueData ){
    return new Promise( function(resolve, reject){
      let contentCount = modelValueData[0].count;
      let contentHitCount = modelValueData[0].hitCount;

      let cheatsheetCount = modelValueData[1].count;
      let cheatsheetHitCount = modelValueData[1].hitCount;

      let codes = `
        <div class="table-responsive">
          <table class="discussion_table table table-condensed table-bordered table-responsive">
            <thead>
              <tr>
                <th class="col-lg-2 col-lg-2" >Status</th>
                <th class="col-lg-5 col-md-5" >Discussion Content</th>
                <th class="col-lg-5 col-md-5" >Cheatsheet</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Count</td>
                <td>` + contentCount + `</td>
                <td>` + cheatsheetCount + `</td>
              </tr>
              <tr>
                <td>Hit Count</td>
                <td>` + contentHitCount + `</td>
                <td>` + cheatsheetHitCount + `</td>
              </tr>
            </tbody>
          </table>
        </div>
      `;

      resolve( codes );
    } );
  }

  this.functionArray[ "togglediscussionlist" ] = function( modelValueData ){
    return new Promise( function(resolve, reject){
      let codes = ``;

      codes += `
        <button id="btn_discussionToggle" class="btn btn-important" onclick="javascript:toggleDiscussionList();">View Whole Discussion List</button>
      `;

      if( modelValueData && modelValueData.length > 0 ){
        let subCodes = ``;

        let keywords = '';

        for( let i=0; i<modelValueData.length; i++ ){

          let contentRedirectPath = '';

          if( modelValueData[i].content_type == "main" ){
            contentRedirectPath = modelValueData[i].topRedirect;
          } else{
            contentRedirectPath = `./discussion?contentid=` + modelValueData[i].content_id;
          }

          if( i < modelValueData.length-1 && modelValueData[i].content_id == modelValueData[i+1].content_id ){
            keywords += modelValueData[i].keywordDisplayName + " | <br>"
            continue;
          } else{

            if( keywords.length > 0 ){
              keywords += modelValueData[i].keywordDisplayName;
            } else{
              keywords = modelValueData[i].keywordDisplayName;
            }

            subCodes += `<tr class="clickable-row" data-href="` + contentRedirectPath + `">`
            // subCodes += `<td>` + modelValueData[i].content_id + `</td>`;
            subCodes += `<td>` + keywords + `</td>`;
            subCodes += `<td class="title_td" id="` + modelValueData[i].content_id + `">` + `<span>` + modelValueData[i].title + `</span>` + `<br>` + modelValueData[i].subtitle + `</td>`;
            subCodes += `<td class="mobile-hidden">` + modelValueData[i].summary + `</td>`;
            // subCodes += `<td>` + modelValueData[i].writer + `<br>` + modelValueData[i].createdDate + `</td>`;
            subCodes += `<td>` + modelValueData[i].hitCount + `</td>`
            subCodes += `</tr>`;

            keywords = '';
          }
        }

        let tableCodes = `
          <table id="discussionList" class="discussion_table table table-condensed table-hover table-bordered" style="display:none">
            <thead>
              <tr>
                <th class="col-lg-2 col-md-2">Keyword</th>
                <th class="col-lg-3 col-md-3">Title</th>
                <th class="mobile-hidden col-lg-6 col-md-6">Summary</th>
                <th class="col-lg-1 col-md-1">Hit</th>
              </tr>
            </thead>`
            + subCodes +
          `</table>
        `;

        resolve( codes + tableCodes );
      } else{
        resolve( "" );
      }

      resolve( codes );
    } );
  }

  function getKeywordsStructureCode( modelValueData ){
    return new Promise( function(resolve, reject){
      let tableBody = ``;

      for( let i=1; i<modelValueData.keywordsInfo.length; i++ ){
        tableBody += `
          <tr>
            <td>` + modelValueData.keywordsInfo[i].sequence + `</td>
            <td>` + modelValueData.keywordsInfo[i].displayName + `</td>
          <tr>
        `;
      }

      let top1Code = ``;

      if( modelValueData.contentTop1.length > 0 ){
        top1Code = `
          <!-- <p><b><u>Famous Discussion</u></b></p> -->
          <p>
            <span><b>Most Popular Discussion</b></span>
            <br>
            <a style="text-decoration : none; color: #ce0000" href="./discussion?contentid=` + modelValueData.contentTop1[0].id + `">
            ` + modelValueData.contentTop1[0].title + `
            </a>
          </p>
        `;
      }

      let code = `
        <hr>
        <div class="row">
          <div class="col-lg-7 col-md-7">
            <img style="max-height:600px; max-width:100%;" src="` + modelValueData.keywordsInfo[0].imageFileName + `">
          </div>
          <div class="col-lg-5 col-md-5">
            <!-- <p><b><u>Keyword Description</u></b></p> -->
            <p>
              ` + modelValueData.keywordsInfo[0].description + `
            </p>
            <br>
            <!-- <p><b><u>Sub Layers</u></b></p> -->
            <table class="discussion_table table table-condensed table-responsive table-bordered table-hover">
              <thead>
                <tr>
                  <th class="col-lg-2 col-md-2">Seq</th>
                  <th class="col-lg-10 col-md-10">Sub Layer</th>
                </tr>
              </thead>
              <tbody>
                ` + tableBody + `
              </tbody>
            </table>
            <br>`
            + top1Code +
            `<button class="btn btn-important btn-small" onclick="javascript:document.location.href='./discussion?contentid=id_content_0051#` + modelValueData.keywordsInfo[0].redirectUrl + `'">View Keyword Specific</button>
          </div>
        </div>
      `;

      resolve( code );
    } );
  }

  this.functionArray[ "keywordsstructure_architecture" ] = function( modelValueData ){
    return new Promise( function(resolve, reject){
      getKeywordsStructureCode( modelValueData )
      .then( function(code){
        resolve( code );
      } );
    } );
  }

  this.functionArray[ "keywordsstructure_interpretationanalysis" ] = function( modelValueData ){
    return new Promise( function(resolve, reject){
      getKeywordsStructureCode( modelValueData )
      .then( function(code){
        resolve( code );
      } );
    } );
  }

  this.functionArray[ "keywordsstructure_designprogramming" ] = function( modelValueData ){
    return new Promise( function(resolve, reject){
      getKeywordsStructureCode( modelValueData )
      .then( function(code){
        resolve( code );
      } );
    } );
  }

  this.functionArray[ "keywordsstructure_frameworkstructure" ] = function( modelValueData ){
    return new Promise( function(resolve, reject){
      getKeywordsStructureCode( modelValueData )
      .then( function(code){
        resolve( code );
      } );
    } );
  }

  this.functionArray[ "keywordsstructure_connectioncommunication" ] = function( modelValueData ){
    return new Promise( function(resolve, reject){
      getKeywordsStructureCode( modelValueData )
      .then( function(code){
        resolve( code );
      } );
    } );
  }

  this.functionArray[ "keywordsstructure_discussionhotpotato" ] = function( modelValueData ){
    return new Promise( function(resolve, reject){
      getKeywordsStructureCode( modelValueData )
      .then( function(code){
        resolve( code );
      } );
    } );
  }
  // discussion - end
}
