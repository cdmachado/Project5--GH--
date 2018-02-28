const ul = document.getElementsByTagName('ul')[0];
const nameList = document.getElementsByClassName('name');
const emailList = document.getElementsByClassName('email');
const cityList = document.getElementsByClassName('city');
const phoneList = document.getElementsByClassName('phone');
const addressList = document.getElementsByClassName('address');
const birthdayList = document.getElementsByClassName('birthday');
const picList = document.getElementsByTagName('img');


function createEmployee(i) {
  let li = document.createElement('li');
  li.className = 'container container2 item';
  ul.appendChild(li);

  let picDiv = document.createElement('div');
  li.appendChild(picDiv);

  let anchor = document.createElement('a');
  anchor.setAttribute('data-lightbox', `infobox`);
  // anchor.setAttribute('href', `#${i}`);
  picDiv.appendChild(anchor);

  let img = document.createElement('img');
  anchor.appendChild(img);

  let infoDiv = document.createElement('div');
  infoDiv.className = 'info';
  infoDiv.id = `modal${i}`;
  li.appendChild(infoDiv);

  const classes = ['name', 'email', 'city', 'phone', 'address', 'birthday'];
  classes.forEach((clase) => {
    let employeeInfo = document.createElement('p');
    employeeInfo.className = clase;
    infoDiv.appendChild(employeeInfo);
  });
}

function orderDOB(dob) {
  let day = dob.slice(8, 10);
  let month = dob.slice(5, 7);
  let year = dob.slice(2, 4);
  return `${month}/${day}/${year}`;
}

for (let i = 0; i < 12; i++) {
  createEmployee(i);
}

function modifyEmployeeInfo(variable, i, string) {
  variable[i].textContent = string
}

function capitalizeFirst(name) {
  return name.charAt(0).toUpperCase() + name.slice(1);
}

function hideOrShow(element, dpy) {
  let array = Array.from(element);
  array.forEach(elm => elm.style.display = dpy);
}


const employeeAPI = 'https://randomuser.me/api/?results=12&inc=name,email,location,phone,dob,picture';
function displayData(data) {
  for (let i = 0; i < 12; i++) {
    let array = data.results;
    let employee = array[i];
    modifyEmployeeInfo(nameList, i, `${capitalizeFirst(employee.name.first)} ${capitalizeFirst(employee.name.last)}`);
    modifyEmployeeInfo(emailList, i, employee.email);
    modifyEmployeeInfo(cityList, i, capitalizeFirst(employee.location.city));
    modifyEmployeeInfo(phoneList, i, employee.phone);
    modifyEmployeeInfo(addressList, i, employee.location.street);
    modifyEmployeeInfo(birthdayList, i, `Birthday: ${orderDOB(employee.dob)}`);
    picList[i].src = employee.picture.large;
    picList[i].alt = 'profile';

    let anchors = document.getElementsByTagName('a');
    let array2 = Array.from(anchors);
    array2[i].setAttribute('href', `#modal${i}`);
  }
}
$.getJSON(employeeAPI, displayData);


hideOrShow(phoneList, 'none');
hideOrShow(addressList, 'none');
hideOrShow(birthdayList, 'none');
