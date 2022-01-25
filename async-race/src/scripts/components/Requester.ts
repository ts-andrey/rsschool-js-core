const SERVER_URL = 'http://127.0.0.1:3000';

export const getAllCarsRequest = async (page?: number, limit?: number) => {
  const searchParams = `_page=${page}&_limit=${limit}`;
  let dataResult: Response;
  if (page !== undefined && limit !== undefined) {
    dataResult = await fetch(`${SERVER_URL}/garage?${searchParams}`);
  } else {
    dataResult = await fetch(`${SERVER_URL}/garage`);
  }
  const data = await dataResult.json();
  console.log({ dataResult, data });
  return data;
};

export const getCarRequest = async (id: number) => {
  const searchParams = `id=${id}`;
  const dataResult = await fetch(`${SERVER_URL}/garage/${id}?${searchParams}`);
  const data = await dataResult.json();
  console.log(searchParams);

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

export const startCarEngineRequest = async (id: number, status = 'started') => {
  const searchParams = `id=${id}&status=${status}`;
  const dataResult = await fetch(`${SERVER_URL}/engine?${searchParams}`, {
    method: 'PATCH',
  });
  return dataResult;
};
export const stopCarEngineRequest = async (id: number, status = 'stopped') => {
  const searchParams = `id=${id}&status=${status}`;
  const dataResult = await fetch(`${SERVER_URL}/engine?${searchParams}`, {
    method: 'PATCH',
  });
  return dataResult;
};

export const switchCarEngineMoveRequest = async (id: number, status: string) => {
  const searchParams = `id=${id}&status=${status}`;
  const dataResult = await fetch(`${SERVER_URL}/engine?id=${searchParams}`, {
    method: 'PATCH',
  });
  return dataResult;
};

export const getAllWinnersRequest = async (page?: number, limit?: number, sort?: string, order?: string) => {
  const searchParams = `_page=${page}&_limit=${limit}&_sort=${sort}&_order=${order}`;
  const dataResult = await fetch(`${SERVER_URL}/winners`);
  const data = await dataResult.json();
  console.log({ dataResult, data });
  return data;
};

export const getWinnerRequest = async (id: number) => {
  const searchParams = `id=${id}`;
  const dataResult = await fetch(`${SERVER_URL}/winners/${id}?${searchParams}`);
  const data = await dataResult.json();
  return data;
};

/**
 * should provide [id:number], [winds:number], [time:number] in json format
 */
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
