import { State } from './../components/State';
import { createCarRequest, updateCarRequest } from '../components/Requester';
import { Garage } from '../components/Garage';
import { renderNewCar, updateCarData } from '../components/Util';

const state = new State();

export const garageController = async () => {
  const garage = new Garage();

  garage.seekerCreateCar(createCarHandler);
  garage.seekerUpdateCar(updateCarHanlder);
  garage.seekerRaceCars(raceCarsHandler);
  garage.seekerResetCars(resetCarsHandler);
  garage.seekerGenerateCars(generateCarsHandler);

  garage.seekerSelectCar(selectCarHandler);
  garage.seekerRemoveCar(deleteCarHandler);

  garage.seekerStartCar(startCarHandler);
  garage.seekerReturnCar(returnCarHandler);
};

async function createCarHandler(name: HTMLInputElement, color: HTMLInputElement) {
  if (name.value.length > 3) {
    const data = {
      name: name.value,
      color: color.value,
    };
    const result = await createCarRequest(JSON.stringify(data));
    renderNewCar(result);
  }
}

async function updateCarHanlder(name: HTMLInputElement, color: HTMLInputElement) {
  const id: number = state.selectedCar.id;
  if (id && id != undefined && id !== null) {
    const data = {
      name: name.value,
      color: color.value,
    };
    console.log(state);
    const result = await updateCarRequest(id, JSON.stringify(data));
    if (result.ok) {
      updateCarData(state.carElement, data.name, data.color);
    }
    state.setSelectedState(null, null, null);
    state.setCarElement(null);
    console.log(state);
  }
}
async function raceCarsHandler() {
  throw new Error('Function not implemented.');
}
async function resetCarsHandler() {
  throw new Error('Function not implemented.');
}
async function generateCarsHandler() {
  throw new Error('Function not implemented.');
}

async function selectCarHandler(
  id: number,
  name: string,
  color: string,
  nameInput: HTMLInputElement,
  colorInput: HTMLInputElement,
  el: HTMLElement
) {
  console.log(state, { id, name, color });
  state.setSelectedState(id, name, color);
  state.setCarElement(el);
  nameInput.value = name;
  colorInput.value = color;
}

async function deleteCarHandler(id: number) {
  console.log(id);
}

async function startCarHandler(id: number) {
  console.log(id);
}

async function returnCarHandler(el: HTMLElement) {
  console.log(el);
}
