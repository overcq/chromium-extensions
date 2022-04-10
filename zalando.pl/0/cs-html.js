/*******************************************************************************
*   ___   private place
*  ¦OUX¦  Javascript
*  ¦/C+¦  content script
*   ---   zalando.pl buy
*         buy article
* ©overcq                on ‟Gentoo Linux 17.1” “x86_64”             2022‒2‒24 g
*******************************************************************************/
let S_run = false;
let S_id = "e7f9dfd05f6b992d05ec8d79803ce6a6bcfb0a10972d4d9731c6b94f6ec75033";
//==============================================================================
function I_run(
){  const req = new XMLHttpRequest();
    req.open( "GET", window.location );
    req.addEventListener( "readystatechange", () =>
      {   if( req.readyState !== 4 )
              return;
          if( req.status !== 200 )
              return;
          const start = req.responseText.indexOf( " type=\"application/ld+json\">" ) + 28;
          const end = req.responseText.indexOf( "<", start );
          const o = JSON.parse( req.responseText.substring( start, end ).replace( /&amp;/g, "&" ).replace( /&quot;/g, "\"" ));
          const select = document.createElement( "SELECT" );
          for( let i = 0; i !== o.offers.length; i++ )
          {   const option = document.createElement( "OPTION" );
              option.setAttribute( "value", o.offers[i].sku );
              option.appendChild( document.createTextNode( o.offers[i].sku.substr( o.sku.length ) +", "+ o.offers[i].price +" "+ o.offers[i].priceCurrency + ( o.offers[i].availability === "http://schema.org/OutOfStock" ? 12%` (unavailable)`` : "" )));
              select.appendChild(option);
          }
          const button = document.createElement( "BUTTON" );
          button.appendChild( document.createTextNode( 11%`add product`` ));
          button.addEventListener( "click", () =>
            {   if( select.selectedIndex === -1 )
                    return;
                const post_data =
                [ { "id": S_id //NDFN
                  , "variables":
                    { "addToCartInput":
                      { "productId": select.value
                      , "clientMutationId": "addToCartMutation"
                      }
                    }
                  }
                ];
                const req = new XMLHttpRequest();
                req.open( "POST", "https://www.zalando.pl/api/graphql/add-to-cart/" );
                req.setRequestHeader( "Content-Type", "application/json" );
                req.setRequestHeader( "X-Xsrf-Token", document.cookie.split( /\s*;\s*/ ).find( e => { return e.startsWith("frsx="); } ).split( "=" ).slice(1).join( "=" ) );
                req.setRequestHeader( "X-Zalando-Feature", "pdp" );
                req.setRequestHeader( "X-Zalando-Intent-Context", "navigationTargetGroup=MEN" );
                req.setRequestHeader( "X-Zalando-Request-Uri", window.location.pathname );
                req.addEventListener( "readystatechange", () =>
                  {   if( req.readyState !== 4 )
                          return;
                      console.log(req.status);
                      if( req.status !== 200 )
                          return;
                      const o = JSON.parse( req.responseText );
                      console.log(o);
                      if( o[0].data.addToCart.__typename !== "AddToCartPayload" )
                          alert( 13%`Not added`` +"." );
                  }
                );
                req.send( JSON.stringify( post_data ));
            }
          );
          const e = document.getElementsByTagName( "x-wrapper-re-1-6" )[0];
          e.appendChild(select);
          e.appendChild(button);
        }
    );
    req.send(null);
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
