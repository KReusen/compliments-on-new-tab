var sheet_id = "";

function pick_compliment(json_response) {
  var all_compliments = json_response.feed.entry;
  var total_compliments = all_compliments.length;
  var random = Math.floor(Math.random() * total_compliments);
  return all_compliments[random].title.$t;
}

function get_compliment() {
  const url = `https://spreadsheets.google.com/feeds/list/${sheet_id}/od6/public/values?alt=json`;
  return fetch(url)
    .then(function(response) {
      return response.json();
    })
    .then(function(json_response) {
      return pick_compliment(json_response);
    });
}

document.addEventListener("DOMContentLoaded", function() {
  get_compliment().then(function(response) {
    document.getElementById("complimentText").innerHTML = response;
  });
});
