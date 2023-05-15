const jsonToClass=new Map()
jsonToClass.set('Work', '.work')
jsonToClass.set('Play', '.play')
jsonToClass.set('Study', '.study')
jsonToClass.set('Exercise', '.exercise')
jsonToClass.set('Social', '.social')
jsonToClass.set('Self Care', '.selfcare')

let obj

async function getData() {
    const resp=await fetch('./data.json');
    obj=await resp.json();
}

await getData()

function populateData(freq) {    
    for(const k in obj) {        
        const dataEl=document.querySelectorAll(jsonToClass.get(obj[k].title)+" .three, "+jsonToClass.get(obj[k].title)+" .four");
        
        dataEl[0].innerText=obj[k]['timeframes'][`${freq}`]['current']+"hrs";
        dataEl[1].innerText="Last Week - "+obj[k]['timeframes'][`${freq}`]['previous']+"hrs";
    }
}

populateData('daily')

const dailyEl=document.querySelector(".daily>span")
const weeklyEl=document.querySelector(".weekly>span")
const monthlyEl=document.querySelector(".monthly>span")

dailyEl.addEventListener("click", (event)=>{
    dailyEl.style.color='hsl(236, 100%, 87%)';
    weeklyEl.style.color='hsl(235, 45%, 61%)';
    monthlyEl.style.color='hsl(235, 45%, 61%)';
    populateData('daily')
})

weeklyEl.addEventListener("click", (event)=>{
    dailyEl.style.color='hsl(235, 45%, 61%)';
    weeklyEl.style.color='hsl(236, 100%, 87%)';
    monthlyEl.style.color='hsl(235, 45%, 61%)';
    populateData('weekly')
})

monthlyEl.addEventListener("click", (event)=>{
    dailyEl.style.color='hsl(235, 45%, 61%)';
    weeklyEl.style.color='hsl(235, 45%, 61%)';
    monthlyEl.style.color='hsl(236, 100%, 87%)';
    populateData('monthly')
})