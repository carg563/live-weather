# live-weather
A widget which gets the latest weather from weather API and displays this in an ArcGIS Web Scene

The actual widget is a custom widget which has been published to npm.

For info on how to build the widget from scratch, see the blog post [here](https://www.spatial-innovation.co.nz/post/esri-custom-widgets-part1) where you can obtain the orginal source code. This widget is an Experience Builder wrapper around that widget.

To use this widget, clone the code and then copy it in to the _your-extensions_ folder of Experience Builder.

Once you have it in the folder, run `npm install` to install the dependancies.

You will need to obtain an API key from [WeatherAPI](https://www.weatherapi.com/), you can create a free account.

Add the API key in to code on line 77 of the widget.tsx

The widget should now be available within Experience Builder.

The widget may not load running under the preview of Experience Builder (there is a CORS issue), however it seems to work in deployment.
