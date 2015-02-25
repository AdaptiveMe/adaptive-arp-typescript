#!/bin/bash

HOME_DIR=`pwd`
REPO_PATH=$HOME_DIR/tmp
REPO_API=https://github.com/AdaptiveMe/adaptive-arp-api.git

mkdir -p $REPO_PATH
cd $REPO_PATH
git clone --depth 1 $REPO_API
RETVAL=$?
[ $RETVAL -eq 0 ] && echo Cloned API Specifications.
[ $RETVAL -ne 0 ] && exit $?

cd adaptive-arp-api
API_VERSION=`git describe --abbrev=0`

echo $API_VERSION


exit 0