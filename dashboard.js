Papa.parse("inventory.csv.csv", {
    download: true,
    header: true,
    skipEmptyLines: true,

    complete: function(results) {

        const data = results.data;

        document.getElementById("totalAssets").innerText = data.length;

        const assigned = data.filter(x =>
            (x.Status || "").toLowerCase() === "assigned"
        ).length;

        const instock = data.filter(x =>
            (x.Status || "").toLowerCase() === "in stock"
        ).length;

        document.getElementById("assignedAssets").innerText = assigned;
        document.getElementById("stockAssets").innerText = instock;

        const statusCount = {};

        data.forEach(item => {

            const status = item.Status || "Unknown";

            if(!statusCount[status]){
                statusCount[status] = 0;
            }

            statusCount[status]++;
        });

        new Chart(
            document.getElementById("statusChart"),
            {
                type: "pie",
                data: {
                    labels: Object.keys(statusCount),
                    datasets: [{
                        data: Object.values(statusCount)
                    }]
                }
            }
        );

        let html = `
        <table border="1" style="width:100%;border-collapse:collapse">
        <tr>
            <th>Inventory Number</th>
            <th>Manufacturer</th>
            <th>Model</th>
            <th>Status</th>
            <th>Assigned To</th>
            <th>Location</th>
        </tr>`;

        data.forEach(row => {

            html += `
            <tr>
                <td>${row["Inventory number"] || ""}</td>
                <td>${row["Manufacture"] || ""}</td>
                <td>${row["Model"] || ""}</td>
                <td>${row["Status"] || ""}</td>
                <td>${row["Assigned to (if any)"] || ""}</td>
                <td>${row["Location"] || ""}</td>
            </tr>`;
        });

        html += "</table>";

        document.getElementById("inventoryTable").innerHTML = html;
    }
});
