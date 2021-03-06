const axios = require('axios')

function runVehicle(index){
    let lat = 1, long = 2;
    setInterval(() => {
        axios.post('http://localhost:3000/api/'+index+'/location',
            {
                la: lat + Math.random(),
                lo: long  +Math.random()
            })
            .then(res => console.log('sent' + index))
            .catch(console.error)
    }, 9000)
} 

if(process.argv.length >= 3){
    const numberOfVehicles = parseInt(process.argv[2]);
    console.log('numberOfVehicles   --------->>>>>',numberOfVehicles);
    for (let i = 0; i < numberOfVehicles; i++) {
        runVehicle(i);
    }
}