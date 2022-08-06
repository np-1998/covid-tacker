
# Covid tracker - India (React JS)

## Live demo: [https://main.ds4te5g1inz9b.amplifyapp.com/](https://main.ds4te5g1inz9b.amplifyapp.com/)

### To run app in local

####  Clone the project:  `git clone https://github.com/np-1998/covid-tacker.git`
####  Install node_modules:  `npm install`
#### Start application: `npm run start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.


* From API data states has only state codes, so used static state names to map.
    ref: https://www.zoho.com/in/books/kb/gst/valid-state-codes-list.html

* States data (data.min.json) and Time series data (timeseries.min.json) has the data inconsistancy, where we cannot use both states data and timeseries for dates and sortby filters, so formatted both datas into one format and used based on filters. If user clicks date filter inside states page dates will be shown, if sortby or district selected district data will be shown in the table.

* Showed affected percentage and vaccinated percentange on states and districts for user to know while doing sortby.

* In districts data, some has not enough datas to handle percentage calculations for those cases shown - to inticate not enough data.

* Used Indexed DB storage to store the data & avoiding API call each time.
    (local storage may run into memory exceed issue due to data size)

* persisted and reused users state vise filters using localstorage.

* Used Redux for application level state management.

* Used debouncing method to reduce frequent rendering while doing state search.

* Splitted large components into small to reuse the functionality where ever needed.

* Used svg icons from https://fontawesome.com/

