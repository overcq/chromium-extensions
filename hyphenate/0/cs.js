/*******************************************************************************
*   ___   publicplace
*  ¦OUX¦  ‟Javascript” implementation
*  ¦Inc¦  ‟chromium” extension
*   ---   hyphenate
*         content scripts
* ©overcq                on ‟Gentoo Linux 13.0” “x86_64”              2015‒3‒2 *
*******************************************************************************/
(function(
){  chrome.runtime.sendMessage(
      [ 10 ]
    , function( option
      ){  var Q_hyphenate_C_min_length_before_hyphen = option[0];
          var Q_hyphenate_C_min_length_after_hyphen = option[1];
          var I_sub_to_0 = function(
            a
          , b
          ){  var r = a - b;
              if( r < 0 )
                  r = 0;
              return r;
          }
          var Q_document_I_hyphenate = function(
          ){  var re_b = "[^_0-9A-ZĄĆĘŁŃÓŚŹŻa-ząćęłńóśźż]";
              var re_prev = new RegExp( "\\s+((?:się|cię?|go|ich|im|j[ąe]|jej|m[iu])"+ re_b +")", "g" );
              var re_next = new RegExp( "("+ re_b +"(?:al(?:bo|e)|ani|bądź|beze?|bo|by|czy(?:li)?|dla|do|iż?|jak|lecz|lub|nie|oraz|s?pode?|przede?|przez|przy|sprzed|we?|z[ae]?|(?:a|co|gdy|że)(?:by)?|(?:na|o)(?:de?)?|ja|ty|on[aoie]?|(?:tam)?(?:ci|t[aąeęo]|tego|tej|temu|ten|tych|tymi?)))\\s+", "g" );
              var re_l = "[\xadA-ZĄĆĘŁŃÓŚŹŻa-ząćęłńóśźż]";
              var res_hyphen =
              [ new RegExp( "("+ re_l +"{"+ I_sub_to_0( Q_hyphenate_C_min_length_before_hyphen, 3 ) +"}[AĄEĘIOÓUYaąeęioóuy][\xad]?(?:[Cc][HZhz]|[Dd][ZŹŻzźż]|[RSrs][Zz]))((?:[Cc][HZhz]|[Dd][ZŹŻzźż]|[RSrs][Zz])"+ re_l +"{"+ I_sub_to_0( Q_hyphenate_C_min_length_after_hyphen, 2 ) +"})", "g" )
              , new RegExp( "("+ re_l +"{"+ I_sub_to_0( Q_hyphenate_C_min_length_before_hyphen, 1 ) +"}[AĄEĘIOÓUYaąeęioóuy])((?:[Cc][HZhz]|[Dd][ZŹŻzźż]|[RSrs][Zz])"+ re_l +"{"+ I_sub_to_0( Q_hyphenate_C_min_length_after_hyphen, 1 ) +"})", "g" )
              , new RegExp( "("+ re_l +"{"+ I_sub_to_0( Q_hyphenate_C_min_length_before_hyphen, 3 ) +"}[AĄEĘIOÓUYaąeęioóuy][\xad]?(?:[Cc][HZhz]|[Dd][ZŹŻzźż]|[RSrs][Zz]))([BCĆDFGJKLŁMNŃPQRSŚTVWXZŹŻbcćdfgjklłmnńpqrsśtvwxzźż]"+ re_l +"{"+ I_sub_to_0( Q_hyphenate_C_min_length_after_hyphen, 1 ) +"})", "g" )
              , new RegExp( "("+ re_l +"{"+ I_sub_to_0( Q_hyphenate_C_min_length_before_hyphen, 2 ) +"}[AĄEĘIOÓUYaąeęioóuy][\xad]?[BCĆDFGHIJLŁMNŃPQRSŚWXZŻbcćdfghjlłmnńpqrsśwxzż])((?:[Cc][HZhz]|[Dd][ZŹŻzźż]|[RSrs][Zz])"+ re_l +"{"+ I_sub_to_0( Q_hyphenate_C_min_length_after_hyphen, 2 ) +"})", "g" )
              , new RegExp( "("+ re_l +"{"+ I_sub_to_0( Q_hyphenate_C_min_length_before_hyphen, 2 ) +"}[AĄEĘIOÓUYaąeęioóuy][\xad]?[BĆFGHJKLŁMNŃPQTWXŹŻbćfghjklłmnńpqtwxźż])([BĆFGJKLłMNŃPQŚTVWXZŹŻbćfgjklłmnńpqśtvwxzźż]"+ re_l +"{"+ I_sub_to_0( Q_hyphenate_C_min_length_after_hyphen, 1 ) +"})", "g" )
              , new RegExp( "("+ re_l +"{"+ I_sub_to_0( Q_hyphenate_C_min_length_before_hyphen, 1 ) +"}[AĄEĘIOÓUYaąeęioóuy])([Cc][\xad]?[BCĆDFGJKLŁMNŃPQRSŚTVWXŹŻbcćdfgjklłmnńpqrsśtvwxźż]"+ re_l +"{"+ I_sub_to_0( Q_hyphenate_C_min_length_after_hyphen, 2 ) +"})", "g" )
              , new RegExp( "("+ re_l +"{"+ I_sub_to_0( Q_hyphenate_C_min_length_before_hyphen, 2 ) +"}[AĄEĘIOÓUYaąeęioóuy][\xad]?[Cc])([BCĆDFGKLŁMNŃPQRSŚTVWXŹŻbcćdfgklłmnńpqrsśtvwxźż]"+ re_l +"{"+ I_sub_to_0( Q_hyphenate_C_min_length_after_hyphen, 1 ) +"})", "g" )
              , new RegExp( "("+ re_l +"{"+ I_sub_to_0( Q_hyphenate_C_min_length_before_hyphen, 1 ) +"}[AĄEĘIOÓUYaąeęioóuy])([Dd][\xad]?[BCĆDFGHJKLŁMNŃPQRSŚTVWXbcćdfghjklłmnńpqrsśtvwx]"+ re_l +"{"+ I_sub_to_0( Q_hyphenate_C_min_length_after_hyphen, 2 ) +"})", "g" )
              , new RegExp( "("+ re_l +"{"+ I_sub_to_0( Q_hyphenate_C_min_length_before_hyphen, 2 ) +"}[AĄEĘIOÓUYaąeęioóuy][\xad]?[Dd])([BCĆDFGHJKLŁMNŃPQRSŚTVWXbcćdfghjklłmnńpqrsśtvwx]"+ re_l +"{"+ I_sub_to_0( Q_hyphenate_C_min_length_after_hyphen, 1 ) +"})", "g" )
              , new RegExp( "("+ re_l +"{"+ I_sub_to_0( Q_hyphenate_C_min_length_before_hyphen, 1 ) +"}[AĄEĘIOÓUYaąeęioóuy])([Rr][\xad]?[BCĆDFGHJKLŁNŃPQRSŚVXŹŻbcćdfghjklłnńpqrsśvxźż]"+ re_l +"{"+ I_sub_to_0( Q_hyphenate_C_min_length_after_hyphen, 2 ) +"})", "g" )
              , new RegExp( "("+ re_l +"{"+ I_sub_to_0( Q_hyphenate_C_min_length_before_hyphen, 2 ) +"}[AĄEĘIOÓUYaąeęioóuy][\xad]?[Rr])([BCĆDFGHJKLŁMNŃPQRSŚTVWXŹŻbcćdfghjklłmnńpqrsśtvwxźż]"+ re_l +"{"+ I_sub_to_0( Q_hyphenate_C_min_length_after_hyphen, 1 ) +"})", "g" )
              , new RegExp( "("+ re_l +"{"+ I_sub_to_0( Q_hyphenate_C_min_length_before_hyphen, 1 ) +"}[AĄEĘIOÓUYaąeęioóuy])([Ss][\xad]?[BCĆDFGHJKLŁMNŃPQRSŚVWXŹŻbcćdfghjklłmnńpqrsśvwxźż]"+ re_l +"{"+ I_sub_to_0( Q_hyphenate_C_min_length_after_hyphen, 2 ) +"})", "g" )
              , new RegExp( "("+ re_l +"{"+ I_sub_to_0( Q_hyphenate_C_min_length_before_hyphen, 2 ) +"}[AĄEĘIOÓUYaąeęioóuy][\xad]?[Ss])([BCĆDFGHKLŁMNŃPQRSŚTVWXŹŻbcćdfghklłmnńpqrsśtvwxźż]"+ re_l +"{"+ I_sub_to_0( Q_hyphenate_C_min_length_after_hyphen, 1 ) +"})", "g" )
              , new RegExp( "("+ re_l +"{"+ I_sub_to_0( Q_hyphenate_C_min_length_before_hyphen, 1 ) +"}[AĄEĘIOÓUYaąeęioóuy])([Śś][\xad]?[BCDFGJKLMPQRSTVWXbcdfgjklmpqrstvwx]"+ re_l +"{"+ I_sub_to_0( Q_hyphenate_C_min_length_after_hyphen, 2 ) +"})", "g" )
              , new RegExp( "("+ re_l +"{"+ I_sub_to_0( Q_hyphenate_C_min_length_before_hyphen, 2 ) +"}[AĄEĘIOÓUYaąeęioóuy][\xad]?[Śś])([BCĆDFGHKLŁMNŃPQRSŚTVWXŹŻbcćdfghklłmnńpqrsśtvwxźż]"+ re_l +"{"+ I_sub_to_0( Q_hyphenate_C_min_length_after_hyphen, 1 ) +"})", "g" )
              , new RegExp( "("+ re_l +"{"+ I_sub_to_0( Q_hyphenate_C_min_length_before_hyphen, 1 ) +"}[AĄEĘIOÓUYaąeęioóuy])([BĆFPQTVWXbćfpqtvwx]"+ re_l +"{"+ I_sub_to_0( Q_hyphenate_C_min_length_after_hyphen, 1 ) +"})", "g" )
              , new RegExp( "("+ re_l +"{"+ I_sub_to_0( Q_hyphenate_C_min_length_before_hyphen, 1 ) +"}[AĄEĘIOÓUYaąeęioóuy])([Zz]"+ re_l +"{"+ I_sub_to_0( Q_hyphenate_C_min_length_after_hyphen, 0 ) +"})", "g" )
              , new RegExp( "("+ re_l +"{"+ I_sub_to_0( Q_hyphenate_C_min_length_before_hyphen, 1 ) +"}[AĄEĘIOÓUYaąeęioóuy])([Źź]"+ re_l +"{"+ I_sub_to_0( Q_hyphenate_C_min_length_after_hyphen, -2 ) +"})", "g" )
              , new RegExp( "("+ re_l +"{"+ I_sub_to_0( Q_hyphenate_C_min_length_before_hyphen, 2 ) +"}[AĄEĘIOÓUYaąeęioóuy][\xad]?[JKLNŃjklnń])([CcSs]"+ re_l +"{"+ I_sub_to_0( Q_hyphenate_C_min_length_after_hyphen, 1 ) +"})", "g" )
              , new RegExp( "("+ re_l +"{"+ I_sub_to_0( Q_hyphenate_C_min_length_before_hyphen, 1 ) +"}[AĄEĘIOÓUYaąeęioóuy])((?:[Cc][HZhz]|[Dd][ZŹŻzźż]|[RSrs][Zz]|[CDGKŁMNRScdgkłmnrs])[AĄEĘIOÓUYaąeęioóuy]"+ re_l +"{"+ I_sub_to_0( Q_hyphenate_C_min_length_after_hyphen, 2 ) +"})", "g" )
              , new RegExp( "("+ re_l +"{"+ I_sub_to_0( Q_hyphenate_C_min_length_before_hyphen, 1 ) +"}[AĄEĘOÓUYaąeęoóuy])([AĄEĘIOÓUYaąeęioóuy]"+ re_l +"{"+ I_sub_to_0( Q_hyphenate_C_min_length_after_hyphen, 1 ) +"})", "g" )
              ];
              var ea = [];
              ea.push( document.body );
              var e;
              while( e = ea.pop() )
              {   var es_child = e.childNodes;
                  for( var es_child_i = 0; es_child_i !== es_child.length; es_child_i++ )
                  {   var e = es_child[ es_child_i ];
                      switch( e.nodeType )
                      { case 1:
                              if( e.nodeName !== "PRE"
                              && e.nodeName !== "SCRIPT"
                              && e.nodeName !== "STYLE"
                              && e.nodeName !== "TEXTAREA"
                              )
                                  ea.push(e);
                              break;
                        case 3:
                              var s = e.nodeValue;
                              var s_;
                              do
                              {   s_ = s;
                                  s = s_.replace( re_prev, "\xa0$1" );
                              }while( s !== s_ );
                              do
                              {   s_ = s;
                                  s = s_.replace( re_next, "$1\xa0" );
                              }while( s !== s_ );
                              var words = s.split( /[ \n\t]+/ );
                              for( var word_i = 0; word_i !== words.length; word_i++ )
                              {   var s;
                                  var a = words[ word_i ].split( "\xa0" );
                                  var w_i;
                                  if( a.length !== 1 )
                                  {   s = "";
                                      for( var i = 0; i !== a.length; i++ )
                                          if( a[i].length > s.length )
                                          {   s = a[i];
                                              w_i = i;
                                          }
                                  }else
                                      s = words[ word_i ];
                                  for( var re_i = 0; re_i !== res_hyphen.length; re_i++ )
                                  {   do
                                      {   s_ = s;
                                          s = s_.replace( res_hyphen[ re_i ], "$1­$2" );
                                      }while( s !== s_ );
                                  }
                                  if( a.length !== 1 )
                                  {   var a_ = a.slice( 0, w_i );
                                      a_.push(s);
                                      a_ = a_.concat( a.slice( w_i + 1, a.length ))
                                      words[ word_i ] = a_.join( "\xa0" );
                                  }else
                                      words[ word_i ] = s;
                              }
                              e.nodeValue = words.join( " " );
                              break;
                        default:
                              continue;
                      }
                  }
              }
          }
          Q_document_I_hyphenate();
      }
    );
})();
/******************************************************************************/
