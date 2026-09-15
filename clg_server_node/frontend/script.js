window.getUrl = function(){
    return window.location.pathname;
}

let url = window.getUrl();

fetch('/api' + url)
    .then(function(response){
        return response.json();
    })
    .then((data)=>{
        let page=document.body.id;

        if(page === 'home'){
            document.body.innerHTML=`
                <h1>${data.collegeName}</h1>
                <section id="homePage">
                    <h1 style="color: cadetblue;">${data.welcomeMessage}</h1>
                    <div id="home">
                        <h2>${data.tagline}</h2>
                    </div>
                    <div id="home">
                        <h4>${data.description}</h4>
                    </div>
        
                    <ul type="disc" id="homeList">
                        <li>Established: ${data.established}</li>
                        <li>Location: ${data.location}</li>
                        <li>Total Students: ${data.totalStudents}</li>
                        <li>Courses Offered: ${data.coursesOffered}</li>
                        <li>Placement Assistance: ${data.placementAssistance}</li>
                    </ul>
                </section>
            `;
        }

        else if(page === 'about'){
            document.body.innerHTML=`
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
        }

        else if(page === 'courses'){
            document.body.innerHTML=`
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
        }

        else if(page === 'bca' || page === 'bba' || page === 'btech' || page === 'ai'){
            document.body.innerHTML=`
                <section id="${page}">
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
        }

        else if(page === 'students'){
            document.body.innerHTML=`
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
        }

        else if(page === 'contact'){
            document.body.innerHTML=`
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
        }

        else if(page === 'facilities'){
            document.body.innerHTML=`
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
        }

        else if(page === 'placement'){
            document.body.innerHTML=`
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
        }

        else if(page === 'register'){
            document.body.innerHTML=`
            <section id="register">
                <h3>${data.title}</h3>
                <h3>${data.description}</h3>
                <form id="form" method="POST" action="#">
                    ${data.fields.map(function(field){
                        if(field.type=="select"){
                            return `
                                <label for="${field.id}">${field.label}</label>
                                <select id="${field.id}">
                                    ${field.options.map(function(option){
                                        return `<option value="${option}">${option}</option>`;
                                    }).join("")}
                                </select>
                            `;
                        }
                        return `
                            <label for="${field.id}">${field.labe}</label>
                            <input type="${field.type}" id="${field.id}" placeholder="${field.placeholder}"
                        `;
                        }).join("")}
                    <button id="submit">${data.buttonText}</button>
                </form>
            </section>
            `;
        }

    })
    .catch(function(error){
        console.log(error);
    })
