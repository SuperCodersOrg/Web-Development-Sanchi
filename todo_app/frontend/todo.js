let trashIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash2-icon lucide-trash-2"><path d="M10 11v6"/><path d="M14 11v6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>`;

let icon1 = `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check-icon lucide-check"><path d="M20 6 9 17l-5-5"/></svg>`;

let icon2 = `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check-check-icon lucide-check-check"><path d="M18 6 7 17l-5-5"/><path d="m22 10-7.5 7.5L13 16"/></svg>`;

let editIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-square-pen-icon lucide-square-pen"><path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"/></svg>`;

const port = 3500;

let mainFrame = document.getElementById("main-frame");
mainFrame.classList = "w-300 h-[auto] m-20 p-10 bg-blue-200";

let headBox = document.getElementById("head-box");
headBox.classList = "border-2 p-5 rounded-md";
headBox.innerHTML = `<h1 class="text-center text-6xl text-500">TO-DO APP</h1>`;

let inputBox = document.getElementById("input-box");
inputBox.classList = "flex flex-col";
inputBox.innerHTML = `
    <input id="title-box" placeholder="Enter title" class="text-3xl w-100 h-20 mt-2 mb-2 border">
    <textarea id="description-box" placeholder="Enter description" class="text-3xl w-100 h-30 border"></textarea>
    <button id="btn" class="bg-blue-400 border-2 w-50 h-20 text-600 text-4xl rounded-md mt-2 mb-2" onclick="addTask()">Add Task</button>
`;

let outputBox = document.getElementById("output-box");
outputBox.classList = "mt-3 h-[500px] p-2 w-[600px] overflow-y-auto";

getData();

function addTask(){
    let titleBox = document.getElementById("title-box");
    let descriptionBox = document.getElementById("description-box");
    let titleValue = titleBox.value.trim();
    let descriptionValue = descriptionBox.value.trim();

    titleBox.value="";
    descriptionBox.value="";

    if(titleValue=="" || descriptionValue==""){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something is missing!",
          });
          return;
    }

    let id = new Date().getTime();
    let dateString = new Date().toLocaleString();
    let status = "pending";
    let isDeleted = false;
    
    const details= {
        title:  titleValue,
        description: descriptionValue,
        id: id,
        status: status,
        date: dateString,
        delete_status: isDeleted
    };

    console.log(details);
    fetch(`http://localhost:${port}/post`,{
        method :'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify(details)
    });
    getData();
}

function getData(){
    fetch(`http://localhost:${port}/get`)
    .then((res)=>{ 
        if(!res.ok){
            console.log("Error in fetching data");
            return;
        }
        return res.json();
        }).then((data)=>{
        console.log(data);
        data.forEach((item)=>{
            if(item.delete_status==false){
                let newTask = document.createElement("div");
                let bgClass = (item.status) === "done" ? "bg-purple-300" : "bg-white";
                newTask.classList = `border rounded-xl flex flex-col gap-2 transition-all m-2 ${bgClass}`;
                newTask.id = item.id;
                let currentIcon = (item.status) === "done" ? icon2 : icon1;
                newTask.innerHTML = `
                    <h1 class="bg-orange-100 mt-2 mb-1 ml-1 mr-1 rounded-md">${item.title}</h1>
                    <h2 class="bg-orange-100 m-1 rounded-md">${item.description}</h2>
                    <h2 class="bg-orange-100 m-1 rounded-md">${item.date}</h2>
                    <div>
                        <button class="rounded-md bg-red-400 p-1 m-2 border" onclick="deleteTask(${item.id})">${trashIcon}</button>
                        <button class="doneBtn bg-green-500 rounded-md p-1 m-2 border" onclick="doneTask(${item.id})" data-status="${item.status}">${currentIcon}</button>
                        <button class="edit-task-btn bg-yellow-500 rounded-md m-2 p-1 border" onclick="editTask(${item.id})">${editIcon}</button>
                    </div>
            `;
            outputBox.appendChild(newTask);
            }
        })
    });
}

function deleteTask(id){
    fetch(`http://localhost:${port}/delete/${id}`,{
        method : 'DELETE'   
    });
}

function editTask(id){
    fetch(`http://localhost:${port}/get`)
    .then((res)=>{
        if(!res.ok){
            return;
        }
        return res.json();
    }).then((data)=>{
        let task=data.find((item)=>{
            if(item.id === id){
                return item;
            }
        });

        let titleBox=document.getElementById("title-box");
        let descriptionBox=document.getElementById("description-box");
        titleBox.value=task.title;
        descriptionBox.value=task.description;

        let addBtn=document.getElementById("btn");
        addBtn.innerText="Edit Task";

        addBtn.onclick=function(){
            let updatedTitle=titleBox.value;
            let updatedDesc=descriptionBox.value;

            fetch(`http://localhost:${port}/edit/${id}`,{
                method : 'PUT',
                headers : {
                    'Content-Type':'application/json'
                },
                body : JSON.stringify(
                    {
                        title : updatedTitle,
                        description : updatedDesc
                    }
                )
            }).then((res)=>{
                return res.json();
            }).then((data)=>{
                getData();
            })
        };
    })
    
}

function doneTask(id){
    let task = document.getElementById(id);
    let btn = task.querySelector(".doneBtn");

    let currentStatus = btn.getAttribute("data-status");

    let newStatus = (currentStatus==="pending") ? "done" : "pending";

    fetch(`http://localhost:${port}/patch/${id}`,{
        method : 'PATCH',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify({
            status : newStatus
        })
    }).then((res)=>{
        if(!res.ok){
            return;
        }
        return res.json();
    }).then((data)=>{
        getData();
    });
}