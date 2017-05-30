# Vet Fetch

vetFetch is an app designed for web where pet owners can find recommended veterinarians near them. Powered by Foursquare, vetFetch searches veterinarians in a given zipcode and lets users store their pet's health records for easy access.

## Demo

Visit the website in production [here](http:vetfetch.io)

## Tech

* Node/Express
* MongoDB
* React
* Redux
* Foursquare
* Heroku

## Getting Started

Run locally:

```
https://github.com/milkshake-tech/vet-fetch.git
cd vet-fetch
touch .env
```

Open dotenv file, and add following values:

```
SENDGRID_API_KEY=
MONGODB_DEV_URI=
MONGODB_TEST_URI=
FOURSQUARE_client_id=
FOURSQUARE_client_secret=
```

Save the file and start the application

```
mongod (in separate tab)
npm run dev
npm start
```

Visit at localhost:3000.
