#!/usr/bin/env python

import argparse

parser = argparse.ArgumentParser(description='Print the number of arguments.')
parser.add_argument('arguments', metavar='ARG', type=str, nargs='*', help='some arguments')
parser.add_argument('-m', dest='message', default='', help='custom message')
parser.add_argument('-v', action='store_true', default=False, help='verbose mode: print all the arguments in [ARG]')

args = parser.parse_args()

count = 0

for a in args.arguments:
    if args.v:
        print(a)
    count += 1

if args.message != '':
    print(args.message)

print(count)
