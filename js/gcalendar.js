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
		gcalendar.token = gapi.auth.getToken();
	});
});

// ACLs
gcalendar.model.Acl = gcalendar.Acl = Backbone.Model.extend({
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

gcalendar.collection.Acls = gcalendar.Acls = Backbone.Collection.extend({
	model: gcalendar.model.Acl,
	url: function() {
		// Expects options.calendarID
		return 'https://www.googleapis.com/calendar/v3/calendars/' + escape(options.calendarID)  + '/acl'
	},
	sync: function(method, model, options) {
		var that = this;
		var params = _.extend({
			type: 'GET',
			dataType: 'jsonp',
			url: that.url() + '?access_token=' + gcalendar.token.access_token,
			processData: false
		}, options);
		return $.ajax(params);
	},
	parse: function(r) {
		console.log(r);
		return r.items;
	}
});

gcalendar.model.Setting = gcalendar.Setting = Backbone.Model.extend({
	initialize: function() {
		console.log('Setting initialized.');
		this.on("error", function(model, error) {
			console.log(error);
		});
	},
	clear: function() {
		this.destroy();
	},
});


gcalendar.collection.Settings = gcalendar.Settings = Backbone.Collection.extend({
	model: gcalendar.model.Setting,
	url: function() {
		return 'https://www.googleapis.com/calendar/v3/users/me/settings';
	},
	sync: function(method, model, options) {
		var that = this;
		var params = _.extend({
			type: 'GET',
			dataType: 'jsonp',
			url: that.url() + '?access_token=' + gcalendar.token.access_token,
			processData: false
		}, options);
		return $.ajax(params);
	},
	parse: function(r) {
		console.log(r);
		return r.items;
	}
});

gcalendar.model.CalendarColor = gcalendar.CalendarColor = Backbone.Model.extend({
	initialize: function() {
		console.log('CalendarColor initialized.');
		this.on('error', function(model, error) {
			console.log(error);
		});
	},
	clear: function() {
		this.destroy();
	}
});

gcalendar.collection.CalendarColors = gcalendar.CalendarColors = Backbone.Collection.extend({
	model: gcalendar.model.CalendarColor,
	url: function() {
		return 'https://www.googleapis.com/calendar/v3/colors';
	},
	sync: function(method, model, options) {
		var that = this;
		var params = _.extend({
			type: 'GET',
			dataType: 'jsonp',
			url: that.url() + '?access_token=' + gcalendar.token.access_token,
			processData: false
		}, options);
		return $.ajax(params);
	},
	parse: function(r) {
		var colors = [];
		_.each(r.calendar, function(v, k, l) {
			colors.push( _.extend({ id: k }, v) );
		});
		return colors;
	}
});

gcalendar.model.EventColor = gcalendar.EventColor = Backbone.Model.extend({
	initialize: function() {
		console.log('EventColor initialized.');
		this.on('error', function(model, error) {
			console.log(error);
		});
	},
	clear: function() {
		this.destroy();
	}
});

gcalendar.collection.EventColors = gcalendar.EventColors = Backbone.Collection.extend({
	model: gcalendar.model.EventColor,
	url: function() {
		return 'https://www.googleapis.com/calendar/v3/colors';
	},
	sync: function(method, model, options) {
		var that = this;
		var params = _.extend({
			type: 'GET',
			dataType: 'jsonp',
			url: that.url() + '?access_token=' + gcalendar.token.access_token,
			processData: false
		}, options);
		return $.ajax(params);
	},
	parse: function(r) {
		var colors = [];
		_.each(r.event, function(v, k, l) {
			colors.push( _.extend({ id: k }, v) );
		});
		return colors;
	}
});

gcalendar.model.Calendar = gcalendar.Calendar = Backbone.Model.extend({
	initialize: function() {
		console.log('Calendar initialized.');
		this.on("error", function(model, error) {
			console.log(error);
		});
	},
	clear: function() {
		this.destroy();
	},
});


gcalendar.collection.Calendars = gcalendar.Calendars = Backbone.Collection.extend({
	model: gcalendar.model.Calendar,
	url: function() {
		return 'https://www.googleapis.com/calendar/v3/users/me/calendarList';
	},
	sync: function(method, model, options) {
		var that = this;
		var params = _.extend({
			type: 'GET',
			dataType: 'jsonp',
			url: that.url() + '?access_token=' + gcalendar.token.access_token,
			processData: false
		}, options);
		return $.ajax(params);
	},
	parse: function(r) {
		console.log(r);
		return r.items;
	}
});

gcalendar.model.Event = gcalendar.Event = Backbone.Model.extend({
	initialize: function() {
		console.log('Event initialized.');
		this.on("error", function(model, error) {
			console.log(error);
		});
	},
	clear: function() {
		this.destroy();
	},
});


gcalendar.collection.Events = gcalendar.Events = Backbone.Collection.extend({
	model: gcalendar.model.Event,
	url: function() {
		// Expects options.calendarID
		return 'https://www.googleapis.com/calendar/v3/calendars/' + escape(options.calendarID)  + '/events'
	},
	sync: function(method, model, options) {
		var that = this;
		var params = _.extend({
			type: 'GET',
			dataType: 'jsonp',
			url: that.url() + '?access_token=' + gcalendar.token.access_token,
			processData: false
		}, options);
		return $.ajax(params);
	},
	parse: function(r) {
		console.log(r);
		return r.items;
	}
});

gcalendar.model.Busy = gcalendar.Busy = Backbone.Model.extend({
	initialize: function() {
		console.log('Busy initialized.');
		this.on("error", function(model, error) {
			console.log(error);
		});
	},
	clear: function() {
		this.destroy();
	},
});


gcalendar.collection.Busys = gcalendar.Busys = Backbone.Collection.extend({
	model: gcalendar.model.Busy,
	url: function() {
		return 'https://www.googleapis.com/calendar/v3/freeBusy';
	},
	sync: function(method, model, options) {
		// Expects options.timeMin, options.timeMax, options.calendars
		var that = this;
		var params = _.extend({
			type: 'POST',
			dataType: 'jsonp',
			url: that.url() + '?access_token=' + gcalendar.token.access_token,
			//data: {
			//	timeMin: options.timeMin,
			//	timeMax: options.timeMax,
			//	items: options.calendars
			//}
		}, options);
		return $.ajax(params);
	},
	parse: function(r) {
		console.log(r);
		return r.busy;
	}
});
