import React from 'react';
import { useState, useEffect } from 'react';
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from '@react-google-maps/api';
import { IResItem } from '../../types/searchTypes';
import markerGreen from './markerGreen.png';
import s from './Map.module.css';

interface ICoordinates {
  latitude: number;
  longitude: number;
  name: string;
}

interface IMyComponentProps {
  coordinates: ICoordinates[] | undefined;
  dataRes: IResItem | undefined;
}

const Map: React.FC<IMyComponentProps> = ({ coordinates, dataRes }) => {
  const [selectedMarker, setSelectedMarker] = useState<ICoordinates | null>(
    coordinates && coordinates.length > 0 ? coordinates[0] : null,
  );
  const [mapOptions, setMapOptions] = useState({
    center: { lat: -24, lng: 134 },
    zoom: 4,
  });

  useEffect(() => {
    if (dataRes) {
      setMapOptions({
        center: { lat: dataRes.latitude, lng: dataRes.longitude },
        zoom: 13,
      });

      setSelectedMarker(dataRes);
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
      {coordinates &&
        coordinates.length > 0 &&
        coordinates.map((marker, i) => (
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
                : ''
            }
            onClick={() => {
              setSelectedMarker(marker);
            }}
            title={marker?.name}
          />
        ))}
      {selectedMarker && (
        <InfoWindow
          position={{
            lat: selectedMarker.latitude,
            lng: selectedMarker.longitude,
          }}
          options={{
            pixelOffset: new google.maps.Size(0, -40),
          }}
          onCloseClick={() => {
            setSelectedMarker(null);
          }}
        >
          <div>{selectedMarker.name}</div>
        </InfoWindow>
      )}
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
