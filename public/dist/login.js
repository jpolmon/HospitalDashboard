const loginFormHandler=async a=>{a.preventDefault();const b=document.querySelector("#email-login").value.trim(),c=document.querySelector("#password-login").value.trim();if(b&&c){let a;if(a=b.includes("@greymemorial")?await fetch("/api/doctors/login",{method:"POST",body:JSON.stringify({email:b,password:c}),headers:{"Content-Type":"application/json"}}):await fetch("/api/patients/login",{method:"POST",body:JSON.stringify({email:b,password:c}),headers:{"Content-Type":"application/json"}}),console.log(a),a.ok)b.includes("@greymemorial")?document.location.replace("/doctorView"):document.location.replace("/patientView");else{let a=document.querySelectorAll(".help");for(const b of a)b.remove();const b=document.createElement("p");b.classList.add("help"),b.classList.add("is-danger");const c=document.getElementById("login"),d=document.createTextNode("Incorrect email or password");b.appendChild(d),c.appendChild(b)}}},signupFormHandler=async a=>{a.preventDefault(),document.getElementById("password-signup").classList.remove("is-danger"),document.getElementById("first-name-signup").classList.remove("is-danger"),document.getElementById("last-name-signup").classList.remove("is-danger");let b=document.querySelectorAll(".is-danger");for(const c of b)c.remove();const c=document.querySelector("#first-name-signup").value.trim(),d=document.querySelector("#last-name-signup").value.trim(),e=document.querySelector("#email-signup").value.trim(),f=document.querySelector("#password-signup").value.trim();if(c&&d&&e&&f){const a=await fetch("/api/patients",{method:"POST",body:JSON.stringify({firstName:c,lastName:d,email:e,password:f}),headers:{"Content-Type":"application/json"}});if(a.ok)document.location.replace("/patientView");else{const a=document.createElement("p");a.classList.add("help"),a.classList.add("is-danger");const b=document.getElementById("pass"),c=document.createTextNode("Password too short!");a.appendChild(c),b.appendChild(a),document.getElementById("password-signup").classList.add("is-danger")}}if(!c){const a=document.createElement("p");a.classList.add("help"),a.classList.add("is-danger");const b=document.getElementById("first-name"),c=document.createTextNode("Please input a first name!");a.appendChild(c),b.appendChild(a),document.getElementById("first-name-signup").classList.add("is-danger")}if(!d){const a=document.createElement("p");a.classList.add("help"),a.classList.add("is-danger");const b=document.getElementById("last-name"),c=document.createTextNode("Please input a last name!");a.appendChild(c),b.appendChild(a),document.getElementById("last-name-signup").classList.add("is-danger")}};document.querySelector("#login").addEventListener("submit",loginFormHandler),document.querySelector("#signup").addEventListener("submit",signupFormHandler);