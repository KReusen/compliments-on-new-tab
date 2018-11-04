function parse_quotes_from_web(json_response) {
  var data = json_response.feed.entry;
  var all_quotes = data.map(x => x.title.$t);
  cache_quotes(all_quotes);
  return all_quotes;
}

function get_random_quote(quotes) {
  var total_quotes = quotes.length;
  var random = Math.floor(Math.random() * total_quotes);
  return quotes[random];
}

function cache_quotes(quotes) {
  localStorage.setItem("last_updated", JSON.stringify(new Date()));
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

function get_quote_from_web() {
  const url =
    "https://spreadsheets.google.com/feeds/list/1_IJg6jPTlo0e3KeV-D4svnOV-G1DKP2a6wE7LqxhBuU/od6/public/values?alt=json";
  return fetch(url)
    .then(function(response) {
      return response.json();
    })
    .then(function(json_response) {
      return parse_quotes_from_web(json_response);
    })
    .then(function(all_quotes) {
      return get_random_quote(all_quotes);
    });
}

document.addEventListener("DOMContentLoaded", function() {
  var last_updated = localStorage.getItem("last_updated");
  var hours_passed = Math.abs(new Date() - JSON.parse(last_updated)) / 36e5;

  if (hours_passed > 24) {
    get_quote_from_web().then(function(response) {
      document.getElementById("quoteText").innerHTML = response;
    });
    console.log("got quote from web");
  } else {
    var quotes = JSON.parse(localStorage.getItem("quotes"));
    var random_quote = get_random_quote(quotes);
    document.getElementById("quoteText").innerHTML = random_quote;
    console.log("got quote from cache");
  }
});
