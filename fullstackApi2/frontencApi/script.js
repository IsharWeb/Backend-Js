// const apiUrl = fetch('http://localhost:5000/travel');
// console.log(apiUrl);

// const id =  document.querySelectorAll(".id");
// const requirement =  document.querySelectorAll(".requirement");
// const instructions =  document.querySelectorAll(".instructions")

const apiUrl = fetch("http://localhost:5000/travel");
apiUrl
.then(res => res.json())
.then(travel => { 
    const contianer = document.querySelector(".contianer")
    travel.forEach(item => {
        //  let value = "";
    const travel =   document.createElement("div")
    travel.classList.add("travel")
      travel.innerHTML = `
        <h2 class="title">${item.title}</h2>
        <p class="requirement"><strong>Requirement:</strong> ${item.requirement}</p>
        <p class="instruction"><strong>Instruction:</strong> ${item.instruction}</p>
        <p class="id"><strong>ID:</strong> ${item.id}</p>
        `; 
      contianer.appendChild(travel)
    //  contianer.append(allData)
         // console.log(title.innerHTML = 'hiishar');
        //  console.log(item.id);
          
    //    const data = title.innerText = item.title
    //    value += data    
    })
}).catch(err => console.error("Error fetching travel data:", err));

// toggle bnt chang bc color
const toggleBtn = document.getElementById("styleToggleBtn");

toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("active");
});


// const newpromise = new Promise((res, rej) => {
//     const fetchurl = fetch('http://localhost:5000/travel')
//     const data = fetchurl
//         .then((res) => res.json())
//         .then(data => console.log(data.id))
//         .catch(rej => rej("The promise was rejected", rej))

//     console.log(data);data

//     return data
// })
// console.log(newpromise);

// async function apiFunction(req, res) {
// const fetchurl = fetch('http://localhost:5000/travel')

//     console.log(`The url is = ${fetchurl}`);
    
//    const mydata = await json()
//    return mydata
// }
// let fucData = apiFunction()
// console.log(fucData);



// const apiPromise = new Promise((resolve, reject) => {
//     const apiUrl = fetch('http://localhost:5000/travel');
//     let data = apiUrl
//         .then(response => response.json())
//         .then(data => resolve(data))
//         .catch(error => reject(error));
//     console.log(`api url data = ${data}`);
// });

// console.log(apiPromise);



// const data = apiPromise
// .then(data => data)
// .catch(error => error)
// console.log("the data = ", data);


// const prom = new Promise((resolve, reject) => {
//     resolve('hellow')
//     reject('error')
// })
// console.log("exaple promise = ", prom);

// const data1 = [{ id: 1, title: 'ishar' }]



// data1.forEach(items => {
//     console.log(items.id);
//     console.log(items.title);

// });

// my error

// const apiPromise = new Promise();
// apiPromise((req, res, rej) => {
//     const apiUrl = fetch('http://localhost:5000/travel');
//      req.apiUrl()
//      .then(req.json(data))
//      .then(res.data)
//      console.log(data.id);

// })


// const apiUrl = fetch('http://localhost:5000/travel');

// const apiPromise = new Promise((resolve, reject) => {

//     apiUrl
//     .then(response => response.json())
//     .then(data => resolve(data))
//     .catch(error => reject(error))
//     return data
// })
// apiPromise.then(data => console.log(data))


// that show me result
// const apiPromise = new Promise((resolve, reject) => {
//     const apiUrl = fetch('http://localhost:5000/travel')
//     .then(response => response.json())
//     .then(data => console.log(data))
//     .catch(error => console.error('Error:', error));
// })



// const allTravels = async (req, res) => {
//     const request = await req.apiUrl
//     const response = await res.json(request)
//     return response;
//     // console.log(response);

// }

// allTravels.forEach((trv) => {
//     console.log(trv.id);
//     console.log(trv.title);


// });


// console.log(allTravels);
