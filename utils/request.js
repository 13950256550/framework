//require('es6-promise').polyfill();
import reqwest from 'reqwest';

//fetch('http://jsonplaceholder.typicode.com/posts').then(function(res){console.log(res)})

export default async function request(url, params) {
	  console.log('params:', params);
		let result = {};
    await reqwest({
      url: url,
      method: 'get',
      data: {
        results: 10,
        ...params,
      },
      type: 'json',
			error: function (err) { console.log('error:', err);},
			success: function (resp) {
				console.log('success:', resp);
			}
    }).then((data) => {
					result = data
          console.log('data:', data);
			});

		return result;
}