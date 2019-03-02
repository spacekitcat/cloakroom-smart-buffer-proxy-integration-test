# cloakroom-smart-buffer-proxy-integration-test

The test project for `cloakroom-smart-buffer-proxy`, currently for manual testing, but a starting point for something that's automatic.  

The main question I'm answering with this project is:

 Can I run
 
 ```bash
 <master*> % yarn install cloakroom-smart-buffer-proxy --save
 ```
 
  **followed by**
  
  ```js
  import { Proxy } from'cloakroom-smart-buffer-proxy';
  ``` 
  
  *or*
  
   ```js
   const { Proxy } = require('cloakroom-smart-buffer-proxy');
   ``` 
   
   all without any hassle?

## Upstream testing
The `cloakroom-smart-buffer` module crosses the 100% test coverage level and it then has a layer beyond that pose scenarios designed to stress test the code. It's totally untested in the context it's designed for (iberian-magpie), so this also lets me think of the module from the point of view of a downstream dependency. I'm a little unsure if the module's beahviour will be as useful as I hope because I don't know how sound my ideas are for a cache optimized implementation of LZ77. This is all an experiment and I'll learn important facts either way.

## Run it
Use `Node.js 10` (well, lower versions *might* work, but you can get on your bike if you think I'm supporting them).

```bash
 % git clone git@github.com:spacekitcat/cloakroom-smart-buffer-proxy-integration-test.git
 % cd cloakroom-smart-buffer-proxy-integration-test
cloakroom-smart-buffer-proxy-integration-test <master> % node index.js
[]
[ 49, 51, 50, 52 ]
1       2       3       4
52
         50
                 51
                         49
 52
         50
                 51
                         49
[ 49, 51, 50, 52, 65, 67, 66, 68 ]
[ 49, 51, 50, 52, 65, 67, 66, 68, 84 ]
[ 51, 50, 52, 65, 67, 66, 68, 84, 100 ]
ticket 1 52
ticket 2         50
ticket 3                 51
ticket 4                         null
[ 65, 67, 66, 68, 84, 100, 116, 117, 118 ]
````
