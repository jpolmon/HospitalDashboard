// adds checked medications to the treatment container

const getPatientInfoHandler = async (event) => {
  if (event.target.hasAttribute("patientBlock")) {
    const id = event.target.getAttribute("patientBlock");

    const response = await fetch(`/api/patients/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => data);
    const renderPatientInfo = (patientId) => {
      let list = document.querySelector("#patientTreatmentList");
    };
    getPatientInfoHandler().then((res) => renderPatientInfo(item));
  }
};

document.getElementById("updateTreatmentBtn").onclick = function () {
  let elementsToRemove = document.querySelectorAll("tr");
  for (const element of elementsToRemove) {
    element.remove();
  }

  let list = document.querySelector("#patientTreatmentList");

  let checkBoxes = document.querySelectorAll(
    'input[name="medication"]:checked'
  );
  for (const checkbox of checkBoxes) {
    const entryContainer = document.createElement("tr");
    const entryName = document.createElement("td");
    const medName = document
      .querySelector(`#${checkbox.getAttribute("id")}`)
      .getAttribute("id");
    const nameNode = document.createTextNode(medName);

    entryName.appendChild(nameNode);
    entryContainer.appendChild(entryName);

    list.appendChild(entryContainer);
  }
};
