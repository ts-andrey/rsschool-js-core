import { CarData } from '../interfaces/CarData';
import { GarageView } from '../view/Garage';

export const getCarData = (el: HTMLElement) => {
  const carBox = el.parentElement.querySelector('.car-item__car-img-box');
  const carName = (el.querySelector('.car-item__model') as HTMLElement).innerText;
  const carId = Number(carBox.getAttribute('data-id'));
  const carColor = carBox.querySelector('g').getAttribute('fill');
  return { id: carId, name: carName, color: carColor };
};

export const updateCarData = (el: HTMLElement, newCarName: string, newCarColor: string) => {
  (el.querySelector('.car-item__model') as HTMLElement).innerText = newCarName;
  el.querySelector('g').setAttribute('fill', newCarColor);
};

export const renderNewCar = async (result: Response) => {
  const reader = result.body.getReader();
  const stream = new ReadableStream({
    start(controller) {
      return pump();
      function pump(): Promise<Uint8Array> {
        return reader.read().then(({ done, value }) => {
          if (done) {
            controller.close();
            return;
          }
          controller.enqueue(value);
          return pump();
        });
      }
    },
  });
  const carDataResponse = new Response(stream);
  const carSataBlob = await carDataResponse.blob();
  const carData: CarData = JSON.parse(await carSataBlob.text());
  const garageView = new GarageView();
  garageView.renderCar(carData);
  console.log(carData);
};
