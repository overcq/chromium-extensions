#!/usr/bin/perl -w
################################################################################
#   ___   workplace
#  ¦OUX¦  ‘unix’ ‘shell’ environment
#  ¦/C+¦  compile
#   ---   ‟chromium” extension
#         messages preparing
# ©overcq                on ‟Gentoo Linux 13.0” “x86_64”              2015‒1‒8 #
################################################################################
use warnings;
use strict;
use utf8;
#===============================================================================
my %global = ();
for( my $i = 0; $i < @ARGV; $i++ )
{   if( not -e $ARGV[ $i ] )
    {   my @a = split /=/, $ARGV[ $i ], 2;
        splice @ARGV, $i--, 1;
        $global{ $a[0] } = $a[1];
        next;
    }
}
my %message = ();
foreach my $Q_file_S_filename ( @ARGV )
{   my $Q_file_S;
    open $Q_file_S, '<', $Q_file_S_filename or die $!;
    local $/;
    my $cnt = <$Q_file_S>;
    close $Q_file_S;
    $cnt =~ s{([0-9]+)%`([^`]*)`([^`]*)`(?:\s+(\)))?}
    {   $message{ $1 } = $2;
        'chrome.i18n.getMessage( "'. $1 .'"'. ( $3 ne '' ? ', '. $3 : '' ) .' )'. ( defined( $4 ) ? $4 : '' );
    }eg;
    $cnt =~ s{```([^`]*)```}
    {   my $ret = '';
        $ret = $global{ $1 } if exists $global{ $1 };
        '"'. $ret .'"';
    }eg;
    if( $global{ 'extension_sh_lib_uid' } )
    {   my $Q_file_T_0 = $Q_file_S_filename =~ /(?:^|\/)0\.js$/;
        my $Q_file_T_cs = $Q_file_S_filename =~ /(?:^|\.)cs\.js$/;
        my $Q_cnt_T_conf_X = ( $cnt =~ /^function Q_conf_X\(.*?^}/ms or $cnt =~ /^function E_conf_Q_form_P_conv\(.*?^}/ms );
        my $Q_cnt_T_msg_0 = $cnt =~ /\bH_ocq_E_sh_lib_Q_init_R_session_name\b/;
        my @b = ();
        my $last = '';
        foreach( sort( $cnt =~ m{\b(?:[A-Z]_\w+)?C_\w+\b}g )) #unique
        {   if( $_ ne $last )
            {   push @b, $_;
                $last = $_;
            }
        }
        $last = '';
        $Q_cnt_T_conf_X = 0 unless @b;
        my @a_ = ();
        @a_ = ( @a_, 'H_ocq_E_sh_lib_Q_init_Q_conf_I_listener_0', 'H_ocq_Q_object_R_encode_undefined' ) if @b;
        @a_ = ( @a_, 'H_ocq_E_sh_lib_Q_conf_I_msg' ) if $Q_file_T_0 and ( @b or $Q_cnt_T_msg_0 );
        @a_ = ( @a_, 'H_ocq_E_sh_lib_Q_init_Q_conf_I_listener_1' ) if $Q_cnt_T_conf_X;
        @a_ = ( @a_, 'H_ocq_E_html_M' );
        @a_ = ( @a_, $cnt =~ m{\bH_ocq_[A-Z]_\w+\b}g );
        @a_ = ( @a_, 'H_ocq_E_sh_lib_Q_init_W_wait' ) if @a_;
        my @a = ();
        foreach( sort @a_ ) #unique
        {   if( $_ ne $last )
            {   push @a, $_;
                $last = $_;
            }
        }
        undef @a_;
        undef $last;
        my $Q_cnt_S_wait_instance = -1;
        my $s = '';
        if( @a ) #jeśli ”@b”, to ”@a” napewno jest.
        {   if( $Q_file_T_0
            and @b
            ){  $s .= $& if $cnt =~ s`^var E_conf_S_defaults\s*=.*?^};\n?``ms;
                $s .= $& if $cnt =~ s`^function E_conf_Q_storage_T\(.*?^}\n?``ms;
                $s .= $& if $cnt =~ s`^function E_conf_Q_storage_R_conv\(.*?^}\n?``ms;
            }
            $cnt =~ s{^((?:document\.addEventListener\s*\(\s*"DOMContentLoaded|window\.addEventListener\s*\(\s*"(load))"\s*,\s*function\s*\(\s*\)\s*\{\s*)(.*?)(\s*\}\s*^\))}{
                $Q_cnt_S_wait_instance++;
                my $before = $1;
                my $after = $4;
                my $cnt = $3;
                $cnt =~ s`\s*\binit_end\s*(?:;|$)``gm unless $Q_cnt_T_conf_X;
                my $async_pre = '';
                my $async_i = 0;
                my @async_cnt = map { '"'. $Q_cnt_S_wait_instance .'.'. $async_i++ .'"' } $cnt =~ /\binit_end\s*(?:;|$)/gm;
                $cnt =~ s`\binit_end\s*(;|$)` 'delete E_sh_lib_Q_init_S_interval[ "'. $Q_cnt_S_wait_instance .'.'. --$async_i .'" ]'. $1 `egm;
                $cnt =~ s`^`      `gm;
                $cnt =~ s`^      ``;
                $before .'H_ocq_E_sh_lib_Q_init_M_wait( "'. $Q_cnt_S_wait_instance .'", function(
        ){  if( E_sh_lib_Q_init_S_done === undefined )
                return;
            H_ocq_E_sh_lib_Q_init_W_wait( "'. $Q_cnt_S_wait_instance .'" );
            '. ( @async_cnt ? 'E_sh_lib_Q_init_S_interval[ '. join( ' ] = E_sh_lib_Q_init_S_interval[ ', @async_cnt ) .' ] = -1;
            ' : '' ) . ( $Q_file_T_0 || $Q_cnt_S_wait_instance ? '' : 'H_ocq_E_html_M();
            delete window[ "H_ocq_E_html_M" ];
            ' ) . $cnt .'
        }
      );'. $after;
            }egms;
            $s .= 'var E_sh_lib_Q_init_S_done, E_sh_lib_Q_init_S_interval = {};
';
            $s .= 'var '. join( ', ', @b ) .';
' if @b;
            $s .= 'function H_ocq_E_sh_lib_Q_init_M_wait( i
, f
){  E_sh_lib_Q_init_S_interval[i] = window.setInterval( f, 1 );
}
';
            $s .= 'chrome.runtime.sendMessage( "'. $global{ 'extension_sh_lib_uid' } .'"
, [ '. join( ', ', map { '"' . $_ . '"' } @a ) .' ]
, function( s
  ){  eval(s);
';
            $s .=  '      H_ocq_E_sh_lib_Q_init_Q_conf_I_listener_0();
      var a = [ '. join( ', ', map { '"'. $_ .'"' } @b ) .' ];
      chrome.storage.sync.get( a
      , (function( a
        ){  return function( o
            ){  for( var i = 0; i < a.length; i++ )
                    if( o[ a[i] ] === undefined )
                        o[ a[i] ] = undefined;
                ' if @b;
            $s .= $Q_file_T_0 ? 'eval( H_ocq_E_sh_lib_Q_conf_I_msg_R_conv_0( H_ocq_Q_object_R_encode_undefined(o) ));
' : 'chrome.runtime.sendMessage(
                  [ 1
                  , H_ocq_Q_object_R_encode_undefined(o)
                  ]
                , function( s
                  ){  eval(s);
' if @b;
            unless( $Q_file_T_cs )
            {   $s .= '          ' if @b;
                $s .= '      ' if @b and not $Q_file_T_0;
                $s .= '      E_sh_lib_Q_init_S_done = null;
';
            }
            $s .= '                  }
                );
' if @b and not $Q_file_T_0;
            $s .= '            };
        })(a)
      );
' if @b;
            if( $Q_file_T_0
            and ( @b or $Q_cnt_T_msg_0 )
            ){  if( $cnt =~ s`^chrome.runtime.onMessage.addListener\(.*?^\)\n?``ms )
                {   $_ = $&;
                    s`^`        `gm;
                    $s .= $_;
                }else
                {   $s .= '      chrome.runtime.onMessage.addListener(
        function( msg
        , sender
        , response
        ){  H_ocq_E_sh_lib_Q_conf_I_msg( msg, response );
            return false;
        }
      );
';
                }
            }
            $s .= '  }
);
';
            $cnt = $s . $cnt;
            $cnt .= "\n" if $cnt !~ /\n$/;
            $Q_cnt_S_wait_instance++;
            $cnt .= 'window.addEventListener( "load"
, function(
  ){  H_ocq_E_sh_lib_Q_init_M_wait( "'. $Q_cnt_S_wait_instance .'"
      , function(
        ){  if( E_sh_lib_Q_init_S_done === undefined )
                return;
            for( var k in E_sh_lib_Q_init_S_interval )
                if( k !== "'. $Q_cnt_S_wait_instance .'" )
                    return;
            H_ocq_E_sh_lib_Q_init_W_wait( "'. $Q_cnt_S_wait_instance .'" );
            H_ocq_E_sh_lib_Q_init_Q_conf_I_listener_1([ '. join( ', ', map { '"'. $_ .'"' } @b ) .' ]);
        }
      );
  }
);
' if $Q_cnt_T_conf_X;
        }else
        {   $cnt =~ s{^((?:document\.addEventListener\s*\(\s*"DOMContentLoaded|window\.addEventListener\s*\(\s*"(load))"\s*,\s*function\s*\(\s*\)\s*\{\s*)(.*?)(\s*\}\s*^\))}{
                my $before = $1;
                my $after = $4;
                my $cnt = $3;
                $cnt =~ s`\s*\binit_end\s*(?:;|$)``gm;
                $before. $cnt . $after;
            }egms;
        }
    }
    $Q_file_S_filename =~ s`^0/`1/`;
    open $Q_file_S, '>', $Q_file_S_filename or die $!;
    print $Q_file_S $cnt;
    close $Q_file_S;
}
my $out = '{';
if( keys %message )
{   foreach( sort { $a <=> $b } keys %message )
    {   $out .= '"'. $_ .'": { "message": "'. $message{ $_ } .'"';
        if( $message{ $_ } =~ /\$[0-9]+\$/ )
        {   $out .= "\n".'  ,"placeholders":'."\n    {";
            foreach( sort { $a <=> $b } ( $message{ $_ } =~ /\$([0-9]+)\$/g ))
            {   $out .= '"'. $_ .'": { "content": "$'. $_ ."\" }\n    ,";
            }
            $out =~ s`.{5}$``s;
            $out .= "    }\n  }";
        }else
        {   $out .= ' }';
        }
        $out .= "\n,";
    }
    $out =~ s`.$``s;
}
$out .= "}\n";
print $out;
################################################################################
