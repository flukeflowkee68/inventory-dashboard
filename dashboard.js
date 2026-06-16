let rawData = [];

fetch("inventory.json")
.then(res => res.json())
.then(data => {

rawData = data;

populateFilters();

updateDashboard(data);

document
.getElementById("locationFilter")
.addEventListener("change", applyFilter);

document
.getElementById("statusFilter")
.addEventListener("change", applyFilter);

});

function populateFilters(){

const locations =
[...new Set(rawData.map(x=>x.location))];

const statuses =
[...new Set(rawData.map(x=>x.status))];

locations.forEach(x=>{

locationFilter.innerHTML +=
`<option>${x}</option>`;

});

statuses.forEach(x=>{

statusFilter.innerHTML +=
`<option>${x}</option>`;

});

}

function applyFilter(){

let data = [...rawData];

const loc =
locationFilter.value;

const stat =
statusFilter.value;

if(loc){

data =
data.filter(
x=>x.location===loc
);

}

if(stat){

data =
data.filter(
x=>x.status===stat
);

}

updateDashboard(data);

}

let statusChart;
let locationChart;

function updateDashboard(data){

totalAssets.innerText =
data.length;

assignedCount.innerText =
data.filter(
x=>x.status==="Assigned"
).length;

stockCount.innerText =
data.filter(
x=>x.status==="In Stock"
).length;

locationCount.innerText =
new Set(
data.map(x=>x.location)
).size;

const statusMap={};

data.forEach(x=>{

statusMap[x.status] =
(statusMap[x.status]||0)+1;

});

const locationMap={};

data.forEach(x=>{

locationMap[x.location] =
(locationMap[x.location]||0)+1;

});

if(statusChart)
statusChart.destroy();

statusChart =
new Chart(
document.getElementById("statusChart"),
{
type:"pie",
data:{
labels:Object.keys(statusMap),
datasets:[{
data:Object.values(statusMap)
}]
}
});

if(locationChart)
locationChart.destroy();

locationChart =
new Chart(
document.getElementById("locationChart"),
{
type:"bar",
data:{
labels:Object.keys(locationMap),
datasets:[{
data:Object.values(locationMap)
}]
}
});
}
