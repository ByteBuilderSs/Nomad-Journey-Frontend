import { GeoSearchControl, MapBoxProvider, OpenStreetMapProvider } from 'leaflet-geosearch';
import { useMap } from 'react-leaflet';
import "leaflet-geosearch/dist/geosearch.css";
import { useEffect } from 'react';

const GeoSearchField = () => {
    
    const map = useMap();

    const provider = new OpenStreetMapProvider();

    // @ts-ignore
    const searchControl = new GeoSearchControl({
        provider: provider,
        searchLabel: "Search in Map",
        notFoundMessage: "No data could be found",
        autoClose: false,
    });
    
    useEffect(() => {
        map.addControl(searchControl);
        return () => map.removeControl(searchControl);
    }, []);

    return null;
};

export default GeoSearchField;