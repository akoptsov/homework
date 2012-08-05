#!/usr/bin/env perl

use strict;
use Getopt::Long;
use Pod::Usage;

my $help;
my $arg;
my $message = '';
my $verbose = '';

@ARGV and GetOptions(
    "h"   => \$help,
    "m:s" => \$message,
    "v"   => \$verbose
) or pod2usage(1);
pod2usage(-verbose => 2, -exitval => 2) if $help;

my $count = 0;

foreach $arg (@ARGV) {
    if($verbose ne ''){
        print($arg."\n");
    }
    
    $count++;
}

if($message ne "") {
    print($message . "\n");
}

print($count . "\n");

__END__

=head1 NAME

    printargs.pl - Print the number of arguments.

=head1 SYNOPSIS

    printargs.pl [options] [arguments]

=head1 OPTIONS

    -h      Show help message.

    -m MSG  Specify a custom message.

    -v      Verbose mode: print all the arguments in [arguments]

=head1 EXAMPLE

    printargs.pl a b c

    printargs.pl -m 'Arguments count: ' a b c

    printargs.pl -v -m 'Total: ' a b c

    printargs.pl -h
