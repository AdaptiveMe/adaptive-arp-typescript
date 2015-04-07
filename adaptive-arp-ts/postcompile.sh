#!/bin/bash
echo "Removing redundant files."
HOME_DIR=`pwd`

rm $HOME_DIR/src_units/*.js
rm $HOME_DIR/src_units/*.js.map
rm $HOME_DIR/src_units/*.d.ts

mv $HOME_DIR/Adaptive.js $HOME_DIR/adaptive.js
mv $HOME_DIR/Adaptive.js.map $HOME_DIR/adaptive.js.map
mv $HOME_DIR/Adaptive.d.ts $HOME_DIR/adaptive.d.ts

exit 0
