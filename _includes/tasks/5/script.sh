#!/usr/bin/env bash

usage() {
cat << EOF
Usage: printargs.sh [OPTIONS] [ARGUMENTS]
  Print the number of arguments.

OPTIONS:
  -h      print help message
  -m MSG  custom message
  -v      verbose mode: print all the arguments in [ARGUMENTS]

Examples:
  printargs.sh a b c
  printargs.sh -m 'Arguments count: ' a b c
  printargs.sh -v -m 'Total: ' a b c
  printargs.sh -h
EOF
}

while getopts hm:v OPTION
do
    case $OPTION in
        h)
            usage
            exit 1;;
        m)
            MESSAGE=$OPTARG;;
        v)
            VERBOSE=1;;
    esac
done
shift $(($OPTIND-1))

COUNT=0


for ARG in $@; do
    if [[ "$VERBOSE" == "1" ]]; then
        echo "$ARG"
    fi
    
    let COUNT+=1
    
done

if [[ "$MESSAGE" != "" ]]; then
    echo $MESSAGE
fi

echo $COUNT