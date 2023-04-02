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

// import React from 'react';
// import { useMemo, useState, useEffect } from 'react';
// import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
// import { useJsApiLoader } from '@react-google-maps/api';
// import { ISearchResponse, IResItem } from '../../types/searchTypes';
// import s from './Map.module.css';

// interface IMapProps {
//   clinics: ISearchResponse | null;
// }

// interface ICoordinate {
//   id: any;
//   lat: () => number;
//   lng: () => number;
// }

// const Map: React.FC<any> = ({ clinics }: { clinics: any[] }) => {
//   const center = useMemo(() => ({ lat: -24, lng: 134 }), []);
//   // console.log(clinics);

//   return (
//     <GoogleMap zoom={4} center={center} mapContainerClassName={s.map_container}>
//       {/* {clinics &&
//         clinics.map((clinic: any, i: number) => (
//           <Marker key={i} position={{ lat: clinic.lat, lng: clinic.lng }} />
//         ))} */}
//     </GoogleMap>
//   );
// };

// const MapComponent: React.FC<IMapProps> = ({ clinics }) => {
//   // const [coordinates, setCoordinates] = useState<ICoordinate[]>();
//   const { isLoaded, loadError } = useLoadScript({
//     googleMapsApiKey: 'AIzaSyC_3yuRXAlZz0w7Ohj5tJTLuuaUtuEiJnQ',
//   });

// const init = async (arr: any) => {
//   const coordinates = [];
//   let geo = new google.maps.Geocoder();

//   if (Array.isArray(clinics)) {
//     for (const clinic of clinics) {
//       console.log(clinic.address);
//       const results: any = await geo.geocode({ address: clinic.address });
//       console.log(results);

//       if (results.length > 0) {
//         const res = results[0].geometry.viewport;
//         coordinates.push({ id: clinic.id, lat: res.Ga, lng: res.Va });
//         console.log(coordinates);
//       }
//     }
//   }
// };

// useEffect(() => {
//   if (isLoaded) {
//     init(clinics);
//   }
// }, [isLoaded, clinics]);

// if (loadError) {
//   return <p>There was an error loading the Google Maps API</p>;
// }

//   if (!isLoaded) {
//     return <p>Loading...</p>;
//   }

//   return <Map clinics={clinics} />;
// };

// export default MapComponent;

// import React from 'react';
// import { useMemo, useState, useEffect } from 'react';
// import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
// import { useJsApiLoader } from '@react-google-maps/api';
// import { ISearchResponse, IResItem } from '../../types/searchTypes';
// import s from './Map.module.css';

// interface IMapProps {
//   clinics: ISearchResponse | null;
// }

// interface ICoordinate {
//   id: any;
//   lat: () => number;
//   lng: () => number;
// }

// const Map: React.FC<any> = ({ clinics }: { clinics: any[] }) => {
//   const center = useMemo(() => ({ lat: -24, lng: 134 }), []);
//   // console.log(clinics);

//   return (
//     <GoogleMap zoom={4} center={center} mapContainerClassName={s.map_container}>
//       {/* {clinics &&
//         clinics.map((clinic: any, i: number) => (
//           <Marker key={i} position={{ lat: clinic.lat, lng: clinic.lng }} />
//         ))} */}
//     </GoogleMap>
//   );
// };

// const MapComponent: React.FC<IMapProps> = ({ clinics }) => {
//   const [coordinates, setCoordinates] = useState<ICoordinate[]>();

//   const { isLoaded } = useLoadScript({
//     googleMapsApiKey: 'AIzaSyC_3yuRXAlZz0w7Ohj5tJTLuuaUtuEiJnQ',
//   });

//   const init = (arr: any) => {
//     const coordinates = [];
//     let geo = new google.maps.Geocoder();

//     const address = arr.map((el: any) => {
//       const results = geo.geocode({ address: el.address });
//       console.log(results);
//     });
//     console.log(address);
//   };

//   init(clinics);

//   if (!isLoaded) {
//     return <p>Loading...</p>;
//   }

//   return <Map clinics={clinics} />;
// };

// export default MapComponent;

// AIzaSyC_3yuRXAlZz0w7Ohj5tJTLuuaUtuEiJnQ

// import React from 'react';
// import { useMemo, useState, useEffect } from 'react';
// import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
// import { useJsApiLoader } from '@react-google-maps/api';
// import { ISearchResponse, IResItem } from '../../types/searchTypes';
// import s from './Map.module.css';

// interface IMapProps {
//   clinics: ISearchResponse | null;
// }

// interface ICoordinate {
//   id: any;
//   lat: () => number;
//   lng: () => number;
// }

// const Map: React.FC<any> = ({ clinics }: { clinics: any[] }) => {
//   const center = useMemo(() => ({ lat: -24, lng: 134 }), []);
//   return (
//     <GoogleMap zoom={4} center={center} mapContainerClassName={s.map_container}>
//       {clinics &&
//         clinics.map((clinic: any, i: number) => (
//           <Marker key={i} position={{ lat: clinic.lat, lng: clinic.lng }} />
//         ))}
//     </GoogleMap>
//   );
// };

// const MapComponent: React.FC<IMapProps> = ({ clinics }) => {
//   const [coordinates, setCoordinates] = useState<ICoordinate[]>();

//   const { isLoaded } = useLoadScript({
//     googleMapsApiKey: 'AIzaSyC_3yuRXAlZz0w7Ohj5tJTLuuaUtuEiJnQ',
//   });

//   useEffect(() => {
//     const geocoder = new window.google.maps.Geocoder();

//     const getCoordinates = async () => {
//       const coordinates: ICoordinate[] = [];

//       if (Array.isArray(clinics)) {
//         for (const clinic of clinics) {
//           const { results } = await geocoder.geocode({
//             address: clinic.address,
//           });

//           if (results.length > 0) {
//             const { lat, lng } = results[0].geometry.location;
//             coordinates.push({ id: clinic.id, lat, lng });
//           }
//         }
//       }

//       setCoordinates(coordinates);
//     };

//     if (isLoaded) {
//       getCoordinates();
//     }
//   }, [clinics, isLoaded]);

//   if (!isLoaded) {
//     return <p>Loading...</p>;
//   }

//   return <Map clinics={clinics} />;
// };

// export default MapComponent;
