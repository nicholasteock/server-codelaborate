// server.js

// Base Setup

// Call required packages

var express 		= require('express'),
	app 			= express(),
	router 			= express.Router(),
	bodyParser 		= require('body-parser'),
	async 			= require('async'),
	http 			= require('http').Server(app),
	globals 		= require('globals'),
	compiler 		= require('compiler');

// Configure app to use bodyParser()
// Allows us to get the data from a POST
app.use(bodyParser());

// Set port
var port = process.env.PORT || globals.port_default;

// Routes for API
router.get('/', function(req, res) {
	res.json({ message: "HELLO FROM THE API!" });
});

/*****************************************************************************
*	COMPILE CODE
******************************************************************************/

router.post('/', function(req, res) {
	function reply( response ) {
		res.send( 200, response );
	}

	compiler.compileAndExecute( req.body, reply );
});

/*****************************************************************************/

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://nicholasteock.github.io');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

// Register routes
// all routes prefixed with /api
app.use('/api', router);

// Start server
app.listen(port);
console.log('Server listening on port ' + port);