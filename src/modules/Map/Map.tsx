import { useMemo } from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import s from './Map.module.css';

const Map = () => {
  const center = useMemo(() => ({ lat: -24, lng: 134 }), []);
  return (
    <GoogleMap
      zoom={4}
      center={center}
      mapContainerClassName={s.map_container}
    ></GoogleMap>
  );
};

const MapComponent = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyC_3yuRXAlZz0w7Ohj5tJTLuuaUtuEiJnQ',
  });

  if (!isLoaded) {
    return <p>Loading...</p>;
  }

  return <Map />;
};

export default MapComponent;

// AIzaSyC_3yuRXAlZz0w7Ohj5tJTLuuaUtuEiJnQ
