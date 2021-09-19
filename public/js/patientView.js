<<<<<<< HEAD
document.getElementById("updateCartBtn").onclick = function () {
  let total = 0.0;
  let medPrices = [];
  let elementsToRemove = document.querySelectorAll("tr");
  for (const element of elementsToRemove) {
    element.remove();
  }

  let list = document.querySelector("#cart");

  let checkBoxes = document.querySelectorAll(
    'input[name="medication"]:checked'
  );
  for (const checkbox of checkBoxes) {
    const entryContainer = document.createElement("tr");
    const entryName = document.createElement("td");
    const entryPrice = document.createElement("td");
    const medName = document
      .querySelector(`#${checkbox.getAttribute("id")}`)
      .getAttribute("id");
    const medPrice = document
      .querySelector(`input[value="${checkbox.getAttribute("value")}"]`)
      .getAttribute("value");
    const nameNode = document.createTextNode(medName);
    const priceNode = document.createTextNode(
      `$${parseFloat(medPrice).toFixed(2).toString()}`
    );

    const priceString = document
      .querySelector(`input[value="${checkbox.getAttribute("value")}"]`)
      .getAttribute("value");

    const priceNum = parseFloat(priceString).toFixed(2);

    medPrices.push(priceNum);

    entryName.appendChild(nameNode);
    entryPrice.appendChild(priceNode);
    entryContainer.appendChild(entryName);
    entryContainer.appendChild(entryPrice);

    list.appendChild(entryContainer);
  }

  for (const price of medPrices) {
    total += parseFloat(price);
  }

  let totalFloat = total.toFixed(2);

  const totalContainer = document.createElement("tr");
  const totalName = document.createElement("td");
  totalName.classList.add("has-text-weight-bold");
  const totalPrice = document.createElement("td");
  totalPrice.classList.add("has-text-weight-bold");
  const nameValue = document.createTextNode("Total");
  const totalValue = document.createTextNode(`$${totalFloat.toString()}`);

  totalName.appendChild(nameValue);
  totalPrice.appendChild(totalValue);
  totalContainer.appendChild(totalName);
  totalContainer.appendChild(totalPrice);

  list.appendChild(totalContainer);
};
=======
const newFormHandler = async (event) => {
    event.preventDefault();
  
    const firstName = document.querySelector("#patient-firstName").value.trim();
    const lastName = document.querySelector("#patient-lastName").value.trim();
    const email = document.querySelector("#patient-email").value.trim();
    const treatment = document.querySelector("#patient-treatment").value.trim();
  
    if (firstName && lastName && email && treatment) {
      const response = await fetch(`/api/patients`, {
        method: "POST",
        body: JSON.stringify({ firstName, lastName, email, treatment }),
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (response.ok) {
        document.location.replace("/doctorView");
      } else {
        alert("Failed to create new patient");
      }
    }
  };
  
  const delButtonHandler = async (event) => {
    if (event.target.hasAttribute("data-id")) {
      const id = event.target.getAttribute("data-id");
  
      const response = await fetch(`/api/patients/${id}`, {
        method: "DELETE",
      });
  
      if (response.ok) {
        document.location.replace("/patient");
      } else {
        alert("Failed to delete ");
      }
    }
  };
  
  document
    .querySelector(".new-project-form")
    .addEventListener("submit", newFormHandler);
  
  document
    .querySelector(".project-list")
    .addEventListener("click", delButtonHandler);
  
>>>>>>> a2112140fa150542ad130a1b18646f8c9f49d97b
