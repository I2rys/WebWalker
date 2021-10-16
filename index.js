//Dependencies
const DirWalker = require("dirw4lker")
const Fs = require("fs")

//Variables
const Self_Args = process.argv.slice(2)

//Main
if(!Self_Args.length){
    console.log(`node index.js <output> <url> <extensions>
Example: node index.js output_test.txt https://google.com js,php,css`)
    process.exit()
}

if(!Self_Args[0]){
    console.log("Invalid output.")
    process.exit()
}

if(!Self_Args[1]){
    console.log("Invalid url.")
    process.exit()
}

if(Self_Args[1].indexOf("https") == -1){
    console.log("Invalid url.")
    process.exit()
}

    
if(!Self_Args[2]){
    console.log("Invalid extensions.")
    process.exit()
}

console.log("Scanning the URL for the extensions you specified. Please wait.")
Main()
async function Main(){
    const config = {
        host: Self_Args[1],
        ext: Self_Args[2],
        asyncRequests: true
    }

    const temp_results = await DirWalker.launch(config)
    const temp_results2 = temp_results.founds.map((u) => (u.target))
    var results = ""
        
    for( i = 0; i <= temp_results2.length-1; i++ ){
        if(!results.length){
            results = temp_results2[i]
        }else{
            results += `\n${temp_results2[i]}`
        }
    }

    console.log("Scanning is finished.")
    Fs.writeFileSync(Self_Args[0], results, "utf8")
    console.log(`The results has been saved to ${Self_Args[0]}`)
    process.exit()
}
