#!/bin/bash

rm -r -f node_modules echo 'Delete node_modules' &
rm -r -f yarn.lock echo 'Delete yarn.lock' &
rm -r -f package-lock.json echo 'Delete package-lock.json' &
rm -r -f android/build echo 'Delete android/build' &
rm -r -f ios/Podfile.lock echo 'Delete Podfile.lock' &
rm -r -f ios/Pods echo 'Delete Pods' &
wait
yarn
wait
cp -R "`dirname $0`"/../libs/.  "`dirname $0`"/../node_modules
cd ios && arch -x86_64 pod install && cd ..
