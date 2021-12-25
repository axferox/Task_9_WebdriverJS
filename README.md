# Requirements:
+ Node version 8 or above
+ Bash shell

# Installation:

1. Update your chrome and gecko drivers for Selenium Grid according to your operating system in this folder: 'test/grid'. 
By default it uses the MacOS drivers

2. Proceed to the Selenium grid folder: 
```
cd test/grid
```
3. Launch the Grid Hub via executing the bash script
```
bash hub_launch.sh
```
4. Then you'll need to launch the Firefox agent node or Chrome agent node via scripts from 'test/grid'
```
bash chrome_node_1.sh
```
OR
```
bash firefox_node_launch.sh
```
5. Then you'll need to unstall the npm 
```
npm install
```
# Launch
```
npm test
```
