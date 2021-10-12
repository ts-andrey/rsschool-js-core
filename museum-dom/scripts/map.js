mapboxgl.accessToken = 'pk.eyJ1IjoiemFsZ29hIiwiYSI6ImNra3Nicmh0dzBicmcyd3BsaHJ4anhsZjYifQ.eIvW8DdJBsYAiDiltLuulg';
const map = new mapboxgl.Map({
  container: 'map', // container ID
  style: 'mapbox://styles/mapbox/light-v10', // style URL
  center: [2.3364, 48.86091], // starting position [lng, lat]
  zoom: 9, // starting zoom
});
