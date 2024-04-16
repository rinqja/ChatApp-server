const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const {Server}= require("socket.io");

app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
    cors: { 
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST']
    }
});

const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    room: {
      type: String,
      required: true
    },
    author: {
      type: String,
      required: true
    },
    message: {
      type: String,
      required: true
    },
    time: {
      type: Date,
      default: true // Automatically set the time when the message is created
    }
  });
// MongoDB URI
    mongoose.connect('mongodb://127.0.0.1:27017/ChatApp', { useNewUrlParser: true, useUnifiedTopology: true });

// Connect to MongoDB


const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    // we're connected!
    console.log("Connected to MongoDB");
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;




    io.on('connection', (socket) => {
        console.log('User has joined', socket.id);
         
        socket.on("join_room",(data)=>{
            // console.log("Joining room",room);
            socket.join(data);
            console.log(`User with ID : ${socket.id} joined room :${data}`);
        
        });
        socket.on("send_message", async (data) => {
            // Create a new message document using the model
            const newMessage = new Message({
                room: data.room,
                author: data.author,
                message: data.message
                // time is set by default
            });
        
            try {
                // Save the message to the database
                const savedMessage = await newMessage.save();
                console.log('Message saved:', savedMessage);
                // Emit the message to other users in the room
                socket.to(data.room).emit("receive_message", savedMessage);
            } catch (err) {
                console.error('Error saving message:', err);
            }
        });

        socket.on('disconnect', () => {
          console.log('User has disconnected', socket.id);
        });
    });
       
    
    



server.listen(3001, () => {
    console.log('Server is running on port 3001');
});