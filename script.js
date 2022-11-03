const countries= document.querySelector(".countries");
const req = new XMLHttpRequest();
let chartt=document.querySelector(".chart");
console.log("start-----");
req.open("GET","https://api.covid19api.com/countries",true);
req.onreadystatechange = function() {
    if(req.readyState ==  4 && req.status == 200 ) {
        let country = JSON.parse(req.response);
        country.forEach( e => {
            let str = `<div class="clickk" id="${e.Country}"> ${e.Country} </div>`
            countries.innerHTML += str
        });
        let dm=document.querySelectorAll(".clickk")
        console.log(dm);
        dm.forEach(elem => {
            elem.addEventListener("click",getdata());  
        })
    }
}
req.send();
console.log("end-----------------");
function getdata(e){
    let a=e.target.innerHTML;
    const ctx = document.getElementById('content').getContext('2d');
    if(window.bar != undefined) window.bar.destroy();
    let req2=new XMLHttpRequest();
    let selectedCountry = a;
    let CONFIRMED = [];
    let DATE = [];
    let ACTIVE = [];
    let DEATHS = [];
    let RECOVERED = [];

    req2.open("GET",`https://api.covid19api.com/dayone/country/`+selectedCountry,true);
    req2.onreadystatechange = function() {
        if(req2.readyState ==  4 && req2.status == 200 ) {
            let data = JSON.parse(req2.response);
            
            for(let i=0; i< data.length; i++){
                Date.push(req2[i].Date.slice(5,10));
                CONFIRMED.push(req2[i].Confirmed);
                ACTIVE.push(req2[i].ACTIVE);
                DEATHS.push(req2[i].DEATHS);
                RECOVERED.push(req2[i].RECOVERED);

            }
        


window.bar = new Chart(ctx,{
    type: 'line',
    data : {
        labels: DATE,
        datasets : [{
            label: 'Confirmed',
            data: CONFIRMED,
            backgroundColor: [
                'rgba(245, 6, 6, 0.2)',
            ],
            borderColor: [
                'rgba(3,5,76,89)'
            ],
        },
        {
            label:'Active',
            data: ACTIVE,
            backgroundColor: [
                'rgba(215,2,2,2)',
            ],
            borderColor: [
                'rgba(160,67,85,0.3)'
            ],
        },
        {
            label: 'Deaths',
            data: DEATHS,
            backgroundColor: [
                'rgba(200,30,5,4)',
            ],
            borderColor:[
                'rgba(56,8,0,0.4)',
            ],
        },
        {
            label: 'Recovered',
            data: RECOVERED,
            backgroundColor: [
                'rgba(200,30,5,4)',
            ],
            borderColor:[
                'rgba(56,8,0,0.4)',
            ],
        }
    ]
        },
        options: {
            title:{
                display:true,
                text: a,
            },

            scales: {
                yAxes: [{
                    ticks: {
                        beginAtzero: true,
                    }
                }]
            }
        }
        

});
}
}

req2.send();
}


