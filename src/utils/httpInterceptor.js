import 'whatwg-fetch';

export const httpInterceptor = {
  get: (url, token) => fetch(url, { method: 'GET', mode: 'cors',
    headers: {
      Authorization: `JWT ${token}`,
      Accept: 'application/json',
    } })
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          return response.json();
        }
        const error = new Error(response.statusText);
        error.response = response;
        throw error;
      }),

  post: (url, formData) => {
    const header = new Headers({
      'Access-Control-Allow-Origin': '',
      'Content-Type': 'multipart/form-data',
    });
    return fetch(url, {
      method: 'POST',
      mode: 'cors',
      header,
      body: formData,
    })
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          return response.json();
        }
        const error = new Error(response.statusText);
        error.response = response;
        throw error;
      });
  },
};
