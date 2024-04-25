const addItembtn = document.querySelector('.btn1')
const clearItembtn = document.querySelector('.btn2')
const addClearbtn = document.querySelector('.buttons')
const dataSection = document.querySelector('.data')
const formSection = document.querySelector('.form')
const formSection2 = document.querySelector('.form2')
const formAddbtn = document.querySelector('.formAddbtn')
const formSavebtn = document.querySelector('.formSavebtn')
const formCancelbtn = document.querySelector('.formCancelbtn')
const form2Cancelbtn = document.querySelector('.form2Cancelbtn')
const editbtn = document.querySelector('.editBtn')
const deletebtn = document.querySelector('.deleteBtn')
const table = document.querySelector('#table')
const hR = document.querySelector('.hr')

function addRow(id, name, category, price, availability) {
    const newRow = document.createElement('tr')
    // console.log(newRow)
    if (table.innerHTML.trim() === '') {
        let headRow = `
    <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Availability</th>
                <th>Edit</th>
                <th>Delete</th>
            </tr>

    `
        table.innerHTML = headRow;
    }
    newRow.innerHTML =
        `
    <td>${id}</td>
    <td>${name}</td>
    <td>${category}</td>
    <td>${price}</td>
    <td>${availability}</td>
    <td><button id="editbtn" class="editBtn">Edit</button></td>
    <td><button id="deletebtn" class="deleteBtn">Delete</button></td>
    `


    dataSection.appendChild(newRow);
}


function loadData() {
    // const table = document.querySelector('#table');

    // table.innerHTML = ""
    let products = JSON.parse(localStorage.getItem('products'))

    for (let key in products) {
        if (products[key]) {
            // console.log(products[key].id)

            const check = products[key].availability === '1' ? 'Available' : 'out of stock';
            addRow(products[key].id, products[key].name, products[key].category, products[key].price, check)
        }
    }
}
loadData()

formSection.style.display = 'none';
formSection2.style.display = 'none';

addItembtn.addEventListener('click', function () {
    formSection.style.display = 'block';
    formSection2.style.display = 'none';
    dataSection.style.display = 'none';
    addClearbtn.style.display = 'none';
    hR.style.display = 'none'
})



clearItembtn.addEventListener('click', function () {
    localStorage.clear()
    window.location.reload()
})


///////////////////  ADD ITEM BUTTON  //////////////////////

document.body.addEventListener('submit', function (e) {

    // e.preventDefault()

    const itemId = document.querySelector('#itemid').value
    const itemName = document.querySelector('#itemName').value
    const itemCategory = document.querySelector('#itemCategory').value
    const itemPrice = document.querySelector('#itemPrice').value
    const itemAvailability = document.querySelector('#itemAvailability').value
    // console.log(itemAvailability)
    // formSection.style.display = 'none';
    // dataSection.style.display = 'block';
    // addClearbtn.style.display = 'block';

    const product = {
        id: itemId,
        name: itemName,
        category: itemCategory,
        price: itemPrice,
        availability: itemAvailability
    }

    let products = JSON.parse(localStorage.getItem('products')) || [];

    const idExists = products.some(item => item.id === itemId);
    console.log(typeof idExists)
    if (idExists) {
        alert('Id Already Exist')
        e.preventDefault()
        return;

    } else if (itemAvailability == '0' && itemAvailability == '1') {
        alert('Enter Values 0 and 1 only')
        e.preventDefault()
        return;
    }
    else {
        products.push(product);
        localStorage.setItem('products', JSON.stringify(products));
        loadData();
        window.location.reload()
    }
    loadData();


    formSection.style.display = 'none';
    dataSection.style.display = 'block';
    addClearbtn.style.display = 'block';


})


formCancelbtn.addEventListener('click', function () {
    formSection.style.display = 'none';
    window.location.reload()
})

form2Cancelbtn.addEventListener('click', function () {
    formSection2.style.display = 'none';
    window.location.reload()
})



/*                          edit row                                           */
document.addEventListener('click', function (e) {
    if (e.target.classList.contains('editBtn')) {
        const closestRow = e.target.closest('tr');
        const cells = closestRow.querySelectorAll('td');


        const itemId = cells[0].textContent;
        const itemName = cells[1].textContent;
        const itemCategory = cells[2].textContent;
        const itemPrice = cells[3].textContent;
        const itemAvailability = cells[4].textContent;
        // console.log(itemName)
        // console.log(itemCategory)

        // e.preventDefault()
        document.querySelector('#editItemid').value = itemId;
        document.querySelector('#editItemName').value = itemName;
        document.querySelector('#editItemCategory').value = itemCategory;
        document.querySelector('#editItemPrice').value = itemPrice;
        document.querySelector('#editItemAvailability').value = itemAvailability;
        // console.log(itemAvailability)


        formSection2.style.display = 'block';
        formSection.style.display = 'none';
        dataSection.style.display = 'none';
        addClearbtn.style.display = 'none';
        hR.style.display = 'none';

        ///////////////////////////////////////////////      FORM SAVE BUTTON    ///////////////////////////////////

        formSavebtn.addEventListener('click', function () {

            let updatedName = document.querySelector('#editItemName').value;
            let updatedCategory = document.querySelector('#editItemCategory').value;
            let updatedPrice = document.querySelector('#editItemPrice').value;
            let updatedAvailability = document.querySelector('#editItemAvailability').value;
            console.log(updatedName, updatedCategory, updatedPrice, updatedAvailability)

            if (updatedAvailability == '0' && updatedAvailability == '1') {
                alert('Enter Values 0 and 1 only')
                e.preventDefault()
                return;
            }

            // update row data
            cells[1].textContent = updatedName;
            cells[2].textContent = updatedCategory;
            cells[3].textContent = updatedPrice;
            cells[4].textContent = updatedAvailability;

            // update localstorage
            let products = JSON.parse(localStorage.getItem('products')) || [];

            let index = Array.from(closestRow.parentNode.children).indexOf(closestRow);
            // console.log(closestRow)
            // console.log(closestRow.parentNode)
            // console.log(closestRow.parentNode.children)
            console.log(Array.from(closestRow.parentNode.children).indexOf(closestRow))

            // [js Array 0 index thi start thay.]
            // products[index]  aa 1st index thi start thatu hatu etle navi row add thati hati
            // etle ene -1 karine 0th index par laya jethi eni ej row edit thay. navi create na thay.
            products[index - 1] = {
                id: itemId,
                name: updatedName,
                category: updatedCategory,
                price: updatedPrice,
                availability: updatedAvailability
            }

            localStorage.setItem('products', JSON.stringify(products))

            formSection2.style.display = 'none';
            dataSection.style.display = 'block';
            addClearbtn.style.display = 'block';
            hR.style.display = 'block';

            window.location.reload()


        })

    }
});


/////////////////////////////           Delete Button          ////////////////////////////////////////////////////

document.addEventListener('click', function (e) {
    // console.log(e.target.classList)
    if (e.target.classList.contains('deleteBtn')) {
        const closestRow = e.target.closest('tr');
        const cells = closestRow.querySelectorAll('td');
        console.log(cells)

        const rowIndex = e.target.closest('tr').rowIndex;
        console.log(rowIndex)
        table.deleteRow(rowIndex);
        // cells.remove()
        // localStorage.clear()
        // closestRow.remove()
        // localStorage.removeItem('products')

        let products = JSON.parse(localStorage.getItem('products')) || [];
        console.log(products)
        products.splice(rowIndex - 1, 1);
        localStorage.setItem('products', JSON.stringify(products))
        // console.log(products[0])
        // console.log(products[1])
        // console.log(products[2])
        // products.push(product)



        for (let key in products) {
            console.log(key)
            console.log(products[key])
        }
    }
})



