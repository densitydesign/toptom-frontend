const API_BASE_URL = 'http://jarvis.isi.it/api/jarvis';

const querystringParams = obj =>
	Object
		.entries(obj)
		.map(([k, v]) => `${k}=${v}`)
		.join('&');

export default (uri, params = {}, base = API_BASE_URL) => {
	console.log(`${base}/${uri}?${querystringParams(params)}`);
	return window
		.fetch(`${base}/${uri}?${querystringParams(params)}`)
		.then(response => response.json());
};
