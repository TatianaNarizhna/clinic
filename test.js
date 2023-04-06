// useEffect(() => {
//   if (activeButtonId === 'location') {
//     const storedMarkers = localStorage.getItem('markers');
//     if (storedMarkers !== null) {
//       const parsedMarkers = JSON.parse(storedMarkers) as ICoordinates[];
//       parsedMarkers && setMarkers(parsedMarkers);
//     }
//   } else {
//     setMarkers(coordinates);
//     localStorage.setItem('markers', JSON.stringify(coordinates));
//   }
// }, [activeButtonId, coordinates]);

// console.log(activeButtonId);
// console.log(markers);

// useEffect(() => {
//   if (markers && markers.length > 0) {
//     setMapOptions({
//       center: {
//         lat: markers[0].latitude,
//         lng: markers[0].longitude,
//       },
//       zoom: 9,
//     });
//   }
// }, [markers]);
