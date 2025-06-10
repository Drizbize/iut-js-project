import * as server from "./server.js";

const outputP = document.getElementById("output");
const lineInput = document.getElementById("lineInput");
const colInput = document.getElementById("colInput");
const cheatTable = document.getElementById("cheatTable");
const playersInfo = document.getElementById("playersInfo");
const bankInfo = document.getElementById("bankInfo");

export async function update() {
    updateTable();
    updateBankInfo();
    updatePlayersInfo();
}

export async function updateTable() {
    let tableHtml = document.getElementById("table");

    let table = await server.getTable();

    tableHtml.innerHTML = "";
    let cheatLabel = "";

    for (let i = 0; i < table.length; i++) {
        let row = document.createElement("tr");
        for (let j = 0; j < table[i].length; j++) {
            let column = document.createElement("td");
            column.style.backgroundColor = table[i][j];
            row.appendChild(column);

            if (table[i][j] == "yellow") {
                cheatLabel += `(${i}-${j}) `;
            }

        }
        tableHtml.appendChild(row);
    }

    cheatTable.innerHTML = "" + cheatLabel;
}

/**
 * Récupère la liste des joueurs et met à jour le tableau #playersInfo
 */
export async function updatePlayersInfo() {
    const tbody = document.createElement("tbody");
    try {
        const players = await server.getListPlayers();
        playersInfo.innerHTML = "";

        const thead = document.createElement("thead");
        const headerRow = document.createElement("tr");
        ["Nom", "Groupe", "Dernière modif", "Nb pixels modifiés", "Banni"].forEach(text => {
            const th = document.createElement("th");
            th.textContent = text;
            headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);
        playersInfo.appendChild(thead);

        if (players.length === 0)
        {
            const tr = document.createElement("tr");
            const tdNoData = document.createElement("td");
            tdNoData.colSpan = 5;
            tdNoData.textContent = "No data";
            tr.appendChild(tdNoData);

            tbody.appendChild(tr);
        }

        players.forEach(p => {
            const tr = document.createElement("tr");

            // name
            const tdName = document.createElement("td");
            tdName.textContent = p.nom;
            tr.appendChild(tdName);

            // group
            const tdGroup = document.createElement("td");
            tdGroup.textContent = p.groupe;
            tr.appendChild(tdGroup);

            // last modified date
            const tdDate = document.createElement("td");
            const d = new Date(p.lastModificationPixel);
            tdDate.textContent = d.toLocaleString(); // ou .toLocaleDateString()/toLocaleTimeString()
            tr.appendChild(tdDate);

            // amount of coins modified
            const tdCount = document.createElement("td");
            tdCount.textContent = p.nbPixelsModifies;
            tr.appendChild(tdCount);

            // banned
            const tdBan = document.createElement("td");
            tdBan.textContent = p.banned ? "Oui" : "Non";
            tdBan.style.color = p.banned ? "red" : "inherit";
            tr.appendChild(tdBan);

            tbody.appendChild(tr);
        });
    } catch (err) {
        console.error("Error:", err);
        const tr = document.createElement("tr");
        const td = document.createElement("td");
        td.colSpan = 5;
        td.textContent = "Erreur de chargement";
        tr.appendChild(td);
        tbody.appendChild(tr);
    }
    playersInfo.appendChild(tbody);
}


/**
 * Récupère les pièces en banque et met à jour le tableau #bankInfo
 */
export async function updateBankInfo() {
    const tbody = document.createElement("tbody");
    try {
        const banks = await server.getCoinsInBank();
        bankInfo.innerHTML = "";

        const thead = document.createElement("thead");
        const headerRow = document.createElement("tr");
        ["Groupe", "Pieces en banque", "Total trésor"].forEach(text => {
            const th = document.createElement("th");
            th.textContent = text;
            headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);
        bankInfo.appendChild(thead);

        if (banks.length === 0)
        {
            const tr = document.createElement("tr");
            const tdNoData = document.createElement("td");
            tdName.textContent = "No data";
            tr.appendChild(tdNoData);

            tbody.appendChild(tr);
        }

        banks.forEach(b => {
            const tr = document.createElement("tr");

            const tdGroup = document.createElement("td");
            tdGroup.textContent = b.groupe;
            tr.appendChild(tdGroup);

            const tdCount = document.createElement("td");
            tdCount.textContent = b.nombreDePieces;
            tr.appendChild(tdCount);

            const tdTotal = document.createElement("td");
            tdTotal.textContent = b.totalTresor;
            tr.appendChild(tdTotal);

            tbody.appendChild(tr);
        });
    } catch (err) {
        console.error("Error :", err);
        const tr = document.createElement("tr");
        const td = document.createElement("td");
        td.colSpan = 3;
        td.textContent = "Erreur de chargement";
        tr.appendChild(td);
        tbody.appendChild(tr);
    }
    bankInfo.appendChild(tbody);
}


export function output(text, isCorrect = true) {
    outputP.innerHTML = text;
    outputP.style.backgroundColor = isCorrect ? "lightgreen" : "red";
}

export function getLine() {
    return lineInput.value;
}

export function getCol() {
    return colInput.value;
}

export function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}