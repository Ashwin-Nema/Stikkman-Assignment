export const HTTP_METHODS = {
  POST: 'post',
  GET: 'get',
  PUT: 'put',
  DELETE: 'delete',
};
export const fetchHandler = async (
  url,
  method = HTTP_METHODS.GET,
  data,
  params
) => {
  let headers = {
    'Content-Type': 'application/json',
  };
  if (params) {
    let query = Object.keys(params)
      .map((k) => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
      .join('&');
    url = url + '?' + query;
  }
  return fetch(url, {
    method: method,
    body: (data && JSON.stringify(data)) || undefined,
    headers: headers,
    params: params,
  });
};
