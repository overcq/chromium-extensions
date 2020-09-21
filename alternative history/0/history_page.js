/*******************************************************************************
*   ___   publicplace
*  ¦OUX¦  ‟Javascript” implementation
*  ¦/C+¦  ‟chromium” extension
*   ---   alternative history database
*         listing page scripts
* ©overcq                on ‟Gentoo Linux 13.0” “x86_64”             2015‒2‒26 *
*******************************************************************************/
function H_ocq_Q_uri_R_decorated( uri
){  var d = document.createDocumentFragment();
    var a = H_ocq_Q_url_M(uri);
    if( a === undefined )
    {   d.appendChild( document.createTextNode( 33%`[invalid]`` ));
        return d;
    }
    var span = document.createElement( "span" );
    span.className = "a";
    span.appendChild( document.createTextNode( a[ "protocol" ] ));
    d.appendChild(span);
    if( a[ "host" ] !== undefined )
    {   span = document.createElement( "span" );
        span.className = "b";
        span.appendChild( document.createTextNode( H_ocq_Q_idn_R( a[ "host" ] )));
        d.appendChild(span);
    }
    if( a[ "path" ] !== "/" )
    {   span = document.createElement( "span" );
        span.className = "c";
        span.appendChild( document.createTextNode( H_ocq_Q_s_Z_html_R_breakable( decodeURIComponent( a[ "path" ] ))));
        if( a[ "host" ] !== undefined )
            d.appendChild( document.createTextNode( "\n" ));
        d.appendChild(span);
    }
    if( a[ "server_query" ] !== undefined )
    {   span = document.createElement( "span" );
        span.className = "d";
        span.appendChild( document.createTextNode( H_ocq_Q_s_Z_html_R_breakable( a[ "server_query" ] )));
        d.appendChild( document.createTextNode( "\n" ));
        var s = "";
        var a_1 = a[ "server_query" ].substring(1).split( "&" );
        for( var i = 0; i < a_1.length; i++ )
        {   var a_2 = a_1[i].split( "=" );
            if( a_2[0] === undefined )
                continue;
            s += a_2[0];
            if( a_2[1] === undefined )
            {   s += "\n";
                continue;
            }
            s += "="+ decodeURIComponent( a_2[1] ) +"\n";
        }
        span.setAttribute( "title", s.substring( 0, s.length - 1 ));
        d.appendChild(span);
    }
    if( a[ "client_query" ] !== undefined )
    {   span = document.createElement( "span" );
        span.className = "e";
        span.appendChild( document.createTextNode( H_ocq_Q_s_Z_html_R_breakable( "#"+ a[ "client_query" ] )));
        d.appendChild( document.createTextNode( "\n" ));
        d.appendChild(span);
    }
    return d;
}
//==============================================================================
function H_ocq_Q_list_I_show( filter
){  chrome.storage.local.get( null
    , function( items
      ){  var tbody = document.body.getElementsByTagName( "tbody" )[0];
          tbody.innerHTML = "";
          var last;
          for( var k in items )
          {   last = parseInt(k);
              break;
          }
          var ordinal = 0;
          for( var k in items )
          {   var d = parseInt(k);
              var block_end = d > last + Q_list_C_idle_period;
              last = d;
              if( filter !== undefined
              && !filter( d, items[k] )
              )
                  continue;
              var td = document.createElement( "td" );
              td.className = "a";
              td.appendChild( document.createTextNode( ++ordinal ));
              var tr = document.createElement( "tr" );
              tr.appendChild(td);
              td = document.createElement( "td" );
              td.className = "b";
              td.appendChild( document.createTextNode( H_ocq_Q_date_N_readable(d) ));
              tr.appendChild(td);
              if( typeof items[k] === "object"
              && items[k][1] === null
              ) ///NDFN jeśli z nie wiadomo jakiego powodu w sporadycznym naruszeniu przewidzianego raportowego przepływu wykonania— jako adres żądania ‘url’ jest ustawione “null” w “onCompleted”, to ignoruj adres żądania.
                  items[k] = items[k][0];
              if( typeof items[k] === "object" )
              {   var a = document.createElement( "a" );
                  a.href = items[k][0];
                  a.appendChild( H_ocq_Q_uri_R_decorated( items[k][0] ));
                  td = document.createElement( "td" );
                  td.className = "c";
                  td.appendChild(a);
                  tr.appendChild(td);
                  a = document.createElement( "a" );
                  a.href = items[k][1];
                  a.appendChild( H_ocq_Q_uri_R_decorated( items[k][1] ));
                  td = document.createElement( "td" );
                  td.className = "c";
                  td.appendChild(a);
                  tr.appendChild(td);
              }else
              {   var a = document.createElement( "a" );
                  a.href = items[k];
                  a.appendChild( H_ocq_Q_uri_R_decorated( items[k] ));
                  td = document.createElement( "td" );
                  td.className = "c";
                  td.setAttribute( "colspan", 2 );
                  td.appendChild(a);
                  tr.appendChild(td);
              }
              if( block_end
              && tbody.lastChild !== null
              )
              {   tbody.lastChild.className = "b";
                  tr.className = "b";
              }
              tbody.insertBefore( tr, tbody.firstElementChild );
          }
      }
    );
}
//==============================================================================
function H_ocq_Q_list_Q_show_X_change_I_last( e
){  e.stopPropagation();
    if( e.button )
        return;
    chrome.storage.local.get( null
    , function( items
      ){  var start = 0, last;
          var a = [];
          for( var k in items )
              a.push( parseInt(k) );
          a = a.sort();
          var i = a.length >= Q_list_C_last_count ? a.length - Q_list_C_last_count : 0;
          H_ocq_Q_list_I_show(
            (function( d
            ){  return function( k, v
                ){  return k >= d;
                };
            })( a[i] )
          );
      }
    );
}
function H_ocq_Q_list_Q_show_X_change_I_active( e
){  e.stopPropagation();
    if( e.button )
        return;
    chrome.storage.local.get( null
    , function( items
      ){  var start = 0, last;
          for( var k in items )
          {   last = parseInt(k);
              break;
          }
          for( var k in items )
          {   var d = parseInt(k);
              if( d > last + Q_list_C_idle_period )
                  start = d;
              last = d;
          }
          H_ocq_Q_list_I_show(
            (function( d
            ){  return function( k, v
                ){  return k >= d;
                };
            })(start)
          );
      }
    );
}
function H_ocq_Q_list_Q_show_X_change( e
){  e.stopPropagation();
    if( e.button )
        return;
    var n = parseInt( e.currentTarget.getAttribute( "data-days" ));
    var d = H_ocq_Q_date_P_clear_upto( H_ocq_Q_date_M_now() - H_ocq_E_date_I_u_delta( 4, n ), n !== 30 ? 3 : 4 );
    H_ocq_Q_list_I_show(
      (function( d
      ){  return function( k, v
          ){  return k > d;
          };
      })(d)
    );
}
function H_ocq_Q_list_Q_show_X_change_I_n_days( e
){  e.stopPropagation();
    if( e.button )
        return;
    var radio = e.currentTarget;
    e = document.getElementById( "show_n_days_S_n" );
    var s = e.value;
    var v = H_ocq_Q_number_N_int( parseFloat(s) );
    if( s === ""
    || v < 1
    )
    {   radio.disabled = true;
        radio.checked = false;
        e.value = "";
        return;
    }
    e.value = v;
    var now = H_ocq_Q_date_M_now();
    var d = H_ocq_E_date_I_u_delta( 4, v );
    if( H_ocq_Q_number_T_not_a_number(d)
    || now < d
    )
    {   radio.disabled = true;
        radio.checked = false;
        return;
    }
    d = H_ocq_Q_date_P_clear_upto( d, 3 );
    H_ocq_Q_list_I_show(
      (function( d
      ){  return function( k, v
          ){  return k > d;
          };
      })( now - d )
    );
}
function H_ocq_Q_list_Q_show_X_change_I_n_days_S_n( e
){  e.stopPropagation();
    if( e.button )
        return;
    var radio = document.getElementById( "show_n_days" );
    e = document.getElementById( "show_n_days_S_n" );
    var s = e.value;
    var v = H_ocq_Q_number_N_int( parseFloat(s) );
    if( s === ""
    || v < 1
    )
    {   radio.disabled = true;
        radio.checked = false;
        e.value = "";
        return;
    }
    e.value = v;
    var now = H_ocq_Q_date_M_now();
    var d = H_ocq_E_date_I_u_delta( 4, v );
    if( H_ocq_Q_number_T_not_a_number(d)
    || now < d
    )
    {   radio.disabled = true;
        radio.checked = false;
        return;
    }
    d = H_ocq_Q_date_P_clear_upto( d, 3 );
    radio.disabled = false;
    radio.checked = true;
    H_ocq_Q_list_I_show(
      (function( d
      ){  return function( k, v
          ){  return k > d;
          };
      })( now - d )
    );
}
function H_ocq_Q_list_Q_show_X_change_I_all( e
){  e.stopPropagation();
    if( e.button )
        return;
    H_ocq_Q_list_I_show();
}
//==============================================================================
function Q_conf_X( o
){  var e = document.getElementById( "show_active" );
    if( e.checked )
        if( o[ "Q_list_C_idle_period" ] !== undefined )
        {   e.checked = false;
            e.click();
        }
}
document.addEventListener( "DOMContentLoaded"
, function(
  ){  document.body.getElementsByTagName( "fieldset" )[0].getElementsByTagName( "legend" )[0].appendChild( document.createTextNode( 16%`show range`` ));
      var thead = document.body.getElementsByTagName( "thead" )[0];
      var tr = document.createElement( "tr" );
      var th = document.createElement( "th" );
      th.appendChild( document.createTextNode( 34%`ordinal`` ));
      th.setAttribute( "rowspan", 2 );
      tr.appendChild(th);
      th = document.createElement( "th" );
      th.appendChild( document.createTextNode( 0%`timestamp`` ));
      th.setAttribute( "rowspan", 2 );
      tr.appendChild(th);
      th = document.createElement( "th" );
      th.appendChild( document.createTextNode( 1%`‘url’`` ));
      th.setAttribute( "colspan", 2 );
      tr.appendChild(th);
      thead.appendChild(tr);
      tr = document.createElement( "tr" );
      th = document.createElement( "th" );
      th.appendChild( document.createTextNode( 3%`received`` ));
      tr.appendChild(th);
      th = document.createElement( "th" );
      th.appendChild( document.createTextNode( 2%`requested`` ));
      tr.appendChild(th);
      thead.appendChild(tr);
      var a = document.getElementById( "show_last" );
      a.parentNode.appendChild( document.createTextNode( 35%`last addresses`` ));
      a.addEventListener( "change", H_ocq_Q_list_Q_show_X_change_I_last, true );
      var e = document.getElementById( "show_active" );
      e.parentNode.appendChild( document.createTextNode( 18%`last active time`` ));
      e.addEventListener( "change", H_ocq_Q_list_Q_show_X_change_I_active, true );
      var e = document.getElementById( "show_day" );
      e.parentNode.appendChild( document.createTextNode( 19%`last day`` ));
      e.addEventListener( "change", H_ocq_Q_list_Q_show_X_change, true );
      var e = document.getElementById( "show_week" );
      e.parentNode.appendChild( document.createTextNode( 20%`last week`` ));
      e.addEventListener( "change", H_ocq_Q_list_Q_show_X_change, true );
      var e = document.getElementById( "show_10_days" );
      e.parentNode.appendChild( document.createTextNode( 21%`last 10 days`` ));
      e.addEventListener( "change", H_ocq_Q_list_Q_show_X_change, true );
      var e = document.getElementById( "show_month" );
      e.parentNode.appendChild( document.createTextNode( 22%`last month`` ));
      e.addEventListener( "change", H_ocq_Q_list_Q_show_X_change, true );
      var e = document.getElementById( "show_n_days" );
      e.parentNode.insertBefore( document.createTextNode( 23%`last`` +" " ), e.nextSibling );
      e.parentNode.appendChild( document.createTextNode( " "+ 24%`days`` ));
      e.addEventListener( "change", H_ocq_Q_list_Q_show_X_change_I_n_days, true );
      document.getElementById( "show_n_days_S_n" ).addEventListener( "change", H_ocq_Q_list_Q_show_X_change_I_n_days_S_n, true );
      var e = document.getElementById( "show_all" );
      e.parentNode.appendChild( document.createTextNode( 17%`all this time`` ));
      e.addEventListener( "change", H_ocq_Q_list_Q_show_X_change_I_all, true );
      a.click();
  }
);
/******************************************************************************/
