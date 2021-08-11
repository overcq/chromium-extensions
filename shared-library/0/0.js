/*******************************************************************************
*   ___   publicplace
*  ¦OUX¦  ‟Javascript” library
*  ¦/C+¦  ‟chromium” extension
*   ---   shared library
*         background scripts
* ©overcq                on ‟Gentoo Linux 13.0” “x86_64”             2015‒3‒11 *
*******************************************************************************/
var H_ocq_Q_number_Z_integer_S_min, H_ocq_Q_number_Z_integer_S_max;
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function H_ocq_Q_number_T_not_a_number( v
){  return v !== v;
}
function H_ocq_Q_number_T_in_range( v
){  return v >= Number.MIN_VALUE && v <= Number.MAX_VALUE;
}
function H_ocq_Q_number_T( v
){  return !H_ocq_Q_number_T_not_a_number(v) && H_ocq_Q_number_T_in_range(v);
}
function H_ocq_Q_number_N_int( v
){  return v >= H_ocq_Q_number_Z_integer_S_min && v <= H_ocq_Q_number_Z_integer_S_max ? v >> 0 : parseInt(v);
}
//------------------------------------------------------------------------------
function H_ocq_Q_number_I_abs( a
){  return a > 0 ? a : -a;
}
function H_ocq_Q_number_I_min( a
, b
){  return a > b ? b : a;
}
function H_ocq_Q_number_I_max( a
, b
){  return a < b ? b : a;
}
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function H_ocq_Q_number_Z_int_N_hex( v
){  const h = "0123456789abcdef";
    let s = v ? "" : "0";
    while(v)
    {   s = h.charAt( v % 16 ) + s;
        v = H_ocq_Q_number_N_int( v / 16 );
    }
    return s;
}
function H_ocq_Q_number_Z_int_N_fill( v
, n
, c
){  if( c === undefined )
        c = "0";
    let s = "";
    let i = 10 * n;
    while( i !== 1
    && v < i
    )
    {   s += c;
        i /= 10;
    }
    return s + v;
}
//==============================================================================
var H_ocq_E_date_S_u = [ "Milliseconds", "Seconds", "Minutes", "Hours", "Date", "Month", "FullYear" ];
var H_ocq_E_date_S_months = [ 0%`Jan``, 1%`Feb``, 2%`Mar``, 3%`Apr``, 4%`May``, 5%`Jun``, 6%`Jul``, 7%`Aug``, 8%`Sep``, 9%`Oct``, 10%`Nov``, 11%`Dec`` ];
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function H_ocq_Q_date_M( y, m, d, h, min, s, ms
){  if( ms === undefined )
    {   ms = 0;
        if( s === undefined )
        {   s = 0;
            if( min === undefined )
            {   min = 0;
                if( h === undefined )
                {   h = 0;
                    if( d === undefined )
                    {   d = 1;
                        if( m === undefined )
                            m = 0;
                    }
                }
            }
        }
    }
    return Date.UTC(y,m,d,h,min,s,ms);
}
function H_ocq_Q_date_M_now(
){  return ( new Date() ).valueOf();
}
function H_ocq_Q_date_M_week_of_year( y
, w
){  const d = new Date( H_ocq_Q_date_M( y, 0 ));
    if( w > 1 )
        d.setUTCDate( 1 + 7 * w - d.getUTCDay() ); //NDFN w ‘html’ początkiem tygodnia jest niedziela tak jak w ‟Javascript”?
    return d.valueOf();
}
//------------------------------------------------------------------------------
function H_ocq_Q_date_P_clear_upto( d
, u
){  d = new Date(d);
    for( let i = 0; i <= u; i++ )
    {   const s = "setUTC"+ H_ocq_E_date_S_u[i];
        const v = i === 4 ? 1 : 0;
        d[s](v);
    }
    return d.valueOf();
}
//------------------------------------------------------------------------------
function H_ocq_E_date_I_u_delta( u
, n
){  const d = new Date(0);
    if( u === 4 )
        n++;
    else if( u === 6 )
        n += d.getUTCFullYear();
    return d[ "setUTC"+ H_ocq_E_date_S_u[u] ](n);
}
//------------------------------------------------------------------------------
function H_ocq_Q_date_R_day_of_year( d
){  return ( d - H_ocq_Q_date_M(( new Date(d) ).getUTCFullYear(), 0 )) / H_ocq_E_date_I_u_delta( 4, 1 ) + 1;
}
function H_ocq_Q_date_R_week_of_year( d
){  const d0 = new Date( H_ocq_Q_date_M( d.getUTCFullYear(), 0 ));
    return ( d - d0.valueOf() + d0.getUTCDay() ) / H_ocq_E_date_I_u_delta( 4, 7 ) + 1;
}
//------------------------------------------------------------------------------
function H_ocq_Q_date_N_readable( d
){  d = new Date(d);
    return H_ocq_E_date_S_months[ d.getMonth() ] + H_ocq_Q_number_Z_int_N_fill( d.getDate(), 1 ) +"\\"+ H_ocq_Q_number_Z_int_N_fill( d.getHours(), 1 ) +":"+ H_ocq_Q_number_Z_int_N_fill( d.getMinutes(), 1 ) +"/"+ d.getFullYear();
}
//==============================================================================
function H_ocq_Q_s_Z_set_T_in( s
, e
){  return H_ocq_Q_array_Z_set_T_in( H_ocq_Q_array_Z_set_M( s.split( / +/ )), e );
}
//-----------------------------------------------------------------------------
function H_ocq_Q_s_Z_set_I_add( s
, e
){  if( s !== "" )
        return H_ocq_Q_array_Z_set_I_add( H_ocq_Q_array_Z_set_M( s.split( / +/ )), e ).join( " " );
    return e;
}
function H_ocq_Q_s_Z_set_I_remove( s
, e
){  if( s !== "" )
        return H_ocq_Q_array_Z_set_I_remove( H_ocq_Q_array_Z_set_M( s.split( / +/ )), e ).join( " " );
    return s;
}
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function H_ocq_Q_s_Z_int_N_fill( s_
, n
, c
){  if( c === undefined )
        c = "0";
    let s = "";
    for( let i = s_.length; i <= n; i++ )
        s += c
    return s + s_;
}
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function H_ocq_Q_s_Z_url_T_www( s
){  return H_ocq_Q_url_T_www( H_ocq_Q_url_M(s) );
}
//------------------------------------------------------------------------------
function H_ocq_Q_s_Z_url_I_normalize( url
){  return H_ocq_Q_url_R( H_ocq_Q_url_M(url) );
}
function H_ocq_Q_s_Z_url_R_without_query( url
){  const i = url.indexOf( "#" );
    if( i !== -1 )
        return url.substring( 0, i );
    return url;
}
function H_ocq_Q_s_Z_url_R_host( url
){  const p = url.indexOf( ":" );
    const host = url.substring( p + 3 );
    return host.substring( 0, host.indexOf( "/" ));
}
function H_ocq_Q_s_Z_url_Z_host_R_domain( host
){  let domain = host;
    let p = domain.lastIndexOf( "." );
    if( p !== -1 )
    {   const s = domain.substring( 0, p );
        p = s.lastIndexOf( "." );
        if( p !== -1 )
            domain = domain.substring( p + 1 );
    }
    return domain;
}
function H_ocq_Q_s_Z_url_R_domain( url
){  return H_ocq_Q_s_Z_url_Z_host_R_domain( H_ocq_Q_s_Z_url_R_host(url) );
}
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function H_ocq_Q_s_Z_html_R_breakable( s
){  return s.replace( new RegExp( "", "g" ), String.fromCharCode( 0x200b )).replace( /.$/, "" ).replace( /.(.)$/, "$1" ).replace( /^./, "" ).replace( /^(.)./, "$1" );
}
function H_ocq_Q_s_Z_html_R_document_fragment( s
){  const d = document.createDocumentFragment();
    let p = 0;
    while(( p = s.indexOf( "\n" )) !== -1 )
    {   d.appendChild( document.createTextNode( s.substring( 0, p )));
        d.appendChild( document.createElement( "br" ));
        s = s.substring( p + 1 );
    }
    d.appendChild( document.createTextNode(s) );
    return d;
}
//==============================================================================
function H_ocq_Q_array_Z_set_M( a
){  a.sort();
    let i = 1;
    while( i < a.length )
        if( a[i] === a[ i - 1 ] )
            a.splice( i, 1 );
        else
            i++;
    return a;
}
function H_ocq_Q_array_Z_set_I_add( a
, e
){  if( !H_ocq_Q_array_Z_set_T_in( a, e ))
        a.push(e);
    return a;
}
function H_ocq_Q_array_Z_set_I_remove( a
, e
){  for( let i = 0; i !== a.length; i++ )
        if( a[i] === e )
        {   a.splice( i, 1 );
            break;
        }
    return a;
}
function H_ocq_Q_array_Z_set_T_in( a
, e
){  for( let i = 0; i !== a.length; i++ )
        if( a[i] === e )
            return true;
    return false;
}
//==============================================================================
function H_ocq_Q_object_T_eq( a
, b
){  const t = typeof a;
    if( t !== typeof b )
        return false;
    if( t === "object" )
        return JSON.stringify(a) === JSON.stringify(b);
    return a === b;
}
//------------------------------------------------------------------------------
///uzupełnienie o ‘serializację’ przypisanej w obiekcie wartości “undefined” dla niezgubienia tej wartości w obiekcie przekazywanym poprzez nieznaną ‘serializację’ (“response”, procedury ‘api’ rozszerzeń, tekst w “znaczniku” ‘html’).
function H_ocq_Q_object_R_encode_undefined( o
){  for( let k in o )
        if( o[k] === undefined )
            o[k] = "\ufffe";
        else if( typeof o[k] === "object" )
            o[k] = H_ocq_Q_object_R_encode_undefined( o[k] );
    return o;
}
function H_ocq_Q_object_R_decode_undefined( o
){  for( let k in o )
        if( o[k] === "\ufffe" )
            o[k] = undefined;
        else if( typeof o[k] === "object" )
            o[k] = H_ocq_Q_object_R_decode_undefined( o[k] );
    return o;
}
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function H_ocq_Q_object_Z_hash_table_T_empty( o
){  let r = true;
    for( let k in o )
    {   r = false;
        break;
    }
    return r;
}
function H_ocq_Q_object_Z_hash_table_T_eq( a
, b
){  if( a === b )
        return true;
    if( arguments[2] !== undefined )
        for( let k in arguments[2] )
            if( arguments[2][k] === undefined ) ///domyślnie. muszą być identyczne.
            {   if( a[k] !== b[k] )
                    return false;
            }else if( arguments[2][k] === null ) ///uwzględnia tylko, jeśli są zdefiniowane w obu.
            {   if( a[k] !== undefined
                && b[k] !== undefined
                && a[k] !== b[k]
                )
                    return false;
            }else if( typeof arguments[2][k] === "function" ) ///porównuje oba elementy podaną funkcją.
            {   if( !arguments[2][k]( a[k], b[k] ))
                    return false;
            }else if( typeof arguments[2][k] === "number" ) ///porównuje z podaną dokładnością —rozumianą zależnie od typu danych.
            {   if( a[k] === undefined
                || b[k] === undefined
                || typeof a[k] !== typeof b[k]
                )
                    return false;
                switch( typeof a[k] )
                { case "object":
                        switch( a[k].constructor.name )
                        { case "Date":
                                for( let i = 0; i <= arguments[2][k]; i++ )
                                {   const s = "setUTC"+ H_ocq_E_date_S_u[i];
                                    const v = i === 4 ? 1 : 0;
                                    a[k][s](v);
                                    b[k][s](v);
                                }
                                if( a[k].valueOf() !== b[k].valueOf() )
                                    return false;
                                break;
                          default:
                                throw "‘ndfn’ object type";
                                break;
                        }
                        break;
                  case "number":
                        if( H_ocq_Q_number_I_abs( b[k] - a[k] ) > arguments[2][k] )
                            return false;
                        break;
                  default:
                        throw "‘ndfn’ data type";
                        break;
                }
            }else
                throw "‘ndfn’ compare type";
    else
    {   if( a.length !== b.length )
            return false;
        for( let k in a )
            if( a[k] !== b[k] )
                return false;
    }
    return true;
}
//==============================================================================
function H_ocq_Q_url_M( s
){  const a = s.match( /^(?:(?:(view-source):)?([^:/?;#]+)?:)?(?:\/\/)?(?:([^:@/?;#]+):([^@/?;#]+)@)?([^/?;#]+(:[0-9]{1,5})?)?(\/[^?;#]*)?(?:([?;][^#]+)?|[?;])?(?:#(.+)?)?$/i ); ///NDFN średnik jest traktowany jako równorzędny separator “query”, ponieważ był używany bez pytajnika przez chyba serwery ‘jsp’, a teraz miałby być używany jako alternatywny separator parametrów!
    if( a === null )
    {   alert( "‘url’ not recognized\n“"+ s +"”" );
        return;
    }
    a.shift();
    const o = {};
    if( a[0] !== undefined )
        o[ "internal" ] = a[0];
    if( a[1] !== undefined )
        o[ "protocol" ] = a[1];
    if( a[2] !== undefined )
    {   o[ "username" ] = a[2];
        if( a[3] !== undefined )
            o[ "password" ] = a[3];
    }
    if( a[4] !== undefined )
    {   o[ "host" ] = a[4];
        if( a[5] !== undefined )
            o[ "port" ] = a[5];
    }
    o[ "path" ] = a[6] !== undefined
      ? a[6].replace( /\/{2,}/g, "/" ).replace( /(.)\/$/, "$1" )
      : "/";
    if( a[7] !== undefined )
        o[ "server_query" ] = a[7];
    if( a[8] !== undefined )
        o[ "client_query" ] = a[8];
    return o;
}
function H_ocq_Q_url_M_incomplete( o
){  if( o[ "protocol" ] === undefined
    && o[ "host" ] === undefined
    )
        o[ "protocol" ] = "file";
    if( o[ "protocol" ] === undefined )
        o[ "protocol" ] = "http";
    if( o[ "protocol" ] !== "file"
    && o[ "host" ] === undefined
    )
        o[ "host" ] = "localhost";
    if( o[ "path" ] === undefined )
        o[ "path" ] = "/";
    return o;
}
//------------------------------------------------------------------------------
function H_ocq_Q_url_T_www( o
){  return o !== undefined
    && o[ "internal" ] === undefined
    && /^(?:file|https?|ftp)$/.test( o[ "protocol" ] );
}
function H_ocq_Q_url_R( o
){  let s = o[ "protocol" ] + "://";
    if( o[ "host" ] !== undefined )
        s += o[ "host" ];
    s += o[ "path" ];
    if( o[ "server_query" ] !== undefined )
        s += o[ "server_query" ];
    if( o[ "client_query" ] !== undefined )
        s += "#"+ o[ "client_query" ];
    return s;
}
//------------------------------------------------------------------------------
function H_ocq_Q_url_Z_unicode_N_readable( o
){  let s = "";
    if( o[ "protocol" ] !== undefined )
        s += o[ "protocol" ] +"://";
    if( o[ "username" ] !== undefined )
        s += o[ "username" ] +":";
    if( o[ "password" ] !== undefined )
        s += o[ "password" ] +"@";
    if( o[ "host" ] !== undefined )
        s += o[ "host" ];
    if( o[ "path" ] !== undefined )
        s += o[ "path" ];
    if( o[ "server_query" ] !== undefined )
        s += o[ "server_query" ];
    if( o[ "client_query" ] !== undefined )
        s += "#"+ o[ "client_query" ];
    return s;
}
function H_ocq_Q_url_N_readable( o
){  let s = "";
    if( o[ "protocol" ] !== undefined )
        s += o[ "protocol" ] +"://";
    if( o[ "username" ] !== undefined )
        s += o[ "username" ] +":";
    if( o[ "password" ] !== undefined )
        s += o[ "password" ] +"@";
    if( o[ "host" ] !== undefined )
    {   const a = o[ "host" ].split( "." );
        for( let i = 0; i !== a.length; i++ )
            a[i] = H_ocq_E_idn_N_entity( a[i] );
        s += a.join( "." );
    }
    if( o[ "path" ] !== undefined )
    {   const a = o[ "path" ].split( "." );
        for( let i = 0; i !== a.length; i++ )
            a[i] = decodeURIComponent( a[i] );
        s += a.join( "." );
    }
    if( o[ "server_query" ] !== undefined )
        s += o[ "server_query" ];
    if( o[ "client_query" ] !== undefined )
        s += "#"+ o[ "client_query" ];
    return s;
}
//==============================================================================
function H_ocq_E_idn_N_entity_I_char_to_number( d
){  if( d <= 57 )
        d -= 22;
    else if( d <= 90 )
        d -= 65;
    else
        d -= 97;
    return d;
}
function H_ocq_E_idn_N_entity_I_next_digit( a
, n
, bias
){  let w = 1;
    let i = 0;
    while(true)
    {   const d = a.pop();
        n += w * d;
        i += 36;
        let t;
        if( i <= bias )
            t = 1;
        else if( i >= bias + 26 )
            t = 26;
        else
            t = i - bias;
        if( d < t )
            break;
        w *= 36 - t;
    }
    return [ n, a ];
}
function H_ocq_E_idn_N_entity( s
){  if( s.substring( 0, 4 ) !== "xn--" )
        return s;
    let p = s.lastIndexOf( "-" );
    let a = [];
    for( let i = s.length - 1; i > p; i-- )
        a.push( H_ocq_E_idn_N_entity_I_char_to_number( s.charCodeAt(i) ));
    s = s.substring( 4, p );
    let n = 128;
    p = 0;
    let bias = 72;
    while( a.length )
    {   const b = H_ocq_E_idn_N_entity_I_next_digit( a, p, bias );
        a = b.pop();
        let d = b[0] - p;
        if(p)
            d >>= 1;
        else
            d = H_ocq_Q_number_N_int( d / 700 );
        d += s.length + 1;
        let i = 0;
        while( d > 455 )
        {   d = H_ocq_Q_number_N_int( d / 35 );
            i += 36;
        }
        bias = i + H_ocq_Q_number_N_int(( 36 * d ) / ( d + 38 ));
        n += H_ocq_Q_number_N_int( b[0] / ( s.length + 1 ));
        p = b[0] % ( s.length + 1 );
        s = s.substring( 0, p ) + String.fromCharCode(n) + s.substring(p);
        p++;
    }
    return s;
}
function H_ocq_Q_idn_R( s
){  const a = s.split( "." );
    for( let i = 0; i !== a.length; i++ )
        a[i] = H_ocq_E_idn_N_entity( a[i] );
    return a.join( "." );
}
//==============================================================================
function H_ocq_E_html_M(
){  const h = document.documentElement.getElementsByTagName( "head" )[0];
    let d;
    for( d = h.firstElementChild; d !== null; d = d.nextElementSibling )
        if( d.nodeName === "STYLE"
        || d.nodeName === "SCRIPT"
        || ( d.nodeName === "LINK"
          && d.getAttribute( "rel" ).toUpperCase() === "STYLESHEET"
        ))
            break;
    const s = location.pathname;
    const menu = /(?:^|[^0-9A-Za-z])menu(?:[^0-9A-Za-z]|$)/i.test( s.substring( s.indexOf( "/" ) + 1 ));
    const e = document.createElement( "style" );
    e.appendChild( document.createTextNode(
      "*\n"
      +"{ margin: 0\n"
      +"; padding: 0\n"
      +"; font-family: "+ ( menu ? "\"Segoe UI\"" : "Myriad Web" ) +", sans-serif\n"
      +"; font-size: 9pt\n"
      +"}\n"
      +"body\n"
      +"{ color: black\n"
      +"; line-height: 1\n"
      + ( menu ?
          "; margin: 1pt 0 0 1pt\n"
          +"; background-color: #dfdeff\n"
        : "; background-color: #cacaca\n"
        )
      +"}\n"
      +"fieldset\n"
      +"{ margin: 7pt 0\n"
      +"; border: 1pt outset #7a7a7f\n"
      +"; padding: 0 5pt 1pt 7pt\n"
      +"}\n"
      +"legend\n"
      +"{ font-weight: bold\n"
      +"}\n"
      +"input[type=\"text\"], input[type=\"search\"], input[type=\"tel\"], input[type=\"url\"], input[type=\"email\"], input[type=\"password\"], input[type=\"datetime\"], input[type=\"date\"], input[type=\"month\"], input[type=\"week\"], input[type=\"time\"], input[type=\"datetime-local\"], input[type=\"number\"], input[type=\"color\"], input[type=\"file\"], input[type=\"image\"], select\n"
      +"{ margin: 6pt 7pt 2pt 6pt\n"
      +"}\n"
      +"input[type=\"text\"], input[type=\"search\"], input[type=\"url\"], input[type=\"email\"]\n"
      +"{ width: 98.5%\n"
      +"}\n"
      +"input[type=\"text\"], input[type=\"search\"], input[type=\"tel\"], input[type=\"url\"], input[type=\"email\"], input[type=\"password\"], input[type=\"datetime\"], input[type=\"date\"], input[type=\"month\"], input[type=\"week\"], input[type=\"time\"], input[type=\"datetime-local\"], input[type=\"number\"]\n"
      +"{ border: 1pt solid #7a7a7f\n"
      +"; padding: 3pt 3pt 2pt 4pt\n"
      +"; opacity: .75\n"
      +"; background-color: white\n"
      +"; color: black\n"
      +"; font-family: \"Bitstream Vera Serif\", serif\n"
      +"; font-size: 8pt\n"
      +"}\n"
      +"input[type=\"checkbox\"], input[type=\"radio\"]\n"
      +"{ margin: 0 3.5pt 0 0\n"
      +"; vertical-align: text-top\n"
      +"}\n"
      +"input[type=\"file\"], input[type=\"submit\"], input[type=\"reset\"], input[type=\"button\"], select\n"
      +"{ padding: 1.5pt 3pt 1.5pt 3.5pt\n"
      +"}\n"
      + ( menu ?
          "td\n"
          +"{ border: 1px solid transparent\n"
          +"; padding: 3pt 3pt 2pt 2.5pt\n"
          +"; white-space: nowrap\n"
          +"}\n"
        : ""
        )
      +"p\n"
      +"{ margin: 8pt 1pt\n"
      +"}\n"
      +"a\n"
      +"{ color: black\n"
      +"; text-decoration: none\n"
      +"}\n"
    ));
    h.insertBefore( e, d );
}
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function H_ocq_E_html_Q_element_I_prev( e
){  const e_ = e.previousElementSibling;
    return e_ !== null ? e_ : e.parentNode;
}
function H_ocq_E_html_Q_element_I_next( e
){  let e_;
    if(( e_ = e.firstElementChild ) !== null
    || ( e_ = e.nextElementSibling ) !== null
    )
        return e_;
    while(( e = e.parentNode ) !== null )
        if(( e_ = e.nextElementSibling ) !== null )
            return e_;
    return e;
}
//------------------------------------------------------------------------------
function H_ocq_E_html_Q_element_R_page_offset_x( e
){  let a = 0;
    do
        a += e.offsetLeft;
    while(( e = e.offsetParent ) !== null ) {}
    return a;
}
function H_ocq_E_html_Q_element_R_page_offset_y( e
){  let a = 0;
    do
        a += e.offsetTop;
    while(( e = e.offsetParent ) !== null ) {}
    return a;
}
function H_ocq_E_html_Q_element_R_visible_width( e
){  let v = H_ocq_E_html_Q_element_R_page_offset_x(e);
    const v_0 = H_ocq_Q_number_I_max( v, window.pageXOffset );
    const v_1 = H_ocq_Q_number_I_min( v + e.offsetWidth, window.pageXOffset + window.innerWidth );
    v =  v_1 - v_0;
    if( v < 0 )
        v = 0;
    return v;
}
function H_ocq_E_html_Q_element_R_visible_height( e
){  let v = H_ocq_E_html_Q_element_R_page_offset_y(e);
    const v_0 = H_ocq_Q_number_I_max( v, window.pageYOffset );
    const v_1 = H_ocq_Q_number_I_min( v + e.offsetHeight, window.pageYOffset + window.innerHeight );
    v =  v_1 - v_0;
    if( v < 0 )
        v = 0;
    return v;
}
//------------------------------------------------------------------------------
function H_ocq_E_html_Q_element_R_text_I( e
){  let s;
    switch( e.nodeType )
    { case e.TEXT_NODE:
            s = e.nodeValue;
            const wrap = document.defaultView.getComputedStyle( e.parentNode ).whiteSpace;
            if( !/^pre/.test(wrap) )
                s = s.replace( /\s+/g, " " );
            else if( wrap === "pre-line" )
                s = s.replace( /[^\S\n]+/g, " " );
            break;
      case e.ELEMENT_NODE:
            if( e.tagName === "BR" )
            {   s = "\n";
                break;
            }else if( e.tagName === "IMG" )
            {   s = e.alt;
                if( s === null )
                    s = "";
                s = "[<"+ e.tagName +">"+ s +"]";
                break;
            }
      case e.DOCUMENT_NODE:
      case e.DOCUMENT_FRAGMENT_NODE:
            s = "";
            for( let i = 0; i !== e.childNodes.length; i++ )
                s += H_ocq_E_html_Q_element_R_text_I( e.childNodes[i] )
            break;
      default:
            s = "";
            break;
    }
    return s;
}
function H_ocq_E_html_Q_element_R_text( e
){  return H_ocq_E_html_Q_element_R_text_I(e).trim();
}
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function H_ocq_E_html_E_wa_X_mouse_over_I_filter( e
){  if( e.relatedTarget === null )
        return true;
    let phase = e.target.getAttribute( "data-wa-mouse-over-move-out" );
    if( phase === null )
        phase = "0";
    if( phase === "0" )
    {   e.target.setAttribute( "data-wa-mouse-over-move-out", "1" );
        return false;
    }
    return true;
}
function H_ocq_E_html_E_wa_X_mouse_move_I_filter( e
){  if( !e.target
    || !e.target.getAttribute
    )
        return true;
    const phase = e.target.getAttribute( "data-wa-mouse-over-move-out" );
    if( phase === "2" )
        return false;
    if( phase === "1"
    && e.relatedTarget !== null
    )
    {   e.target.setAttribute( "data-wa-mouse-over-move-out", "2" );
        return false;
    }
    return true;
}
function H_ocq_E_html_E_wa_X_mouse_out_I_filter( e
){  if( e.relatedTarget === null )
        return true;
    const phase = e.target.getAttribute( "data-wa-mouse-over-move-out" );
    if( phase >= 1 )
    {   e.target.removeAttribute( "data-wa-mouse-over-move-out" );
        return false;
    }
    return true;
}
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function H_ocq_E_html_Q_form_Q_input_P_value( e
, v
){  e[ e.type === "checkbox" || e.type === "radio" ? "checked" : "value" ] = v;
}
function H_ocq_E_html_Q_form_Q_input_P_conv( e
, v
){  switch( e.type )
    { case "text":
      case "search":
      case "tel":
      case "url":
      case "email":
      case "password":
      case "number":
      case "range":
      case "checkbox":
      case "radio":
      case "file":
            break;
      case "datetime":
        {   const d = new Date(v);
            v = d.getUTCFullYear() +"-"+ H_ocq_Q_number_Z_int_N_fill( d.getUTCMonth() + 1, 1 ) +"-"+ H_ocq_Q_number_Z_int_N_fill( d.getUTCDate(), 1 ) +"T"+ H_ocq_Q_number_Z_int_N_fill( d.getUTCHours(), 1 ) +":"+ H_ocq_Q_number_Z_int_N_fill( d.getUTCMinutes(), 1 );
            const s = d.getUTCSeconds();
            const ms = d.getUTCMilliseconds();
            if( s
            || ms
            )
            {   v += ":"+ H_ocq_Q_number_Z_int_N_fill( d.getUTCSeconds() + 1, 1 );
                if(ms)
                    v += "."+ H_ocq_Q_number_Z_int_N_fill( d.getUTCMilliseconds() + 1, 2 ) +"Z";
            }
            break;
        }
      case "date":
        {   const d = new Date(v);
            v = d.getUTCFullYear() +"-"+ H_ocq_Q_number_Z_int_N_fill( d.getUTCMonth() + 1, 1 ) +"-"+ H_ocq_Q_number_Z_int_N_fill( d.getUTCDate(), 1 );
            break;
        }
      case "month":
        {   const d = new Date(v);
            v = d.getUTCFullYear() +"-"+ H_ocq_Q_number_Z_int_N_fill( d.getUTCMonth() + 1, 1 );
            break;
        }
      case "week":
        {   const d = new Date(v);
            v = d.getUTCFullYear() +"-W"+ H_ocq_Q_number_Z_int_N_fill( H_ocq_Q_date_R_week_of_year(v), 1 );
            break;
        }
      case "time":
        {   const d = new Date(v);
            v = H_ocq_Q_number_Z_int_N_fill( d.getUTCHours(), 1 ) +":"+ H_ocq_Q_number_Z_int_N_fill( d.getUTCMinutes(), 1 );
            const s = d.getUTCSeconds();
            const ms = d.getUTCMilliseconds();
            if( s
            || ms
            )
            {   v += ":"+ H_ocq_Q_number_Z_int_N_fill( d.getUTCSeconds() + 1, 1 );
                if(ms)
                    v += "."+ H_ocq_Q_number_Z_int_N_fill( d.getUTCMilliseconds() + 1, 2 ) +"Z";
            }
            break;
        }
      case "color":
            v = "#"+ H_ocq_Q_s_Z_int_N_fill( H_ocq_Q_number_Z_int_N_hex( v >> 16 ), 1 ) + H_ocq_Q_s_Z_int_N_fill( H_ocq_Q_number_Z_int_N_hex(( v >> 8 ) & 0xff ), 1 ) + H_ocq_Q_s_Z_int_N_fill( H_ocq_Q_number_Z_int_N_hex( v & 0xff ), 1 );
            break;
    }
    return v;
}
function H_ocq_E_html_Q_form_Q_input_P( e
, v
){  if( v !== "" )
        v = H_ocq_E_html_Q_form_Q_input_P_conv( e, v );
    else
        v = e.getAttribute( "value" );
    H_ocq_E_html_Q_form_Q_input_P_value( e, v );
}
//------------------------------------------------------------------------------
function H_ocq_E_html_Q_form_Q_input_R_value( e
){  return e.type === "checkbox" || e.type === "radio" ? e.checked : e.value;
}
function H_ocq_E_html_Q_form_Q_input_R_conv( e
, v
){  switch( e.type )
    { case "text":
      case "search":
      case "tel":
      case "url":
      case "email":
      case "password":
      case "checkbox":
      case "radio":
            break;
      case "datetime":
        {   const a = v.match( /^([0-9]{4,})-([0-9]{2})-([0-9]{2})T([0-9]{2}):([0-9]{2})(?::([0-9]{2})(?:.([0-9]{1,3}))?)?Z$/ );
            v = H_ocq_Q_date_M( parseInt( a[1] ), parseInt( a[2] ) - 1, parseInt( a[3] ), parseInt( a[4] ), parseInt( a[5] ), a[6] !== undefined ? parseInt( a[6] ) : 0, a[7] !== undefined ? parseInt( a[7] ) : 0 );
            break;
        }
      case "date":
        {   const a = v.match( /^([0-9]{4,})-([0-9]{2})-([0-9]{2})$/ );
            v = H_ocq_Q_date_M( parseInt( a[1] ), parseInt( a[2] ) - 1, parseInt( a[3] ));
            break;
        }
      case "month":
        {   const a = v.match( /^([0-9]{4,})-([0-9]{2})$/ );
            v = H_ocq_Q_date_M( parseInt( a[1] ), parseInt( a[2] ) - 1 );
            break;
        }
      case "week":
        {   const a = v.match( /^([0-9]{4,})-W([0-9]{2})$/ );
            v = H_ocq_Q_date_M_week_of_year( parseInt( a[1] ), parseInt( a[2] ));
            break;
        }
      case "time":
        {   const a = v.match( /^([0-9]{2}):([0-9]{2})(?::([0-9]{2})(?:.([0-9]{1,3}))?)?$/ );
            v = ( new Date(0) ).setUTCHours( parseInt( a[1] ), parseInt( a[2] ), a[3] !== undefined ? parseInt( a[3] ) : 0, a[4] !== undefined ? parseInt( a[4] ) : 0 );
            break;
        }
      case "number":
      case "range":
            v = parseFloat(v);
            break;
      case "color":
        {   const a = v.match( /^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/ );
            v = ( parseInt( "0x"+ a[1] ) << 16 ) | ( parseInt( "0x"+ a[2] ) << 8 ) | parseInt( "0x"+ a[3] );
            break;
        }
      case "file":
            v = [];
            for( let i = 0; i !== e.files.length; i++ )
                v.push( e.files[i].name );
            break;
    }
    return v;
}
function H_ocq_E_html_Q_form_Q_input_R( e
){  let v = H_ocq_E_html_Q_form_Q_input_R_value(e);
    if( v === "" )
        v = e.getAttribute( "value" );
    return H_ocq_E_html_Q_form_Q_input_R_conv( e, v );
}
//==============================================================================
function H_ocq_E_conf_Q_form_M(
){  const e = document.createElement( "form" );
    document.body.appendChild(e);
    return e;
}
function H_ocq_E_conf_Q_form_I_add_group( form_group
, label
){  const e = document.createElement( "fieldset" );
    const l = document.createElement( "legend" );
    l.appendChild( document.createTextNode(label) );
    e.appendChild(l);
    form_group.appendChild(e);
    return e;
}
function H_ocq_E_conf_Q_form_I_add_p( form_group
, df
){  const e = document.createElement( "p" );
    e.appendChild(df);
    form_group.appendChild(e);
    return e;
}
function H_ocq_E_conf_Q_form_I_add_text( form_group
, s
){  return H_ocq_E_conf_Q_form_I_add_p( form_group, document.createTextNode(s) );
}
function H_ocq_E_conf_Q_form_I_add( form_group
, type
, option_change
, label
){  const l = document.createElement( "label" );
    const e = document.createElement( "input" );
    e.id = option_change;
    e.type = type;
    if( H_ocq_E_sh_lib_Q_conf_T_name_match( option_change ))
        e.addEventListener( "change", H_ocq_E_conf_Q_form_X_change, true );
    const p = label.indexOf( "$" );
    l.appendChild( document.createTextNode( label.substring( 0, p )));
    l.appendChild(e);
    l.appendChild( document.createTextNode( label.substring( p + 1 )));
    H_ocq_E_conf_Q_form_I_add_p( form_group, l );
    return e;
}
function H_ocq_E_conf_Q_form_I_add_button( form_group
, type
, id
, label
, listener
, dangerous
){  if( dangerous !== undefined
    && dangerous
    )
    {   if( window[ "H_ocq_E_conf_Q_form_S_danger_uids" ] === undefined )
            window[ "H_ocq_E_conf_Q_form_S_danger_uids" ] = [];
        window[ "H_ocq_E_conf_Q_form_S_danger_uids" ].push(id);
    }
    const e = document.createElement( "input" );
    e.id = id;
    e.type = type;
    e.value = label;
    e.addEventListener( "click"
    , listener !== undefined
      ? (function( f
        ){  return function( e
            ){  e.stopPropagation();
                window.setTimeout(
                  function(
                  ){  const e = document.getElementById( "danger_enable" );
                      e.checked = false;
                      H_ocq_E_conf_Q_form_Q_danger_enable_I_change(e);
                  }
                , 1
                );
                f(e);
            };
        })(listener)
      : function( e
        ){  e.stopPropagation();
            window.setTimeout(
              function(
              ){  const e = document.getElementById( "danger_enable" );
                  e.checked = false;
                  H_ocq_E_conf_Q_form_Q_danger_enable_I_change(e);
              }
            , 1
            );
        }
    , true
    );
    H_ocq_E_conf_Q_form_I_add_p( form_group, e );
    return e;
}
function H_ocq_E_conf_Q_form_I_add_reset( form_group
, listener
){  const e = H_ocq_E_conf_Q_form_I_add_button( form_group
    , "reset"
    , "reset"
    , "reset"
    , listener
    , true
    );
    return e;
}
//------------------------------------------------------------------------------
function H_ocq_E_conf_Q_form_X_change( e
){  e.stopPropagation();
    let v = H_ocq_E_html_Q_form_Q_input_R_value( e.currentTarget );
    if( v === "" )
    {   v = e.currentTarget.getAttribute( "value" );
        H_ocq_E_html_Q_form_Q_input_P_value( e.currentTarget, v );
    }
    const o = {};
    o[ e.currentTarget.id ] = E_conf_Q_form_R_conv( e.currentTarget.id, H_ocq_E_html_Q_form_Q_input_R_conv( e.currentTarget, v ));
    if( o[ e.currentTarget.id ] !== window[ e.currentTarget.id ] )
        chrome.runtime.sendMessage(
          [ 5
          , o
          ]
        , function( o
          ){  H_ocq_E_sh_lib_Q_conf_I_save(o);
          }
        );
}
function H_ocq_E_conf_Q_form_X_focus( e
){  e.stopPropagation();
    e = document.getElementById( "danger_enable" );
    e.checked = false;
    H_ocq_E_conf_Q_form_Q_danger_enable_I_change(e);
}
function H_ocq_E_conf_Q_form_Q_danger_enable_X_change( e
){  e.stopPropagation();
    H_ocq_E_conf_Q_form_Q_danger_enable_I_change( e.currentTarget );
}
function H_ocq_E_conf_Q_form_Q_danger_enable_I_change( e
){  if( e === undefined )
        e = document.getElementById( "danger_enable" );
    const a = e.getAttribute( "data-uids" ).split( "," );
    for( let i = 0; i !== a.length; i++ )
        document.getElementById( a[i] ).disabled = !e.checked;
}
//------------------------------------------------------------------------------
function H_ocq_E_conf_Q_form_P( form_group
){  const es = form_group.getElementsByTagName( "input" );
    const o = {};
    for( let i = 0; i !== es.length; i++ )
        if( H_ocq_E_sh_lib_Q_conf_T_name_match( es[i].id ))
            o[ es[i].id ] = undefined;
    if( !H_ocq_Q_object_Z_hash_table_T_empty(o) )
        chrome.runtime.sendMessage(
          [ 3
          , H_ocq_Q_object_R_encode_undefined(o)
          ]
        , function( o
          ){  for( let k in o )
              {   const e = document.getElementById(k);
                  e.setAttribute( "value", H_ocq_E_html_Q_form_Q_input_P_conv( e, E_conf_Q_form_P_conv( k, o[k] )));
                  e.addEventListener( "focus", H_ocq_E_conf_Q_form_X_focus, true );
              }
          }
        );
    if( H_ocq_E_conf_Q_form_S_danger_uids !== undefined )
    {   const e = H_ocq_E_conf_Q_form_I_add( form_group, "checkbox", "danger_enable", "enable dangerous functions of form" );
        e.setAttribute( "data-uids", H_ocq_E_conf_Q_form_S_danger_uids.join( "," ));
        delete window[ "H_ocq_E_conf_Q_form_S_danger_uids" ];
        e.addEventListener( "change", H_ocq_E_conf_Q_form_Q_danger_enable_X_change, true );
        H_ocq_E_conf_Q_form_Q_danger_enable_I_change(e);
    }
}
//==============================================================================
///sprawdzenie, czy ‹panel konfiguracji›— po wymaganej funkcji.
function H_ocq_E_sh_lib_Q_js_T_conf(
){  return window[ "E_conf_Q_form_P_conv" ] !== undefined;
}
function H_ocq_E_sh_lib_Q_js_Z_cs_I_inject_procs_P_args(
){  const o = {};
    o[ "H_ocq_E_sh_lib_Q_js_Z_cs_I_inject_procs_R_args" ] = window[ "H_ocq_E_sh_lib_Q_js_Z_cs_I_inject_procs_R_args" ].toString();
    const f = [];
    let j = 0;
    if( arguments[j] === null )
    {   f.push( "H_ocq_E_sh_lib_Q_js_Z_cs_I_inject_procs_P_args" );
        j++;
    }
    for( ; j !== arguments.length; j++ )
        f.push( arguments[j] );
    for( let i = 0; i !== f.length; i++ )
        if( /^H_ocq_[A-Z]_\w+$/.test( f[i] ))
            if( typeof window[ f[i] ] === "function" )
            {   const s = window[ f[i] ].toString();
                const a = s.substring( s.indexOf( "{" )).match( /\bH_ocq_[A-Z]_\w+/g );
                if( a !== null )
                    for( let j = 0; j !== a.length; j++ )
                        H_ocq_Q_array_Z_set_I_add( f, a[j] );
                o[ f[i] ] = "function"+ s.substring( s.indexOf( "(" ));
            }else
                o[ f[i] ] = JSON.stringify( window[ f[i] ] );
    return JSON.stringify(o);
}
function H_ocq_E_sh_lib_Q_js_Z_cs_I_inject_procs_R_args( caller_arguments
){  const o = caller_arguments[ caller_arguments.length - 1 ];
    if( o[ "H_ocq_E_sh_lib_Q_js_Z_cs_I_inject_procs_P_args" ] === undefined )
        delete o[ "H_ocq_E_sh_lib_Q_js_Z_cs_I_inject_procs_R_args" ];
    s = "";
    for( let k in o )
        if( /^H_ocq_[A-Z]_\w+$/.test(k) )
            s += "window[ \""+ k +"\" ] = "+ o[k] +";";
    eval(s);
}
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function H_ocq_E_sh_lib_Q_conf_T_name_match( s
){  return /^(?:[A-Z]_\w+_)?C_\w+$/.test(s);
}
function H_ocq_E_sh_lib_Q_conf_N_change_to_hash_table( o
){  const r_o = {};
    for( let k in o )
        r_o[k] = o[k].newValue;
    return r_o;
}
//------------------------------------------------------------------------------
function H_ocq_E_sh_lib_Q_conf_X( o
){  if( H_ocq_E_sh_lib_Q_js_T_conf() )
        for( let k in o )
        {   const e = document.getElementById(k);
            if( e !== null ) // Czy wymieniona opcja konfiguracji jest obecna w formularzu tego panelu.
                H_ocq_E_html_Q_form_Q_input_P( e, E_conf_Q_form_P_conv( k, o[k] ));
        }
    if( window[ "Q_conf_X" ] !== undefined )
        window[ "Q_conf_X" ](o);
}
function H_ocq_E_sh_lib_Q_conf_X_0( o
, area
){  if( area !== "sync" )
        return;
    o = H_ocq_Q_object_R_encode_undefined( H_ocq_E_sh_lib_Q_conf_N_change_to_hash_table(o) );
    if( window[ "H"+"_ocq_E_sh_lib_Q_conf_I_msg_R_conv_1" ] !== undefined )
        eval( window[ "H"+"_ocq_E_sh_lib_Q_conf_I_msg_R_conv_1" ](o) );
    else
        chrome.runtime.sendMessage(
          [ 2
          , o
          ]
        , function( s
          ){  eval(s);
          }
        );
}
function H_ocq_E_sh_lib_Q_conf_X_1( o
, area
){  if( area !== "sync" )
        return;
    o = H_ocq_Q_object_R_encode_undefined( H_ocq_E_sh_lib_Q_conf_N_change_to_hash_table(o) );
    if( window[ "H"+"_ocq_E_sh_lib_Q_conf_I_msg_R_conv_3" ] !== undefined )
    {   eval( window[ "H"+"_ocq_E_sh_lib_Q_conf_I_msg_R_conv_3" ](o) );
        H_ocq_E_sh_lib_Q_conf_X(o);
    }else
        chrome.runtime.sendMessage(
          [ 4
          , o
          ]
        , function( s
          ){  eval(s);
              H_ocq_E_sh_lib_Q_conf_X(o);
          }
        );
}
//------------------------------------------------------------------------------
function H_ocq_E_sh_lib_Q_conf_Q_storage_T( k
, v
){  if( typeof v !== typeof window[ "E_conf_S_defaults" ][k]
    || ( typeof v === "number"
      && !H_ocq_Q_number_T(v)
    ))
        return false;
    if( window[ "E_conf_Q_storage_T" ] !== undefined )
        return E_conf_Q_storage_T( k, v );
    return true;
}
function H_ocq_E_sh_lib_Q_conf_Q_storage_R_conv( k
, v
){  if( !H_ocq_E_sh_lib_Q_conf_Q_storage_T( k, v ))
        v = window[ "E_conf_S_defaults" ][k];
    if( window[ "E_conf_Q_storage_R_conv" ] !== undefined )
    {   v = E_conf_Q_storage_R_conv( k, v );
        if( typeof v === "number"
        && !H_ocq_Q_number_T(v)
        )
            v = E_conf_Q_storage_R_conv( k, window[ "E_conf_S_defaults" ][k] );
    }
    return v;
}
function H_ocq_E_sh_lib_Q_conf_Q_storage_P_conv( k
, v
){  if( window[ "E_conf_Q_storage_P_conv" ] !== undefined )
        v = E_conf_Q_storage_P_conv( k, v );
    if( v !== window[ "E_conf_S_defaults" ][k] )
        return v;
}
//------------------------------------------------------------------------------
/// Uaktualnij zmienne globalne konfiguracji —przez “eval”.
function H_ocq_E_sh_lib_Q_conf_I_msg_R_conv_0( o
){  let ret = "";
    o = H_ocq_Q_object_R_decode_undefined(o);
    for( let k in o )
        ret += "if("+ k +"===undefined)"+ k +"="+ JSON.stringify( H_ocq_E_sh_lib_Q_conf_Q_storage_R_conv( k, o[k] )) +";";
    return ret;
}
/// Ustaw zmienne globalne konfiguracji —przez “eval”.
function H_ocq_E_sh_lib_Q_conf_I_msg_R_conv_1( o
){  o = H_ocq_Q_object_R_decode_undefined(o);
    let ret = "";
    for( let k in o )
        ret += k +"="+ JSON.stringify( H_ocq_E_sh_lib_Q_conf_Q_storage_R_conv( k, o[k] )) +";";
    return ret;
}
/// Daj zmienną lokalną ‘hash table’ konfiguracji.
function H_ocq_E_sh_lib_Q_conf_I_msg_R_conv_2( o
){  o = H_ocq_Q_object_R_decode_undefined(o);
    for( let k in o )
        o[k] = H_ocq_E_sh_lib_Q_conf_Q_storage_R_conv( k, o[k] );
    return o;
}
/// 1. i 2. —przez “eval”.
function H_ocq_E_sh_lib_Q_conf_I_msg_R_conv_3( o
){  o = H_ocq_Q_object_R_decode_undefined(o);
    for( let k in o )
        o[k] = H_ocq_E_sh_lib_Q_conf_Q_storage_R_conv( k, o[k] );
    return "const o="+ JSON.stringify(o) +";for(let k in o)window[k]=o[k];";
}
/// Daj obiekt zapisu konfiguracji.
function H_ocq_E_sh_lib_Q_conf_I_msg_P_conv( o
){  for( let k in o )
        o[k] = H_ocq_E_sh_lib_Q_conf_Q_storage_P_conv( k, o[k] );
    return H_ocq_Q_object_R_encode_undefined(o);
}
function H_ocq_E_sh_lib_Q_conf_I_msg( msg
, response
){  const f = [ "H_ocq_E_sh_lib_Q_init_R_session_name", "H_ocq_E_sh_lib_Q_conf_I_msg_R_conv_0", "H_ocq_E_sh_lib_Q_conf_I_msg_R_conv_1", "H_ocq_E_sh_lib_Q_conf_I_msg_R_conv_2", "H_ocq_E_sh_lib_Q_conf_I_msg_R_conv_3", "H_ocq_E_sh_lib_Q_conf_I_msg_P_conv" ];
    if( msg[0] < f.length )
    {   response( window[ f[ msg[0] ]]( msg[1] ));
        return true;
    }
    return false;
}
//------------------------------------------------------------------------------
function H_ocq_E_sh_lib_Q_conf_I_save( o
){  o = H_ocq_Q_object_R_decode_undefined(o);
    const r = [];
    for( let k in o )
        if( o[k] === undefined )
            r.push(k);
    if( r.length )
    {   for( let i = 0; i !== r.length; i++ )
            delete o[ r[i] ];
        chrome.storage.sync.remove(r);
    }
    if( !H_ocq_Q_object_Z_hash_table_T_empty(o) )
        chrome.storage.sync.set(o);
}
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function H_ocq_E_sh_lib_Q_init_R_session_name(
){  if( window[ "H"+"_ocq_E_sh_lib_Q_init_R_session_name_S" ] === undefined )
        window[ "H"+"_ocq_E_sh_lib_Q_init_R_session_name_S" ] = "_"+ H_ocq_Q_date_M_now() +"_";
    return window[ "H"+"_ocq_E_sh_lib_Q_init_R_session_name_S" ];
}
function H_ocq_E_sh_lib_Q_init_W_wait( i
){  window.clearInterval( E_sh_lib_Q_init_S_interval[i] );
    delete E_sh_lib_Q_init_S_interval[i];
    if( H_ocq_Q_object_Z_hash_table_T_empty( E_sh_lib_Q_init_S_interval ))
    {   delete window[ "E_sh_lib_Q_init_S_done" ];
        delete window[ "E_sh_lib_Q_init_S_interval" ];
    }
}
function H_ocq_E_sh_lib_Q_init_Q_conf_I_listener_0(
){  chrome.storage.onChanged.addListener( H_ocq_E_sh_lib_Q_conf_X_0 );
    delete window[ "H_ocq_E_sh_lib_Q_init_Q_conf_I_listener_0" ];
}
function H_ocq_E_sh_lib_Q_init_Q_conf_I_listener_1( a
){  chrome.storage.onChanged.addListener( H_ocq_E_sh_lib_Q_conf_X_1 );
    chrome.storage.onChanged.removeListener( H_ocq_E_sh_lib_Q_conf_X_0 );
    delete window[ "H_ocq_E_sh_lib_Q_conf_X_0" ];
    const o = {};
    for( let i = 0; i !== a.length; i++ )
        o[ a[i] ] = window[ a[i] ];
    H_ocq_E_sh_lib_Q_conf_X(o);
    delete window[ "H_ocq_E_sh_lib_Q_init_Q_conf_I_listener_1" ];
}
//==============================================================================
var H_ocq_E_ui_Q_menu_S_delay = 360;
var H_ocq_E_flow_S_interval = 2000;
//==============================================================================
const H_ocq_E_import_export_S = {};
window.addEventListener( "load"
, function(
  ){  H_ocq_Q_number_Z_integer_S_max = 1;
      let v = H_ocq_Q_number_Z_integer_S_max;
      while(( v = H_ocq_Q_number_Z_integer_S_max << 1 ) > H_ocq_Q_number_Z_integer_S_max )
          H_ocq_Q_number_Z_integer_S_max = v;
      H_ocq_Q_number_Z_integer_S_min = v;
      H_ocq_Q_number_Z_integer_S_max |= H_ocq_Q_number_Z_integer_S_max - 1;
      chrome.runtime.onMessageExternal.addListener(
        function( msg
        , sender
        , response
        ){  let ret = "";
            if( typeof msg === "string" ) // Eksport definicji z “0.js” (i plików *.html) i import do plików *.html.
            {   if( H_ocq_E_import_export_S[ sender.id ] === undefined )
                    H_ocq_E_import_export_S[ sender.id ] = "";
                H_ocq_E_import_export_S[ sender.id ] += msg;
            }else
            {   for( let i = 0; i !== msg.length; i++ )
                {   if( !/^H_ocq_[A-Z]_\w+$/.test( msg[i] )
                    || window[ msg[i] ] === undefined
                    )
                        continue;
                    ret += "window["+ JSON.stringify( msg[i] ) +"]=";
                    if( typeof window[ msg[i] ] === "function" )
                    {   const s = window[ msg[i] ].toString();
                        const a = s.substring( s.indexOf( "{" )).match( /\bH_ocq_[A-Z]_\w+/g );
                        if( a !== null )
                            for( let j = 0; j !== a.length; j++ )
                                H_ocq_Q_array_Z_set_I_add( msg, a[j] );
                        ret += "function"+ s.substring( s.indexOf( "(" ));
                    }else
                        ret += JSON.stringify( window[ msg[i] ] );
                    ret += ";";
                }
                if( H_ocq_E_import_export_S[ sender.id ] !== undefined )
                    ret += H_ocq_E_import_export_S[ sender.id ];
            }
            response(ret);
            return false;
        }
      );
  }
);
/******************************************************************************/
