import * as server from "./server.js";

export async function updateTable()
{
    let tableHtml = document.getElementById("table");
    
    let table = await server.getTable();
    
    tableHtml.innerHTML = "";
    for (let i = 0; i < table.length; i++)
    {
        let row = document.createElement("tr");
        for (let j = 0; j < table[i].length; j++)
        {
            let column = document.createElement("td");
            column.style.backgroundColor = table[i][j];
            row.appendChild(column);
        }
        tableHtml.appendChild(row);
    }
}

export function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}