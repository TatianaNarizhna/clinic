// import { useMemo } from 'react';
// import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
// import s from './Map.module.css';

// const Map = ({ markers }) => {
//   const center = useMemo(() => ({ lat: -24, lng: 134 }), []);

//   return (
//     <GoogleMap zoom={4} center={center} mapContainerClassName={s.map_container}>
//       {markers.map((marker, index) => (
//         <Marker key={index} position={{ lat: marker.lat, lng: marker.lng }} />
//       ))}
//     </GoogleMap>
//   );
// };

// const MapComponent = () => {
//   const { isLoaded } = useLoadScript({
//     googleMapsApiKey: 'YOUR_API_KEY',
//   });

//   const markers = [
//     { lat: -24, lng: 134 },
//     { lat: -30, lng: 140 },
//     { lat: -20, lng: 130 },
//   ];

//   if (!isLoaded) {
//     return <p>Loading...</p>;
//   }

//   return <Map markers={markers} />;
// };

// export default MapComponent;

// -----------selected
// import { useState, useMemo } from 'react';
// import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
// import s from './Map.module.css';

// const Map = ({ markers, selectedLat }) => {
//   const center = useMemo(() => ({ lat: -24, lng: 134 }), []);
//   const [selectedMarkerIndex, setSelectedMarkerIndex] = useState(null);

//   const handleMarkerClick = index => {
//     setSelectedMarkerIndex(index);
//   };

//   return (
//     <GoogleMap zoom={4} center={center} mapContainerClassName={s.map_container}>
//       {markers.map((marker, index) => (
//         <Marker
//           key={index}
//           position={{ lat: marker.lat, lng: marker.lng }}
//           icon={{
//             url:
//               selectedLat && marker.lat === selectedLat
//                 ? 'selected-marker.png' // path to selected marker icon
//                 : 'marker.png', // path to default marker icon
//             scaledSize: new window.google.maps.Size(50, 50),
//           }}
//           onClick={() => handleMarkerClick(index)}
//         />
//       ))}
//     </GoogleMap>
//   );
// };

// const MapComponent = () => {
//   const { isLoaded } = useLoadScript({
//     googleMapsApiKey: 'YOUR_API_KEY',
//   });

//   const [selectedLat, setSelectedLat] = useState(null);
//   const markers = [
//     { lat: -24, lng: 134 },
//     { lat: -30, lng: 140 },
//     { lat: -20, lng: 130 },
//   ];

//   if (!isLoaded) {
//     return <p>Loading...</p>;
//   }

//   return (
//     <div>
//       <Map markers={markers} selectedLat={selectedLat} />
//       <ul>
//         {markers.map((marker, index) => (
//           <li key={index} onClick={() => setSelectedLat(marker.lat)}>
//             {marker.lat}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default MapComponent;

// -----
// <div className="main-map-info-block-map">
//     {infoAboutClinic?.lng ? (
//       <div>
//         <Map
//           defaultZoom={18}
//           defaultCenter={{
//             lat: infoAboutClinic?.lat,
//             lng: infoAboutClinic?.lng,
//           }}
//           markers={data}
//         />
//       </div>
//     ) : (
//       <div>
//         <Map
//           defaultZoom={4}
//           defaultCenter={{
//             lat: -25.48796477368385,
//             lng: 134.1424367952019,
//           }}
//           markers={data}
//         />
//       </div>
