// gcalendar is our namespace, using a nested object literal pattern
var gcalendar = gcalendar || {};

// initialize our gcalendar objects
gcalendar.model = gcalendar.model || {};
gcalendar.collection = gcalendar.collection || {};
gcalendar.router = gcalendar.router || {};
gcalendar.view = gcalendar.view || {};

gcalendar.authorize = (function() {
	var config = {
		scope: 'https://www.googleapis.com/auth/calendar',
		client_id: '1039557023142.apps.googleusercontent.com'
	};
	gapi.auth.authorize(config, function() {
		console.log('login complete');
		console.log(gapi.auth.getToken());
	});
});

// ACLs
gcalendar.model.Acl = Backbone.Model.extend({
	defaults: {
		role: 'owner',
		scope: 'default'
	},
	initialize: function() {
		console.log('Acl initialized.');
		this.on("error", function(model, error) {
			console.log(error);
		});
	},
	clear: function() {
		this.destroy();
	},
	validate: function(attrs) {
		var errors = [];
		var roles = [ 'none', 'freeBusyReader', 'reader', 'writer', 'owner' ];
		var scopes = [ 'default', 'user', 'group', 'domain' ];
		if (attrs.resource === 'undefined') {
			errors.push("Resource was not specified.");
		}
		if (attrs.user === 'undefined') {
			errors.push("User was not specified.");
		}
		if (! _.include(roles, attrs.role)) {
			errors.push("Role '" + attrs.role + "' is not valid. Valid roles are " + roles.join(', ') + ".");
		}
		if (! _.include(scopes, attrs.scope)) {
			errors.push("Scope '" + attrs.scope + "' is not valid. Valid scopes are " + scopes.join(', ') + ".");
		}
		return _.any(errors) ? errors : null;
	}
});

gcalendar.collection.aclSync = (function(method, model, options) {
	
})();

gcalendar.collection.Acls = Backbone.Collection.extend({
	model: gcalendar.model.Acl,
});
