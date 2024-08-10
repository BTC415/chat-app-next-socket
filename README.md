# chat-app-next-socket

## Built With :package:
<p>
<img alt="Node.js" src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white" />
<img alt="Next.js" src="https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white" />
<img alt="Next.js" src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB" />
<img alt="Next.js" src="https://img.shields.io/badge/SocketIO-%230081CB.svg?style=for-the-badge&logo=mui&logoColor=white" />
<img alt="Github" src="https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white" /> 
</p>

<p>
<img alt="Open Source? No!" src="https://badgen.net/badge/Open%20Source%20%3F/No%21/blue?icon=github" /> 
</p>

## How to build & run? :dart:

  Make sure you have [Nodejs](https://nodejs.org/en/download) installed anc clone this repository on local PC.

  ```bash
  node --version
  ```

```bash
git clone <this-repo-name>
```

- Install the dependencies:

  ```bash
  cd client && npm install
  cd ..
  cd server && npm install
  ```
	- Installs all the dependencies required by the project.

- Run dev server

	```bash
  cd server && npm start
  cd ..
  cd client n&& npm run dev
	```

- Build

	```bash
	npm run build
	```


- Run Server

	```bash
	cd dist
    npx serve -s -l 80
	```



- To contribute, make pull request for your own branch:

  ```bash
  git add .
  git commit -m "<COMMIT-MESSAGE>"
  git push origin <NAME-OF-THE-BRANCH>
  ```
## Description
We have all encountered chat over the web, that can be Facebook, Instagram, Whatsapp and the list goes on.
Just to give a bit of context, you send a message to a person or a group, they see the message and reply back. Simple yet complex.

To develop a chat app you would need to be aware of new messages as soon as they arrive.
Usually, to get information from the server you need send an HTTP request. With websockets, the server lets you know when there is new information without asking it.

In this project, we leveraged the real-time communication provided by Socket.io to create an open chat application that allows users to send and receive messages from several users on the application. 
You will also learn how to detect the users who are online and when a user is typing.
