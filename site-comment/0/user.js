/******************************************************************************/
document.addEventListener( "DOMContentLoaded", async () =>
  {   const Q_srv_S_root = "https://overcq.ct8.pl/site-comment/";
      let Q_user_S_id = await chrome.storage.local.get( "Q_user_S_id" );
      Q_user_S_id = Q_user_S_id.Q_user_S_id;
      if( Q_user_S_id === undefined )
          Q_user_S_id = "";
      const form = document.getElementsByTagName( "form" )[0];
      form.addEventListener( "submit", async (ev) =>
        {   ev.preventDefault();
            const submit = form.querySelector( "input[type='submit']" );
            submit.setAttribute( "disabled", "" );
            const form_data = new FormData(form);
            form_data.set( "user", Q_user_S_id );
            const response = await fetch( Q_srv_S_root +"user.php",
              { method: "POST"
              , body: form_data
              }
            );
            if( response.ok )
            {   if( Q_user_S_id === "" )
                {   const data = await response.json();
                    chrome.storage.local.set({ Q_user_S_id: data.user, Q_user_S_name: form_data.get( "name" ) });
                }
                chrome.sidePanel.setOptions({ path: "side_panel.html" });
            }else
                submit.removeAttribute( "disabled" );
        }
      );
  }
);
/******************************************************************************/
