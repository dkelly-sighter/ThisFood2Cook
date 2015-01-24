var serverCallMonitor = {
    server_called: false,
    response: null,

    // get json file from server
    getrecipesFromServer: function (callback) {
        var httpRequest = new XMLHttpRequest();

        httpRequest.onreadystatechange = function () {
            if (httpRequest.readyState === 4 && httpRequest.status === 200) {
                callback(httpRequest.responseText);
            }
        };

        httpRequest.open("GET", _const.recipe_file, true);
        httpRequest.send();
    },

    callInfo: function () {
        var get_response;
        if (!this.server_called) {
            this.getrecipesFromServer(function (server_response) {
                serverCallMonitor.response = JSON.parse(server_response);
            });
            this.server_called = true;
        }
    }
};

//check for user search. output search results.
function searchrecipes() {
    if (_const.user_search.value !== "") {
        displaySearchResults(serverCallMonitor.response, _const.user_search.value);
    } else {
        if(id_array[0]) {
            removeLink();
        }
        _const.results_div.innerHTML = "";
    }
}