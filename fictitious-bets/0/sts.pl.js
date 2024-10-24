/*******************************************************************************
*   ___   public
*  ¦OUX¦  JavaScript
*  ¦/C+¦  Chrome extension
*   ---   fictitious bets
*         sts.pl
* ©overcq                on ‟Gentoo Linux 23.0” “x86_64”              2024‒9‒1 d
*******************************************************************************/
///DFN W tablicy danych fragmenty wpisów z “sts.pl” są kompletne z danym “id”.
let S_data;
let S_inited = false;
let S_id;
//==============================================================================
function Q_date_M( date
, time
){  const day_month_year = date.split( "." );
    const hour_minute = time.split( ":" );
    return new Date( day_month_year[2], day_month_year[1] - 1, day_month_year[0], hour_minute[0], hour_minute[1] );
}
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function Q_page_Q_odds_I_add( after
, text
){  if( after.nextElementSibling !== null
    && after.nextElementSibling.classList.contains( "H_ocq_S_odds" )
    )
    {   const span = after.nextElementSibling;
        span.prepend( text +" " );
    }else
    {   const span = document.createElement( "SPAN" );
        span.classList.add( "H_ocq_S_odds" );
        span.style.fontSize = "8px";
        span.append(text);
        after.after(span);
    }
}
async function Q_page_I_fill(
){  S_id = 0;
    if( S_data.length )
    {   let id_;
        for( let i = 0; i !== S_data.length; i++ )
            if( S_data[i][4] !== null )
            {   if( S_data[i][4] !== id_ )
                {   id_ = S_data[i][4];
                    S_id++;
                }
                S_data[i].push( S_id );
            }
        const hits = document.getElementsByTagName( "app-hits-carousel" )[0];
        if( hits !== undefined )
            for( const match of hits.getElementsByTagName( "bc-match-tile-grid" ))
            {   const teams_time = match.getElementsByTagName( "bc-match-tile-event-details-teams" )[0];
                const team_1 = teams_time.firstElementChild.firstElementChild.firstElementChild.children[1].textContent;
                const team_2 = teams_time.firstElementChild.firstElementChild.children[2].children[1].textContent;
                const date_time = teams_time.getElementsByTagName( "bc-match-tile-start-time" )[0];
                let date = date_time.firstElementChild.firstElementChild.textContent;
                switch(date)
                { case "dzisiaj":
                  case "jutro":
                        const now = new Date();
                        if( date === "jutro" )
                            now.setDate( now.getDate() + 1 );
                        date = `${ now.getDate() }.${ now.getMonth() + 1 }.${ now.getFullYear() }`;
                        break;
                }
                const time = date_time.firstElementChild.children[2].textContent;
                const date_ = Q_date_M( date, time ).getTime();
                for( let i = 0; i !== S_data.length; i++ )
                    if(( S_data[i][0] === "sts.pl"
                      || S_data[i][0].startsWith( "https://www.sts.pl/" )
                      )
                    && S_data[i][1] === team_1
                    && S_data[i][2] === team_2
                    && S_data[i][3] === date_
                    )
                    {   if( S_data[i][0] === "sts.pl" )
                        {   const a = match.closest( "A" );
                            S_data[i][0] = a.href;
                        }
                        for( const button of match.getElementsByTagName( "sds-odds-button" ))
                        {   const event = button.firstElementChild.firstElementChild.textContent;
                            if( event === S_data[i][6] )
                            {   Q_page_Q_odds_I_add( button.firstElementChild.firstElementChild, `${ S_data[i][8] * S_data[i][9] } zł ${ S_data[i][7] }${ S_data[i].length === 11 ? ' #'+ S_data[i][10] : "" }` );
                                break;
                            }
                        }
                    }
            }
        const more = document.getElementsByTagName( "app-show-more-container" )[0];
        if( more !== undefined )
            for( const match of more.getElementsByTagName( "bc-match-tile-grid" ))
            {   const teams_time = match.getElementsByTagName( "bc-match-tile-event-details-teams" )[0];
                const team_1 = teams_time.firstElementChild.firstElementChild.firstElementChild.textContent;
                const team_2 = teams_time.firstElementChild.firstElementChild.children[2].textContent;
                const date_time = teams_time.getElementsByTagName( "bc-match-tile-start-time" )[0];
                let date = date_time.firstElementChild.firstElementChild.textContent;
                switch(date)
                { case "dzisiaj":
                  case "jutro":
                        const now = new Date();
                        if( date === "jutro" )
                            now.setDate( now.getDate() + 1 );
                        date = `${ now.getDate() }.${ now.getMonth() + 1 }.${ now.getFullYear() }`;
                        break;
                }
                const time = date_time.firstElementChild.children[2].textContent;
                const date_ = Q_date_M( date, time ).getTime();
                for( const bet of S_data )
                    if( bet[0] === "sts.pl"
                    && bet[1] === team_1
                    && bet[2] === team_2
                    && bet[3] === date_
                    )
                        for( const button of match.getElementsByTagName( "sds-odds-button" ))
                        {   const event = button.firstElementChild.firstElementChild.textContent;
                            if( event === bet[6] )
                            {   Q_page_Q_odds_I_add( button.firstElementChild.firstElementChild, `${ bet[8] * bet[9] } zł ${ bet[7] }${ bet.length === 11 ? ' #'+ bet[10] : "" }` );
                                break;
                            }
                        }
            }
        for( let i = 0; i !== S_data.length; i++ )
            if( S_data[i].length === 11 )
                S_data[i].pop();
        const board = document.getElementsByTagName( "bb-detailed-scoreboard" )[0];
        const page = document.getElementsByTagName( "app-odds-page" )[0];
        if( board !== undefined
        && page !== undefined
        )
        {   let teams_time = board.getElementsByClassName( "shirts-container" )[0];
            let team_1, team_2, date, time;
            if( teams_time !== undefined )
            {   team_1 = teams_time.firstElementChild.children[1].textContent;
                time = teams_time.children[1].firstElementChild.textContent;
                date = teams_time.children[1].children[2].textContent;
                team_2 = teams_time.children[2].children[1].textContent;
            }else
            {   teams_time = board.getElementsByClassName( "no-shirts-container" )[0];
                teams = teams_time.firstElementChild.firstElementChild.textContent.split( "-" );
                team_1 = teams[0].trim();
                team_2 = teams[1].trim();
                date = teams_time.children[1].children[1].firstChild.nodeValue;
                time = teams_time.children[1].children[2].textContent;
            }
            const date_ = Q_date_M( date, time ).getTime();
            const has = [];
            for( const bet of S_data )
            {   if( bet[0] === "sts.pl"
                && bet[1] === team_1
                && bet[2] === team_2
                && bet[3] === date_
                )
                    has.push(bet);
            }
            if( has.length )
            {   let bet;
                let id_;
                for( let i = 0; i !== has.length; i++ )
                    if( has[i][4] !== null )
                    {   if( has[i][4] !== id_ )
                        {   id_ = has[i][4];
                            S_id++;
                        }
                        has[i][4] = S_id;
                    }
                for( const tip of page.getElementsByTagName( "app-match-details-bet-booster-tip-content" ))
                {   const event = tip.getElementsByClassName( "odds-button__label" )[0].textContent;
                    for( const bet of has )
                        if( event === bet[6] )
                            Q_page_Q_odds_I_add( tip, `${ bet[8] * bet[9] } zł ${ bet[7] }${ bet[4] !== null ? ' #'+ bet[4] : "" }` );
                }
                for( const group of page.getElementsByTagName( "app-match-details-group" ))
                {   const type = group.getElementsByClassName( "match-details-group__title" )[0].textContent.trim();
                    for( let i = 0; i !== has.length; i++ )
                        if( type === has[i][5] )
                        {   for( const button of group.getElementsByTagName( "sds-odds-button" ))
                            {   let event = button.firstElementChild.firstElementChild.textContent.trim();
                                if( event === has[i][1] )
                                    event = "1";
                                else if( event === has[i][2] )
                                    event = "2";
                                if( event === has[i][6] )
                                {   Q_page_Q_odds_I_add( button.firstElementChild.firstElementChild, `${ has[i][8] * has[i][9] } zł ${ has[i][7] }${ has[i][4] !== null ? ' #'+ has[i][4] : "" }` );
                                    break;
                                }
                            }
                            has.splice( i--, 1 );
                        }
                }
            }
        }
        await chrome.storage.local.set({ "odds": S_data });
    }
    S_inited = true;
}
//==============================================================================
document.addEventListener( "DOMContentLoaded", async () =>
{   //chrome.storage.local.clear();
    S_data = await chrome.storage.local.get( "odds" );
    S_data = S_data[ "odds" ];
    if( S_data === undefined )
        S_data = [];
    document.addEventListener( "click", (ev) =>
      {   if( !S_inited )
          {   ev.preventDefault();
              ev.stopPropagation();
              return;
          }
          const button = ev.target.closest( "bb-ticket-action-submit-button" );
          if( button !== null )
          {   const form = ev.target.closest( "bb-ticket-content" );
              const multi = form.getElementsByTagName( "bb-ticket-header-select" )[0].textContent.trim();
              if( multi === "SOLO"
              || multi === "AKO"
              || multi === "MULTIWIN"
              )
              {   const bets = form.getElementsByTagName( "bb-ticket-bet" );
                  let count = 0;
                  for( const bet of bets )
                      if( bet.getElementsByTagName( "sts-shared-checkbox" )[0].firstElementChild.classList.contains( "checked" ))
                          count++;
                  let id, id_;
                  if( count > 1 )
                  {   id = Date.now();
                      S_id++;
                  }else
                      id = null;
                  for( const bet of bets )
                  {   if( !bet.getElementsByTagName( "sts-shared-checkbox" )[0].firstElementChild.classList.contains( "checked" ))
                          continue;
                      const title = bet.getElementsByClassName( "bet-title" )[0];
                      const team_1 = title.firstChild.textContent.trim();
                      const team_2 = title.childNodes[2].textContent.trim();
                      const date_e = bet.getElementsByClassName( "bet-time-info" )[0];
                      const date = Q_date_M( date_e.firstChild.textContent, date_e.childNodes[2].textContent );
                      const type = bet.getElementsByClassName( "bet-event-type" )[0].textContent;
                      let event = bet.getElementsByClassName( "bet-event-selected" )[0].textContent;
                      if( event === team_1 )
                          event = "1";
                      else if( event === team_2 )
                          event = "2";
                      const odds = bet.getElementsByClassName( "bet-value" )[0].textContent.replace( ".", "," );
                      const inputs = button.closest( "bb-ticket-action" ).getElementsByTagName( "bb-ticket-amount" )[0].getElementsByTagName( "INPUT" );
                      let amount = inputs[0].value.replace( ",", "." );
                      amount = parseFloat(amount);
                      let count;
                      if( multi !== "MULTIWIN" )
                          count = 1;
                      else
                      {   count = parseInt( inputs[1].value, 10 );
                      }
                      const hits = document.getElementsByTagName( "app-hits-carousel" )[0];
                      if( hits !== undefined )
                          for( const match of hits.getElementsByTagName( "bc-match-tile-grid" ))
                          {   const teams_time = match.getElementsByTagName( "bc-match-tile-event-details-teams" )[0];
                              const team_1_ = teams_time.firstElementChild.firstElementChild.firstElementChild.children[1].textContent;
                              const team_2_ = teams_time.firstElementChild.firstElementChild.children[2].children[1].textContent;
                              const date_time = teams_time.getElementsByTagName( "bc-match-tile-start-time" )[0];
                              let date_ = date_time.firstElementChild.firstElementChild.textContent;
                              switch( date_ )
                              { case "dzisiaj":
                                case "jutro":
                                      const now = new Date();
                                      if( date_ === "jutro" )
                                          now.setDate( now.getDate() + 1 );
                                      date_ = `${ now.getDate() }.${ now.getMonth() + 1 }.${ now.getFullYear() }`;
                                      break;
                              }
                              const time = date_time.firstElementChild.children[2].textContent;
                              const date__ = Q_date_M( date_, time );
                              if( team_1_ === team_1
                              && team_2_ === team_2
                              && date__.getTime() === date.getTime()
                              )
                                  for( const button of match.getElementsByTagName( "sds-odds-button" ))
                                  {   const event_ = button.firstElementChild.firstElementChild.textContent;
                                      if( event_ === event )
                                      {   Q_page_Q_odds_I_add( button.firstElementChild.firstElementChild, `${ count * amount } zł ${odds}${ id !== null ? ' #'+ S_id : "" }` );
                                          break;
                                      }
                                  }
                          }
                      const more = document.getElementsByTagName( "app-show-more-container" )[0];
                      if( more !== undefined )
                          for( const match of more.getElementsByTagName( "bc-match-tile-grid" ))
                          {   const teams_time = match.getElementsByTagName( "bc-match-tile-event-details-teams" )[0];
                              const team_1_ = teams_time.firstElementChild.firstElementChild.firstElementChild.textContent;
                              const team_2_ = teams_time.firstElementChild.firstElementChild.children[2].textContent;
                              const date_time = teams_time.getElementsByTagName( "bc-match-tile-start-time" )[0];
                              let date_ = date_time.firstElementChild.firstElementChild.textContent;
                              switch( date_ )
                              { case "dzisiaj":
                                case "jutro":
                                      const now = new Date();
                                      if( date_ === "jutro" )
                                          now.setDate( now.getDate() + 1 );
                                      date_ = `${ now.getDate() }.${ now.getMonth() + 1 }.${ now.getFullYear() }`;
                                      break;
                              }
                              const time = date_time.firstElementChild.children[2].textContent;
                              const date__ = Q_date_M( date_, time );
                              if( team_1_ === team_1
                              && team_2_ === team_2
                              && date__.getTime() === date.getTime()
                              )
                                  for( const button of match.getElementsByTagName( "sds-odds-button" ))
                                  {   const event_ = button.firstElementChild.firstElementChild.textContent;
                                      if( event_ === event )
                                      {   Q_page_Q_odds_I_add( button.firstElementChild.firstElementChild, `${ count * amount } zł ${odds}${ id !== null ? ' #'+ S_id : "" }` );
                                          break;
                                      }
                                  }
                          }
                      const board = document.getElementsByTagName( "bb-detailed-scoreboard" )[0];
                      const page = document.getElementsByTagName( "app-odds-page" )[0];
                      if( board !== undefined
                      && page != undefined
                      )
                      {   let teams_time = board.getElementsByClassName( "shirts-container" )[0];
                          let team_1_, team_2_, date_, time;
                          if( teams_time !== undefined )
                          {   team_1_ = teams_time.firstElementChild.children[1].textContent;
                              time = teams_time.children[1].firstElementChild.textContent;
                              date_ = teams_time.children[1].children[2].textContent;
                              team_2_ = teams_time.children[2].children[1].textContent;
                          }else
                          {   teams_time = board.getElementsByClassName( "no-shirts-container" )[0];
                              const teams = teams_time.firstElementChild.firstElementChild.textContent.split( "-" );
                              team_1_ = teams[0].trim();
                              team_2_ = teams[1].trim();
                              date_ = teams_time.children[1].children[1].firstChild.nodeValue;
                              time = teams_time.children[1].children[2].textContent;
                          }
                          const date__ = Q_date_M( date_, time );
                          if( team_1_ === team_1
                          && team_2_ === team_2
                          && date__.getTime() === date.getTime()
                          )
                          {   for( const tip of page.getElementsByTagName( "app-match-details-bet-booster-tip-content" ))
                              {   const event_ = tip.getElementsByClassName( "odds-button__label" )[0].textContent;
                                  if( event_ === event )
                                  {   Q_page_Q_odds_I_add( tip, `${ count * amount } zł ${odds}${ id !== null ? ' #'+ S_id : "" }` );
                                      break;
                                  }
                              }
                              for( const group of page.getElementsByTagName( "app-match-details-group" ))
                              {   const type_ = group.getElementsByClassName( "match-details-group__title" )[0].textContent.trim();
                                  if( type_ === type )
                                      for( const button of group.getElementsByTagName( "sds-odds-button" ))
                                      {   let event_ = button.firstElementChild.firstElementChild.textContent.trim();
                                          if( event_ === team_1 )
                                              event_ = "1";
                                          else if( event_ === team_2 )
                                              event_ = "2";
                                          if( event_ === event )
                                          {   Q_page_Q_odds_I_add( button.firstElementChild.firstElementChild, `${ count * amount } zł ${odds}${ id !== null ? ' #'+ S_id : "" }` );
                                              break;
                                          }
                                      }
                              }
                          }
                      }
                      S_data.push([ "sts.pl", team_1, team_2, date.getTime(), id, type, event, odds, count, amount ]);
                      chrome.storage.local.set({ "odds": S_data });
                  }
                  ev.preventDefault();
                  ev.stopPropagation();
              }
          }
      }
    , true
    );
    setTimeout( async () =>
      {   Q_page_I_fill();
      }
    , 11000
    );
    chrome.runtime.onMessage.addListener(( msg, sender, response ) =>
      {   if( msg.msg !== 0 )
              return false;
          S_inited = false;
          setTimeout( async () =>
            {   Q_page_I_fill();
            }
          , 4000
          );
          return false;
      }
    );
});
/******************************************************************************/
