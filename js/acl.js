function aclSync(method, model, options) {
	
}

var Acl = Backbone.Model.extend({
	defaults: {
		role: 'owner',
		scope: 'default'
	},
	initialize: function(options) {
		console.log('Acl initialized.');
	},
	clear: function() {
		this.destroy();
	},
	validate: function(attrs) {
		var errors = [];
		var roles = [ 'none', 'freeBusyReader', 'reader', 'writer', 'owner' ];
		var scopes = [ 'default', 'user', 'group', 'domain' ];
		if (resource === 'undefined') {
			errors.push("Resource was not specified.");
		}
		if (user === 'undefined') {
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

var Acls = Backbone.Collection.extend({
	model: Acl,
});
