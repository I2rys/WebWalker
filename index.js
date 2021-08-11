//Dependencies
const DirWalker = require("dirw4lker")
const Fs = require("fs")

//Variables
const Self_Args = process.argv.slice(2)

//Main
if(Self_Args.length == 0){
    console.log(`node index.js <url> <extensions>
Example: node index.js https://google.com js,php,css`)
    process.exit()
}else{
    if(Self_Args[0] == ""){
        console.log("Invalid url.")
        process.exit()
    }

    if(Self_Args[0].indexOf("https") == -1){
        console.log("Invalid url.")
        process.exit()
    }

    
    if(Self_Args[1] == ""){
        console.log("Invalid extensions.")
        process.exit()
    }

    console.log("Scanning the URL for the extensions you specified. Please wait.")
    Main()
    async function Main(){
        const config = {
            host: Self_Args[0],
            ext: Self_Args[1],
            asyncRequests: true
        }

        const temp_results = await DirWalker.launch(config)
        const temp_results2 = temp_results.founds.map((u) => (u.target))
        var results = ""
        
        for( i = 0; i <= temp_results2.length-1; i++ ){
            if(results.length == 0){
                results = temp_results2[i]
            }else{
                results += `\n${temp_results2[i]}`
            }
        }

        console.log("Successfully scanning please check output.txt")
        Fs.writeFileSync("./output.txt", results, "utf8")
        process.exit()
    }
}
