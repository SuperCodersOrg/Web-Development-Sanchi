const p1 = Promise.resolve("A");
const p2 = Promise.reject("Rejection");
const p3 = Promise.resolve("C");

Promise.all([p1,p2,p3])
    .then((result)=>{
        // console.log(p1,p2,p3);
        console.log("Promise all");
    })
    .catch((error)=>{
        console.log(error);
    });


const pr1 = Promise.resolve("A");
const pr2 = Promise.reject("B");
const pr3 = Promise.resolve("C");

Promise.allSettled([pr1,pr2,pr3])
    .then((result)=>{
        // console.log(pr1,pr2,pr3);
        console.log("Promise all settled");
    })
    .catch((error)=>{
        console.log(error);
    });


const p4 = new Promise((resolve) => {
    setTimeout(()=>{
        resolve("p4");
    },1000);
});
const p5 = new Promise((reject)=>{
    setTimeout(()=>{
        reject("p5");
    },2000);
})
Promise.race([p4,p5])
    .then((result)=>{
        console.log(result);
    })
    .catch((error)=>{
        console.log(error);
    });


const pr4 = new Promise((resolve) => {
    setTimeout(()=>{
        resolve("pr4");
    },4000);
});
const pr5 = new Promise((resolve)=>{
    setTimeout(()=>{
        resolve("pr5");
    },2000);
});
const pr6 = new Promise((resolve,reject)=>{
    setTimeout(()=>{
        reject("pr6");
    },1000);
})
Promise.any([pr4,pr5,pr6])
    .then((result)=>{
        console.log(result);
    })
    .catch((error)=>{
        console.log(error);
    });



function pq(){
    return new Promise((resolve)=>{
        setTimeout(()=>{
            console.log("PQR");
            resolve("Done");
        },5000);
    });
}
async function abc(){
    console.log("A");
    const pqr = await pq();
    console.log(pqr);
    console.log("B");
}
abc();