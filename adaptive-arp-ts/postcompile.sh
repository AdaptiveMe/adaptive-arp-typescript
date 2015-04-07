#!/bin/bash
echo "Removing redundant files."
HOME_DIR=`pwd`

rm $HOME_DIR/src_units/*.js
rm $HOME_DIR/src_units/*.js.map
rm $HOME_DIR/src_units/*.d.ts

exit 0
