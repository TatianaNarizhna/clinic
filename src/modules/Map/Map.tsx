import React from 'react';
import { useMemo, useState, useEffect, useCallback } from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import { IResItem } from '../../types/searchTypes';
import markerGreen from './markerGreen.png';
import s from './Map.module.css';

interface ICoordinates {
  latitude: number;
  longitude: number;
}

interface IMyComponentProps {
  coordinates: ICoordinates[] | undefined;
  dataRes: IResItem | undefined;
}

const Map: React.FC<IMyComponentProps> = ({ coordinates, dataRes }) => {
  const [mapOptions, setMapOptions] = useState({
    center: { lat: -24, lng: 134 },
    zoom: 4,
  });

  const [markers, setMarkers] = useState(coordinates);

  useEffect(() => {
    window.localStorage.setItem('markers', JSON.stringify(coordinates));
  }, [coordinates]);

  useEffect(() => {
    const storedMarkers = window.localStorage.getItem('markers');
    console.log('rrr');

    if (storedMarkers) {
      const parsedMarkers = JSON.parse(storedMarkers);
      // console.log(parsedMarkers);
      setMarkers(parsedMarkers);
    }
  }, []);

  console.log(markers);

  useEffect(() => {
    if (dataRes) {
      setMapOptions({
        center: { lat: dataRes.latitude, lng: dataRes.longitude },
        zoom: 11,
      });
    }
  }, [dataRes]);

  useEffect(() => {
    if (coordinates && coordinates.length > 0) {
      setMapOptions({
        center: {
          lat: coordinates[0].latitude,
          lng: coordinates[0].longitude,
        },
        zoom: 9,
      });
    }
  }, [coordinates]);

  return (
    <GoogleMap
      zoom={mapOptions.zoom}
      center={mapOptions.center}
      mapContainerClassName={s.map_container}
    >
      {markers &&
        markers.map((marker, i) => (
          <Marker
            key={i}
            position={{ lat: marker.latitude, lng: marker.longitude }}
            icon={
              marker.latitude === dataRes?.latitude &&
              marker.longitude === dataRes?.longitude
                ? {
                    url: markerGreen,
                    scaledSize: new window.google.maps.Size(70, 70),
                  }
                : undefined
            }
          />
        ))}
    </GoogleMap>
  );
};

const MapComponent: React.FC<IMyComponentProps> = ({
  coordinates,
  dataRes,
}) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyC_3yuRXAlZz0w7Ohj5tJTLuuaUtuEiJnQ',
  });

  if (!isLoaded) {
    return <p>Loading...</p>;
  }

  return <Map coordinates={coordinates} dataRes={dataRes} />;
};

export default MapComponent;

// const center = useMemo(
//   () => ({ lat: dataRes?.latitude || -24, lng: dataRes?.longitude || 134 }),
//   [dataRes],
// );
// const [mapOptions, setMapOptions] = useState({
//   center,
//   zoom: 4,
// });

// useEffect(() => {
//   if (dataRes) {
//     setMapOptions({
//       center,
//       zoom: 10,
//     });
//   }
// }, [dataRes, coordinates]);

// useEffect(() => {
//   if (coordinates) {
//     setMapOptions({
//       center: () => ({
//         lat: coordinates[0].latitude,
//         lng: coordinates[0].longitude,
//       }),
//       zoom: 8,
//     });
//   }
// }, [coordinates]);
