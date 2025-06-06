import * as server from "./server.js";

const outputP = document.getElementById("output");
const lineInput = document.getElementById("lineInput");
const colInput = document.getElementById("colInput");

export async function update()
{
    updateTable();
}

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

export function output(text, isCorrect = true)
{
    outputP.innerHTML = text;
    outputP.style.backgroundColor = isCorrect ? "lightgreen" : "red";
}

export function getLine()
{
    return lineInput.value;
}

export function getCol()
{
    return colInput.value;
}

export function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}