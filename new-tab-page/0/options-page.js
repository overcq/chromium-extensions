/*******************************************************************************
*   ___   publicplace
*  ¦OUX¦  ‟Javascript” implementation
*  ¦/C+¦  ‟chromium” extension
*   ---   new tab page
*         options page scripts
* ©overcq                on ‟Gentoo Linux 13.0” “x86_64”              2015‒3‒2 *
*******************************************************************************/
function E_conf_Q_form_P_conv( k
, v
){  return v;
}
function E_conf_Q_form_R_conv( k
, v
){  return v;
}
//------------------------------------------------------------------------------
document.addEventListener( "DOMContentLoaded"
, function(
  ){  document.title = 20%`extension ‟new tab page”➪options page``;
      const form = H_ocq_E_conf_Q_form_M();
      let group = H_ocq_E_conf_Q_form_I_add_group( form, 21%`menu panel`` );
      H_ocq_E_conf_Q_form_I_add( group, "checkbox", "Q_menu_C_internal_links", 22%`hide internal pages shortcuts (bottom ones)`` );
      H_ocq_E_conf_Q_form_I_add( group, "checkbox", "Q_menu_C_quick_help", 23%`hide quick help text (bottom)`` );
      H_ocq_E_conf_Q_form_I_add( group, "checkbox", "Q_menu_C_wheel_rev_dir", 24%`alternate scroll direction`` );
      H_ocq_E_conf_Q_form_I_add( group, "checkbox", "Q_menu_C_alt_side", 32%`alternate side`` );
      group = H_ocq_E_conf_Q_form_I_add_group( form, 25%`theme integration`` );
      H_ocq_E_conf_Q_form_I_add_text( group, 26%`filename separator: “/” or “\\”.`` );
      H_ocq_E_conf_Q_form_I_add( group, "text", "Q_bg_C_root_path", 27%`filesystem path to root directory of user profiles and “Default” one (ex. “/home/[user]/.config/chromium” “C:\\Documents and Settings\\[user]\\[local settings]\\[application data]\\Google\\Chrome\\[user data]”)$$`` );
      H_ocq_E_conf_Q_form_I_add( group, "text", "Q_bg_C_rel_path", 28%`relative path to the new tab page background image (ex. “images/background.png”, “bg.png”)$$`` );
      H_ocq_E_conf_Q_form_I_add( group, "checkbox", "Q_bg_C_repeat", 30%`repeated if has space`` );
      group = H_ocq_E_conf_Q_form_I_add_group( form, 29%`configuration settings`` );
      H_ocq_E_conf_Q_form_I_add_reset( group
      , function(
        ){  chrome.storage.sync.clear();
        }
      );
      H_ocq_E_conf_Q_form_P(form);
  }
);
/******************************************************************************/
