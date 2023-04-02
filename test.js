// import { useMemo } from 'react';
// import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
// import s from './Map.module.css';

// const Map = ({ clinics }) => {
//   const center = useMemo(() => ({ lat: -24, lng: 134 }), []);

//   return (
//     <GoogleMap zoom={4} center={center} mapContainerClassName={s.map_container}>
//       {clinics.map(clinic => (
//         <Marker
//           key={clinic.id}
//           position={{ lat: clinic.lat, lng: clinic.lng }}
//         />
//       ))}
//     </GoogleMap>
//   );
// };

// const MapComponent = ({ clinics }) => {
//   const { isLoaded } = useLoadScript({
//     googleMapsApiKey: 'YOUR_API_KEY_HERE',
//   });

//   if (!isLoaded) {
//     return <p>Loading...</p>;
//   }

//   return <Map clinics={clinics} />;
// };

// export default MapComponent;

// <div className={s.search_res}>
//   <div>
//     {responseData === null ? (
//       <p>No results, please try again</p>
//     ) : (
//       <ul>
//         {Array.isArray(responseData) &&
//           responseData.map((item, i) => (
//             <li key={i} className={s.clinic_item}>
//               <h4>{item.longName}</h4>
//               <p>{item.city}</p>
//               <p>{item.address}</p>
//               <p>{item.website}</p>
//               <p>{item.phone}</p>
//             </li>
//           ))}
//       </ul>
//     )}
//   </div>

//   <div>
//     <MapComponent clinics={responseData} />
//   </div>
// </div>;

// ------------------------no lan lng
// import { useMemo, useState, useEffect } from 'react';
// import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
// import s from './Map.module.css';

// const Map = ({ clinics }) => {
//   const center = useMemo(() => ({ lat: -24, lng: 134 }), []);

//   return (
//     <GoogleMap zoom={4} center={center} mapContainerClassName={s.map_container}>
//       {clinics.map(clinic => (
//         <Marker
//           key={clinic.id}
//           position={{ lat: clinic.lat, lng: clinic.lng }}
//         />
//       ))}
//     </GoogleMap>
//   );
// };

// const MapComponent = ({ clinics }) => {
//   const [coordinates, setCoordinates] = useState([]);

//   const { isLoaded } = useLoadScript({
//     googleMapsApiKey: 'YOUR_API_KEY_HERE',
//   });

//   useEffect(() => {
//     const geocoder = new window.google.maps.Geocoder();

//     const getCoordinates = async () => {
//       const coordinates = [];

//       for (const clinic of clinics) {
//         const { results } = await geocoder.geocode({ address: clinic.address });

//         if (results.length > 0) {
//           const { lat, lng } = results[0].geometry.location;
//           coordinates.push({ id: clinic.id, lat, lng });
//         }
//       }

//       setCoordinates(coordinates);
//     };

//     if (isLoaded) {
//       getCoordinates();
//     }
//   }, [isLoaded, clinics]);

//   if (!isLoaded) {
//     return <p>Loading...</p>;
//   }

//   return <Map clinics={coordinates} />;
// };

// export default MapComponent;
