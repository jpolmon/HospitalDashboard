let patientBtns = document.querySelectorAll(".patientBlock");
let medicineOptions = document.querySelectorAll(".checkboxes");

// adds checked medications to the treatment container
let id = 0;

const getPatientInfoHandler = async (event) => {

  let checkBoxes = document.querySelectorAll(
    'input[name="medication"]:checked'
  );

  for (const checkbox of checkBoxes) {
    checkbox.checked=false;
  }

  for (const medicine of medicineOptions) {
    medicine.style.display = 'block';
  }

  let elementsToRemove = document.querySelectorAll("tr");
  for (const element of elementsToRemove) {
    element.remove();
  }
  
  id = event.path[0].getAttribute("id");

  const response = await fetch(`/doctorView/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
 
  currentMedicineList = await response.json();
  
  const bigBox = document.querySelector("#patientTreatmentList");
  
  const currentMedicineNames = [];

  for (const med of currentMedicineList) {
    const tr = document.createElement("tr");
    tr.id = med.name;
    const td = document.createElement("td");
    const node = document.createTextNode(`${med.name}`);
    td.appendChild(node);
    tr.appendChild(td);
    bigBox.appendChild(tr);
    currentMedicineNames.push(med.name);

    for (const medicine of medicineOptions) {
      if (medicine.id === med.name) {
        medicine.style.display = 'none';
      }
    }
  } 
};

document.getElementById("updateTreatmentBtn").onclick = async function () {

  let checkBoxes = document.querySelectorAll(
    'input[name="medication"]:checked'
  );

  let medicationsToAdd = [];

  for (const checkbox of checkBoxes) {
    medicationsToAdd.push(checkbox.getAttribute('id'));
    checkbox.checked=false;
  }

  for (const medicine of medicineOptions) {
    if (medicationsToAdd.includes(medicine.id)) {
      medicine.style.display = 'none';
    }
  }
  
  const bigBox = document.querySelector("#patientTreatmentList");

  for (const medicine of medicationsToAdd) {
    const entryContainer = document.createElement("tr");
    const entryName = document.createElement("td");
    const medName = medicine;
    const nameNode = document.createTextNode(medName);

    entryName.appendChild(nameNode);
    entryContainer.appendChild(entryName);

    bigBox.appendChild(entryContainer);
  }

  let response = await fetch(`/api/doctors/${id}`, {
    method: "POST",
    body: JSON.stringify({ medicationsToAdd, id }),
    headers: { "Content-Type": "application/json" },
  });

  const newMedList = await response.json();
  console.log(newMedList);
};

if (patientBtns) {
  for (let i = 0; i < patientBtns.length; i++) {
    patientBtns[i].addEventListener("click", getPatientInfoHandler);
  }
}
