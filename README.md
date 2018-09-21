# Dayton Area Level of Traffic Stress (LTS) Interactive Map

## What is LTS?

The Level of Traffic Stress concept was first used by the Mineta Transportation Institute ([MTI](http://transweb.sjsu.edu/)) in San Jose, California as a way to think about the bike friendliness of a city. Using a few simple metrics, speed limits and number of lanes, the authors mapped the City of San Jose into the following four categories of facilities:

* LTS 1: bikeways and low-volume streets where the speed limit is 25 mph or less
* LTS 2: some striped bike lanes, protected lanes, cycle tracks
* LTS 3: roads with 30 mph+ speeds and/or four lanes
* LTS 4: most roads with 30 mph+ speeds and/or five or more lanes

## Local LTS Analysis
The Miami Valley Regional Planning Commisssion ([MVRPC](mvrpc.org)) simplified and adapted the original LTS analysis to a regional scale as part of the [2015 Update](rpc.org/bike-plan-update) to the MVRPC Bikeways Plan.  Using a modified version of the MTI model, MVRPC staff mapped the entire region. One of the primary goals of the project was to identify low-stress islands and potential projects to connect them.

The Miami Valley has the nation’s largest paved trail network, which provides a very low-stress
riding environment where cyclists are completely separated from traffic except
for where the trails cross roads. However, these trails do not lead directly to many work,
shopping, residential and recreational destinations. To reach those, riders need to be
comfortable on the street grid. Increasing connections between the regional trail system and
low-stress streets will make the regional network safer and more useful to many riders who
are “interested, but concerned.” The MVRPC believes this is the key to increasing the share of trips
taken by bicycle in the Miami Valley.

## Interactive Map
This project takes the data collected by the MVRPC and makes it available as an interactive map using [Leaflet](http://leafletjs.com/) and [OpenStreetMap](http://www.openstreetmap.org/).

LTS data is stored as [TopoJSON](https://github.com/mbostock/topojson), converted to [GeoJSON](http://geojson.org/) on the client using the TopoJSON API,  sliced into vector tiles using [geojson-vt](https://github.com/mapbox/geojson-vt), and rendered as a canvas element.

It is currently hosted as a Node.js app on Azure using [Express](http://expressjs.com/).

Check out [LTS Dayton](http://ltsdayton.azurewebsites.net/)!

## License
MIT
