let list=document.getElementById("list");
let content=document.getElementById("mainContent");

list.addEventListener("click",(e)=>{
    if(e.target.id === 'nav-home'){
        fetch(`http://localhost:2300/home`)
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
            });
    }

    else if(e.target.id === 'nav-about'){
        fetch(`http://localhost:2300/about`)
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
        })
    }

    else if(e.target.id === 'nav-contact'){
        fetch(`http://localhost:2300/contact`)
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
        })
    }

    else if(e.target.id === 'nav-courses'){
        fetch(`http://localhost:2300/courses`)
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
                        <h2>${items.name}</h2>
                        <h4>${items.fullName}</h4>
                        <h4>${items.duration}</h4>
                        <h4>${items.department}</h4>
                        </div>
                    `;
                }).join("")}
            </div>
        </section>
            `;
        })
    }

    else if(e.target.id === 'nav-placement'){
        fetch(`http://localhost:2300/placement`)
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
        })
    }

    else if(e.target.id === 'nav-students'){
        fetch(`http://localhost:2300/students`)
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
            </section>
            `;
        })
    }

    else if(e.target.id === 'nav-facilities'){
        fetch(`http://localhost:2300/facilities`)
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
        })
    }

    // else if(e.target.id === 'form'){
    //     fetch(`http://localhost:1300/${e.target.id}`)
    //     .then((res)=>{
    //         console.log(res);
    //         return res.json();
    //     }).then((data)=>{
    //         console.log(data);
    //         content.innerHTML="";
    //         content.innerHTML +=`
    //             <h3>${data.title}</h3>
    //             <h3>${data.description}</h3>
    //             <form id="form" method="POST" action="#">
    //                 ${data.fields.map(function(field){
    //                     if(field.type=="select"){
    //                         return `
    //                             <label for="${field.id}">${field.label}</label>
    //                             <select id="${field.id}">
    //                                 ${field.options.map(function(option){
    //                                     return `<option value="${option}">${option}</option>`;
    //                                 }).join("")}
    //                             </select>
    //                         `;
    //                     }
    //                     return `
    //                         <label for="${field.id}">${field.labe}</label>
    //                         <input type="${field.type}" id="${field.id}" placeholder="${field.placeholder}"
    //                     `;
    //                     }).join("")}
    //                 <button id="submit">${data.buttonText}</button>
    //             </form>
    //         `;
    //     })
    // }


});