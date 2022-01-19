import { getAllCarsRequest } from '../components/Util';

async function getData() {
  const dataResponse = await getAllCarsRequest();
  console.log(dataResponse);
}

getData();
