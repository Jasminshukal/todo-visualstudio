(function () {
const vscode = acquireVsCodeApi();
const button = document.getElementById('js-button');
const testapi = fetch('https://dummyjson.com/products');


/*for ( var i = 0; i < testapi.length ; i++) {*/

testapi
.then(data => data.json())
.then(data => {
    console.log(data.products);
    let users = [];

    data.products.forEach((staffDetail) => {
        users.push(
                  `
                    <h1>${staffDetail.title}</h1>
                    <p>${staffDetail.brand}</p>
                    <button class="error_btn" id='error'>Remove</button>
                    <hr>
                  `);
    });
    document.getElementById('content').innerHTML= users.join("");
  }).catch(function(err) {
    console.log('Fetch Error :-S', err);
  });

    button.innerText="Save Todo";
}());

