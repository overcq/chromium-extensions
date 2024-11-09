/*******************************************************************************
*   ___   publicplace
*  ¦OUX¦  ‟Javascript” implementation
*  ¦/C+¦  ‟chromium” extension
*   ---   new tab page
*         new tab page scripts
* ©overcq                on ‟Gentoo Linux 13.0” “x86_64”              2015‒3‒2 *
*******************************************************************************/
const Q_menu_S_max_timeout = 1000;
const Q_menu_I_close_S_neutral_min_bottom_margin = 8;
const Q_menu_I_wheel_S_min_visible_y = 20;
let Q_menu_X_mouse_move_S_x, Q_menu_X_mouse_move_S_y;
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
let Q_bar_Q_ul_S_offset_x;
let Q_bar_Q_ul_S_0, Q_bar_Q_li_S_1;
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
let Q_bar_Q_ul_S_opened, Q_bar_Q_ul_S_over, Q_bar_Q_li_S_over;
let Q_bar_Q_ul_S_timeout;
//==============================================================================
function Q_browser_I_open_tab(
  url
){  chrome.tabs.getCurrent(
      function( tab
      ){  chrome.tabs.create(
            { "url": url
            , "openerTabId": tab.id
            , "index": tab.index
            , "active": false
            }
          );
      }
    );
}
function Q_link_Z_one_X_click( e
){  e.stopPropagation();
    e.preventDefault();
    if( e.button !== 0
    || e.metaKey || e.ctrlKey || e.shiftKey )
        return;
    let url;
    if( !e.altKey )
        url = e.currentTarget.getAttribute( "href" );
    else
    {   e = e.currentTarget;
        if( !e.hasAttribute( "data-dir" ))
        {   e = H_ocq_E_html_Q_element_I_prev( e.parentNode.parentNode );
            if( !e.hasAttribute( "data-dir" ))
                return;
        }
        url = "chrome://bookmarks/?id="+ e.id.substring(1);
    }
    if( Q_bar_Q_ul_S_timeout !== undefined )
    {   window.clearTimeout( Q_bar_Q_ul_S_timeout );
        Q_bar_Q_li_I_timeout();
    }
    Q_browser_I_open_tab(url);
}
function Q_link_Z_dir_X_click( e
){  if( e.altKey )
    {   Q_link_Z_one_X_click(e);
        return;
    }
    e.stopPropagation();
    e.preventDefault();
    if( e.button !== 0
    || e.metaKey || e.ctrlKey || e.shiftKey )
        return;
    if( Q_bar_Q_ul_S_timeout !== undefined )
    {   window.clearTimeout( Q_bar_Q_ul_S_timeout );
        Q_bar_Q_li_I_timeout();
    }
    if( !confirm( 0%`open ·all· bookmarks from first level in the directory “$1$”?`H_ocq_E_html_Q_element_R_text( e.currentTarget.getElementsByTagName( "div" )[0] )` ))
        return;
    e = e.currentTarget.nextSibling;
    const a = [];
    for( let i = 0; i !== e.childNodes.length; i++ )
    {   const url = e.childNodes[i].firstChild.getAttribute( "href" );
        if( url !== "#" )
            a.push(url);
    }
    if( a.length )
        chrome.tabs.getCurrent(
          function( tab
          ){  chrome.windows.create(
                { "url": a
                , "tabId": tab.id
                , "focused": true
                }
              , function( window
                ){  chrome.tabs.update( tab.id
                    , { "active": true
                      }
                    );
                }
              );
          }
        );
}
function Q_menu_I_timeout_n(
){  return H_ocq_E_html_Q_element_R_visible_height( Q_bar_Q_ul_S_opened ) / window.innerHeight;
}
function Q_menu_I_timeout( n
){  let v = H_ocq_E_ui_Q_menu_S_delay * n;
    if( v > Q_menu_S_max_timeout )
        v = Q_menu_S_max_timeout;
    return v;
}
//------------------------------------------------------------------------------
function Q_bar_Q_li_X_mouse_over( e
){  e.stopPropagation();
    if( H_ocq_E_html_E_wa_X_mouse_over_I_filter(e) )
        return;
    Q_menu_X_mouse_move_S_x = e.clientX;
    Q_menu_X_mouse_move_S_y = e.clientY;
    Q_bar_Q_li_S_over = e.currentTarget;
    Q_bar_Q_ul_S_over = Q_bar_Q_li_S_over.parentNode;
    if( e.type === "mouseover"
    && Q_bar_Q_ul_S_opened !== Q_bar_Q_ul_S_over
    )
    {   let niece;
        let niece_bottom = 0;
        let niece_parent = Q_bar_Q_ul_S_opened;
        do
        {   niece = niece_parent;
            if( niece_bottom < niece.offsetHeight )
                niece_bottom = niece.offsetHeight;
            niece_bottom += niece.offsetTop;
            niece_parent = niece.parentNode.parentNode;
        }while( niece_parent !== Q_bar_Q_ul_S_over );
        if( e.currentTarget.offsetTop >= niece.offsetTop
        && e.currentTarget.offsetTop < niece_bottom + Q_menu_I_close_S_neutral_min_bottom_margin
        )
        {   Q_bar_Q_li_X_mouse_move_I_inside_opened_height(e);
            e.currentTarget.addEventListener( "mousemove", Q_bar_Q_li_X_mouse_move_I_inside_opened_height, true );
            return;
        }
    }
    Q_bar_Q_li_X_mouse_move(e);
    e.currentTarget.addEventListener( "mousemove", Q_bar_Q_li_X_mouse_move, true );
}
function Q_bar_Q_li_X_mouse_move( e
){  e.stopPropagation();
    if( H_ocq_E_html_E_wa_X_mouse_move_I_filter(e) )
        return;
    const dx = H_ocq_Q_number_I_abs( Q_menu_X_mouse_move_S_x - e.clientX );
    const dy = H_ocq_Q_number_I_abs( Q_menu_X_mouse_move_S_y - e.clientY );
    Q_menu_X_mouse_move_S_x = e.clientX;
    Q_menu_X_mouse_move_S_y = e.clientY;
    if( Q_bar_Q_ul_S_timeout !== undefined )
    {   if( dx < 2 //CONF
        && dy < 2 //CONF
        )
            return;
        window.clearTimeout( Q_bar_Q_ul_S_timeout );
    }
    let timeout_n = 1;
    if( Q_bar_Q_ul_S_opened !== Q_bar_Q_ul_S_over )
        timeout_n += Q_menu_I_timeout_n();
    Q_bar_Q_ul_S_timeout = window.setTimeout( Q_bar_Q_li_I_timeout, Q_menu_I_timeout( timeout_n ));
}
function Q_bar_Q_li_X_mouse_move_I_inside_opened_height( e
){  e.stopPropagation();
    if( H_ocq_E_html_E_wa_X_mouse_move_I_filter(e) )
        return;
    if( !Q_menu_C_alt_side && e.pageX >= H_ocq_E_html_Q_element_R_page_offset_x( e.currentTarget ) + e.currentTarget.offsetWidth - Q_bar_Q_ul_S_offset_x
    || Q_menu_C_alt_side && e.pageX <= H_ocq_E_html_Q_element_R_page_offset_x( e.currentTarget ) + Q_bar_Q_ul_S_offset_x
    )
        Q_bar_Q_li_X_mouse_move(e);
    else if( Q_bar_Q_ul_S_timeout !== undefined )
    {   e.stopPropagation();
        window.clearTimeout( Q_bar_Q_ul_S_timeout );
        Q_bar_Q_ul_S_timeout = undefined;
    }
}
function Q_bar_Q_li_X_mouse_out( e
){  e.stopPropagation();
    if( H_ocq_E_html_E_wa_X_mouse_out_I_filter(e) )
        return;
    e.currentTarget.removeEventListener( "mousemove", Q_bar_Q_li_X_mouse_move, true );
    e.currentTarget.removeEventListener( "mousemove", Q_bar_Q_li_X_mouse_move_I_inside_opened_height, true );
    if( Q_bar_Q_ul_S_timeout !== undefined )
    {   window.clearTimeout( Q_bar_Q_ul_S_timeout );
        Q_bar_Q_ul_S_timeout = undefined;
    }
    Q_bar_Q_ul_S_over = undefined;
}
function Q_bar_Q_li_I_timeout(
){  if( Q_bar_Q_ul_S_opened !== Q_bar_Q_ul_S_over )
    {   Q_bar_Q_ul_S_opened.style.display = "";
        Q_bar_Q_ul_S_opened.style.top = "";
        Q_bar_Q_ul_S_opened = Q_bar_Q_ul_S_opened.parentNode.parentNode;
    }
    if( Q_bar_Q_ul_S_opened !== Q_bar_Q_ul_S_over )
    {   Q_bar_Q_ul_S_timeout = window.setTimeout( Q_bar_Q_li_I_timeout, Q_menu_I_timeout( 1 + Q_menu_I_timeout_n() ));
        return;
    }
    if( Q_bar_Q_li_S_over.childNodes[1] !== undefined )
    {   Q_bar_Q_ul_S_opened = Q_bar_Q_li_S_over.childNodes[1];
        Q_bar_Q_ul_S_opened.style.display = "block";
    }
    Q_bar_Q_li_S_over.removeEventListener( "mousemove", Q_bar_Q_li_X_mouse_move, true );
    Q_bar_Q_li_S_over.removeEventListener( "mousemove", Q_bar_Q_li_X_mouse_move_I_inside_opened_height, true );
    Q_bar_Q_ul_S_timeout = undefined;
}
//------------------------------------------------------------------------------
function Q_bar_X_mouse_over( e
){  e.stopPropagation();
    if( H_ocq_E_html_E_wa_X_mouse_over_I_filter(e) )
        return;
    Q_bar_Q_li_S_over = e.currentTarget; ///trik polegający na tym, że “.childNodes[1] === Q_bar_Q_ul_S_0” w “Q_bar_Q_li_I_timeout” dla obecnej zawartości bieżącego elementu ‘html’ (‘menu’).
    Q_bar_Q_ul_S_over = Q_bar_Q_ul_S_0;
    Q_bar_Q_li_X_mouse_move(e);
    e.currentTarget.addEventListener( "mousemove", Q_bar_Q_li_X_mouse_move, true );
}
function Q_bar_X_mouse_out( e
){  e.stopPropagation();
    if( H_ocq_E_html_E_wa_X_mouse_out_I_filter(e) )
        return;
    e.currentTarget.removeEventListener( "mousemove", Q_bar_Q_li_X_mouse_move, true );
    if( Q_bar_Q_ul_S_timeout !== undefined )
    {   window.clearTimeout( Q_bar_Q_ul_S_timeout );
        Q_bar_Q_ul_S_timeout = undefined;
    }
    Q_bar_Q_ul_S_over = undefined;
}
//------------------------------------------------------------------------------
function Q_bar_Q_ul_X_wheel( e
){  e.stopPropagation();
    e.preventDefault();
    if( Q_bar_Q_ul_S_timeout !== undefined )
    {   window.clearTimeout( Q_bar_Q_ul_S_timeout );
        Q_bar_Q_ul_S_timeout = undefined;
    }
    let li = e.currentTarget.firstChild;
    if( li === null )
        return;
    let d = li.offsetHeight;
    while(( li = li.nextSibling ) !== null )
        if( li.offsetHeight < d )
            d = li.offsetHeight;
    if( e.deltaY < 0 )
        d = -d;
    if( Q_menu_C_wheel_rev_dir )
        d = -d;
    const c_y = H_ocq_E_html_Q_element_R_page_offset_y( e.currentTarget );
    if( c_y + e.currentTarget.offsetHeight + d < Q_menu_I_wheel_S_min_visible_y
    || c_y + d + Q_menu_I_wheel_S_min_visible_y > document.documentElement.clientHeight
    )
        return;
    let y;
    if( e.currentTarget.style.top !== "" )
        y = parseInt( e.currentTarget.style.top );
    else
        y = e.currentTarget.offsetTop;
    e.currentTarget.style.top = ( y + d ) +"px";
}
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function Q_bar_P_level( parent, level
){  const li = document.createElement( "li" );
    li.addEventListener( "mouseover", Q_bar_Q_li_X_mouse_over, false );
    li.addEventListener( "mouseout", Q_bar_Q_li_X_mouse_out, false );
    li.addEventListener( "focusin", Q_bar_Q_li_X_mouse_over, false );
    li.addEventListener( "focusout", Q_bar_Q_li_X_mouse_out, false );
    const e = document.createElement( "a" );
    if( level.url !== undefined )
    {   e.id = "_"+ level.id;
        e.setAttribute( "href", level.url );
        e.addEventListener( "click", Q_link_Z_one_X_click, true );
        const img = document.createElement( "img" );
        img.src = "chrome://favicon/"+ level.url;
        e.appendChild(img);
    }else
    {   e.id = "_"+ level.id;
        e.setAttribute( "data-dir", "" );
        e.setAttribute( "href", "#" );
        e.addEventListener( "click", Q_link_Z_dir_X_click, true );
    }
    const div = document.createElement( "div" );
    div.appendChild( document.createTextNode( level.title ));
    e.appendChild(div);
    li.appendChild(e);
    if( level.children !== undefined )
    {   const e = document.createElement( "ul" );
        e.addEventListener( "wheel", Q_bar_Q_ul_X_wheel, false );
        for( let i = 0; i !== level.children.length; i++ )
            Q_bar_P_level( e, level.children[i] );
        li.appendChild(e);
    }
    parent.appendChild(li);
}
//==============================================================================
function Q_conf_X( o
){  let changed_group_1 = false;
    for( let k in o )
        switch(k)
        { case "Q_menu_C_internal_links":
                if( o[k] )
                {   if( Q_bar_Q_ul_S_0.lastChild !== null )
                    {   let e;
                        while( /^chrome:\/\//.test(( e = Q_bar_Q_ul_S_0.lastChild.firstChild ).getAttribute( "href" ))) //NDFN bez jawnego oznaczenia.
                            e.parentNode.parentNode.removeChild( e.parentNode );
                    }
                }else
                    chrome.bookmarks.getTree(
                      function( tree
                      ){  const a =
                          [ { url: "chrome://chrome-urls", title: 1%`built‐in pages`` }
                          , { url: "chrome://history", title: 2%`history of addresses`` }
                          , { url: "chrome://downloads", title: 3%`downloads`` }
                          , { url: "chrome://settings", title: 4%`user settings`` }
                          , { url: "chrome://extensions", title: 5%`installable extensions`` }
                          , { url: "chrome://apps", title: 31%`installable applications`` }
                          , { url: "chrome://version", title: 7%`program version`` }
                          ];
                          for( let i = 0; i !== a.length; i++ )
                              Q_bar_P_level( Q_bar_Q_ul_S_0, a[i] );
                      }
                    );
                break;
          case "Q_menu_C_quick_help":
                if( o[k] )
                {   if( Q_bar_Q_ul_S_0.parentNode.lastChild !== null )
                    {   let e;
                        while(( e = Q_bar_Q_ul_S_0.parentNode.lastChild ).tagName === "P" ) //NDFN bez jawnego oznaczenia.
                            Q_bar_Q_ul_S_0.parentNode.removeChild(e);
                    }
                }else
                {   const a =
                    [ 13%`quick help:``
                    , 14%`to open a menu node under the screen pointer is below and not far of opened menu— move pointer near icon (or the right edge of menu) of this closed node.``
                    , 15%`to edit— click pressing “alt” key.``
                    , 16%`supports keyboard on generic level: “esc”, “tab”, arrow keys, “enter”.``
                    ];
                    for( let i = 0; i !== a.length; i++ )
                    {   const p = document.createElement( "p" );
                        p.appendChild( document.createTextNode( a[i] ));
                        Q_bar_Q_ul_S_0.parentNode.appendChild(p);
                    }
                }
                break;
          case "Q_menu_C_alt_side":
                if( o[k] )
                {   let e = document.getElementById( "sea" );
                    e.className = H_ocq_Q_s_Z_set_I_add( e.className, "sea_alt" );
                    e = document.getElementById( "attrib" );
                    e.className = H_ocq_Q_s_Z_set_I_add( e.className, "attrib_alt" );
                    e = document.getElementById( "bar_1" );
                    e.className = H_ocq_Q_s_Z_set_I_add( e.className, "bar_1_alt" );
                    e = document.getElementById( "bar_bm" );
                    e.className = H_ocq_Q_s_Z_set_I_add( e.className, "bar_bm_alt" );
                    e = document.getElementById( "adv" );
                    e.className = H_ocq_Q_s_Z_set_I_add( e.className, "adv_alt" );
                }else
                {   let e = document.getElementById( "sea" );
                    e.className = H_ocq_Q_s_Z_set_I_remove( e.className, "sea_alt" );
                    e = document.getElementById( "attrib" );
                    e.className = H_ocq_Q_s_Z_set_I_remove( e.className, "attrib_alt" );
                    e = document.getElementById( "bar_1" );
                    e.className = H_ocq_Q_s_Z_set_I_remove( e.className, "bar_1_alt" );
                    e = document.getElementById( "bar_bm" );
                    e.className = H_ocq_Q_s_Z_set_I_remove( e.className, "bar_bm_alt" );
                    e = document.getElementById( "adv" );
                    e.className = H_ocq_Q_s_Z_set_I_remove( e.className, "adv_alt" );
                }
                break;
          case "Q_bg_C_root_path":
          case "Q_bg_C_rel_path":
                if( !changed_group_1 )
                {   changed_group_1 = true;
                    if( Q_bg_C_root_path === ""
                    || Q_bg_C_rel_path === ""
                    )
                        document.body.style.backgroundImage = "";
                    else
                        chrome.management.getAll(
                          function( extensions
                          ){  for( let i = 0; i !== extensions.length; i++ )
                                  if( extensions[i].type === "theme" )
                                  {   document.body.style.backgroundImage = "url("+ JSON.stringify( "file:///"+ Q_bg_C_root_path +"/Default/Extensions/"+ extensions[i].id +"/"+ extensions[i].version +"_0/"+ Q_bg_C_rel_path ) +")";
                                      return;
                                  }
                              document.body.style.backgroundImage = "";
                          }
                        );
                }
                break;
          case "Q_bg_C_repeat":
                document.body.style.backgroundRepeat = Q_bg_C_repeat ? "repeat" : "";
                break;
        }
}
//------------------------------------------------------------------------------
document.addEventListener( "DOMContentLoaded"
, function(
  ){  let e = document.getElementsByTagName( "title" )[0];
      e.innerText = 33%`New Tab``;
      e = document.getElementById( "sea_arc" );
      e.addEventListener( "submit"
      , function( e
        ){  e.preventDefault();
            const a = H_ocq_Q_url_M_incomplete( H_ocq_Q_url_M( e.currentTarget.getElementsByTagName( "input" )[0].value ));
            if( a !== undefined )
                Q_browser_I_open_tab( "https://web.archive.org/web/*/"+ H_ocq_Q_url_R(a) );
        }
      );
      e = e.getElementsByTagName( "input" )[0];
      e.setAttribute( "placeholder", 17%`for searching ‘url’ in archive of the Internet pages:``+" «archive.org»➪‟WaybackMachine”" );
      e.setAttribute( "title", 18%`passes only ‘url’ strictly in the form pointing to static page`` );
      document.getElementById( "menu_title" ).appendChild( document.createTextNode( 19%`address list`` ));
      Q_bar_Q_ul_S_opened = Q_bar_Q_ul_S_0 = document.getElementById( "bar_bm" );
      Q_bar_Q_ul_S_offset_x = H_ocq_Q_number_I_abs( H_ocq_E_html_Q_element_R_page_offset_x( Q_bar_Q_ul_S_0 ) - H_ocq_E_html_Q_element_R_page_offset_x( Q_bar_Q_ul_S_0.firstChild ));
      chrome.bookmarks.getTree(
        function( tree
        ){  Q_bar_Q_ul_S_0.innerHTML = "";
            const e = H_ocq_E_html_Q_element_I_prev( Q_bar_Q_ul_S_0 );
            e.id = "_"+ tree[0].children[0].id;
            e.setAttribute( "data-dir", "" );
            for( let i = 0; i !== tree[0].children[0].children.length; i++ )
                Q_bar_P_level( Q_bar_Q_ul_S_0, tree[0].children[0].children[i] );
            for( let i = 1; i !== tree[0].children.length; i++ )
                Q_bar_P_level( Q_bar_Q_ul_S_0, tree[0].children[i] );
            Q_bar_Q_li_S_1 = document.getElementById( "_"+ tree[0].children[1].id ).parentNode;
            init_end;
        }
      );
      e = document.getElementById( "bar_1" );
      e.addEventListener( "mouseover", Q_bar_X_mouse_over, false );
      e.addEventListener( "mouseout", Q_bar_X_mouse_out, false );
      chrome.bookmarks.onCreated.addListener(
        function( id
        , bookmark
        ){  Q_bar_P_level( bookmark.parentId !== "1" ? document.getElementById( "_"+ bookmark.parentId ).nextSibling : Q_bar_Q_ul_S_0, bookmark );
            if( bookmark.parentId === "1" )
            {   const e = document.getElementById( "_"+ bookmark.id ).parentNode;
                e.parentNode.removeChild(e);
                Q_bar_Q_ul_S_0.insertBefore( e, Q_bar_Q_li_S_1 );
            }
        }
      );
      chrome.bookmarks.onRemoved.addListener(
        function( id
        , remove_info
        ){  const e = document.getElementById( "_"+ id ).parentNode;
            e.parentNode.removeChild(e);
        }
      );
      chrome.bookmarks.onMoved.addListener(
        function( id
        , move_info
        ){  const e = document.getElementById( "_"+ move_info.oldParentId ).nextSibling.children[ move_info.oldIndex ];
            e.parentNode.removeChild(e);
            document.getElementById( "_"+ move_info.parentId ).nextSibling.insertBefore( e, document.getElementById( "_"+ move_info.parentId ).nextSibling.children[ move_info.index ] );
        }
      );
      chrome.bookmarks.onChanged.addListener(
        function( id
        , change_info
        ){  const e = document.getElementById( "_"+ id );
            e.getElementsByTagName( "DIV" )[0].firstChild.nodeValue = change_info.title;
            if( change_info.url !== undefined )
            {   e.getElementsByTagName( "IMG" )[0].setAttribute( "src", "chrome://favicon/"+ change_info.url );
                e.setAttribute( "href", change_info.url );
            }
        }
      );
      chrome.management.onInstalled.addListener(
        function( extension
        ){  const adv = document.getElementById( "adv" );
            const es = adv.getElementsByTagName( "p" );
            for( let i = 0; i !== es.length; i++ )
                if( es[i].getAttribute( "data-guid" ) === extension.id )
                {   if( es.length > 1 )
                        es[i].parentNode.removeChild( es[i] );
                    else
                    {   adv.setAttribute( "hidden", "" );
                        adv.innerHTML = "";
                    }
                    break;
                }
            if( extension.type === "theme"
            && Q_bg_C_root_path !== ""
            && Q_bg_C_rel_path !== ""
            )
                document.body.style.backgroundImage = "url("+ JSON.stringify( "file:///"+ Q_bg_C_root_path +"/Default/Extensions/"+ extension.id +"/"+ extension.version +"_0/"+ Q_bg_C_rel_path ) +")";
        }
      );
      chrome.management.onUninstalled.addListener(
        function( id
        ){  if( document.body.style.backgroundImage.indexOf( "/Default/Extensions/"+ id +"/" ) !== -1 )
                document.body.style.backgroundImage = "";
        }
      );
      chrome.management.getAll(
        function( extensions
        ){  const my_extensions =
            [ { "guid": "fphbnkckhppinhpofaeidjekbhjgegdh"
              , "name": "navigation"
              }
            , { "guid": "ndengmlnoehaajobfahhkiihflfdknpa"
              , "name": "local storage"
              }
            , { "guid": "dmhjnihflmkjkgakhoklchdadfiehcic"
              , "name": "alternative history"
              }
            , { "guid": "lbkadpnnldnnakkiochlmlchlpgjaclf"
              , "name": "download This Video"
              }
            , { "guid": "cllpbdkeibiidpnkfhjllnpgjchpplen"
              , "name": "page restyle"
              }
            , { "guid": "hgaeflbpmnichadgeghjnpifaiiacbck"
              , "name": "pr0nSusPICiErr"
              }
            ];
            for( let i = 0; i !== extensions.length; i++ )
            {   for( let j = 0; j !== my_extensions.length; j++ )
                    if( extensions[i].id === my_extensions[j][ "guid" ] )
                    {   my_extensions.splice( j, 1 );
                        break;
                    }
                if( !my_extensions.length )
                    break;
            }
            if( my_extensions.length )
            {   const adv = document.getElementById( "adv" );
                let p = document.createElement( "p" );
                p.appendChild( document.createTextNode( 8%`would you like to consider… 8-]`` ));
                adv.appendChild(p);
                p = document.createElement( "p" );
                p.appendChild( document.createTextNode( 9%`other my extension programs?`` ));
                adv.appendChild(p);
                let a;
                for( let i = 0; i !== my_extensions.length; i++ )
                {   p = document.createElement( "p" );
                    p.setAttribute( "data-guid", my_extensions[i][ "guid" ] );
                    p.appendChild( document.createTextNode( "•"+ my_extensions[i][ "name" ] ));
                    adv.appendChild(p);
                }
                p = document.createElement( "p" );
                p.appendChild( document.createTextNode( 10%`there is`` +" " ));
                a = document.createElement( "a" );
                a.setAttribute( "href", ```extensions_url``` );
                a.style.textDecoration = "underline";
                a.appendChild( document.createTextNode( 11%`on‐line description of all`` ));
                p.appendChild(a);
                p.appendChild( document.createTextNode( "." ));
                adv.appendChild(p);
                adv.removeAttribute( "hidden" );
            }
            init_end;
        }
      );
      window.addEventListener( "keydown"
      , function( e
        ){  e.stopPropagation();
            if( Q_bar_Q_li_S_over === undefined )
                return;
            switch( e.key )
            { case "Escape":
              case "ArrowUp":
              case "ArrowDown":
                    if( Q_bar_Q_ul_S_over === Q_bar_Q_ul_S_0 )
                        return;
                    break;
              case "ArrowRight":
              case "ArrowLeft":
                    break;
              default:
                    return;
            }
            if( Q_bar_Q_ul_S_timeout !== undefined )
            {   window.clearTimeout( Q_bar_Q_ul_S_timeout );
                Q_bar_Q_ul_S_timeout = undefined;
            }
            switch( e.key )
            { case "Escape":
                    if( Q_bar_Q_ul_S_opened !== Q_bar_Q_ul_S_over.parentNode.parentNode )
                    {   Q_bar_Q_ul_S_opened.style.display = "";
                        Q_bar_Q_ul_S_opened.style.top = "";
                        Q_bar_Q_ul_S_over = Q_bar_Q_ul_S_opened = Q_bar_Q_ul_S_opened.parentNode.parentNode;
                        Q_bar_Q_li_S_over = Q_bar_Q_ul_S_over.childNodes[0];
                        //NDFN nie da się wyświetlić wskaźnika klawiatury.
                    }
                    break;
              case "ArrowRight":
                    if( Q_bar_Q_ul_S_opened !== Q_bar_Q_ul_S_over )
                    {   Q_bar_Q_ul_S_opened.style.display = "";
                        Q_bar_Q_ul_S_opened.style.top = "";
                        Q_bar_Q_ul_S_opened = Q_bar_Q_ul_S_opened.parentNode.parentNode;
                    }
                    break;
              case "ArrowLeft":
                    if( Q_bar_Q_li_S_over.childNodes[1] !== undefined )
                    {   Q_bar_Q_ul_S_opened = Q_bar_Q_li_S_over.childNodes[1];
                        Q_bar_Q_ul_S_opened.style.display = "block";
                    }
                    break;
              case "ArrowUp":
              case "ArrowDown":
                {   let li = Q_bar_Q_li_S_over;
                    let d = li.offsetHeight;
                    while(( li = li.nextSibling ) !== null )
                        if( li.offsetHeight < d )
                            d = li.offsetHeight;
                    if( Q_menu_C_wheel_rev_dir
                      ^ ( e.key === "ArrowUp" )
                    )
                        d = -d;
                    if( Q_menu_C_wheel_rev_dir )
                        d = -d;
                    const c_y = H_ocq_E_html_Q_element_R_page_offset_y( Q_bar_Q_ul_S_over );
                    if( c_y + Q_bar_Q_ul_S_over.offsetHeight + d < Q_menu_I_wheel_S_min_visible_y
                    || c_y + d + Q_menu_I_wheel_S_min_visible_y > document.documentElement.clientHeight
                    )
                        return;
                    let y;
                    if( Q_bar_Q_ul_S_over.style.top !== "" )
                        y = parseInt( Q_bar_Q_ul_S_over.style.top );
                    else
                        y = Q_bar_Q_ul_S_over.offsetTop;
                    Q_bar_Q_ul_S_over.style.top = ( y + d ) +"px";
                    break;
                }
            }
            e.preventDefault();
        }
      , true
      );
  }
);
/******************************************************************************/
