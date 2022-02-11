const fs = require('fs');

setImmediate(
    ()=> console.log("immediate")
)
setTimeout(() => {
    console.log("3se time")
}, 3000);
setTimeout(() => {
    console.log("0se time")
}, 0);

process.nextTick(
    ()=>{
        console.log("next tick")
    }
)


fs.readFile(__filename, ()=>{
    setImmediate(
        ()=> console.log("immediate after file")
    )
    setTimeout(() => {
        console.log("0 time after file")
    }, 0);
    process.nextTick(
        ()=>{
            console.log("next tick after file")
        }
    )

})
process.on("beforeExit", ()=>{
    console.log("before exit ")
})
console.log("hii")