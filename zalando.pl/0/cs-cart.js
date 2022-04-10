/*******************************************************************************
*   ___   private place
*  ¦OUX¦  Javascript
*  ¦/C+¦  content script
*   ---   zalando.pl buy
*         cart
* ©overcq                on ‟Gentoo Linux 17.1” “x86_64”              2022‒2‒2 M
*******************************************************************************/
let S_timeout_check;
let S_interval_delay;
let S_run = false;
let S_http429_count = 0;
const S_reload_delay = 30 * 60 * 1000;
//==============================================================================
function I_check(
){  let req = new XMLHttpRequest();
    req.open( "GET", "https://www.zalando.pl/api/checkout/next-step" );
    req.setRequestHeader( "Accept", "application/json" );
    req.setRequestHeader( "Content-Type", "application/json" );
    req.addEventListener( "readystatechange", async () =>
      {   console.log( `State: ${req.readyState}` );
          if( req.readyState !== 4 )
              return;
          console.log( `Status: ${req.status}` );
          if( req.status === 429 )
          {   const o = await chrome.storage.local.get( "s" );
              if( o.s !== true )
                  return;
              if( !S_http429_count )
              {   const o = await chrome.storage.local.get( "d" );
                  await chrome.storage.local.set( { "d": o.d + 50 } );
              }
              S_http429_count++;
              S_interval_delay += 10000;
              S_timeout_check = window.setTimeout( I_check, S_interval_delay );
              return;
          }
          if( req.status === 500 )
          {   const o = await chrome.storage.local.get( "s" );
              if( o.s !== true )
                  return;
              S_interval_delay += 1000;
              S_timeout_check = window.setTimeout( I_check, S_interval_delay );
              return;
          }
          S_http429_count = 0;
          if( req.status !== 200 )
              return;
          let o = JSON.parse( req.responseText );
          const url = o.url;
          console.log( `URL: ${url}` );
          if( url === "/checkout/confirm"
          || url.match( "^https:\/\/checkout\.payment\.zalando\.com\/payment-method-selection-session\/[0-9a-f-]+\/selection$" )
          )
          {   req = new XMLHttpRequest();
              req.open( "GET", "https://www.zalando.pl/api/checkout/confirmation-details" );
              req.setRequestHeader( "Accept", "application/json" );
              req.setRequestHeader( "Content-Type", "application/json" );
              req.addEventListener( "readystatechange", async () =>
                {   console.log( `State: ${req.readyState}` );
                    if( req.readyState !== 4 )
                        return;
                    console.log( `Status: ${req.status}` );
                    if( req.status !== 200 )
                        return;
                    const o = JSON.parse( req.responseText );
                    console.log(o);
                    let products = ( await chrome.storage.local.get( "p" )).p;
                    if( products !== undefined )
                        products = o.confirmationDetails.groups.concat(products);
                    else
                        products = o.confirmationDetails.groups;
                    await chrome.storage.local.set( { "p": products } );
                    products = o.confirmationDetails.outOfStockArticles;
                    await chrome.storage.local.set( { "u": products } );
                    const post_data =
                    { checkoutId: o.confirmationDetails.checkoutId
                    , eTag: o.confirmationDetails.eTag
                    };
                    req = new XMLHttpRequest();
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
                }
              );
              req.send(null);
              return;
          }
          if( url === "/checkout/address" )
          {   await chrome.storage.local.set( { "s": false } );
              window.location = url;
              return;
          }
          o = await chrome.storage.local.get( "d" );
          if( S_interval_delay !== o.d )
              S_interval_delay = o.d;
          if( url.match( /^\/cart(\?|$)/ ))
          {   const o = await chrome.storage.local.get( "s" );
              if( o.s === true )
                  S_timeout_check = window.setTimeout( I_check, S_interval_delay );
              return;
          }
          await chrome.storage.local.set( { "s": false } );
          console.log( "URL unexpected." );
          alert( `Zatrzymane. Nieznany URL next-step: “${url}“. Powiadom twórcę programu.` );
      }
    );
    req.send(null);
}
async function remove_I_click(
){  if( document.getElementsByClassName( "z-coast-base__article-in-cart" ).length === 1 )
        await chrome.storage.local.set( { "s": false } );
}
function I_reload(
){  if( window.location.pathname !== "/cart" )
        window.location = "/cart";
    else
        window.location.reload();
}
function I_run(
){  const es = document.getElementsByTagName( "BUTTON" );
    for( let i = 0; i !== es.length; i++ )
        if( es[i].getAttribute( "data-id" ) === "article-remove" )
            es[i].addEventListener( "click", remove_I_click );
    window.setTimeout( I_reload, S_reload_delay );
    S_run = true;
}
//==============================================================================
chrome.storage.local.remove( "u" );
chrome.storage.local.get( "s", (o) =>
  {   if( o.s === true )
          chrome.storage.local.get( "d", (o) =>
            {   S_interval_delay = o.d;
                I_check();
            }
          );
  }
);
chrome.storage.onChanged.addListener( async ( changes, area_name ) =>
  {   if( area_name !== "local" )
          return;
      if( changes.d !== undefined )
          S_interval_delay = changes.d.newValue;
      if( changes.s !== undefined )
          if( changes.s.newValue === true )
          {   if( changes.d === undefined )
              {   const o = await chrome.storage.local.get( "d" );
                  S_interval_delay = o.d;
              }
              I_check();
          }else
          {   if( S_timeout_check !== undefined )
              {   window.clearTimeout( S_timeout_check );
                  S_timeout_check = undefined;
              }
          }
  }
);
document.addEventListener( "DOMContentLoaded", I_run );
try
{   if( !S_run )
        I_run();
}catch(e)
{
}
/******************************************************************************/
