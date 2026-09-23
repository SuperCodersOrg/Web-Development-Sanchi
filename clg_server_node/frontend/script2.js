let list=document.getElementById("list");
let content=document.getElementById("mainContent");

list.addEventListener("click",(e)=>{
    if(e.target.id === 'nav-home'){
        fetch(`http://localhost:1300/home`)
            .then((res) => {
                console.log(res);
                return res.json(); 
            })
            .then((data)=>{
                console.log(data);               
                content.innerHTML=`
                <section id="homePage">
                    <h1>${data.collegeName}</h1>
                    <h2>${data.welcomeMessage}</h2>
                    <h3>${data.tagline}</h3>
                    <p>${data.description}</p>
                    <ul id="homeList">
                        <li>Established: ${data.established}</li>
                        <li>Location: ${data.location}</li>
                        <li>Total Students: ${data.totalStudents}</li>
                        <li>Courses Offered: ${data.coursesOffered}</li>
                        <li>Placement Assistance: ${data.placementAssistance}</li>
                    </ul>
                </section>
                `;
            });}

    else if(e.target.id === 'nav-about'){
        fetch(`http://localhost:1300/about`)
        .then((res)=>{
            console.log(res);
            return res.json();
        }).then((data)=>{
            console.log(data);
            content.innerHTML="";
            content.innerHTML +=`
            <section id="about">
                <h3>${data.type}</h3>
                <div>
                    <div>Description:</br>
                        ${data.description}
                    </div>
                    <div>Vision:</br>
                        ${data.vision}
                    </div>
                </div>
                    <ul>
                        ${data.objectives.map((items)=>{
                        return `<li>${items}</li>`;
                        }).join("")}
                    </ul>
                </section>
                `;
        });}

    else if(e.target.id === 'nav-contact'){
        fetch(`http://localhost:1300/contact`)
        .then((res)=>{
            console.log(res);
            return res.json();
        }).then((data)=>{
            console.log(data);
            content.innerHTML="";
            content.innerHTML +=`
            <section id="contact">
                <div>
                    <div>Phone: ${data.phone}</div>
                    <div>Email: ${data.email}</div>
                </div>
                <div>
                    <div>Admissions Email: ${data.admissionsEmail}</div>
                    <div>Location: ${data.location}</div>
                </div>
                <div>
                    <pre>Office Hours:
                    Monday – Friday
                    ${data.officeHours.mondayToFriday}</pre>
                </div>
                <div>
                    <pre>Saturday:
                    ${data.officeHours.saturday}</pre>
                    </div>
                <div>
                    <pre>Sunday:
                    ${data.officeHours.sunday}</pre>
                </div>
            </section>
            `;
        });}

    else if(e.target.id === 'nav-courses'){
        fetch(`http://localhost:1300/courses`)
        .then((res)=>{
            console.log(res);
            return res.json();
        }).then((data)=>{
            console.log(data);
            content.innerHTML="";
            content.innerHTML +=`
            <section id="courses">
                <h4>${data.title}</h4>
                <div id="outerCourses">
                    ${data.courses.map(function(items){
                    return `<div>
                        <div onclick="coursePath(this)" style="cursor:pointer" id="specific-course">${items.name}</div>
                        <h4>${items.fullName}</h4>
                        <h4>${items.duration}</h4>
                        <h4>${items.department}</h4>
                        </div>
                    `;
                }).join("")}
            </div>
        </section>
            `;
        });}

    else if(e.target.id === 'nav-placement'){
        fetch(`http://localhost:1300/placement`)
        .then((res)=>{
            console.log(res);
            return res.json();
        }).then((data)=>{
            console.log(data);
            content.innerHTML="";
            content.innerHTML +=`
            <section id="placement">
                <h2>${data.title}</h2>
                <div>
                    <div>Placement Cell: ${data.placementCell}</div>
                    <div>Placement Assistance: ${data.placementAssistance}</div>
                    <div>Internship Assistance: ${data.internshipAssistance}</div>
                    <div>Highest Package: ${data.highestPackage}</div>
                    <div>Average Package: ${data.averagePackage}</div>
                    <div>Placement Rate: ${data.placementRate}</div>
                    <div>Companies Visited: ${data.companiesVisited}</div>
                    <div>Students Placed: ${data.studentsPlaced}</div>
                </div>
                <div>
                    <h4>Placement Activities:</h4>
                    <ul>
                        ${data.placementActivities.map(function (item) {
                            return `<li>${item}</li>`;
                        }).join("")}
                    </ul>
                </div>
                <div>
                    <h4>Top Recruiters:</h4>
                    <ul>
                        ${data.topRecruiters.map(function (item) {
                            return `<li>${item}</li>`;
                        }).join("")}
                    </ul>
                </div>
            </section>
            `;
        });}

    else if(e.target.id === 'nav-students'){
        fetch(`http://localhost:1300/students`)
        .then((res)=>{
            console.log(res);
            return res.json();
        }).then((data)=>{
            console.log(data);
            content.innerHTML="";
            content.innerHTML +=`
            <section id="student_details">
                <h2>${data.title}</h2>
                <div>Total Students: ${data.totalStudents}</div>
                <div>Active Batches: ${data.activeBatches}</div>
                <div>Average Batch Size: ${data.averageBatchSize}</div>
                <div>
                    <h4>Academic Sessions: </h4>
                    <ul type="disc">
                        ${data.academicSessions.map(function(item){
                            return `
                                <li>${item}</li>
                            `;
                        }).join("")}
                    </ul>
                </div>
                <div>
                    <h4>Students By Course: </h4>
                    <ul type="disc">
                        ${Object.entries(data.studentsByCourse).map(function([course,count]){
                            return `<li>${course}:${count}</li>`;
                        }).join("")}
                    </ul>
                </div>
                <div>
                    <h4>Student Support:</h4>
                    <ul type="disc">
                        ${data.studentSupport.map(function(item){
                            return `
                                <li>${item}</li>
                            `;
                        }).join("")}
                    </ul>
                </div>
                <button id="register" onclick="registerYourself()" style="font-size:20px; padding:8px; border-radius: 8px;">Register</button>
            </section>
            `;
        });}

    else if(e.target.id === 'nav-facilities'){
        fetch('http://localhost:1300/facilities')
        .then((res)=>{
            console.log(res);
            return res.json();
        }).then((data)=>{
            console.log(data);
            content.innerHTML="";
            content.innerHTML +=`
            <section id="facilities">
                <h2>${data.title}</h2>
                <div id="facility">
                    ${data.facilities.map(function(item){
                        return `
                            <div>
                                <h3>${item.name}</h3>
                                <p>${item.description}</p>
                            </div>
                        `;
                    }).join("")}
                </div>
            </section>
            `;
        });}
});

let specificCourse=document.getElementsByClassName("specific-course");
function coursePath(element){
        fetch(`http://localhost:1300/courses/${element.innerText}`)
        .then((res)=>{
            return res.json();
        }).then((data)=>{
            console.log(data);
            content.innerHTML="";
            content.innerHTML=`
                <section>
                    <h1><center>${element.innerText}</center></h1>
                    <h3>Duration: ${data.duration}</h3>
                    <h3>Eligibility: ${data.eligibility}</h3>
                    <h3>Mode: ${data.mode}</h3>
                    <h3>Field: ${data.field}</h3>
                    <h3>Focus: ${data.focus}</h3>
                    <div>
                        <ul>
                        ${data.subjects.map(function(item){
                            return `<li>${item}</li>`;
                        }).join("")}
                        </ul>
                    </div>
                </section>
            `;
        });  
}

function registerYourself(){
            content.innerHTML="";
            content.innerHTML +=`
                <section id="registerForm">
                <h3>Registration Open</h3>
                <h3>Students can register for admission by providing their basic academic and personal information.</h3>
                <form id="form">
                    <label for="name">Student's Name</label>
                    <input type="text" id="name" placeholder="Enter your placeholder"/>

                    <label for="email">Email-address</label>
                    <input type="email" id="email" placeholder="Enter youre-mail"/>

                    <label for="number">Contact</label>
                    <input type="number" id="number" placeholder="Enter your contact no."/>

                    <label for="date">Date of Birth</label>
                    <input type="date" id="date"/>

                    <label for="course">Course</label>
                    <input type="text" id="course" placeholder="Enter your course"/>

                    <label for="batch">Batch No.</label>
                    <input type="number" id="batch" placeholder="Enter your batch"/>

                    <label for="gender">Gender</label>
                    <select id="gender">
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>

                    <label for="address">Address</label>
                    <input type="text" id="address" placeholder="Enter your address"/>
                </form>
                <button type="submit" onclick="submitData()" id="submitBtn">Register yourself</button>
            `;
}

function submitData(){
    console.log("data submitted");

    let nameVal = document.getElementById("name").value;
    let batchVal = document.getElementById("batch").value;
    let courseVal = document.getElementById("course").value;
    let contactVal = document.getElementById("number").value;
    let emailVal = document.getElementById("email").value;
    let dateVal = document.getElementById("date").value;
    let addressVal = document.getElementById("address").value;

    let details = {
        Name : nameVal,
        Contact : contactVal,
        Email : emailVal,
        Course : courseVal,
        Batch : batchVal,
        Address : addressVal,
        Date : dateVal,
    }

    console.log(details);

    fetch('http://localhost:1300/students/register',{
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify(details)
    });

}