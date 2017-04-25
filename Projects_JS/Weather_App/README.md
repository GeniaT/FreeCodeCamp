Another API app which first checks your geolocation and then calls an API to display the weather of your location
and the possibility to convert Farenheit degrees into Celcius and vice versa.

Check the Weather app and its code over there: https://codepen.io/Genia/pen/EgGVZA

For the whole Portfolio, just check http://codepen.io/Genia

Update 25/4/17

With time, there is now a regression occuring because of the "http&https". 
The app uses 2 apis: Google for Geolocalisation and apiopenweather for the weather predictions. 

Google API gives back the results by API only if it's asked from a HTTPS source. On the other side, openweather doesn't give his answer unless you call it via a "HTTP" source. 

This conflict can either be solved by changing the weather prediction source or wait they align their api for HTTPS requests. 
