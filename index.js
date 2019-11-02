const restify = require("restify");

const api_key = 'aqui vai sua chave api' // <------ cheve api

const googleMapsClient = require('@google/maps').createClient({
  key: api_key,
  Promise: Promise
});

const knex = require('knex')({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : '123456',
    database : 'db'
  }
});

const server = restify.createServer({
	name: "myapp",
	version: "1.0.0"
});

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

server.get("/all", function(req, res, next){

	knex('places').then((dados)=>{
		res.send(dados);
	}, next);

	return next();

});

server.post("/geocode", function(req, res, next){

	const {lat, lng} = req.body;

	// Geocode an address with a promise
	googleMapsClient.reverseGeocode({latlng: [lat, lng]}).asPromise()
	  .then((response) => {

	  	const address = response.json.results[0].formatted_address;
	  	const place_id = response.json.results[0].place_id;
	  	const image = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=15&size=300x300&maptype=roadmap&markers=color:red%7C%7C${lat},${lng}&key=${api_key}`;

	  	knex('places').insert({place_id, address, image}).then(()=>{
	  		res.send({address, image});
	  	}, next);

	  }).catch((error) => {
	    res.send(error);
	});
});

server.get('/*', restify.plugins.serveStatic({
	directory: './dist',
	default: 'index.html'
}));

server.listen(8080, function() {
	console.log("%s listening at %s", server.name, server.url);
});

/*
https://maps.googleapis.com/maps/api/staticmap?

center=Brooklyn+Bridge,New+York,NY
&zoom=13
&size=600x300
&maptype=roadmap
&markers=color:blue%7Clabel:S%7C40.702147,-74.015794
&markers=color:green%7Clabel:G%7C40.711614,-74.012318
&markers=color:red%7Clabel:C%7C40.718217,-73.998284
&key=AQUISUAKEY

https://maps.googleapis.com/maps/api/staticmap?center=-16.684289,-49.2563848&zoom=15&size=600x300&maptype=roadmap&markers=color:red%7Clabel:C%7C-16.684289,-49.2563848&key=AQUISUAKEY
*/