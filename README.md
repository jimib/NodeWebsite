# NodeWebsite
A stripped back Node app for building simple webpages.
There is no backend to support this app, it just serves files from the public directory and renders jade files from the views directory

#Installation
1. Pull the git repo
2. Install the dependent node modules
npm install -d
3. Run the app
node app
4. Lanuch browser
http://localhost:4000/

#Structure
Refer to app.js:

```javascript
app.get("/", renderPage );
app.get("/:viewName", renderPage );
```

Any requests for '/' or '/*' will be filtered through the function renderPage.
The renderPage will only write (render) a response if it finds a matching Jade file.
If next is called, then Node skips to the next handler in the queue to see if it can handle the response.

```
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
```

#Req, Res and Next
We are using Express which is fundamentally a routing library. It receives requests and based on the path passes them through
to the relevenat handler.

In our application we have 2 handlers, renderPage and express.static. RenderPage is our custom handler that tries to render a Jade file
if it exists. Express.static exposes a directory and makes it's contents public.

It should be noted because of how we declared our code, renderPage is called first, followed by Express.static IF renderPage calls next

If Express.static can't find a public file matching the req.path it will also call next. If there are no handlers left in the queue
then Express will auto respond with a 404 response.

#Add Jade files
Currently there is only index.jade (accessed by http://localhost:4000 or http://localhost:4000/index) and menu.jade (accessed by
http://localhost:4000/menu). You can add additional jade files to the views directory and the application will automatically find them.
You don't need to restart Node for any changes to your Jade files or public directory to take effect.

#Templates
index.jade and menu.jade import a supporting file helper/layout-default.jade
This a jade file defining a basic page structure. It also includes some default Javascript files, and can include any consistent page elements
such as menu, header, logo etc.
helper/layout-default.jade also imports helper/mixins.jade, this contains a collection of mixins.

#Mixins
Mixins are just Jade Functions. They're useful for repetative tasks such as add scripts and stylesheets. You could use them for anything but
they are a limited in some respects so don't be overly reliant on them. I find them useful things like:

1. Adding buttons, just create a simple mixin that accepts a href and a label.
2. Creating a gallery from an array of images.
3. Adding/importing dependencies such as Javascript and Stylesheets
4. Website elements that are repeated in mulitple places (e.g. contact details, telephone number)

e.g.
```
mixin addContactDetails()
  p Tel: 0161 123 1234
  p Email: hello@pixelinspiration.net
```
Can be referenced then anywhere like this
```
div
   +addContactDetails()
```
Add all your mixins to a single file so that you can re-use them anywhere. 




