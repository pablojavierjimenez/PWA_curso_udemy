var request = new XMLHttpRequest;

request.open('GET', "https://reqres.in/api/users", true);
request.send(null);

request.onreadystatechange = function (state){
    if ( request.readyState === 4) {
        var res = request.response;

        var respObject = JSON.parse(res);

        console.log(respObject)
    }
}