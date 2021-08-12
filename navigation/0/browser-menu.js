/*******************************************************************************
*   ___   publicplace
*  ¦OUX¦  ‟Javascript” implementation
*  ¦/C+¦  ‟chromium” extension
*   ---   navigation
*         navigation menu scripts
* ©overcq                on ‟Gentoo Linux 13.0” “x86_64”             2015‒3‒31 *
*******************************************************************************/
function Q_tr_X_click( e
){  if(( e.button
    && e.button !== 1
    ) || e.ctrlKey || e.altKey || e.metaKey
    )
        return true;
    e.stopPropagation();
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
              [ 10
              , tabs[0].id
              ]
            , function( a
              ){  a = H_ocq_Q_object_R_decode_undefined(a);
                  if( a !== undefined )
                  {   let s;
                      const tr = document.createElement( "tr" );
                      const m = a[ "protocol" ].match( /^(http)(s)?$/ )
                      if( m !== null )
                      {   if( m[2] === undefined )
                              a[ "protocol" ] += "s";
                          else
                              a[ "protocol" ] = m[1];
                          s = H_ocq_Q_url_Z_unicode_N_readable(
                            { "protocol": m[0]
                            }
                          ) +" ⇢ "+
                          H_ocq_Q_url_Z_unicode_N_readable(
                            { "protocol": a[ "protocol" ]
                            }
                          );
                          tr.setAttribute( "data-url", H_ocq_Q_url_R(a) );
                          tr.addEventListener( "click", Q_tr_X_click, true );
                          a[ "protocol" ] = m[0];
                      }else
                          s = a[ "protocol" ] +":";
                      const td = document.createElement( "td" );
                      td.appendChild( document.createTextNode(s) );
                      tr.appendChild(td);
                      tbody.appendChild(tr);
                      if( /^https?$/.test( a[ "protocol" ] )
                      && /\./.test( a[ "host" ] )
                      && !/^www\./.test( a[ "host" ] )
                      )
                      {   const tr = document.createElement( "tr" );
                          tr.setAttribute( "data-url"
                          , H_ocq_Q_url_R( H_ocq_Q_url_M_incomplete(
                              { "protocol": a[ "protocol" ]
                              , "domain": "www."+ a[ "host" ]
                              }
                          )));
                          tr.addEventListener( "click", Q_tr_X_click, true );
                          const td = document.createElement( "td" );
                          td.appendChild( document.createTextNode( "⇢ "+ H_ocq_Q_url_Z_unicode_N_readable(
                            { "domain": "www."+ a[ "host" ]
                            , "path": "/"
                            }
                          )));
                          tr.appendChild(td);
                          tbody.appendChild(tr);
                      }
                      let b;
                      let s_display;
                      if( a[ "host" ] !== undefined )
                      {   b = a[ "host" ].split( "." );
                          if( b.length > 1 )
                          {   s = b.pop();
                              s_display = "."+ H_ocq_E_idn_N_entity(s);
                              s = "."+ s;
                          }else
                          {   s = "";
                              s_display = "";
                          }
                          for( let i = b.length - 1; i >= 0; i-- )
                          {   s = "."+ b[i] + s;
                              s_display = "."+ H_ocq_E_idn_N_entity( b[i] ) + s_display;
                              const td = document.createElement( "td" );
                              td.style.textAlign = "right";
                              td.appendChild( document.createTextNode( H_ocq_Q_url_Z_unicode_N_readable(
                                { "host": s_display
                                }
                              )));
                              const tr = document.createElement( "tr" );
                              tr.setAttribute( "data-url"
                              , H_ocq_Q_url_R( H_ocq_Q_url_M_incomplete(
                                  { "protocol": a[ "protocol" ]
                                  , "host": s.substring(1)
                                  }
                              )));
                              tr.addEventListener( "click", Q_tr_X_click, true );
                              tr.appendChild(td);
                              tbody.appendChild(tr);
                          }
                      }
                      if( a[ "path" ] !== "/" )
                      {   b = a[ "path" ].split( "/" );
                          b.shift();
                          s = "";
                          s_display = "";
                          for( let i = 0; i !== b.length; i++ )
                          {   s += "/"+ b[i];
                              s_display += "/"+ decodeURIComponent( b[i] );
                              const td = document.createElement( "td" );
                              td.appendChild( document.createTextNode( H_ocq_Q_url_Z_unicode_N_readable(
                                { "path": s_display
                                }
                              )));
                              const tr = document.createElement( "tr" );
                              tr.setAttribute( "data-url"
                              , H_ocq_Q_url_R( H_ocq_Q_url_M_incomplete(
                                  { "protocol": a[ "protocol" ]
                                  , "host": a[ "host" ]
                                  , "path": s
                                  }
                              )));
                              tr.addEventListener( "click", Q_tr_X_click, true );
                              tr.appendChild(td);
                              tbody.appendChild(tr);
                          }
                      }
                      if( a[ "server_query" ] !== undefined )
                      {   s = a[ "client_query" ];
                          delete a[ "client_query" ];
                          const td = document.createElement( "td" );
                          td.appendChild( document.createTextNode( H_ocq_Q_url_Z_unicode_N_readable(
                            { "server_query": a[ "server_query" ]
                            }
                          )));
                          const tr = document.createElement( "tr" );
                          tr.setAttribute( "data-url", H_ocq_Q_url_R( H_ocq_Q_url_M_incomplete(a)));
                          tr.addEventListener( "click", Q_tr_X_click, true );
                          tr.appendChild(td);
                          tbody.appendChild(tr);
                          if( s !== undefined )
                              a[ "client_query" ] = s;
                      }
                      if( a[ "client_query" ] !== undefined )
                      {   const td = document.createElement( "td" );
                          td.style.textAlign = "right";
                          td.appendChild( document.createTextNode( H_ocq_Q_url_Z_unicode_N_readable(
                            { "client_query": a[ "client_query" ]
                            }
                          )));
                          const tr = document.createElement( "tr" );
                          tr.appendChild(td);
                          tbody.appendChild(tr);
                      }
                      tr.removeEventListener( "click", Q_tr_X_click, true );
                      tr.removeAttribute( "data-url" );
                  }
                  init_end;
              }
            );
        }
      );
  }
);
/******************************************************************************/
