/*******************************************************************************
*   ___   private place
*  ¦OUX¦  Javascript
*  ¦/C+¦  script
*   ---   zalando.pl buy
*         menu
* ©overcq                on ‟Gentoo Linux 17.1” “x86_64”              2022‒2‒5 S
*******************************************************************************/
let current_tab;
//==============================================================================
async function R_current_tab(
){  const query_options = { active: true, currentWindow: true };
    const [tab] = await chrome.tabs.query( query_options );
    return tab;
}
function Q_start_button_I_click_start(
){  chrome.storage.local.remove( "t" ); // Tymczasowo.
    chrome.storage.local.set( { "s": true } );
    window.close();
}
function Q_start_button_I_click_stop(
){  chrome.storage.local.set( { "s": false } );
    window.close();
}
async function Q_start_button_I_enable( o
){  const button = document.getElementById( "b" );
    if( button.style.display === "inline" )
        return;
    if( o === undefined )
        o = await chrome.storage.local.get( "s" );
    const e = document.createTextNode( o.s === true ? "stop" : "start" )
    button.addEventListener( "click", o.s === true ? Q_start_button_I_click_stop : Q_start_button_I_click_start );
    button.appendChild(e);
    button.style.display = "inline";
}
function Q_start_button_I_disable(
){  const button = document.getElementById( "b" );
    if( button.style.display === "none" )
        return;
    button.style.display = "none";
    button.removeChild( button.firstChild );
    button.removeEventListener( "click", Q_start_button_I_click );
}
//==============================================================================
// Tymczasowo do zmiany ustawienia na Integer.
chrome.storage.local.get( "d", async (o) =>
  {   if( typeof o.d === "string" )
          await chrome.storage.local.set( { "d": parseInt(o.d) } );
  }
);
document.addEventListener( "DOMContentLoaded", async () =>
  {   const h = document.getElementById( "h" );
      h.appendChild( document.createTextNode( 0%`Help`` ));
      const i = document.getElementById( "i" );
      i.appendChild( document.createTextNode( 2%`interval delay`` +":" ));
      const e_title = document.getElementsByTagName( "TITLE" )[0];
      const e_h1 = document.getElementsByTagName( "H1" )[0];
      e_h1.appendChild( document.createTextNode( e_title.firstChild.nodeValue ));
      const e_msec = document.getElementById( "m" );
      e_msec.parentNode.appendChild( document.createTextNode( 1%`miliseconds`` ));
      e_msec.addEventListener( "change", async () =>
        {   e_msec.value = parseInt( e_msec.value );
            await chrome.storage.local.set( { "d": parseInt( e_msec.value ) } );
        }
      );
      let o = await chrome.storage.local.get( "d" );
      const interval_delay = o.d !== undefined ? o.d : 850;
      if( o.d === undefined )
          await chrome.storage.local.set( { "d": interval_delay } );
      e_msec.value = interval_delay;
      current_tab = await R_current_tab();
      chrome.tabs.onUpdated.addListener( async ( tab_id, change_info, tab ) =>
        {   if( tab_id !== current_tab.id
            || tab.url === undefined 
            )
                return;
            if( tab.url.match( /^https:\/\/www\.zalando\.pl\/cart\/?(?:[?#]|$)/ ))
            {   function R_count_of_articles(
                ){  return document.getElementsByClassName( "z-coast-base__article-in-cart" ).length;
                }
                const result = await chrome.scripting.executeScript(
                  { target: { tabId: current_tab.id }
                  , func: R_count_of_articles
                  }
                );
                const o = await chrome.storage.local.get( "s" );
                if( result[0].result
                || o.s === true
                )
                    await Q_start_button_I_enable();
            }else
            {   const o = await chrome.storage.local.get( "s" );
                if( o.s !== true )
                    Q_start_button_I_disable();
            }
        }
      );
      if( current_tab.url !== undefined )
          if( current_tab.url.match( /^https:\/\/www\.zalando\.pl\/cart\/?(?:[?#]|$)/ ))
          {   function R_count_of_articles(
              ){  return document.getElementsByClassName( "z-coast-base__article-in-cart" ).length;
              }
              const result = await chrome.scripting.executeScript(
                { target: { tabId: current_tab.id }
                , func: R_count_of_articles
                }
              );
              const o = await chrome.storage.local.get( "s" );
              if( result[0].result
              || o.s === true
              )
                  await Q_start_button_I_enable();
          }else
          {   const o = await chrome.storage.local.get( "s" );
              if( o.s === true )
                  await Q_start_button_I_enable(o);
          }
      const c = document.getElementById( "c" );
      c.addEventListener( "click", async () =>
        {   chrome.storage.local.remove( "p" );
            window.close();
        }
      );
      c.appendChild( document.createTextNode( 14%`clear`` ));
      const table = document.getElementById( "p" );
      const caption = table.getElementsByTagName( "CAPTION" )[0];
      caption.appendChild( document.createTextNode( 4%`Bought`` ));
      o = await chrome.storage.local.get( "p" );
      const a = o.p;
      if( a === undefined )
          return;
      c.style.display = "inline";
      function I_row( title, value, end
      ){  const tr = document.createElement( "TR" );
          const th = document.createElement( "TH" );
          th.appendChild( document.createTextNode( `${title}:` ));
          const td = document.createElement( "TD" );
          td.appendChild( document.createTextNode(value));
          if(end)
          {   th.className = "e";
              td.className = "e";
          }
          tr.appendChild(th);
          tr.appendChild(td);
          table.appendChild(tr);
      }
      for( let i = 0; i !== a.length; i++ )
          for( let j = 0; j !== a[i].articles.length; j++ )
          {   const tr = document.createElement( "TR" );
              const th = document.createElement( "TH" );
              th.appendChild( document.createTextNode( 10%`image`` +":" ));
              const td = document.createElement( "TD" );
              const link = document.createElement( "A" );
              link.setAttribute( "target", "_blank" );
              link.setAttribute( "href", "https://www.zalando.com"+ a[i].articles[j].shopUrl );
              const image = document.createElement( "IMG" );
              image.src = a[i].articles[j].imageUrl;
              link.appendChild(image);
              td.appendChild(link);
              tr.appendChild(th);
              tr.appendChild(td);
              table.appendChild(tr);
              I_row( 5%`brand``, a[i].articles[j].brandName );
              I_row( 3%`name``, a[i].articles[j].name );
              I_row( 6%`color``, a[i].articles[j].color );
              I_row( 7%`size``, a[i].articles[j].size );
              I_row( 8%`quantity``, a[i].articles[j].quantity );
              I_row( 9%`price``, a[i].articles[j].price.formatted, true );
          }
  }
);
/******************************************************************************/
