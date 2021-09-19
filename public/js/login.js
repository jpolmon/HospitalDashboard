const loginFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const email = document.querySelector("#email-login").value.trim();
  const password = document.querySelector("#password-login").value.trim();

  if (email && password) {
    // Send a POST request to the API endpoint
    let response;
    if (email.includes("@greymemorial")) {
      response = await fetch("/api/doctors/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
      });
    } else {
      response = await fetch("/api/patients/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
      });
    }

    console.log(response);

    if (response.ok) {
      // If successful, redirect the browser to the profile page
      document.location.replace("/patientView");
    } else {
      let elementsToRemove = document.querySelectorAll(".help");
      for (const element of elementsToRemove) {
        element.remove();
      }
      const errorMessage = document.createElement("p");
      errorMessage.classList.add("help");
      errorMessage.classList.add("is-danger");
      const container = document.getElementById("login");
      const text = document.createTextNode("Incorrect email or password");
      errorMessage.appendChild(text);
      container.appendChild(errorMessage);
    }
  }
};

const signupFormHandler = async (event) => {
  event.preventDefault();

  document.getElementById("password-signup").classList.remove("is-danger");
  document.getElementById("first-name-signup").classList.remove("is-danger");
  document.getElementById("last-name-signup").classList.remove("is-danger");

  let thingsToRemove = document.querySelectorAll(".is-danger");
  for (const thing of thingsToRemove) {
    thing.remove();
  }

  const firstName = document.querySelector("#first-name-signup").value.trim();
  const lastName = document.querySelector("#last-name-signup").value.trim();
  const email = document.querySelector("#email-signup").value.trim();
  const password = document.querySelector("#password-signup").value.trim();

  if (firstName && lastName && email && password) {
    const response = await fetch("/api/patients", {
      method: "POST",
      body: JSON.stringify({ firstName, lastName, email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/patientView");
    } else {
      const passWarning = document.createElement("p");
      passWarning.classList.add("help");
      passWarning.classList.add("is-danger");
      const passContainer = document.getElementById("pass");
      const text = document.createTextNode("Password too short!");
      passWarning.appendChild(text);
      passContainer.appendChild(passWarning);
      document.getElementById("password-signup").classList.add("is-danger");
    }
  }
  if (!firstName) {
    const firstNameWarning = document.createElement("p");
    firstNameWarning.classList.add("help");
    firstNameWarning.classList.add("is-danger");
    const firstContainer = document.getElementById("first-name");
    const text = document.createTextNode("Please input a first name!");
    firstNameWarning.appendChild(text);
    firstContainer.appendChild(firstNameWarning);
    document.getElementById("first-name-signup").classList.add("is-danger");
  }
  if (!lastName) {
    const lastNameWarning = document.createElement("p");
    lastNameWarning.classList.add("help");
    lastNameWarning.classList.add("is-danger");
    const lastContainer = document.getElementById("last-name");
    const text = document.createTextNode("Please input a last name!");
    lastNameWarning.appendChild(text);
    lastContainer.appendChild(lastNameWarning);
    document.getElementById("last-name-signup").classList.add("is-danger");
  }
};

document.querySelector("#login").addEventListener("submit", loginFormHandler);

document.querySelector("#signup").addEventListener("submit", signupFormHandler);
