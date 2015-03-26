$(document).ready( function(){
	
	//knockout demo - requires jquery
	var modelApp = new AppModel();
	//define some methods on the AppModel
	modelApp.addItem = function(){
		modelApp.items.push({
			name : modelApp.itemName()
		})
	}
	
	modelApp.removeItem = function(){
		if( modelApp.selectedItem() ){
			modelApp.items.remove( modelApp.selectedItem() );
			modelApp.selectedItem( null );
		}
	}
	
	//nothing will happen until we bind to the view
	ko.applyBindings( modelApp );
	
} );

function AppModel(){
	var self = this;
	
	self.itemName = ko.observable("");
	self.items = ko.observableArray();
	self.selectedItem = ko.observable();
}