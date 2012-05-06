# backbone-gcalendar

Google Calendar synch for Backbone

This is a simple module to replace Backbone.sync with persistence of calendar-specific objects to Google Calendar.

## Collections and models

### ACLs (Collection) and ACL (Model)

ACLs:

* ``acl.delete`` Deletes an access control rule. ``DELETE https://www.googleapis.com/calendar/v3/calendars/{calendarId}/acl/{ruleId}``
* ``acl.get`` Returns an access control rule. ``GET https://www.googleapis.com/calendar/v3/calendars/{calendarId}/acl/{ruleId}``
* ``acl.insert`` Creates an access control rule. ``POST https://www.googleapis.com/calendar/v3/calendars/{calendarId}/acl``
* ``acl.list`` Returns the rules in the access control list for the calendar. ``GET https://www.googleapis.com/calendar/v3/calendars/{calendarId}/acl``
* ``acl.patch`` Updates an access control rule. ``PATCH https://www.googleapis.com/calendar/v3/calendars/{calendarId}/acl/{ruleId}``
* ``acl.update`` Updates an access control rule. ``PUT https://www.googleapis.com/calendar/v3/calendars/{calendarId}/acl/{ruleId}``

* kind (string)
* etag (string - etag)
* id (string)
* scope :
	* type [ default | user | group | domain ]
	* value (string)
* role [ none | freeBusyReader | reader | writer | owner ]

### Settings (Collection) and Setting (Model)

Settings:

* ``settings.get`` Returns a single user setting. ``GET https://www.googleapis.com/calendar/v3/users/me/settings/{setting}``
* ``settings.list`` Returns all user settings for the authenticated user. ``GET https://www.googleapis.com/calendar/v3/users/me/settings``

* kind (string)
* etag (string - etag)
* id (string)
* value (string)

### CalendarColors (Collection) and CalendarColor (Model)

CalendarColors:

* ``colors.get`` Returns the color definitions for calendars and events. ``GET https://www.googleapis.com/calendar/v3/colors``

* (key) (Maps to Calendar.colorId)
	* background (string)
	* foreground (string)

### EventColors (Collection) and EventColor (Model)

EventColors:

* ``colors.get`` Returns the color definitions for calendars and events. ``GET https://www.googleapis.com/calendar/v3/colors``

* (key) (Maps to Event.colorId)
	* background (string)
	* foreground (string)

### Calendars (Collection) and Calendar (Model)

Calendars: 
* ``calendarList.delete`` Deletes an entry on the user's calendar list. ``DELETE https://www.googleapis.com/calendar/v3/users/me/calendarList/{calendarId}``
* ``calendarList.get`` Returns an entry on the user's calendar list. ``GET https://www.googleapis.com/calendar/v3/users/me/calendarList/{calendarId}``
* ``calendarList.insert`` Adds an entry to the user's calendar list. ``POST https://www.googleapis.com/calendar/v3/users/me/calendarList``
* ``calendarList.list`` Returns entries on the user's calendar list. ``GET https://www.googleapis.com/calendar/v3/users/me/calendarList``
* ``calendarList.patch`` Updates an entry on the user's calendar list. ``PATCH https://www.googleapis.com/calendar/v3/users/me/calendarList/{calendarId}``
* ``calendarList.update`` Updates an entry on the user's calendar list. ``PUT https://www.googleapis.com/calendar/v3/users/me/calendarList/{calendarId}``
* ``calendars.clear`` Clears a primary calendar. ``POST https://www.googleapis.com/calendar/v3/calendars/{calendarId}/clear`` This operation deletes all data associated with the primary calendar of an account and cannot be undone. 
* ``calendars.delete`` Deletes a secondary calendar. ``DELETE https://www.googleapis.com/calendar/v3/calendars/{calendarId}``
* ``calendars.get`` Returns metadata for a calendar. ``GET https://www.googleapis.com/calendar/v3/calendars/{calendarId}``
* ``calendars.insert`` Creates a secondary calendar. ``POST https://www.googleapis.com/calendar/v3/calendars``
* ``calendars.patch`` Updates metadata for a calendar. ``PATCH https://www.googleapis.com/calendar/v3/calendars/{calendarId}``
* ``calendars.update`` Updates metadata for a calendar. ``PUT https://www.googleapis.com/calendar/v3/calendars/{calendarId}``

* kind (string)
* etag (string - etag)
* id (string)
* summary (string)
* description (string)
* location (string)
* timeZone (string)
* summaryOverride (string)
* colorId (string)
* hidden (boolean)
* selected (boolean)
* accessRole (string)
* defaultReminders :
	* method (string)
	* minutes (integer)

### Events (Collection) and Event (Model)

Events:

* ``events.delete`` Deletes an event. ``DELETE https://www.googleapis.com/calendar/v3/calendars/{calendarId}/events/{eventId}``
* ``events.get`` Returns an event. ``GET https://www.googleapis.com/calendar/v3/calendars/{calendarId}/events/{eventId}``
* ``events.insert`` Creates an event. ``POST https://www.googleapis.com/calendar/v3/calendars/{calendarId}/events``
* ``events.instances`` Returns instances of the specified recurring event. ``GET https://www.googleapis.com/calendar/v3/calendars/{calendarId}/events/{eventId}/instances``
* ``events.list`` Returns events on the specified calendar. ``GET https://www.googleapis.com/calendar/v3/calendars/{calendarId}/events``
* ``events.move`` Moves an event to another calendar, i.e. changes an event's organizer. ``POST https://www.googleapis.com/calendar/v3/calendars/{calendarId}/events/{eventId}/move``
* ``events.patch`` Updates an event. This method supports patch semantics. ``PATCH https://www.googleapis.com/calendar/v3/calendars/{calendarId}/events/{eventId}``
* ``events.quickAdd`` Creates an event based on a simple text string. ``POST https://www.googleapis.com/calendar/v3/calendars/{calendarId}/events/quickAdd``
* ``events.update`` Updates an event. ``PUT https://www.googleapis.com/calendar/v3/calendars/{calendarId}/events/{eventId}``
* ``freebusy.query`` Returns free/busy information for a set of calendars. ``POST https://www.googleapis.com/calendar/v3/freeBusy``

* kind (string)
* etag (string - etag)
* id (string)
* status (string)
* htmlLink (string)
* created (datetime)
* updated (datetime)
* summary (string)
* description (string)
* location (string)
* colorId (string)
* creator
  * email (string)
  * displayName (string)
* organizer
  * email (string)
  * displayName (string)
* start
  * date (date)
  * dateTime (datetime)
  * timeZone (string)
* end
  * date (date)
  * dateTime (datetime)
  * timeZone (string)
* recurrence (array)
    (string)
* recurringEventId (string)
* originalStartTime
  * date (date)
  * dateTime (datetime)
  * timeZone (string)
* transparency (string)
* visibility (string)
* iCalUID (string)
* sequence (integer)
* attendees (array)
    * email (string)
    * displayName (string)
    * organizer (boolean)
    * self (boolean)
    * resource (boolean)
    * optional (boolean)
    * responseStatus (string)
    * comment (string)
    * additionalGuests (integer)
* attendeesOmitted (boolean)
* extendedProperties
  * private
      (key): (string)
  * shared
      (key): (string)
* gadget
  * type (string)
  * title (string)
  * link (string)
  * iconLink (string)
  * width (integer)
  * height (integer)
  * display (string)
  * preferences
      (key): (string)
* anyoneCanAddSelf (boolean)
* guestsCanInviteOthers (boolean)
* guestsCanModify (boolean)
* guestsCanSeeOtherGuests (boolean)
* privateCopy (boolean)
* reminders
  * useDefault (boolean)
  * overrides (array)
      * method (string)
      * minutes (integer)

### Busys (Collection) and Busy (Model)

* kind (string)
* timeMin (datetime)
* timeMax (datetime)
* calenders: (NOT an array)
	* (key):
		* errors (array)
			* domain (string)
			* reason (string)
		* busy (array)
			* start (datetime)
			* end (datetime)
* groups (not supported in this version)

## Google Calendar v3.0 API calls of interest

Base URL is https://www.googleapis.com/calendar/v3/.

API calls of interest:


