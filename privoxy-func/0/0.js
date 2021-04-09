/*******************************************************************************
*   ___   publicplace
*  ¦OUX¦  ‟Javascript” library
*  ¦/C+¦  ‟chromium” extension
*   ---   privoxy func
*         background scripts
* ©overcq                on ‟Gentoo Linux 17.1” “x86_64”             2020‒9‒23 e
*******************************************************************************/
function Q_canvas_I_point( c
, x
, y
){  c.moveTo( x, y );
    c.lineTo( x + 1, y + 1 );
}
function Q_canvas_I_line( c
, x_1
, y_1
, x_2
, y_2
){  if( x_1 == x_2
      && y_1 == y_2
    )
    {   Q_canvas_I_point( x_1, y_1 );
    }else
    {   if( x_1 == x_2 )
            x_1 = x_2 += 0.5;
        else if( x_2 > x_1 )
            x_2++;
        else
            x_1++;
        if( y_1 == y_2 )
            y_1 = y_2 += 0.5;
        else if( y_2 > y_1 )
            y_2++;
        else
            y_1++;
    }
    c.moveTo( x_1, y_1 );
    c.lineTo( x_2, y_2 );
}
//==============================================================================
var Q_page_icon_S_canvas_context;
//==============================================================================
function Q_page_icon_I_draw(
){  var e = document.createElement( "CANVAS" );
    var c = Q_page_icon_S_canvas_context = e.getContext( "2d" );
    c.lineCap = "square";
    c.lineJoin = "bevel";
    c.fillStyle = "#cacaca";
    c.strokeStyle = "#7a7a7f";
    c.fillRect( 0, 0, 19, 19 );
    Q_canvas_I_line( c, 1, 1, 18, 18 );
    Q_canvas_I_line( c, 18, 1, 1, 18 );
    c.stroke();
}
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
document.addEventListener( "DOMContentLoaded", function(
){  chrome.tabs.onUpdated.addListener(
      function( tab_id
      , info
      , tab
      ){  var url = tab.url != undefined ? tab.url : info.url != undefined ? info.url : undefined;
          if( url !== undefined
          && !/^http:/.test(url) )
              return;
          var a;
          if( info.status == "loading" )
          {   var data = Q_page_icon_S_canvas_context.getImageData( 0, 0, 19, 19 );
              chrome.pageAction.setIcon(
                { "tabId": tab_id
                , "imageData": data
                }
              );
              chrome.pageAction.show( tab_id );
          }else if( info.status == "complete"
            && ( a = tab.url.match( /^(http:\/\/[^\/]+)\/PRIVOXY-FORCE(\/[^;?#]*|$)/ ))
          )
          {   chrome.tabs.executeScript( tab_id
              , { "code": "("+
                    function( host
                    , up
                    ){  eval( "("+ arguments[ arguments.length - 1 ][ "H_ocq_E_sh_lib_Q_js_Z_cs_I_inject_procs_R_args" ] +")(arguments);" );
                        var match_length = host.length;
                        function fix_addr( e
                        , a
                        ){  var s = e.getAttribute(a);
                            if( !s )
                                return;
                            if( s.substring( 0, 1 ) == "/" )
                                e.setAttribute( a, up + s.substring( 1 ));
                            else if( s.substring( 0, match_length ) == host )
                                e.setAttribute( a, up + s.substring( match_length ));
                        }
                        var es = document.getElementsByTagName( "base" );
                        for( var i = es.length - 1; i >= 0; i-- )
                            es[i].parentNode.removeChild( es[i] );
                        es = document.getElementsByTagName( "link" );
                        for( var i = 0; i < es.length; i++ )
                        {   var a = es[i].getAttribute( "rel" );
                            if( !a )
                                continue;
                            if( /^stylesheet$/i.test(a)
                            || /^shourtcut icon$/i.test(a)
                            )
                                fix_addr( es[i], "src" );
                        }
                        es = document.getElementsByTagName( "img" );
                        for( var i = 0; i < es.length; i++ )
                            fix_addr( es[i], "src" );
                        es = document.getElementsByTagName( "a" );
                        for( var i = 0; i < es.length; i++ )
                            fix_addr( es[i], "href" );
                    }
                  +")( "+ JSON.stringify( a[1] +"/" )
                  +", "+ JSON.stringify( a[2].replace( /[^\/]+$/, "" ).replace( /[^\/]+\//g, "../" ).replace( /^\//, "" ))
                  +", "+ H_ocq_E_sh_lib_Q_js_Z_cs_I_inject_procs_P_args(null)
                  +" );"
                , "runAt": "document_start"
                }
              );
          }
      }
    );
    chrome.runtime.onMessage.addListener(
      function(
        data
      , sender
      , response
      ){  chrome.tabs.getSelected( null
          , function( tab
            ){  if( !/^http:/.test( tab.url ))
                    return;
                var url;
                switch( data[0] )
                { case 0: // why
                      var a = tab.url.match( /^http:\/\/(?:p\.p|config\.privoxy\.org)\/show-url-info\?url=(.*)$/ );
                      if(a)
                      {   var p = a[1].indexOf( "#" );
                          url = decodeURIComponent( p == -1 ? a[1] : a[1].substring( 0, p ));
                      }else if( !/^http:\/\/(?:p\.p|config\.privoxy\.org)\//.test( tab.url ))
                      {   if( a = tab.url.match( /^([^:]+:\/\/[^\/]+)\/PRIVOXY-FORCE(\/.*|$)/ ))
                              url = a[1] + a[2];
                          else
                              url = tab.url;
                          url = "http://p.p/show-url-info?url="+ encodeURIComponent(url);
                      }else
                          return;
                      break;
                  case 1: // over
                      var a = tab.url.match( /^http:\/\/(?:p\.p|config\.privoxy\.org)\/show-url-info\?url=(.*)$/ )
                      if( !a
                      && /^http:\/\/(?:p\.p|config\.privoxy\.org)\//.test( tab.url )
                      )
                          return;
                      var url;
                      if(a)
                      {   var p = a[1].indexOf( "#" );
                          url = decodeURIComponent( p == -1 ? a[1] : a[1].substring( 0, p ));
                      }else
                          url = tab.url;
                      a = url.match( /^([^:]+:\/\/[^\/]+)(.*)$/ );
                      if( /\/PRIVOXY-FORCE(?:\/|$)/.test( a[2] ))
                          url = a[1] + a[2].substring(14);
                      else
                          url = a[1] +"/PRIVOXY-FORCE"+ a[2];
                      break;
                  default:
                      return;
                }
                chrome.tabs.update( tab.id
                , { "url": url
                  }
                );
            }
          );
      }
    );
    Q_page_icon_I_draw();
}
, false
);
/******************************************************************************/
