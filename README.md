# Requirements:
+ Node version 8 or above
+ Bash shell
+ Java

# Installation:

1. Update your chrome and gecko drivers for Selenium Grid according to your operating system in this folder: 'test/grid'. 
By default it's used the web drivers for launch on a MacOS

2. Launch the Grid Hub via executing the bash script
```
bash hub_launch.sh
```
2. Then you'll need to launch the Firefox agent node or Chrome agent node via scripts from 'test/grid'
```
bash chrome_node_1.sh
```
OR
```
bash chrome_node_1.sh
```
OR
```
bash firefox_node_1.sh
```
3. Then you'll need to install the npm 
```
npm install
```
# Launch
```
npm test
```
