# rpi-magnetic-sensor
A nodejs project to get a magnetic sensor to work with a Raspberry PI

## Setting up the hardware parts
You'll need:

* A Raspberry PI, I'm using v3 (with OS installed, plus git, daemontools, and node)
* A magnetic sensor (eg [this one from eBay](http://www.ebay.co.uk/itm/White-Door-Window-Contacts-Magnetic-Reed-Switch-Sensor-PK-/331806213523?hash=item4d41310593:g:We4AAOSwr7ZW7Bou))
* GPIO connectors (I've used [female-to-female](http://www.ebay.co.uk/itm/40pcs-Dupont-Cables-FEMALE-TO-FEMALE-Jumper-GPIO-Wire-Ribbon-Breadboard-Arduino-/262202710636?hash=item3d0c7fda6c:g:v~gAAOSwuAVWzUtn))

This is my hardware set up:
![](https://www.dropbox.com/s/ek5rb7t5i4ryoz8/2016-11-13%2013.32.59.jpg?raw=1)

I use PINs 12 (BCM 18) and 14 (Ground) to connect to the sensor (you're able to change this in the code). Here's a handy chart: https://pinout.xyz/

## Setting up the software parts
1. Do everything as *root* (I know, I know)
2. Open `/etc/rc.local` and add `svscan /service &` before `exit 0`
3. Make a folder `/service`
4. `cd` into `/service` and clone the repo, this'll create a folder within called `rpi-magnetic-sensor`
5. `cd` into the repo folder, run `chmod +x run`
6. Copy `config.json.sample` to `config.json` and fill it out*
7. Reboot the PI!

*If you're using Gmail you'll need to enable your account to be logged in via less secure apps, see: http://stackoverflow.com/a/40308643/398939
