# node-red-nodes
FIRST must

installation
$ npm install --save wiegand

wiegand
Decoder for wiegand readers on GPIO. Currently works on linux only, but can be tested on other platforms.

requirements
Linux with GPIO
node-gyp
installation
$ npm install --save wiegand
running
Make sure you export your GPIO pins according to the epoll docs:

#!/bin/sh
echo 17 > /sys/class/gpio/export
echo in > /sys/class/gpio/gpio17/direction
echo both > /sys/class/gpio/gpio17/edge
