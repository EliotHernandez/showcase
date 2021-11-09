const renderTableHeader = () => {
    document.querySelector('table.products').innerHTML = `
        <tr>
            <th>Imagen</th>
            <th>Producto</th>
            <th>Marca</th>
            <th>Precio</th>
            <th></th>
        </tr>
    `;
}

const renderProduct = (product) => {
    document.querySelector('table.products').innerHTML += `
        <tr draggable="true" ondragstart="onDragStart(event);">
            <td><img src="img/${product.imagePath}" width="100" alt="Imagen del producto" /></td>
            <td id="productTitle">${product.title}</td>
            <td>${product.brand}</td>
            <td id="productPrice">${product.price}</td>
            <td><span onclick="addProductToCart('${product.title}', '${product.price}')" title="Añadir al carrito"><i class='fas fa-plus-circle addProduct'></i></span></td>
        </tr>
    `;
}

const renderNoProducts = () => {
    document.querySelector('table.products').innerHTML = '';
    document.querySelector('table').style.display = "none";
    document.getElementById('noProduct').style.display = "block";
}

const renderProducts = products => {
    document.querySelector('table').style.display = "table";
    document.getElementById('noProduct').style.display = "none";
    if (products === undefined) {
        renderNoProducts();
        return;
    }
    printShoppingCartTable();
    renderTableHeader();
    products.forEach(product => {
        renderProduct(product);
    });
}

const getProducts = async (type) => {
    try {
        const res = await axios.get('/data/products.json');
        const products = res.data[type];
        renderProducts(products);
    } catch (error) {
        console.error(error);
    }
}

const getSearchProductByTitle = (products, value) => {
    if (products === undefined) {
        return false;
    }
    products.forEach(product => {
        if (product.title === value) {
            renderProduct(product);
            return true;
        }
    });
    return false;
}

const getSearchProduct = async (value) => {
    try {
        resetProductTables();
        renderTableHeader();
        let counter = 0;
        const res = await axios.get('/data/products.json');
        const bebidas = res.data['bebidas'];
        if (bebidas !== undefined) {
            bebidas.forEach(product => {
                if (product.title === value) {
                    renderProduct(product);
                    counter++;
                }
            });
        }
        
        const alimentacion = res.data['alimentacion'];
        if (alimentacion !== undefined) {
            alimentacion.forEach(product => {
                if (product.title === value) {
                    renderProduct(product);
                    counter++;
                }
            });
        }
        
        const aperitivos = res.data['aperitivos'];
        if (aperitivos !== undefined) {
            aperitivos.forEach(product => {
                if (product.title === value) {
                    renderProduct(product);
                    counter++;
                }
            });
        }
        
        const bolleria = res.data['bolleria'];
        if (bolleria !== undefined) {
            bolleria.forEach(product => {
                if (product.title === value) {
                    renderProduct(product);
                    counter++;
                }
            });
        }
        
        const lacteos = res.data['lacteos'];
        if (lacteos !== undefined) {
            lacteos.forEach(product => {
                if (product.title === value) {
                    renderProduct(product);
                    counter++;
                }
            });
        }
        if (counter <= 0) {
            renderNoProducts();
        }
    } catch (error) {
        console.error(error);
    }
}

const resetProductTables = () => {
    document.querySelector('table.products').innerHTML = '';
    document.querySelector('table').style.display = "table";
    document.getElementById('noProduct').style.display = "none";
}

const addProductToCart = (productName, productPrice) => {
    document.querySelector('.emptyCart').style.display = "none";
    let tr = document.createElement("tr");
    tr.innerHTML = `
        <tr>
            <td onclick="deleteFromShoppingCart(this, ${productPrice})"><span title="Eliminar del carrito"><i class="fa fa-times deleteProduct"></i></span></td>
            <td>${productName}</td>
            <td>${productPrice} €</td>
        </tr>
    `;
    document.querySelector('.shoppingCart').appendChild(tr);
    addTotal(productPrice);
}

const deleteFromShoppingCart = (value, price) => {
    value.parentElement.remove();
    deleteTotal(price);
}

const deleteTotal = price => {
    const stringTotal = document.querySelector('.totalPrice').textContent;
    const arrayTotal = stringTotal.split(" ");
    const total = parseFloat(arrayTotal[0]);
    const res = Math.round(((total - parseFloat(price)) + Number.EPSILON) * 100) / 100;
    document.querySelector('.totalPrice').innerHTML = `${res} €`;
}

const addTotal = price => {
    const stringTotal = document.querySelector('.totalPrice').textContent;
    const arrayTotal = stringTotal.split(" ");
    const total = parseFloat(arrayTotal[0]);
    const res = Math.round(((total + parseFloat(price)) + Number.EPSILON) * 100) / 100;
    document.querySelector('.totalPrice').innerHTML = `${res} €`;
}

const onDragStart = event => {
    const title = event.target.querySelector('#productTitle').textContent;
    const price = event.target.querySelector('#productPrice').textContent;
    event.dataTransfer.setData('text/plain', [title, price]);
    event.currentTarget.style.backgroundColor = 'rgb(170, 212, 166)';
}

const onDragOver = event => {
    event.preventDefault();
}

const onDrop = event => {
    const data = event.dataTransfer.getData('text');
    const arrayData = data.split(",");
    addProductToCart(arrayData[0], arrayData[1]);
    event.dataTransfer.clearData();
}

const printShoppingCartTable = () => {
    document.querySelector('.shoppingCart').style.display = "table";
}