function getUserRepos(name) {
  fetch(`https://api.github.com/users/${name}/repos`)
    .then(fetchStatusHandler)
    .then((response) => response.json())
    .then((responseJson) => displayResults(responseJson))
    .catch((e) => alert("Something bad happened!  Try Again!"));
}

function displayResults(responseJson) {
  // if there are previous results, remove them
  // console.log(responseJson);
  console.log(responseJson);
  $("#results-list").empty();
  //iterate through the articles array, stopping at the max number of results
  for (let i = 0; i < responseJson.length; i++) {
    // for each repo object in the repos
    //array, add a list item to the results
    //list with the repo name and link

    $("#results-list").append(
      `<li><h3><a href="${responseJson[i].html_url}">${responseJson[i].name}</a></h3>
         </li>`
    );
  }
}

//display the results section
$("#results").removeClass("hidden");

function fetchStatusHandler(response) {
  if (response.status === 200) {
    return response;
  } else {
    throw new Error(response.statusText);
  }
}

function watchForm() {
  $("form").submit((event) => {
    event.preventDefault();
    let userName = $("#whatName").val();
    getUserRepos(userName);
  });
}

$(function () {
  console.log("App loaded! Waiting for submit!");
  watchForm();
});
