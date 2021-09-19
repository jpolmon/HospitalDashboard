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
  