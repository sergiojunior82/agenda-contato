const form = document.getElementById("contact-form");
const imgEdit = '<img src="./images/editar.png" alt="Icone de Editar">';
const imgDelete = '<img src="./images/excluir.png" alt="Icone de Excluir">';
const imgConfirm = '<img src="./images/confirm.png" alt="Icone de Confirmar">';
const inputContactPhone = document.getElementById('phone-input');
const inputContactName = document.getElementById('name-input');
const btnSave = document.getElementById('btn-save-contact');

const names = [];
const phones = [];

document.addEventListener('DOMContentLoaded', function() {
  Inputmask({ mask: '(99) 99999-9999' }).mask(inputContactPhone);
});

form.addEventListener('submit', function(e){
  e.preventDefault();
  addContact();
})

function addContact() {
  
  if(names.includes(inputContactName.value)){
    alert(`O nome ${inputContactName.value} já está cadastrado`);
    inputContactName.value = "";
  } else if(phones.includes(inputContactPhone.value)) {
    alert(`O telefone ${inputContactPhone.value} já está em uso por outra pessoa`);
    inputContactPhone.value = "";
  }else {
    names.push(inputContactName.value);
    phones.push(inputContactPhone.value);
  
    updateContact();
  
    inputContactName.value = "";
    inputContactPhone.value = "";
  } 
}

function updateContact(){
  let rows = ``;
  
  for(let i=0; i < names.length; i++){
    let row = '<tr>';
    row += `<td id="name-cell-${i}">${names[i]}</td>`
    row += `<td id="phone-cell-${i}">${phones[i]}</td>`
    row += `<td class="td-buttons">`
    row += `<a href="#" class="edit-button" onclick="editContact(${i})">${imgEdit}</a>`          
    row += `<a href="#" class="delete-button" onclick="deleteContact(${i})">${imgDelete}</a>`
    row += `<a href="#" class="confirm-button" onclick="confirmContact(${i})"><img id="confirm-img-${i}" src="./images/confirm.png" alt="Icone de Confirmar" style="visibility: hidden;"></a>`
    row += '</td></tr>'  
    rows += row;
  }
  
  const tableBody = document.querySelector('tbody');
  tableBody.innerHTML = rows;
}

function deleteContact(index){
  console.log('entrou aqui delete');

  names.splice(index, 1);
  phones.splice(index, 1);

  updateContact();
}

function editContact(index){
 
  const nameCell = document.getElementById(`name-cell-${index}`);
  const phoneCell = document.getElementById(`phone-cell-${index}`);
  const confirmImg = document.getElementById(`confirm-img-${index}`);

  const nameInput = document.createElement("input");
  nameInput.type = "text";
  nameInput.value = nameCell.textContent;
  nameInput.style.width = `${nameCell.offsetWidth}px`;
  nameInput.style.maxWidth = `${nameCell.offsetWidth}px`;

  const phoneInput = document.createElement("input");
  phoneInput.type = "text";
  phoneInput.value = phoneCell.textContent;
  phoneInput.style.width = `${phoneCell.offsetWidth}px`;
  
  const phoneMask = IMask(phoneInput, {
    mask: "(00) 0000-0000",
  });

  confirmImg.style.visibility = "visible";

  nameInput.addEventListener("blur", function (event) {
    if (!event.relatedTarget || (event.relatedTarget !== nameInput && event.relatedTarget !== phoneInput)) {
      nameCell.textContent = nameInput.value;
      nameCell.style.width = "";
      nameCell.style.maxWidth = "";

      phoneCell.textContent = phoneMask.value;
      phoneCell.style.width = "";
      phoneCell.style.maxWidth = "";
  
      confirmContact(index);
    }
  });

  phoneInput.addEventListener("blur", function (event) {
    if (!event.relatedTarget || (event.relatedTarget !== phoneInput && event.relatedTarget !== nameInput)) {
      phoneCell.textContent = phoneMask.value;
      phoneCell.style.width = "";
      phoneCell.style.maxWidth = "";

      nameCell.textContent = nameInput.value;
      nameCell.style.width = "";
      nameCell.style.maxWidth = "";
  
      confirmContact(index);
    }
  });

  nameCell.innerHTML = "";
  nameCell.appendChild(nameInput);
  phoneCell.innerHTML = "";
  phoneCell.appendChild(phoneInput);
  
  nameInput.focus();
  
}

function confirmContact(index) {
  const nameCell = document.getElementById(`name-cell-${index}`);
  const phoneCell = document.getElementById(`phone-cell-${index}`);

  
  names[index] = nameCell.textContent;
  phones[index] = phoneCell.textContent;

  nameCell.contentEditable = false;
  phoneCell.contentEditable = false;

  updateContact();

  const confirmImg = document.getElementById(`confirm-img-${index}`);
  confirmImg.style.visibility = "false";
}
