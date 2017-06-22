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