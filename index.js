const apiKey='smkycz0MpVZTlQvEnJbVhz9LDj6y0se1l7rGf4K9';
const searchURL = 'https://developer.nps.gov/api/v1/parks';

function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
};

function displayResults(responseJson) {
  console.log(responseJson);
  $('.results-list').empty();
  for (let i = 0; i < responseJson.data.length; i++){
        $('.results-list').append(
      `<li><h3>${responseJson.data[i].fullName}</h3>
      <p>${responseJson.data[i].description}</p>
      <a href="${responseJson.data[i].url}" target=_blank">${responseJson.data[i].url}</p>
      </li>`
    )};  
  $('.results').removeClass('hidden');
};

function getParkList(searchState, maxResults) {
  const params = {
    stateCode: searchState,
    limit: maxResults,
    api_key: apiKey,
  };
  const queryString = formatQueryParams(params);
  const url = searchURL + '?' + queryString;

  console.log(url);

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('.js-error').text(`Something went wrong: ${err.message}`);
    });
  };

function watchForm() {
  $('.js-form').submit(event => {
    event.preventDefault();
    const searchState = $('.js-searchState').val();
    const maxResults = $('.js-max-results').val();
    getParkList(searchState, maxResults);
  });
}

$(watchForm);