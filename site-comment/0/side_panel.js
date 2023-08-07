/******************************************************************************/
function Q_url_T( s
){  return s.match( /^https?:\/\// );
}
function Q_url_I_reduce( s
){  let i = s.indexOf( "?" );
    if( i !== -1 )
        s = s.substring( 0, i );
    else
    {   i = s.indexOf( "#" );
        if( i !== -1 )
            s = s.substring( 0, i );
    }
    s = s.substring( s.indexOf( "//" ) + 2 );
    if( s.match( /\/(?:index\.[a-z]{3,4}[0-9]?)?$/ ) !== null )
        s = s.substring( 0, s.lastIndexOf( "/" ));
    return s;
}
//==============================================================================
document.addEventListener( "DOMContentLoaded", async () =>
  {   const Q_srv_S_root = "https://overcq.ct8.pl/site-comment/";
      const v = await chrome.storage.local.get([ "Q_user_S_id", "Q_user_S_name" ]);
      let Q_user_S_id = v.Q_user_S_id;
      if( Q_user_S_id === undefined )
          Q_user_S_id = "";
      const Q_user_S_name = v.Q_user_S_name;
      const new_comment = document.getElementById( "new_comment" );
      const user = new_comment.getElementsByTagName( "BUTTON" )[0];
      user.addEventListener( "click", (ev) =>
        {   chrome.sidePanel.setOptions({ path: "user.html" });
        }
      );
      const url_title = document.getElementsByTagName( "H1" )[0];
      const form = new_comment.getElementsByTagName( "form" )[0];
      const comments = document.getElementById( "comments" );
      const comments_list = comments.getElementsByTagName( "DIV" )[0];
      form.addEventListener( "submit", async (ev) =>
        {   ev.preventDefault();
            if( Q_user_S_id === "" )
                return;
            const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
            if( !Q_url_T(tab.url) )
                return;
            const url = Q_url_I_reduce(tab.url);
            if( url !== url_title.textContent )
                return;
            const form_data = new FormData(form);
            form_data.set( "url", url );
            form_data.set( "user", Q_user_S_id );
            const submit = form.querySelector( "input[type='submit']" );
            submit.setAttribute( "disabled", "" );
            const response = await fetch( Q_srv_S_root +"add.php",
              { method: "POST"
              , body: form_data
              }
            );
            submit.removeAttribute( "disabled" );
            if( !response.ok )
                return;
            const author = document.createElement( "h3" );
            author.append( Q_user_S_name );
            const text = document.createElement( "P" );
            text.append( form_data.get( "comment" ));
            const div = document.createElement( "DIV" );
            div.append(author);
            div.append(text);
            if( !comments_list.getElementsByTagName( "DIV" ).length )
                comments_list.innerHTML = "";
            comments_list.prepend(div);
        }
      );
      const reload = comments.getElementsByTagName( "BUTTON" )[0];
      reload.addEventListener( "click", async (ev) =>
        {   const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
            if( !Q_url_T(tab.url) )
                return;
            const url = Q_url_I_reduce(tab.url);
            comments_list.textContent = "Loading…"
            const response = await fetch( Q_srv_S_root +"get.php?url="+ encodeURIComponent(url)
            , { method: "GET"
              }
            );
            if( !response.ok )
            {   url_title.textContent = "No site";
                comments_list.textContent = "Loading error."
                return;
            }
            url_title.textContent = url;
            const data = await response.json();
            if( data.length )
            {   comments_list.innerHTML = "";
                for( const comment of data )
                {   const author = document.createElement( "h3" );
                    author.append(comment.name);
                    const time = document.createElement( "P" );
                    time.class = "time";
                    time.append(comment.time);
                    const text = document.createElement( "P" );
                    text.append(comment.text);
                    const div = document.createElement( "DIV" );
                    div.append(author);
                    div.append(time);
                    div.append(text);
                    comments_list.append(div);
                }
            }else
                comments_list.textContent = "No entries.";
        }
      );
      const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
      if( Q_url_T(tab.url) )
      {   const url = Q_url_I_reduce(tab.url);
          const response = await fetch( Q_srv_S_root +"get.php?url="+ encodeURIComponent(url)
          , { method: "GET"
            }
          );
          if( !response.ok )
          {   comments_list.textContent = "Loading error."
              return;
          }
          url_title.textContent = url;
          const data = await response.json();
          if( data.length )
          {   comments_list.innerHTML = "";
              for( const comment of data )
              {   const author = document.createElement( "h3" );
                  author.append(comment.author);
                  const time = document.createElement( "P" );
                  time.className = "time";
                  time.append(comment.time);
                  const text = document.createElement( "P" );
                  text.append(comment.text);
                  const div = document.createElement( "DIV" );
                  div.append(author);
                  div.append(time);
                  div.append(text);
                  comments_list.append(div);
              }
          }else
              comments_list.textContent = "No entries.";
      }
  }
);
/******************************************************************************/
