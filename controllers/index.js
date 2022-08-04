import { Product } from "../models/Products.js";

// renderTblProduct function
const renderTblProduct = arrProduct => {
    let html = '';
    for (let prod of arrProduct) {
        html += `<tr>
                    <td>${prod.id}</td>
                    <td>
                        <img src="${prod.img}" alt="...">
                    </td>
                    <td>${prod.name}</td>
                    <td>${prod.price}</td>
                    <td>${prod.description}</td>
                    <td>${prod.type}</td>
                    <td>
                        <button class="btn btn-danger" onclick="deleteProduct('${prod.id}')">
                            <i class="fa fa-trash"></i>
                        </button>
                        <button class="btn btn-warning" onclick="editProduct('${prod.id}')">
                            <i class="fa fa-edit"></i>
                        </button>
                    </td>
                </tr>`
    }
    document.querySelector("#tblProduct").innerHTML = html;
}

// GET data through api from back-end
const getProductApi = () => {
    let promise = axios({
        url: 'http://svcy.myclass.vn/api/Product/GetAll',
        method: 'GET'
    });
    promise.then(function (result) {
        console.log('result', result.data);
        renderTblProduct(result.data);
    });
    promise.catch(function (error) {
        console.log('error', error.response.data);
    })
};

// POST create product
document.querySelector("#btnCreateProduct").onclick = () => {
    let prod = new Product();

    let arrInput = document.querySelectorAll("#productCard .form-control, #productCard .form-select");
    for (let input of arrInput) {
        let { id, value } = input;
        prod[id] = value;
    }

    // call api
    let promise = axios({
        url: 'http://svcy.myclass.vn/api/Product/CreateProduct',
        method: 'POST',
        data: prod
    });
    // success
    promise.then(result => {
        console.log('result', result);
        getProductApi()
    });
    // fail
    promise.catch(error => {
        console.log('error', error.response.data);
    })
}

// DELETE delete product
window.deleteProduct = productIdClick => {
    console.log(productIdClick);

    // call api
    let promise = axios({
        url: 'http://svcy.myclass.vn/api/Product/DeleteProduct/' + productIdClick,
        method: 'DELETE'
    });
    // success
    promise.then(result => {
        console.log('result', result.data);
        getProductApi();
    });
    // fail
    promise.catch(error => {
        console.log('error', error.response.data);
    })
}

// GET edit product
window.editProduct = productIdClick => {
    console.log(productIdClick);
    let promise = axios({
        url: 'http://svcy.myclass.vn/api/Product/GetById/' + productIdClick,
        method: 'GET'
    });
    // success
    promise.then(result => {
        let prodInfo = result.data;
        let arrInput = document.querySelectorAll("#productCard .form-control, #productCard .form-select");
        console.log(arrInput);
        for (let input of arrInput) {
            let { id } = input;
            input.value = prodInfo[id];
        }
    });
    // fail
    promise.catch(error => {
        console.log('error', error.response.data);
    })
}

// PUT: update product
document.querySelector("#btnUpdateProduct").onclick = () => {
    // get data that user editted from layout --> send to api
    let prod = new Product();
    let arrInput = document.querySelectorAll("#productCard .form-control, #productCard .form-select");
    for (let input of arrInput) {
        let { id, value } = input;
        prod[id] = value;
    }
    // call api
    let promise = axios({
        url: 'http://svcy.myclass.vn/api/Product/UpdateProduct/' + prod.id,
        method: 'PUT',
        data: prod
    });
    // success
    promise.then(result => {
        console.log('resutl', result.data);
        getProductApi();
    });
    // fail
    promise.catch(error => {
        console.log('error', error);
    })
}

window.onload = function () {
    getProductApi();
}