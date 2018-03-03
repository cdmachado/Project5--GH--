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
  li.className = 'container container2 item test';
  li.id = i;
  // li.setAttribute('onClick', 'openModal()');
  ul.appendChild(li);

  let picDiv = document.createElement('div');
  li.appendChild(picDiv);

  let anchor = document.createElement('a');
  picDiv.appendChild(anchor);

  let img = document.createElement('img');
  anchor.setAttribute('href', `#test-popup${i}`);
  anchor.className = 'open-popup-link';
  anchor.appendChild(img);

  let infoDiv = document.createElement('div');
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


  }
}
$.getJSON(employeeAPI, displayData);


hideOrShow(phoneList, 'none');
hideOrShow(addressList, 'none');
hideOrShow(birthdayList, 'none');

// $('li').magnificPopup({
//   type: 'inline',
//   gallery: {
//     enabled: true
//   }
// });

// let liList = document.getElementsByTagName('li');
// let arrayLI = Array.from(liList);
// for (let i = 0; i < arrayLI.length; i++) {
//   arrayLI[i].addEventListener('click', (e) => {
//     let target = e.target;
//     let idTarget = target.id;
//     target.magnificPopup({
//       items: {
//         src: `#test-popup${idTarget}`,
//         type: 'inline'
//       },
//       gallery: {
//         enabled: true
//       }
//     });
//   });
// }

function NewModal(source, tipo, id) {
  this.src = source + id;
  this.type = 'inline';
}

function lowerThan12(id, num) {
  if (id + num > 11) {
    return (id + num) - 11;
  } else {
    return id + num;
  }
}

ul.addEventListener('click', (e) => {
  debugger;
  let target = e.target;
    if (target.tagName === 'LI') {
      let id = parseInt(target.id);
      let item1 = new NewModal('#test-popup', 'inline', (lowerThan12(id, 0)));
      let item2 = new NewModal('#test-popup', 'inline', (lowerThan12(id, 1)));
      let item3 = new NewModal('#test-popup', 'inline', (lowerThan12(id, 2)));
      let item4 = new NewModal('#test-popup', 'inline', (lowerThan12(id, 3)));
      let item5 = new NewModal('#test-popup', 'inline', (lowerThan12(id, 4)));
      let item6 = new NewModal('#test-popup', 'inline', (lowerThan12(id, 5)));
      let item7 = new NewModal('#test-popup', 'inline', (lowerThan12(id, 6)));
      let item8 = new NewModal('#test-popup', 'inline', (lowerThan12(id, 7)));
      let item9 = new NewModal('#test-popup', 'inline', (lowerThan12(id, 8)));
      let item10 = new NewModal('#test-popup', 'inline', (lowerThan12(id, 9)));
      let item11 = new NewModal('#test-popup', 'inline', (lowerThan12(id, 10)));
      let item12 = new NewModal('#test-popup', 'inline', (lowerThan12(id, 11)));
    $.magnificPopup.open({
      items: [item1, item2, item3, item4, item5, item6, item7, item8, item9, item10, item11, item12],
      gallery: {
        enabled: true
      }
    });
  }
});

// function openModal() {
//   $.magnificPopup.open({
//     items: [
//       let item1 = new NewModal();
//     ]
//   });
// }

// function openModal() {
//   $.magnificPopup.open({
//     items: [
//       {
//         src: '#test-popup0',
//         type: 'inline'
//       },
//       {
//         src: '#test-popup1',
//         type: 'inline'
//       },
//       {
//         src: '#test-popup2',
//         type: 'inline'
//       },
//       {
//         src: '#test-popup3',
//         type: 'inline'
//       }
//     ],
//     gallery: {
//       enabled: true
//     }
//   });
// }


// $('.test').magnificPopup({
//   type:'inline',
//   callbacks: {
//     elementParse: function(item) {
//       let target = item.el;
//       item.src = `#test-popup${$(this).attr('id')}`;
//       // Function will fire for each target element
//       // "item.el" is a target DOM element (if present)
//       // "item.src" is a source that you may modify
//
//       console.log(item); // Do whatever you want with "item" object
//     }
//   },
//   gallery: {
//     enabled: true
//   }
// });


// ul.addEventListener('click', (e) => {
//   let target = e.target;
//   if (target.tagName === 'LI') {
//     let id = target.id;
//     let a = target.firstElementChild.firstElementChild;
//     a.setAttribute('href', `#test-popup0`);
//
//   }
// })

// $('ul').on('click', () => {
//   let target = $(this);
//   if (target.tagName === 'LI') {
//     let id = target.id;
//     let a = target.firstElementChild.firstElementChild;
//     a.attr('href', `#test-popup0`);
//   }
// }).magnificPopup({
//   type: 'inline',
//   gallery: {
//     enabled: true
//   }
// });;
