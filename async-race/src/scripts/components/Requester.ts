import { WinCarData } from '../interfaces/WinCarData';
import { CarData } from './../interfaces/CarData';

const SERVER_URL = 'http://127.0.0.1:3000';

export const getAllCarsRequest = async (page?: number, limit?: number) => {
  let dataResult: Response;
  if (page && limit) {
    dataResult = await fetch(`${SERVER_URL}/garage?_page=${page}&_limit=${limit}`);
  } else {
    dataResult = await fetch(`${SERVER_URL}/garage`);
  }
  const data: CarData[] = await dataResult.json();
  return data;
};

export const getCarRequest = async (id: number) => {
  const dataResult = await fetch(`${SERVER_URL}/garage/${id}?id=${id}`);
  const data: CarData = await dataResult.json();
  return data;
};

export const createCarRequest = async (json: string) => {
  const dataResult = await fetch(`${SERVER_URL}/garage`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: json,
  });
  return dataResult;
};
export const deleteCarRequest = async (id: number) => {
  const dataResult = await fetch(`${SERVER_URL}/garage/${id}?id=${id}`, {
    method: 'DELETE',
  });
  return dataResult;
};

export const updateCarRequest = async (id: number, json: string) => {
  const dataResult = await fetch(`${SERVER_URL}/garage/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: json,
  });
  return dataResult;
};

export const switchCarEngineState = async (id: number, status: string) => {
  const dataResult = await fetch(`${SERVER_URL}/engine?id=${id}&status=${status}`, {
    method: 'PATCH',
  });
  return dataResult;
};

export const getAllWinnersRequest = async (page?: number, limit?: number, sort?: string, order?: string) => {
  let dataResult: Response;
  if (limit) {
    dataResult = await fetch(`${SERVER_URL}/winners?_page=${page}&_limit=${limit}&_sort=${sort}&_order=${order}`);
  } else {
    dataResult = await fetch(`${SERVER_URL}/winners?_sort=${sort}&_order=${order}`);
  }
  const data: WinCarData[] = await dataResult.json();
  return data;
};

export const getWinnerRequest = async (id: number) => {
  const dataResult = await fetch(`${SERVER_URL}/winners/${id}?id=${id}`);
  return dataResult;
};

export const createWinnerRequest = async (json: string) => {
  const dataResult = await fetch(`${SERVER_URL}/winners`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: json,
  });
  return dataResult;
};

export const deleteWinnerRequest = async (id: number) => {
  const dataResult = await fetch(`${SERVER_URL}/winners/${id}?id=${id}`, {
    method: 'DELETE',
  });
  return dataResult;
};

export const updateWinnerRequest = async (id: number, json: string) => {
  const dataResult = await fetch(`${SERVER_URL}/winners/${id}?id=${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: json,
  });
  return dataResult;
};
