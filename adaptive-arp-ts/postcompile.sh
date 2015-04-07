#!/bin/bash
echo "Removing redundant files."
HOME_DIR=`pwd`

rm -f $HOME_DIR/src_units/*.js
rm -f $HOME_DIR/src_units/*.js.map
rm -f $HOME_DIR/src_units/*.d.ts

exit 0
