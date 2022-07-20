


/**
  Licensing
  Copyright 2022 Eagle Technology
  Licensed under the Apache License, Version 2.0 (the "License"); You
  may not use this file except in compliance with the License. You may
  obtain a copy of the License at
  http://www.apache.org/licenses/LICENSE-2.0
  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or
  implied. See the License for the specific language governing
  permissions and limitations under the License.
  A copy of the license is available in the repository's
  LICENSE file.
*/
import { React,  AllWidgetProps } from 'jimu-core';
import { JimuMapViewComponent, JimuMapView } from 'jimu-arcgis';
import "./style.css"
//importing our custom widget change this to yours if necessary
import WeatherWidget from '@eaglegis/weather-widget/';


interface IState {
    widgetLoaded: boolean
}

export default class Widget extends React.PureComponent<AllWidgetProps<{}>, IState>{
    //we use the ref to load the widget in to.
    apiWidgetContainer: React.RefObject<HTMLDivElement>;
    weatherWidget: WeatherWidget;
    mapView: __esri.MapView | __esri.SceneView;

    constructor(props) {
        super(props);
        this.state =
        {
            widgetLoaded: false
        }
        //create the reference to the container
        this.apiWidgetContainer = React.createRef();
    }

    //Fired when the widget is mounted in the application
    componentDidMount() {
        //we need to check if we have loaded the widget, if not, lets load it now.
        if (!this.state.widgetLoaded) {
            this.createAPIWidget();
            this.setState({
                widgetLoaded: true
            });
        }
    }


    //fired when the map is active and made available to the widget
    onActiveViewChange = (jimuMapView: JimuMapView) => {
        if (!(jimuMapView && jimuMapView.view)) {
            return;
        }
        
        this.mapView = jimuMapView.view;
    }

    //wraps the JSAPI widget
    createAPIWidget = () => {
        if (!this.mapView) {
            return;
        }
        //we can treat the widget as any other JSAPI widget
        if (!this.weatherWidget && this.apiWidgetContainer.current) {
            this.weatherWidget = new WeatherWidget({
                view: this.mapView,
                container: this.apiWidgetContainer.current,
                weatherAPI: "",//replace this with your weather api key
                weatherURL: "https://api.weatherapi.com/v1"
            });
        }
    }

    //Life cycle method    
    render() {
        if (!this.isConfigured()) {
            return 'Select a map';
        }
        return <div className="widget-use-map-view" style={{ width: '100%', height: '100%' }}>

            <JimuMapViewComponent useMapWidgetId={this.props.useMapWidgetIds[0]} onActiveViewChange={this.onActiveViewChange}></JimuMapViewComponent>

            <div ref={this.apiWidgetContainer}/>
               
        </div>;
    }

    //confirms if we have assigned a map to the widget.
    isConfigured = () => {
        return this.props.useMapWidgetIds && this.props.useMapWidgetIds.length === 1;
    }
}
