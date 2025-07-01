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
