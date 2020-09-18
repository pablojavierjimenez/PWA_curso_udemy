
/**
 * FETCH
 * documentation
 * @link https://developer.mozilla.org/en-US/docs/Web/API/Response
 */

fetch( "https://reqres.in/api/users")
    .then( data => data.json())
    .then( resp => {
        console.log(resp);
        console.log(resp.page)
        console.log(resp.per_page)
    })


fetch("http://google.com")
    .then( res => res.text() )
    .then( html => {
        var container = document.getElementById('container');        
        container.innerHTML = html;
    })