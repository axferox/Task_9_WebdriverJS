# Requirements:
+ Node version 8 or above
+ Bash shell
+ Java

# Installation:

1. Update your chrome and gecko drivers for Selenium Grid according to your operating system in this folder: 'test/grid/selenium'. 
By default it's used the web drivers for launch on a MacOS

2. Launch the Grid Hub via executing the bash script
```
bash hubLaunch.sh
```
2. Then you'll need to launch the Firefox agent node or Chrome agent node via scripts from the project root folder
If you would like to run tests in parallel - launch:
Mac:
```
bash chromeNodeMac_1.sh
```
Windows:
```
bash chromeNodeWin_1.sh
```
OR if you would like to run tests sequentally - launch:
Mac:
```
bash chromeNodeMac_2.sh
```
Windows:
```
bash chromeNodeWin_2.sh
```
3. Then you'll need to install the npm 
```
npm install
```
# Launch
```
npm test
```
