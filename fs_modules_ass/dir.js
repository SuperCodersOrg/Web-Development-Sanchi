let file_sys = require('fs');
let file_path = require('path');
let arr2 = [];

const source = process.argv[2];
const ext_input = process.argv[3];
const destination = process.argv[4];

if(!file_sys.existsSync(source)){
    console.log("Source file doesn't exist");
    process.exit();
}

if(!file_sys.existsSync(destination)){
    file_sys.mkdirSync(destination);
}

function loadFiles(source,destination){
    let files=file_sys.readdirSync(source);
    for(let file of files){
        const sourcePath=file_path.join(source,file);
        const fileInfo=file_sys.statSync(sourcePath);
        if(fileInfo.isDirectory()){
            let destinationPath=file_path.join(destination,file);
            if(!file_sys.existsSync(destinationPath)){
                file_sys.mkdirSync(destinationPath);
            }
            loadFiles(sourcePath,destinationPath);
        }
        else{
            if(file_path.extname(file) === ext_input){
                let destinationPath = file_path.join(destination, file);
                file_sys.copyFileSync(sourcePath, destinationPath);
            }
        }
    } 
}

loadFiles(source,destination);

// if(!file_sys.existsSync(input)){
//     let dataInFile = file_sys.readdirSync(input);
//     file_sys.mkdirSync(input);
//     let dataInFile = file_sys.readdirSync(input);
//     arr2 = dataInFile.filter( extension => file_path.extname(extension) === ext_input );
//     for(let file of arr2){
//         file_sys.copyFileSync(input+'/'+file,destination+'/'+file);
//     }
// }
// else{
// //     let dataInFile = file_sys.readdirSync(input);
//     arr2 = dataInFile.filter( extension => file_path.extname(extension) === ext_input );
//     for(let file of arr2){
//         file_sys.copyFileSync(input+'/'+file,destination+'/'+file);
//     }
// }

