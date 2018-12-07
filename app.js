const express = require('express');				//npm install express
const bodyParser = require('body-parser');		//npm install body-parser
const BrewNode = require('./brewNode'); 		//local class

//
const port = 18070+Math.floor(Math.random()*30);
console.log('starting node on ', port)
let node1 = new BrewNode(port);

node1.init();

const http_port = 3000+Math.floor(Math.random()*10);

let BrewHTTP = function (){
	const app = new express();

	app.use(bodyParser.json());

	app.get('/addNode/:port', (req, res)=>{
		console.log('add host: '+req.params.port)
		node1.addPeer('localhost', req.params.port)
		
		res.send();
	})

	

	app.get('/spawnBrew/:teammember', (req, res)=>{
		let newBlock = node1.createBlock(req.params.teammember);
		console.log('block created');
		console.log(JSON.stringify(newBlock, null, 4));
		res.send(JSON.stringify(newBlock, null, 4));
		
		//////////////////////////////////////////////////////////////
	})

	app.listen(http_port, () => {
		console.log(`http server up.. ${http_port}`);
	})
}

let httpserver = new BrewHTTP();