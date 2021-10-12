L.mapbox.accessToken = 'pk.eyJ1IjoiemFsZ29hIiwiYSI6ImNra3Nicmh0dzBicmcyd3BsaHJ4anhsZjYifQ.eIvW8DdJBsYAiDiltLuulg';
const map = L.mapbox
  .map('map')
  .setView([48.86112605179928, 2.337762418762188], 16.5)
  .addLayer(L.mapbox.styleLayer('mapbox://styles/mapbox/light-v10'));


L.marker([48.86091, 2.3364], { color: '#7B7B7B' }).addTo(map);
L.marker([48.8602, 2.3333], { color: '#7B7B7B' }).addTo(map);
L.marker([48.8607, 2.3397], { color: '#7B7B7B' }).addTo(map);
L.marker([48.8619, 2.333], { color: '#7B7B7B' }).addTo(map);
L.marker([48.8625, 2.3365], { color: '#7B7B7B' }).addTo(map);
