## Info

- API from seatgeek.com
- Date Picker from react-datepicker (includes moment)

## Features

- [x] Choose API
- [x] Add Date Picker
- [x] When Date is chose, API search for baseball events from that date and in the next seven days.
- [ ] If not event, display "no event that week"
- [ ] Show results in a map
- [ ] User can save/delete their favourite event
-  [ ] Show countdown to their next favourite event
- [ ] UI design
- [ ] Testing components (using Jest?)


## Current component structure
App (contains the main state variables)
|
|_ChooseDate (form that selects the date)
|_Events (lists all events and has functions)
|_____Event (1 event only)

## How to install on cloud9
- Fork the repo in your github
- Go to cloud9, create a new workspace
- Enter a workspace name
- Clone with SSH (found under clone or download on your repo)
- Enter the workspace
- Duplicate the .env.template file and call it .env
- Enter details from seatgeek
- Type `npm install`
- start the server with `npm start`


## Added Features

**06 July 2017 - Sandra **
- Added pagination for event listing

**30 June 2017 - Sandra**
- Layout and UX improvement

**30June2017 - Matt**
- Added a second date picker so that the user can pick a from date and a to date.
- Some bug fixes and minor formatting changes

**23June2017 - Sandra**
- Created some kind of branding with logo, font and colours
- [Bootstrap 4](https://v4-alpha.getbootstrap.com/) (replacing Bootstrap 3). Added both css and js.
- [FontAwesome](http://fontawesome.io/)
- Separated styles so each component is independant. However, I created some global variables in index.css (font and colours) so that they can be used consistently throughout the application. [More info here](https://medium.com/@pioul/modular-css-with-react-61638ae9ea3e#cc90)
