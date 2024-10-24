/*******************************************************************************
*   ___   public
*  ¦OUX¦  JavaScript
*  ¦/C+¦  Chrome extension
*   ---   fictitious bets
*         popup
* ©overcq                on ‟Gentoo Linux 23.0” “x86_64”             2024‒9‒13 Z
*******************************************************************************/
function Q_date_N( date
){  return `${ date.getDate().toString().padStart( 2, "0" ) }.${ ( date.getMonth() + 1 ).toString().padStart( 2, "0" ) }.${ date.getFullYear() } ${ date.getHours().toString().padStart( 2, "0" ) }:${ date.getMinutes().toString().padStart( 2, "0" ) }`;
}
//==============================================================================
document.addEventListener( "DOMContentLoaded", async () =>
  {   const tbody = document.getElementsByTagName( "TBODY" )[0];
      document.addEventListener( "click", async (ev) =>
        {   if( ev.target.tagName !== "BUTTON" )
                return;
            let trs = tbody.getElementsByTagName( "TR" );
            let rows;
            for( let i = 0; i !== trs.length; i += rows )
            {   const tds = trs[i].getElementsByTagName( "TD" );
                rows = tds[10].getAttribute( "rowspan" );
                rows = rows !== null ? parseInt( rows, 10 ) : 1;
                if( tds[10].firstElementChild === ev.target )
                {   let data = await chrome.storage.local.get( "odds" );
                    data = data[ "odds" ];
                    data.splice( i, rows );
                    chrome.storage.local.set({ "odds": data });
                    const re = new RegExp( `^https:\\/\\/(?:www\\.)?${ tds[0].textContent.replaceAll( ".", "\\." ) }\\/`, "i" );
                    const tabs = await chrome.tabs.query({ "discarded": false, "windowType": "normal" });
                    for( const tab of tabs )
                        if( tab.url.match(re) )
                            chrome.tabs.reload(tab.id);
                    for( let j = i + rows - 1; j !== i - 1; j-- )
                        trs[j].remove();
                    break;
                }
            }
        }
      );
      let data = await chrome.storage.local.get( "odds" );
      data = data[ "odds" ];
      if( data === undefined )
          return;
      let last_id = null, rows = 0;
      for( let i = 0; i !== data.length; i++ )
      {   if( last_id !== null
          && data[i][4] !== last_id
          )
          {   data[ i - rows ].push(rows);
              rows = 0;
          }
          if( data[i][4] !== null )
              rows++;
          last_id = data[i][4];
      }
      if( last_id !== null )
          data[ data.length - rows ].push(rows);
      let i = 0;
      for( const bet of data )
      {   const tr = document.createElement( "TR" );
          let td = document.createElement( "TD" );
          const a = document.createElement( "A" );
          if( bet[0].startsWith( "http" ))
          {   a.href = bet[0];
              const a_ = bet[0].match( /^https?:\/\/(?:www\.)?([^\/]+)/ );
              a.append( a_[1] );
          }else
          {   a.href = "https://"+ bet[0];
              a.append( bet[0] );
          }
          a.setAttribute( "target", "_blank" );
          td.append(a);
          tr.append(td);
          td = document.createElement( "TD" );
          td.append( bet[1] );
          tr.append(td);
          td = document.createElement( "TD" );
          td.append( bet[2] );
          tr.append(td);
          td = document.createElement( "TD" );
          td.append( Q_date_N( new Date( bet[3] )));
          tr.append(td);
          td = document.createElement( "TD" );
          td.append( bet[5] );
          tr.append(td);
          td = document.createElement( "TD" );
          td.append( bet[6] );
          tr.append(td);
          td = document.createElement( "TD" );
          td.append( bet[7] );
          tr.append(td);
          if( bet[4] === null
          || bet.length === 11
          )
          {   td = document.createElement( "TD" );
              if( bet.length === 11 )
                  td.setAttribute( "rowspan", bet[10] );
              td.append( bet[8] !== 1 ? bet[8] : "" );
              tr.append(td);
              td = document.createElement( "TD" );
              if( bet.length === 11 )
                  td.setAttribute( "rowspan", bet[10] );
              td.append( `${bet[9]} zł` );
              tr.append(td);
              td = document.createElement( "TD" );
              if( bet.length === 11 )
                  td.setAttribute( "rowspan", bet[10] );
              let odds;
              if( bet[4] === null )
                  odds = parseFloat( bet[7].replace( ",", "." ));
              else
              {   odds = 1;
                  for( let j = i; j !== i + bet[10]; j++ )
                      odds *= parseFloat( data[j][7].replace( ",", "." ));
              }
              odds = Math.trunc( 100 * odds ) / 100;
              const amount = Math.trunc( bet[9] * 88 ) / 100;
              let expected = ( Math.trunc( 100 * odds * bet[8] * amount ) / 100).toString().split( "." );
              if( expected[1] === undefined )
                  expected.push( "0" );
              td.append( `${ expected[0] },${ expected[1].padEnd( 2, "0" ) } zł` );
              tr.append(td);
              td = document.createElement( "TD" );
              if( bet.length === 11 )
                  td.setAttribute( "rowspan", bet[10] );
              const button = document.createElement( "BUTTON" );
              button.append( "delete" );
              td.append(button);
              tr.append(td);
              tr.classList.add( "line-before-row" );
          }
          tbody.append(tr);
          last_id = bet[4];
          i++;
      }
  }
);
/******************************************************************************/
