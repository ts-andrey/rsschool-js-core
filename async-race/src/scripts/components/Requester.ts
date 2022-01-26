import { WinCarData } from '../interfaces/WinCarData';
import { CarData } from './../interfaces/CarData';

const SERVER_URL = 'http://127.0.0.1:3000';

export const getAllCarsRequest = async (page?: number, limit?: number) => {
  const searchParams = `_page=${page}&_limit=${limit}`;
  let dataResult: Response;
  if (page !== undefined && limit !== undefined) {
    dataResult = await fetch(`${SERVER_URL}/garage?${searchParams}`);
  } else {
    dataResult = await fetch(`${SERVER_URL}/garage`);
  }
  const data: CarData[] = await dataResult.json();
  return data;
};

export const getCarRequest = async (id: number) => {
  const searchParams = `id=${id}`;
  const dataResult = await fetch(`${SERVER_URL}/garage/${id}?${searchParams}`);
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
  const searchParams = `id=${id}`;
  const dataResult = await fetch(`${SERVER_URL}/garage/${id}?${searchParams}`, {
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
  const searchParams = `id=${id}&status=${status}`;
  const dataResult = await fetch(`${SERVER_URL}/engine?${searchParams}`, {
    method: 'PATCH',
  });
  return dataResult;
};

export const getAllWinnersRequest = async (page?: number, limit?: number, sort?: string, order?: string) => {
  const searchParams = `_page=${page}&_limit=${limit}&_sort=${sort}&_order=${order}`;
  const sortParams = `_sort=${sort}&_order=${order}`;
  let dataResult: Response;
  if (limit === undefined) {
    dataResult = await fetch(`${SERVER_URL}/winners?${sortParams}`);
  } else {
    dataResult = await fetch(`${SERVER_URL}/winners?${searchParams}`);
  }
  const data: WinCarData[] = await dataResult.json();
  return data;
};

export const getWinnerRequest = async (id: number) => {
  const searchParams = `id=${id}`;
  const dataResult = await fetch(`${SERVER_URL}/winners/${id}?${searchParams}`);
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
  const searchParams = `id=${id}`;
  const dataResult = await fetch(`${SERVER_URL}/winners/${id}?${searchParams}`, {
    method: 'DELETE',
  });
  return dataResult;
};

export const updateWinnerRequest = async (id: number, json: string) => {
  const searchParams = `id=${id}`;
  const dataResult = await fetch(`${SERVER_URL}/winners/${id}?${searchParams}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: json,
  });
  return dataResult;
};
