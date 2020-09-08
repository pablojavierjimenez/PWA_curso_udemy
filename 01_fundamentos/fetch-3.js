
/**
 * Fetch :-> POST
 */

let user = {
    age: 39,
    name: 'pepe'
};

fetch( "https://reqres.in/api/users", {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
})
.then( res => res.json() )
.then(console.log)
.catch(err => {
    console.log('error en la peticion')
});