const appp = require(`./app`);
require('dotenv').config(); 

appp.listen("3000", ()=>{
    console.log("http://localhost:3000");
})
