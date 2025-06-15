import * as server from "./server.js";

const outputP = document.getElementById("output");
const lineInput = document.getElementById("lineInput");
const colInput = document.getElementById("colInput");
const cheatTable = document.getElementById("cheatTable");
const playersInfo = document.getElementById("playersInfo");
const bankInfo = document.getElementById("bankInfo");

/**
 * Updates all dynamic UI elements including table, bank info, and player info
 */
export async function update() {
    updateTable();
    updateBankInfo();
    updatePlayersInfo();
}

/**
 * Fetches the current game table and updates the HTML display
 * Also extracts coordinates of yellow tiles and displays them in a cheat section
 */
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
 * Fetches the list of all players and displays their stats in a table
 * Includes player name, group, last pixel update, pixel count, and ban status
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

        if (players.length === 0) {
            const tr = document.createElement("tr");
            const tdNoData = document.createElement("td");
            tdNoData.colSpan = 5;
            tdNoData.textContent = "No data";
            tr.appendChild(tdNoData);
            tbody.appendChild(tr);
        }

        players.forEach(p => {
            const tr = document.createElement("tr");

            const tdName = document.createElement("td");
            tdName.textContent = p.nom;
            tr.appendChild(tdName);

            const tdGroup = document.createElement("td");
            tdGroup.textContent = p.groupe;
            tr.appendChild(tdGroup);

            const tdDate = document.createElement("td");
            const d = new Date(p.lastModificationPixel);
            tdDate.textContent = d.toLocaleString();
            tr.appendChild(tdDate);

            const tdCount = document.createElement("td");
            tdCount.textContent = p.nbPixelsModifies;
            tr.appendChild(tdCount);

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
 * Fetches bank information for each team and updates the HTML table
 * Shows team name, coins in bank, and total treasure
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

        if (banks.length === 0) {
            const tr = document.createElement("tr");
            const tdNoData = document.createElement("td");
            tdNoData.colSpan = 3;
            tdNoData.textContent = "No data";
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

/**
 * Displays a message in the output area with a color indicating success or error
 * @param {string} text - Message to display
 * @param {boolean} [isCorrect=true] - Whether the operation was successful
 */
export function output(text, isCorrect = true) {
    outputP.innerHTML = text;
    outputP.style.backgroundColor = isCorrect ? "lightgreen" : "red";
}

/**
 * Gets the currently selected row index input by the user
 * @returns {string} Line value
 */
export function getLine() {
    return lineInput.value;
}

/**
 * Gets the currently selected column index input by the user
 * @returns {string} Column value
 */
export function getCol() {
    return colInput.value;
}

/**
 * Delays execution for a given number of milliseconds
 * @param {number} ms - Milliseconds to wait
 * @returns {Promise<void>} Promise that resolves after the delay
 */
export function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}