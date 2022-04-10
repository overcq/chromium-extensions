/*******************************************************************************
*   ___   private place
*  ¦OUX¦  Javascript
*  ¦/C+¦  content script
*   ---   zalando.pl buy
*         buy confirmation
* ©overcq                on ‟Gentoo Linux 17.1” “x86_64”              2022‒2‒4 g
*******************************************************************************/
let S_run = false;
//==============================================================================
function find_button(
){  const es = document.getElementsByTagName( "BUTTON" );
    for( let i = 0; i !== es.length; i++ )
        if( es[i].getAttribute( "data-id" ) === "z-coast-fjord-confirmation-buyNow-top" )
            return es[i];
}
function simulate_mouseevent( e
, type
, x
, y
){  const ev = new MouseEvent( type
    , { view: window
      , bubbles: true
      , cancelable: true
      , clientX: x
      , clientY: y
      , button: 0
      }
    );
    e.dispatchEvent(ev);
}
function simulate_click( e
){  const box = e.getBoundingClientRect();
    const dx = Math.random() * ( box.right - box.left );
    const dy = Math.random() * ( box.bottom - box.top );
    const x = box.left + Math.trunc(dx);
    const y = box.top + Math.trunc(dy);
    simulate_mouseevent( e, "mousedown", x, y );
    simulate_mouseevent( e, "mouseup", x, y );
    simulate_mouseevent( e, "click", x, y );
}
function I_click(
){  const button = find_button();
    simulate_click(button);
}
function I_run( ...params
){  let es = document.getElementsByClassName( "z-1-notification--global" );
    if(es.length)
    {   es = es[0].getElementsByClassName( "z-1-notification__content" );
        if( es[0].firstElementChild.textContent === "Produkt znajdujący się w Twoim koszyku nie jest już dostępny." )
            window.location = "/cart";
        else
        {   chrome.storage.local.remove( "u" );
            chrome.storage.local.set( { "s": false } );
            alert( `Zatrzymane. Nieznany komunikat: “${es[0].firstElementChild.textContent}“. Powiadom twórcę programu.` );
        }
    }else
        chrome.storage.local.get( "s", async (o) =>
          {   if( o.s === true )
              {   const es = document.getElementsByTagName( "DIV" );
                  let s;
                  for( let i = 0; i !== es.length; i++ )
                  {   s = es[i].getAttribute( "data-props" );
                      if( s !== null )
                          break;
                  }
                  o = JSON.parse(s);
                  let products = ( await chrome.storage.local.get( "p" )).p;
                  if( products !== undefined )
                      products = o.model.groups.concat(products);
                  else
                      products = o.model.groups;
                  await chrome.storage.local.set( { "p": products } );
                  products = o.model.outOfStockArticles;
                  await chrome.storage.local.set( { "u": products } );
                  //if(products.length)
                      //window.location = products[0].shopUrl;
                  //if( params.length )
                      //I_click();
                  //else
                      //window.setTimeout( I_click, 400 );
                  if( o.model.groups.length )
                  {   const post_data =
                      { checkoutId: o.model.checkoutId
                      , eTag: o.model.eTag
                      };
                      let req = new XMLHttpRequest();
                      req.open( "POST", "https://www.zalando.pl/api/checkout/buy-now" );
                      req.setRequestHeader( "Accept", "application/json" );
                      req.setRequestHeader( "Content-Type", "application/json" );
                      req.setRequestHeader( "X-Xsrf-Token", document.cookie.split( /\s*;\s*/ ).find( e => { return e.startsWith("frsx="); } ).split( "=" ).slice(1).join( "=" ) );
                      req.setRequestHeader( "X-Zalando-Checkout-App", "web" );
                      req.setRequestHeader( "X-Zalando-Footer-Mode", "desktop" );
                      req.setRequestHeader( "X-Zalando-Header-Mode", "desktop" );
                      req.addEventListener( "readystatechange", () =>
                        {   console.log( `State: ${req.readyState}` );
                            if( req.readyState !== 4 )
                                return;
                            console.log( `Status: ${req.status}` );
                            if( req.status !== 200 )
                                return;
                            const o = JSON.parse( req.responseText );
                            console.log(o);
                            window.location = o.url;
                        }
                      );
                      req.send( JSON.stringify( post_data ));
                  }else
                      window.location = "/cart";
              }
          }
        );
    S_run = true;
}
//==============================================================================
document.addEventListener( "DOMContentLoaded", I_run );
try
{   if( !S_run )
        I_run();
}catch(e)
{
}
/******************************************************************************/
