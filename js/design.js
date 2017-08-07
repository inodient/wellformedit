$(document).ready( function(){

  // .after height
  $(".after").css( "height", $(".base").outerHeight() + $(".navbar").outerHeight() );

  // .side-nav position
  $(".side-nav").css({top:0, position:"relative"});

  // when scroll, .side-nav position
  var side_nav_width = 0;
  var doc_discription_width = 0;
  doc_discription_width = $(".doc-description").css("width");

  if( $("blockquote").length ){
    if( $(window).scrollTop() > $("blockquote").outerHeight() + parseInt( $(".doc-nav").css( "padding-top" ).replace( "px", "" ) ) ){
      $(".side-nav").css({top: parseInt( $(".doc-nav").css( "padding-top" ).replace( "px", "" ) ) - parseInt( $("blockquote").css("padding-top").replace( "px", "" ) ), position:'fixed', width: doc_discription_width});
      $(".side-nav").addClass( "affix" );
    }

    $(window).scroll( function( event ){
      if( $(window).scrollTop() > $("blockquote").outerHeight() + parseInt( $(".doc-nav").css( "padding-top" ).replace( "px", "" ) ) ){
        $(".side-nav").css({top: parseInt( $(".doc-nav").css( "padding-top" ).replace( "px", "" ) ) - parseInt( $("blockquote").css("padding-top").replace( "px", "" ) ), position:'fixed', width: doc_discription_width});
        $(".side-nav").addClass( "affix" );
      } else{
        $(".side-nav").css({top:0, position:'relative'});
        $(".side-nav").removeClass( "affix" );
      }

      $(".after").css( "height", $(".base").outerHeight() + $(".navbar").outerHeight() );
    });
  }

  // hovered
  $(".side-nav > li").hover(
    function(event){
      $(this).addClass( "hovered" );
      $(this).children("a").addClass( "hovered" );
      $(this).children("ul").addClass( "hovered" );
    },
    function(event){
      $("*").removeClass( "hovered" );
    }
  );

  $(".sub-side-nav > li").hover(
    function(event){
      $("*").removeClass( "hovered" );
      $(this).parent().addClass( "hovered" );
      $(this).addClass( "hovered" );
      $(this).children("a").addClass( "hovered" );
    },
    function(event){
      $("*").removeClass( "hovered" );
    }
  );

  // active
  $(".side-nav > li > a").on( "click", function(event){
    $(".side-nav *, .sub-side-nav *").removeClass("active");

    $(this).parent().addClass( "active" ); // li
    $(this).addClass( "active" ); // a
  } );

  $(".sub-side-nav > li > a").on( "click", function(event){
    $(".side-nav *, .sub-side-nav *").removeClass("active");

    $(this).parent().parent().siblings("a").addClass( "active" ); // li > a
    $(this).parent().parent().addClass( "active" ); // ul
    $(this).parent().addClass( "active" ); // li
    $(this).addClass( "active" ); // a
  } );

  // scrolled
  var offset = 80;
  var activeElement = "";
  var lastScrolledId = "";

  $(window).scroll( function(event){

    // Side Nav Active - Start
    var specifics = document.getElementsByClassName( "header" );

    if( specifics == null ){
      specifics = document.getElementsByClassName( "" );
    }

    var i = 0;

    for( i=0; i<specifics.length; i++ ){
      var startOffset = 0;
      var endOffset = 0;

      startOffset = $( "#" + specifics[i].id ).offset().top - offset;
      if( startOffset > $(window).scrollTop() ){
        activeElement = "";
        break;
      }

      if( i != specifics.length - 1 ){
        endOffset = $( "#" + specifics[i+1].id ).offset().top - offset;
      } else{
        // endOffset = $( "#" + specifics[i].id ).offset().top + $( ".content_specific" ).outerHeight() - offset;
        endOffset = $( "#" + specifics[i].id ).offset().top + $( "#" + specifics[i].id ).parent().outerHeight( true ) - offset;
      }

      if( $(window).scrollTop() > startOffset && $(window).scrollTop() < endOffset ){
        activeElement = specifics[i].id;
        break;
      }

      if( $(window).scrollTop() + $(window).height() == $(document).height() ){
        activeElement = specifics[specifics.length - 1].id;
        break;
      }

      if( i == specifics.length ){
        activeElement = "";
      }
    }

    if( activeElement != "" ){
      $("*").removeClass( "scrolled" );
      $( "#" + activeElement.replace("_redirect", "") ).addClass( "scrolled" );
      $( "#" + activeElement.replace("_redirect", "") ).parent().parent().parent().children(".sub-side-nav").addClass( "scrolled" );
      $( "#" + activeElement.replace("_redirect", "") ).parent().parent().siblings("li > a").addClass( "scrolled" );
    } else{
      $("*").removeClass( "scrolled" );
      $(".side-nav *, .sub-side-nav *").removeClass( "active" );
    }

    // Side Nav Active - end

    // Mobile H3 affix - start
    if( $(window).width() < 768 ){

      $(".scrolled").each( function(){
        let navId = $(this).attr("id");
        let scrolledId = navId + "_redirect";

        if( navId != undefined ){
          let urlStr = $(location).attr("href");

          $(".navbar-brand.navbar-index").attr( "href", urlStr.split( "#" )[0] + "#" + scrolledId );
          $(".navbar-brand.navbar-index").text( $("#" + scrolledId).text() );
        } else{
          $(".navbar-brand.navbar-index").text( "Well Formed IT" );
          $(".navbar-brand.navbar-index").attr( "href", "/" );
        }
      } );
    }

    // Mobile H3 affix - end
  } );




  // mobile page sub-side-nav focus
  $(".collapsed-menu-header > ul > li > a").on("click", function(event){
    $(".collapsed-menu-header > ul > li > a.focus").removeClass( "focus" );
    $(this).toggleClass( "focus" );
  } );

  $(".collapsed-menu-header > a").on("click", function(event){
    $(".collapsed-menu-header > ul > li > a.focus").removeClass( "focus" );
  } );

  // mobile page menu hidden
  $('.nav a').on('click', function(){
    if( $(window).width() < 767 ){
      $('.btn-navbar').click(); //bootstrap 2.x
      $('.navbar-toggle').click() //bootstrap 3.x by Richard
    }
  } );

  // adjust img width
  $(".doc img").each(function(){
    var ratio_img = $(this).width() / $(this).height();

    if (ratio_img > 1)
    {
        $(this).css({"width": "100%", "height": "auto"});
    }
    else if ( ratio_img < 1 )
    {
        $(this).css({"width": "auto", "height": "100%"});
    }
  } );


  // adjust keyword architecture img margin
  // if( $(window).width() >= 767 ){
  //   $(".keywordarchitecture_description_col").each( function(){
  //     let margin = ( $(this).siblings(".keywordarchitecture_img_col").height() - $(this).height() );
  //
  //     $(this).css( "margin-top", margin );
  //   } );
  // }

  // adjust topic thumbnail img margin
  if( $(window).width() >= 767 ){
    $(".topic_thumbnail_img").each( function(){
      let margin = ( $(this).siblings(".topic_content").height() - $(this).find("img").height() );

      $(this).css( "margin-top", margin-10 );
    } );
  }
} );
