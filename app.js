const app = require('express')(),
 cors = require('cors'),
 bodyParser = require('body-parser'),
 { json } = require('body-parser'),
 vechileRoutes = require('./routes/apiRoutes');
 var http = require('http').createServer(app);
 var io = require('socket.io')(http);

//middlewares
app.use(bodyParser.json());
app.use(cors()); 
app.use('/api',vechileRoutes);
app.vechiles={};

app.io = io;
io.on('connection',(socket)=>{
  console.log('User Connected');
  socket.on('disconnect',()=>{
    console.log('User Disconnected');
  });
});


http.listen(3000,()=>{
    console.log('Server is running at Port Number 3000');
});