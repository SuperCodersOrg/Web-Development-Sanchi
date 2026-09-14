let detailsArr = JSON.parse(localStorage.getItem("Details"))||[];

let name = document.getElementById("name");
let date = document.getElementById("date");
let course = document.getElementById("course");
let contact = document.getElementById("number");
let email = document.getElementById("email");
let batch = document.getElementById("batch");
let address = document.getElementById("address");
let submit = document.getElementById("submit");
let form = document.getElementById("form");

form.addEventListener("submit",(event)=>{
    event.preventDefault();

    let nameVal = name.value;
    let batchVal = batch.value;
    let courseVal = course.value;
    let contactVal = contact.value;
    let emailVal = email.value;
    let dateVal = date.value;
    let addressVal = address.value;

    let details = {
        Name : nameVal,
        Contact : contactVal,
        Email : emailVal,
        Course : courseVal,
        Batch : batchVal,
        Address : addressVal,
        Date : dateVal,
    }

    detailsArr.push(details);

    localStorage.setItem("Details",JSON.stringify(detailsArr));
    
    fetch('/students/register',{
        method : 'POST',
        headers : {
            'Content-type' : 'application/json'
        },
        body : JSON.stringify(payload)
    });

    name.value = "";
    batch.value = "";
    course.value = "";
    contact.value = "";
    email.value = "";
    date.value = "";
    address.value = "";
}); 
