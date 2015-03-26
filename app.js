var express = require("express"),
	path = require("path"),
	fs = require("fs");

var app = express();

//load a configuration file
GLOBAL._config = require("./config.json");

//set up jade
app.set("view engine", "jade");
var dirViews = path.join( __dirname, "views");
app.set("views", dirViews );

//define routes for displaying our JADE files
app.get("/", renderPage );
app.get("/:viewName", renderPage );

function renderPage( req, res, next ){
	//based on the viewName - if undefined default to index
	var viewName = req.params.viewName || "index";
	//check the file exists
	fs.exists( path.join( dirViews, viewName + ".jade" ), function( exists ){
		if( exists ){
			//render the view
			res.render( viewName );
		}else{
			//skip
			next();
		}
	} );
}

//set up our public directory
app.use( express.static( path.join( __dirname, "public" ) ) );

//start listening on the designated port
app.listen( _config.port );

