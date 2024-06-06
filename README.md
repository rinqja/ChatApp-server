ChatApp Server
Overview
ChatApp Server is a real-time chat application backend built using Node.js, Express, and Socket.IO, with MongoDB as the database. This server handles user connections, room management, and message persistence.

Features
Real-time communication using WebSockets.
Room-based messaging.
MongoDB integration for message persistence.
Basic API to join rooms and send messages.
Prerequisites
Ensure you have the following installed on your local development machine:

Node.js (v14.x or higher)
npm (comes with Node.js)
MongoDB (local or a MongoDB Atlas instance)
Installation
Clone the repository:


Copy code
git clone https://github.com/yourusername/ChatApp.git
cd ChatApp
Install dependencies:

sh
Copy code
npm install
Configure MongoDB:

Ensure MongoDB is running on your local machine or update the connection string to use a remote MongoDB instance in the server configuration.

Configuration
The server connects to a MongoDB instance at mongodb://127.0.0.1:27017/ChatApp by default. You can update this in the source code if you need to use a different URI or database.

Usage
Running the Server
Start the server with the following command:

sh
Copy code
npm start
By default, the server will run on port 3001. You can access it via http://localhost:3001.

API Endpoints
While most interactions happen over WebSockets, the server also provides the following endpoints:

/: Root endpoint, which can be used to check if the server is running.
WebSocket Events
connection: Triggered when a user connects.
join_room: Join a specified chat room.
Data: { room: 'room-name' }
send_message: Send a message to a room.
Data: { room: 'room-name', author: 'username', message: 'message content' }
receive_message: Receive a message from a room.
Data: { room: 'room-name', author: 'username', message: 'message content', time: 'timestamp' }
disconnect: Triggered when a user disconnects.
