 /**
  * Fetch: getting html elements from html file
  */

  let error = document.getElementById('error');
fetch( './no-encontrado.html')
    .then( res => res.text() )
    .then(htmlTmplate => {
        error.innerHTML = htmlTmplate;
     console.log(htmlTmplate)
    })