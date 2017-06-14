exports.menuGenerator = function(){

  this.createMenuList = function( menuList, reqPath ){
    var innerMenuCodes = "";
    var innerTitleCodes = "";
    var innerRightMenuCodes = "";

    // Top Menu
    for( var i=0; i<menuList.length; i++ ){
      var id = menuList[i].id;
      var name = menuList[i].name;
      var displayName = menuList[i].displayName;
      var redirectPath = menuList[i].redirectPath;

      if( menuList[i].level == 0 ){
        if( reqPath.indexOf(redirectPath) > -1 ){
          innerMenuCodes += `<li class="active"><a href="` + redirectPath + `" id="` + id + `" name="` + name + `">` + displayName + `</a></li>`;
        } else{
          innerMenuCodes += `<li><a href="` + redirectPath + `" id="` + id + `" name="` + name + `">` + displayName + `</a></li>`;
        }
      } else if( menuList[i].level == -1 ){
        innerTitleCodes += `<a class="navbar-brand" href="` + redirectPath + `" id="` + id + `" name="` + name + `">` + displayName + `</a>`;
      } else if( menuList[i].level == -2 ){
        innerRightMenuCodes += `<li ><a href="` + redirectPath + `" id="` + id + `" name="` + name + `">` + displayName + `</a></li>`;
      }
    }

    return { "innerMenuCodes" : innerMenuCodes, "innerTitleCodes" : innerTitleCodes, "innerRightMenuCodes" : innerRightMenuCodes };
  }

  this.createSubMenuList = function( subMenuList, specificMenuList, reqPath ){
    var innerSubMenuCodes = "";

    // Sub Side Nav
    for( var i=0; i<subMenuList.length; i++ ){
      var id = subMenuList[i].id;
      var name = subMenuList[i].name;
      var displayName = subMenuList[i].displayName;
      var redirectPath = subMenuList[i].redirectPath;

      innerSubMenuCodes += `<li><a href="` + redirectPath + `" id="` + id + `" name="` + name + `">` + displayName + `</a>`;

      var specificMenuCodes = `<ul class="sub-side-nav affix">`;
      for( var j=0; j<specificMenuList.length; j++ ){
        if( id == specificMenuList[j].parent ){

          var subId = specificMenuList[j].id;
          var subName = specificMenuList[j].name;
          var subDisplayName = specificMenuList[j].displayName;
          var subRedirectPath = specificMenuList[j].redirectPath;

          specificMenuCodes += `<li><a href="` + subRedirectPath + `" id="` + subId + `" name="` + subName + `">` + subDisplayName + `</a></li>`;
        }
      }
      specificMenuCodes += `</ul>`;

      if( specificMenuCodes != `<ul class="sub-side-nav affix"></ul>` ){
        innerSubMenuCodes += specificMenuCodes;
      }

      innerSubMenuCodes += `</li>`;

    }

    return innerSubMenuCodes;
  }

  this.createMenuDescription = function( menuDescription, reqPath ){
    var innerMenuDescriptionCode = "";

    // Sub Side Nav Description
    innerMenuDescriptionCode += `<h3>` + menuDescription[0].displayName + `</h3><p class="doc-description-content">` + menuDescription[0].description + `</p>`;

    return innerMenuDescriptionCode;
  }

  this.createKeywordList = function( keywordList ){
    var innerKeywordCode = "";

    var i = parseInt("0");

    console.log( typeof i );

    while( i < keywordList.length ){

      innerKeywordCode += `<thead><tr>`;
      while( keywordList[i].level == 0 ){
        innerKeywordCode += `<td>` + keywordList[i].displayName + `</td>`;
        i++;
      }
      innerKeywordCode += `</tr></thead>`;

    }

    return innerKeywordCode;
  }

}
