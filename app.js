const app = require('express')();

app.get('/',(req,res)=>{
    console.log('get method : /');
    res.send('Server is up & Running - Backend');
});


app.listen(3000,()=>{
    console.log('Server is running at Port Number 3000');
});