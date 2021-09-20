let patientBtns = document.querySelectorAll(".patientBlock");

// adds checked medications to the treatment container

const getPatientInfoHandler = async (event) => {
  const id = event.target.getAttribute("id");

  // const response = await fetch(`/doctorView/${id}`, {
  //   method: "GET",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // });
  // console.log("click");
  // console.log(response);
  const bigBox = document.querySelector("#patientTreatmentList");

  const med1 = document.createElement("tr");
  const med1Name = document.createElement("td");
  const med1Node = document.createTextNode("Atorvastatin");

  const med2 = document.createElement("tr");
  const med2Name = document.createElement("td");
  const med2Node = document.createTextNode("Omeprazole");

  const med3 = document.createElement("tr");
  const med3Name = document.createElement("td");
  const med3Node = document.createTextNode("Losartan");

  med1Name.appendChild(med1Node);
  med1.appendChild(med1Name);

  med2Name.appendChild(med2Node);
  med2.appendChild(med2Name);

  med3Name.appendChild(med3Node);
  med3.appendChild(med3Name);

  bigBox.appendChild(med1);
  bigBox.appendChild(med2);
  bigBox.appendChild(med3);

  // const renderPatientInfo = (patientId) => {
  //   let list = document.querySelector("#patientTreatmentList");
  // };
  // getPatientInfoHandler().then((res) => renderPatientInfo(item));
};

document.getElementById("updateTreatmentBtn").onclick = function () {
  // let elementsToRemove = document.querySelectorAll("tr");
  // for (const element of elementsToRemove) {
  //   element.remove();
  // }

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

if (patientBtns) {
  for (let i = 0; i < patientBtns.length; i++) {
    patientBtns[i].addEventListener("click", getPatientInfoHandler);
  }
}
