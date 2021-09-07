This project has served to introduce me to the functionality of Redux. In this way, I was able to get to grips with the subject matter well and intuitively understand the whole picture.

# If you are interested to have a look at the project, I would suggest the following steps:

First start the back-end:
 - For this you have to go to the path where the project was saved, then go to the file "bugs_backend" and after that you should run the command: "npm start".

Then you can open the "pure-redux" file, here also start the whole thing with the command: "npm start" .

The plain frontend is only a graphical representation of the bugs that are not fixed by the app, which is why then after clicking on the respective button, the list shrinks.
To do this, you must also change to the folder "quick-bugs-frontend" and then execute the already known command: "npm start".

#FAQ
How can I refill the bugs list in the frontend?
 -> Either you restart the API server directly (bugs_backend) or if you have all three services running, you can also add new bugs via the index.js (path: pure_redux/src/index.js) with the respective dispatchers. The commands are basically commented out, so you can easily add them back.
The subsequent storage expands the bug list on the API server and this is then reflected on the frontend. 

# Hosts for the respective service:
bugs_backend: "localhost:9001"
pure_redux: "localhost:9000"
quick_bugs_frontend: "localhost:3000"

# Useful tools:
* Redux dev tools - https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=es
This tool can help you a lot when it comes to tracking the different operations of Redux in the background.
