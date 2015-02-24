#!/bin/bash
echo "Post-processing TypeScript code."
# npm install replace -g required!
HOME_DIR=`pwd`
cd $HOME_DIR/src_global
# Compile main file
rm -rf *.d.ts
tsc -d -m commonjs --sourcemap --target ES5 Adaptive.ts
RETVAL=$?
[ $RETVAL -eq 0 ] && echo Success compiling main TS file.
[ $RETVAL -ne 0 ] && exit $?
# Replace malformed JavaScript
replace -s "for \(var p in b\) if \(b.hasOwnProperty\(p\)\) d\[p] = b\[p];" "for (var p in b) { if (b.hasOwnProperty(p)) { d[p] = b[p]; } }" *.js
RETVAL=$?
[ $RETVAL -eq 0 ] && echo Success fixing-up main JS file.
[ $RETVAL -ne 0 ] && exit $?

cd $HOME_DIR/src_units

# Compile unit files
rm -rf *.d.ts
tsc -d -m commonjs --sourcemap --target ES5 *.ts
RETVAL=$?
[ $RETVAL -eq 0 ] && echo Success compiling unit TS files.
[ $RETVAL -ne 0 ] && exit $?
# Replace malformed JavaScript
replace -s "for \(var p in b\) if \(b.hasOwnProperty\(p\)\) d\[p] = b\[p];" "for (var p in b) { if (b.hasOwnProperty(p)) { d[p] = b[p]; } }" *.js
RETVAL=$?
[ $RETVAL -eq 0 ] && echo Success fixing-up unit JS files.
[ $RETVAL -ne 0 ] && exit $?

exit 0