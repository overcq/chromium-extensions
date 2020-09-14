/*******************************************************************************
*   ___   publicplace
*  ¦OUX¦  ‟Javascript” implementation
*  ¦Inc¦  ‟chromium” extension
*   ---   new tab page
*         background scripts
* ©overcq                on ‟Gentoo Linux 13.0” “x86_64”              2015‒3‒2 *
*******************************************************************************/
var E_conf_S_defaults =
{ "Q_menu_C_internal_links": false
, "Q_menu_C_quick_help": false
, "Q_menu_C_wheel_rev_dir": false
, "Q_menu_C_alt_side": false
, "Q_bg_C_root_path": ""
, "Q_bg_C_rel_path": ""
, "Q_bg_C_repeat": false
};
//------------------------------------------------------------------------------
window.addEventListener( "load"
, function(
  ){  chrome.storage.sync.get( //OLET masowe usunięcie starych nazw z początkowych wersji rozszerzenia, a jednocześnie zmiana bazy danych.
        [ "Q_menu_S_builtin_hidden"
        , "Q_menu_S_quick_help_hidden"
        , "Q_menu_I_wheel_S_alt_dir"
        , "Q_path_S_root_dir"
        , "Q_path_S_new_tab_bg"
        ]
      , function( o
        ){  var o_conv =
            { "Q_menu_S_builtin_hidden": "Q_menu_C_internal_links"
            , "Q_menu_S_quick_help_hidden": "Q_menu_C_quick_help"
            , "Q_menu_I_wheel_S_alt_dir": "Q_menu_C_wheel_rev_dir"
            , "Q_path_S_root_dir": "Q_bg_C_root_path"
            , "Q_path_S_new_tab_bg": "Q_bg_C_rel_path"
            };
            if( !H_ocq_Q_object_Z_hash_table_T_empty(o) )
            {   for( var k in o_conv )
                {   chrome.storage.sync.remove(k);
                    if( o[k] !== undefined )
                    {   o[ o_conv[k] ] = o[k];
                        delete o[k];
                    }
                    window[ o_conv[k] ] = E_conf_Q_storage_R_conv( k, o[k] );
                }
                chrome.storage.sync.set(o);
            }else
            {   var b = false;
                for( var k in o_conv )
                    if( window[ o_conv[k] ] !== undefined )
                    {   b = true;
                        break;
                    }
                if( !b )
                    chrome.storage.local.get(
                      [ "Q_menu_S_builtin_hidden"
                      , "Q_menu_S_quick_help_hidden"
                      , "Q_menu_I_wheel_S_alt_dir"
                      , "Q_path_S_root_dir"
                      , "Q_path_S_new_tab_bg"
                      ]
                    , function( o
                      ){  chrome.storage.local.clear();
                          if( !H_ocq_Q_object_Z_hash_table_T_empty(o) )
                          {   var o_conv =
                              { "Q_menu_S_builtin_hidden": "Q_menu_C_internal_links"
                              , "Q_menu_S_quick_help_hidden": "Q_menu_C_quick_help"
                              , "Q_menu_I_wheel_S_alt_dir": "Q_menu_C_wheel_rev_dir"
                              , "Q_path_S_root_dir": "Q_bg_C_root_path"
                              , "Q_path_S_new_tab_bg": "Q_bg_C_rel_path"
                              };
                              for( var k in o_conv )
                              {   if( o[k] !== undefined )
                                  {   o[ o_conv[k] ] = o[k];
                                      window[ o_conv[k] ] = o[k];
                                      delete o[k];
                                  }
                                  window[ o_conv[k] ] = E_conf_Q_storage_R_conv( k, o[k] );
                              }
                              chrome.storage.sync.set(o);
                          }
                      }
                    );
            }
            init_end;
        }
      );
  }
);
/******************************************************************************/
