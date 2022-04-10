/*******************************************************************************
*   ___   private place
*  ¦OUX¦  Javascript
*  ¦/C+¦  content script
*   ---   zalando.pl buy
*         buy success
* ©overcq                on ‟Gentoo Linux 17.1” “x86_64”             2022‒2‒21 l
*******************************************************************************/
let S_id = "e7f9dfd05f6b992d05ec8d79803ce6a6bcfb0a10972d4d9731c6b94f6ec75033";
//==============================================================================
chrome.storage.local.get( "u", (o) =>
  {   const products = o.u;
      if(products.length)
      {   const post_data = [];
          for( let i = 0; i !== products.length; i++ )
          {   for( let j = 0; j !== products[i].quantity; j++ )
                  post_data.push(
                    { "id": S_id //NDFN
                    , "variables":
                      { "addToCartInput":
                        { "productId": products[i].simpleSku
                        , "clientMutationId": "addToCartMutation"
                        }
                      }
                    }
                  );
          }
          const req = new XMLHttpRequest();
          req.open( "POST", "https://www.zalando.pl/api/graphql/add-to-cart/" );
          req.setRequestHeader( "Content-Type", "application/json" );
          req.setRequestHeader( "X-Xsrf-Token", document.cookie.split( /\s*;\s*/ ).find( e => { return e.startsWith("frsx="); } ).split( "=" ).slice(1).join( "=" ) );
          req.addEventListener( "readystatechange", () =>
            {   if( req.readyState !== 4 )
                    return;
                if( req.status !== 200 )
                    return;
                const o = JSON.parse( req.responseText );
                for( let i = 0; i !== o.length; i++ )
                    if( o[i].data.addToCart.__typename !== "AddToCartPayload" )
                    {   console.log(o);
                        chrome.storage.local.set( { "s": false } );
                        alert( 13%`Not added`` +"." );
                        return;
                    }
                window.location = "/cart";
            }
          );
          req.send( JSON.stringify( post_data ));
          chrome.storage.local.remove( "u" );
      }else
          chrome.storage.local.set( { "s": false } );
  }
);
/******************************************************************************/
