fetch("inventory.json")
.then(response => response.json())
.then(data => {

document.getElementById("totalAssets").innerText = data.length;

let assigned = 0;
let instock = 0;
let disposed = 0;

data.forEach(item => {

const status = String(item.Status || "").toLowerCase();

if(status.includes("assigned")) assigned++;
if(status.includes("in stock")) instock++;
if(status.includes("disposed")) disposed++;

});

document.getElementById("assignedAssets").innerText = assigned;
document.getElementById("instockAssets").innerText = instock;
document.getElementById("disposedAssets").innerText = disposed;

const statusCount = {};

data.forEach(item => {

const status = item.Status || "Unknown";

if(!statusCount[status]){
statusCount[status] = 0;
}

statusCount[status]++;

});

new Chart(document.getElementById("statusChart"),{

type:"pie",

data:{
labels:Object.keys(statusCount),

datasets:[{
data:Object.values(statusCount)
}]
}

});

const columns = Object.keys(data[0]);

document.querySelector("#inventoryTable thead").innerHTML =
"<tr>" +
columns.map(col => `<th>${col}</th>`).join("") +
"</tr>";

function renderTable(rows){

document.querySelector("#inventoryTable tbody").innerHTML =
rows.map(row =>

"<tr>" +

columns.map(col =>
`<td>${row[col] || ""}</td>`
).join("")

+

"</tr>"

).join("");

}

renderTable(data);

document
.getElementById("searchBox")
.addEventListener("input", function(){

const q = this.value.toLowerCase();

const filtered = data.filter(item =>
JSON.stringify(item)
.toLowerCase()
.includes(q)
);

renderTable(filtered);

});

});
