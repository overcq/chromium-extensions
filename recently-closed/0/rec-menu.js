/*******************************************************************************
*   ___   publicplace
*  ¦OUX¦  ‟Javascript” implementation
*  ¦/C+¦  ‟chromium” extension
*   ---   recently closed
*         rec menu scripts
* ©overcq                on ‟Gentoo Linux 13.0” “x86_64”              2015‒3‒2 *
*******************************************************************************/
function Q_tr_X_click( e
){  if(( e.button !== 0
    && e.button !== 1
    ) || e.ctrlKey || e.altKey || e.metaKey
    )
        return true;
    e.stopPropagation();
    if( e.button )
        chrome.runtime.sendMessage(
          [ 11
          , e.currentTarget.id.substring(1)
          ]
        );
    const o = { "url": e.currentTarget.getAttribute( "data-url" ) };
    if( e.button )
        chrome.tabs.create(o);
    else
        chrome.tabs.update(o);
    window.setTimeout(
      function(
      ){  window.close();
      }
    , H_ocq_E_ui_Q_menu_S_delay
    );
}
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
document.addEventListener( "DOMContentLoaded"
, function(
  ){  const tbody = document.getElementsByTagName( "tbody" )[0];
      chrome.tabs.query(
        { "currentWindow": true
        , "active": true
        }
      , function( tabs
        ){  chrome.runtime.sendMessage(
              [ 10 ]
            , function( a
              ){  a = H_ocq_Q_object_R_decode_undefined(a);
                  for( let i = 0; i !== a.length; i++ )
                  {   const tr = document.createElement( "tr" );
                      tr.id = "_"+ i;
                      tr.setAttribute( "data-url", a[i][ "url" ] );
                      tr.addEventListener( "mousedown", Q_tr_X_click, true );
                      td = document.createElement( "td" );
                      td.appendChild( document.createTextNode( a[i][ "title" ] ) );
                      tr.appendChild(td);
                      td = document.createElement( "td" );
                      td.appendChild( document.createTextNode( a[i][ "url" ] ) );
                      tr.appendChild(td);
                      tbody.appendChild(tr);
                  }
                  init_end;
              }
            );
        }
      );
  }
);
/******************************************************************************/
