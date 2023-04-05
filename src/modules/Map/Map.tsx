import React from 'react';
import { useMemo } from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import { IResItem } from '../../types/searchTypes';
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
  const center = useMemo(() => ({ lat: -24, lng: 134 }), []);
  return (
    <GoogleMap zoom={4} center={center} mapContainerClassName={s.map_container}>
      {coordinates &&
        coordinates.map((marker, i) => (
          <Marker
            key={i}
            position={{ lat: marker.latitude, lng: marker.longitude }}
            icon={
              marker.latitude === dataRes?.latitude &&
              marker.longitude === dataRes?.longitude
                ? './markerGreen.png'
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
