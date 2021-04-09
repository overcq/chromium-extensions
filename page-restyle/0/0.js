/*******************************************************************************
*   ___   publicplace
*  ¦OUX¦  ‟Javascript” implementation
*  ¦/C+¦  ‟chromium” extension
*   ---   page restyle
*         background scripts
* ©overcq                on ‟Gentoo Linux 13.0” “x86_64”             2015‒4‒28 *
*******************************************************************************/
function Q_page_I_restyle( tab_id
){  chrome.tabs.executeScript( tab_id
    , { "code": "location.hostname == \"localhost\" || document.documentElement.hasAttribute( \"data-ocq\" );"
      , "runAt": "document_start"
      }
    , function( result
      ){  if( result === undefined
          || result[0]
          )
              return;
          chrome.tabs.insertCSS( tab_id
          , { "file": "cs.css"
            , "allFrames": true
            , "runAt": "document_start"
            }
          );
          chrome.tabs.executeScript( tab_id
          , { "file": "cs.js"
            , "allFrames": true
            , "runAt": "document_start"
            }
          );
      }
    );
}
//==============================================================================
var E_conf_S_defaults =
{ "Q_color_C_default_background": 0xcacaca
, "Q_color_C_default_border": 0x7a7a7f
, "Q_color_C_default_text": 0x0
, "Q_color_C_max_gray_diff": 0.125
, "Q_color_C_min_contrast": 0.5
};
function E_conf_Q_storage_T( k
, v
){  var b;
    switch(k)
    { case "Q_color_C_default_background":
      case "Q_color_C_default_border":
      case "Q_color_C_default_text":
            b = v === H_ocq_Q_number_N_int(v)
            && v >= 0
            && v <= 0xffffff;
            break;
      case "Q_color_C_max_gray_diff": ///maksymalny ułamek różnicy oryginalnego koloru od szarości, by został zmieniony.
            b = v >= 0 && v <= 1
            break;
      case "Q_color_C_min_contrast": ///dolna granica minimalnego ułamka jasności koloru tekstu a tła, by kolor tekstu nie został zmieniony na biały lub czarny.
            b = v >= 0 && v <= 1
            break;
    }
    return b;
}
function E_conf_Q_storage_R_conv( k
, v
){  switch(k)
    { case "Q_color_C_default_background":
      case "Q_color_C_default_border":
      case "Q_color_C_default_text":
            v =
            [ ( v >> 16 ) & 0xff
            , ( v >> 8 ) & 0xff
            , v & 0xff
            ];
            break;
    }
    return v;
}
function E_conf_Q_storage_P_conv( k
, v
){  switch(k)
    { case "Q_color_C_default_background":
      case "Q_color_C_default_border":
      case "Q_color_C_default_text":
            v = ( v[0] << 16 ) | ( v[1] << 8 ) | v[2];
            break;
    }
    return v;
}
function Q_conf_X( o
){  for( var k in o )
        switch(k)
        { case "Q_color_C_default_background":
          case "Q_color_C_default_border":
          case "Q_color_C_default_text":
          case "Q_color_C_max_gray_diff":
                chrome.tabs.query(
                  { "status": "complete"
                  , "windowType": "normal"
                  , "url":
                    [ "file://*"
                    , "http://*/*"
                    , "https://*/*"
                    , "ftp://*/*"
                    ]
                  }
                , function( tabs
                  ){  for( var i = 0; i !== tabs.length; i++ )
                          Q_page_I_restyle( tabs[i].id );
                  }
                );
                break;
        }
}
//------------------------------------------------------------------------------
window.addEventListener( "load"
, function(
  ){  chrome.runtime.onMessage.addListener(
        function( msg
        , sender
        , response
        ){  if( H_ocq_E_sh_lib_Q_conf_I_msg( msg, response ))
                return false;
            switch( msg[0] )
            { case 10:
                    response(
                      [ Q_color_C_default_background
                      , Q_color_C_default_border
                      , Q_color_C_default_text
                      , Q_color_C_max_gray_diff
                      ]
                    );
                    break;
            }
            return false;
        }
      );
      chrome.tabs.onUpdated.addListener(
        function( tab_id
        , info
        , tab
        ){  if(( info.url !== undefined
              || info.status === "complete"
              )
            && H_ocq_Q_s_Z_url_T_www( info.url !== undefined ? info.url : tab.url )
            )
                Q_page_I_restyle( tab_id );
        }
      );
  }
);
/******************************************************************************/
