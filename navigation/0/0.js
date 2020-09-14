/*******************************************************************************
*   ___   publicplace
*  ¦OUX¦  ‟Javascript” implementation
*  ¦Inc¦  ‟chromium” extension
*   ---   navigation
*         background scripts
* ©overcq                on ‟Gentoo Linux 13.0” “x86_64”             2015‒3‒31 *
*******************************************************************************/
var Q_url_S_a = {};
//=============================================================================
function Q_url_M( tab_id
, url
){  var a = H_ocq_Q_url_M(url);
    if( a === undefined
    || !H_ocq_Q_url_T_www(a)
    ){  chrome.browserAction.disable( tab_id );
        return;
    }
    var n = 0;
    if( a[ "host" ] !== undefined )
        n += a[ "host" ].split( "." ).length - 1;
    if( a[ "path" ] !== "/" )
        n += a[ "path" ].split( "/" ).length - 1; ///wszystkie elementy oprócz ‛(powyżej) ‘root’’.
    if( a[ "server_query" ] !== undefined )
        n++;
    if( a[ "client_query" ] !== undefined )
        n++;
    if(n)
        Q_url_S_a[ tab_id ] = a;
    chrome.browserAction.setBadgeText(
      { "tabId": tab_id
      , "text": n ? ""+ n : ""
      }
    );
    if(n)
        chrome.browserAction.enable( tab_id );
    else
        chrome.browserAction.disable( tab_id );
}
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
chrome.runtime.onMessage.addListener(
  function( msg
  , sender
  , response
  ){  if( H_ocq_E_sh_lib_Q_conf_I_msg( msg, response ))
          return false;
      if( msg[0] === 10 )
          response( H_ocq_Q_object_R_encode_undefined( Q_url_S_a[ msg[1] ] ));
      return false;
  }
);
window.addEventListener( "load"
, function(
  ){  chrome.browserAction.setBadgeBackgroundColor(
        { 'color': [ 122, 122, 127, 255 ]
        }
      );
      chrome.tabs.query( {}
      , function( tabs
        ){  for( var i = 0; i !== tabs.length; i++ )
                Q_url_M( tabs[i].id, tabs[i].url );
            init_end;
        }
      );
      chrome.tabs.onUpdated.addListener(
        function( tab_id
        , info
        , tab
        ){  var url;
            if( info.status === "complete" ) //WA bo kasuje ‘badge’.
                url = info.url !== undefined ? info.url : tab.url;
            else if( info.url !== undefined )
                url = info.url;
            else
                return;
            Q_url_M( tab_id, H_ocq_Q_s_Z_url_I_normalize(url) );
        }
      );
      chrome.tabs.onRemoved.addListener(
        function( tab_id
        , info
        ){  delete Q_url_S_a[ tab_id ];
        }
      );
  }
);
/******************************************************************************/
