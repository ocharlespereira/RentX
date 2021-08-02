#!/bin/bash

rm -r -f node_modules echo 'Delete node_modules' &
wait
npm i
wait
cp -R "`dirname $0`"/../libs/.  "`dirname $0`"/../node_modules 
