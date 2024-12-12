## Introduction
* A live quiz app build on FastAPI with some basic frontend. 
* The person has to first login through his/her google account to be able to access the quiz. 
* Then the person has the option to either the attend quiz or edit on the default questions saved in the MongoDB database.
* The quiz starts with a default score of 0 and the person is awarded +4 for each correct answer and -1 for wrong answer. 
* A live score is present on the top right corner of the website which updates and displays the score real time. 
* After attempting every question, the final score and the number of questions attempted is displayed.
* If the person chooses to “create a quiz” they have option to either manually add on the questions or ask the OpenAI powered functionality to generate a number of questions for them by giving it a topic.
Scope – what I could do and couldn’t
## What I did:
1.	Implemented the API with full functionality and CRUD operations of the quiz in Python(FastAPI) and run through uvicorn.
2.	Database implementation for storing/editing of the JSON formatted questions in MongoDb.
3.	Firebase Authentication for logging with Google account.
4.	The score was displayed and updated real time using JavaScript functions.
5.	Created and implemented the Python modules in an Virtual Environment in VS Code.
6.	I created dynamic and working frontend using HTML/CSS.
## What I couldn’t:
1.	I had build and implemented the Ai-Powered Quiz generation but I think it used up all the free tokens in the testing phase because I couldn’t debug why didn’t work after that.
The Fix:
	I believe generating and using paid plan(ex: gpt-4) api key would fix it.
2.	I had tried to use the asyncio module of Python to create a timer function but it didn’t work at all showing unknown module; then I also tried to make it through JavaScript but scrapped it later.
The Fix:
	I believe giving more time studying and experimenting the right modules can give us 	the proper result.
3.	I couldn’t even try for Real Time Synchronization as I wasn’t able to find the proper resource online to do it on Python specifically FastApi.
The Fix:
Maybe studying its use on JavaScript can give me the right idea on how to work and implement  it.
5.	I also wasn’t able to deploy the project due lack of experience of deploying a project with this vast backend. I was thinking of containing it on Docker.
The Fix: With proper time and effort, I can learn the right and effective way of deployment of projects of such girth.
## Requirements
* The Project needs to run in an virtual environment with all the right libraries installed.
* All the necessary libraries are mentioned in Requirements.txt run using:

pip install -r requirements.txt

![Alt text](https://i.imgur.com/VZ7i56O.png)
![Alt text](https://i.imgur.com/kuzW5jY.png)
![Alt text](https://i.imgur.com/CBh4q6P.png)
![Alt text](https://i.imgur.com/7nbBJEr.png)
![Alt text](https://i.imgur.com/a4YMXLO.png)
![Alt text](https://i.imgur.com/39N6G1h.png)
![Alt text](https://i.imgur.com/VDXMUnT.png)
![Alt text](https://i.imgur.com/UWE1Fhe.png)
![Alt text](https://i.imgur.com/pTqiGBD.png)
![Alt text](https://i.imgur.com/87ScsST.png)
![Alt text](https://i.imgur.com/w5PmFok.png)


