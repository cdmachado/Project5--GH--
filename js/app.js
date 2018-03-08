const ul = document.getElementsByTagName('ul')[0];
const nameList = document.getElementsByClassName('name');
const emailList = document.getElementsByClassName('email');
const cityList = document.getElementsByClassName('city');
const phoneList = document.getElementsByClassName('phone');
const addressList = document.getElementsByClassName('address');
const birthdayList = document.getElementsByClassName('birthday');
const picList = document.getElementsByTagName('img');
const body = document.getElementsByTagName('body')[0];
const classesBox = ['name', 'email', 'city'];
const classesModal = ['phone', 'address', 'birthday'];


// Creation of the employee LI and Modal window
function createElement(elm, clase, parent) {
  let element = document.createElement(elm);
  if (clase !== null && elm !== 'img') {
    element.className = clase;
  } else if (elm === 'img') {
    parent.className = clase;
  }
  if (parent !== null) {
    parent.appendChild(element);
  }
  return element;
}

function createEmployee(i) {
  let li = createElement('li', 'container container2 item', ul);
  li.id = i;
  let mainDiv = createElement('div', 'modal2', li);
  let picDiv = createElement('div', null, mainDiv);
  let anchor = createElement('a', null, picDiv);
  createElement('img', 'open-popup-link', anchor);
  anchor.setAttribute('href', `#modal${i}`);
  let infoDiv = createElement('div', null, mainDiv);
  placeData(classesBox, infoDiv);
}

function placeData(classes, div) {
  classes.forEach((clase) => {
    let employeeInfo = document.createElement('p');
    employeeInfo.className = clase;
    div.appendChild(employeeInfo);
  });
}

function createModal(i) {
  let div = createElement('div', 'white-popup mfp-hide modal', null);
  div.id = `modal${i}`;
  body.insertBefore(div, ul);
  let upperModal = createElement('div', 'info_modal', div);
  let img = document.createElement('img');
  upperModal.appendChild(img);
  placeData(classesBox, upperModal);
  placeData(classesModal, upperModal);
}

// Handle AJAX request
function modifyEmployeeInfo(variable, i, string) {
  variable[i].textContent = string;
  if (variable.length > 12) {
    variable[i + 12].textContent = string;
  }
}

function capitalizeFirst(name) {
  return name.charAt(0).toUpperCase() + name.slice(1);
}

function orderDOB(dob) {
  let day = dob.slice(8, 10);
  let month = dob.slice(5, 7);
  let year = dob.slice(2, 4);
  return `${month}/${day}/${year}`;
}

const employeeAPI = 'https://randomuser.me/api/?results=12&inc=name,email,location,phone,dob,picture&nat=gb';
function displayData(data) {
  for (let i = 0; i < 12; i++) {
    let array = data.results;
    let employee = array[i];
    modifyEmployeeInfo(nameList, i, `${capitalizeFirst(employee.name.first)} ${capitalizeFirst(employee.name.last)}`);
    modifyEmployeeInfo(emailList, i, employee.email);
    modifyEmployeeInfo(cityList, i, capitalizeFirst(employee.location.city));
    modifyEmployeeInfo(phoneList, i, employee.phone);
    modifyEmployeeInfo(addressList, i, `${employee.location.street}, ${employee.location.postcode}`);
    modifyEmployeeInfo(birthdayList, i, `Birthday: ${orderDOB(employee.dob)}`);
    picList[i].src = employee.picture.large;
    picList[i + 12].src = employee.picture.large;
  }
}
$.getJSON(employeeAPI, displayData);


//Lightbox plugin interface
function NewModal(source, tipo, id) {
  this.src = source + id;
  this.type = 'inline';
}

function lowerThan12(id, num) {
  if (id + num > 12) {
    return (id + num) - 12;
  } else if (id + num === 12) {
    return 0;
  } else {
    return id + num;
  }
}


function constructModals(id) {
  let modalShow = [];
  let arrayOfItems = [];
  for (let i = 0; i < arrayLi.length; i++) {
    let li = arrayLi[i];
    if (li.style.display !== 'none') {
      modalShow.push(li);
    }
  }
  for (let i = 0; i < modalShow.length; i++) {
    let item;
    item = new NewModal('#modal', 'inline', (lowerThan12(id, i)));
    arrayOfItems.push(item);
  }
  $.magnificPopup.open({
    items: arrayOfItems,
    gallery: {
      enabled: true
    }
  });
}

// Load HTML
for (let i = 0; i < 12; i++) {
  createEmployee(i);
  createModal(i);
}

// Event Listeners
ul.addEventListener('click', (e) => {
  debugger;
  let target = e.target;
  let id = '';
    if (target.tagName === 'LI') {
      id = parseInt(target.id);
    } else if (target.tagName === 'DIV' && target.className == 'modal2') {
      id = parseInt(target.parentNode.id);
    } else if (target.tagName === 'DIV') {
      id = parseInt(target.parentNode.parentNode.id);
    } else if (target.tagName === 'IMG') {
      id = parseInt(target.parentNode.parentNode.parentNode.parentNode.id);
    } else {
      id = parseInt(target.parentNode.parentNode.parentNode.id);
    }
    debugger;
    target.tagName === 'UL' ? e.preventDefault() : constructModals(id);
});

ul.addEventListener('mouseover', (e) => {
  let target = e.target;
  target.style.cursor = 'pointer';
  if (target.tagName == 'UL') {
    target.style.cursor = 'default';
  }
});


// Search buttons interface
const searchInput = document.getElementById('search');
const searchButton = document.getElementsByTagName('button')[0];
const listButton = document.getElementsByTagName('button')[1];
const liList = document.getElementsByTagName('li');
const arrayLi = Array.from(liList);

function showOrHide(array, display) {
  array.forEach(elm => elm.style.display = display);
}

searchButton.addEventListener('click', () => {
  let searchValue = searchInput.value.toUpperCase();
  let searchNames = ul.getElementsByClassName('name');
  let arrayOfEmployees = [];
  if (searchValue !== '') {
    for (let i = 0; i < searchNames.length; i++) {
      let name = searchNames[i];
      if (name.textContent.toUpperCase().includes(searchValue)) {
        let li = name.parentNode.parentNode.parentNode;
        arrayOfEmployees.push(li);
      }
    }
    showOrHide(arrayLi, 'none');
    showOrHide(arrayOfEmployees, 'block');
    searchInput.value = '';
  } else {
    alert('Please write a name');
  }
});

searchInput.addEventListener('keyup', (e) => {
  if (e.keyCode === 13) {
    searchButton.click();
  }
});

listButton.addEventListener('click', () => {
  showOrHide(arrayLi, 'block');
});
