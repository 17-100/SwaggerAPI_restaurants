const express = require('express')
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger.json');

var restaurants = [{id:0,name:"Woodshill"},{id:1,name:"Fiorellas"}, {id:2,name:"Don Pasquale"}]

var friends = [{id:0, name:"Rick", age: 32}, {id:1, name:"Alkan", age: 31}, {id:2, name:"David", age: 32}];

const app = express();
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))


// MIT example
app.get("/restaurants", (req,res)=>{
    res.send(restaurants);
});

app.post("/restaurant",(req,res)=>{
    restaurants.push({id:req.body.id, name:req.body.name})
    res.send(`${JSON.stringify(restaurants)} created`)
});

app.delete("/restaurant/:id", (req,res)=>{
    console.log('delete:id:'+req.params.id)
    restaurants = restaurants.filter(item=> item.id != req.params.id)
    res.send("restaurants left:"+JSON.stringify(restaurants));
});

// My examples 
app.get("/friends", (req, res) => {
    res.send(friends)
});

app.post("/friend", (req, res) => {
    friends.push({id:req.body.id, name: req.body.name, age:req.body.age})
    res.send(`${JSON.stringify(friends)} updated`)
});

app.listen(4000,()=>console.log('Listening on 4000'))