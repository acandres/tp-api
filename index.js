const form = document.getElementById("form");
form.addEventListener("submit", handleSubmit);
const inputs = document.querySelectorAll('input');

function handleSubmit(e) {
  e.preventDefault();

  const user = new FormData(form);
  //console.log(user.get("fullName"));
  const fullname = user.get("fullName");
  const mail = user.get("email");
  const phone = user.get("phone");
  const usuario = new User (fullname,mail,phone)
  console.log(usuario);

  addOne(usuario);
  modal.close();

}
const openModal = document.getElementById("open-modal");
const modal = document.getElementById("modal");
const closeModal = document.getElementById("close-modal");

closeModal.addEventListener("click", () => {
  modal.close();
  
});

openModal.addEventListener("click", () => {
  modal.showModal();
});

const BASE_URL = "https://647a856dd2e5b6101db0664c.mockapi.io/users";

//get all resources
function getAll(url) {
  fetch(url)
    .then(res => res.json())
//    .then(data => console.log(data))
    .then(data => addList(data))
    .catch(err => console.error(err));
};

 class User {
  constructor(fullname,email,phone){
    this.fullname = fullname;
    this.email = email;
    this.phone = phone;
  }
}
//  #####   BORRADO DE UI y API  ###################
//capturo el boton eliminar/editar  
document.querySelector("#print-data").addEventListener('click' , function(e) {
 // alert ('borrando registro')
//console.log(e.target.getAttribute("data-id"));
console.log(e.target.getAttribute("name"))
  if (e.target.getAttribute("name") === "delete"){
    deleteUser(e.target); // borrado UI
    deleteOne(e.target.getAttribute("data-id")); //borrado
  } else {
      if (e.target.getAttribute("name") === "edit"){
         // modal.showModal();
         modal.showModal();
         fillModal(e.target.parentElement.parentElement.children);
    }
  } 
   
});

function deleteUser(element){
  if (element.name === "delete") {
    element.parentElement.parentElement.remove();
     
  }
};

function fillModal(user){
  let count = 0;
  for (let index of inputs){
    count += 1
    index.value = user[count].textContent
  }
  
}


function addList(data) {
  //console.log(data)
  const printData = document.querySelector("#print-data");
  data.forEach(element => {
    const row = document.createElement('tr');
    row.innerHTML = `
    <td>${element.id}</td>
    <td>${element.fullname}</td>
    <td>${element.email}</td>
    <td>${element.phone}</td>
    <td> <a href="#" class="button button-outline" data-id= ${element.id} name="delete">Delete</a> </td>
    <td> <a href="#" class="button button-clear" data-id= ${element.id} name="edit">Edit</a>  </td> 
    `;
    printData.appendChild(row)    
  });

};

getAll(BASE_URL);

//get resource by id
function getOne(id) {
  fetch(BASE_URL + `/${id}`)
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.error(err));
}
//delete one
function deleteOne(id) {
  fetch(BASE_URL + `/${id}`, {
    method: "DELETE",
  })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.error(err));
}
//add a new resource
const newUser = {
  name: "Jorge Aníbal Sardón",
  email: "giorgioDJ@dero.com",
  phone: "(223) 232323223",
};
function addOne(user) {
  fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  })
    .then(res => res.json())
    .then(data => console.log(data))
    .then(()=>location.reload())
    .catch(err => console.error(err));
}
//edit a new resource
const updatedUser = {
  name: "Jorge 'el profe' Sardón",
  email: "giorgioDJ@dero.com",
  phone: "(2314) 232323223",
};
function updateOne(id, user) {
  fetch(BASE_URL + `/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.error(err));
}