// const promiseExp = () => {
//     return new Promise((resolve,reject) => {
//         setTimeout(function (){
//             resolve("tratien");
//         },5000);
//         setTimeput(function (){
//             reject("d tra day");
//         },3000)
//     });
// }

// promiseExp()
//      .then((data) => {
//          console.log(err);
//      })    
//      .catch((data) => {
//          console.log(err);
//      })

const muaRau = (money) => new Promise((resolve,reject) => {
    if(money > 10000) {
        resolve("Rau cua chau day !");

    }else reject("D ban !");
});

const anRau = () => new Promise((resolve,reject) => {
    setTimeout(function() {
        resolve("An sxong roi");
    }, 5000)
})