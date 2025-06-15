const SERVER_IP = "https://pixel-api.codenestedu.fr";

/**
 * Sends a POST request to the given server endpoint with the provided data
 * @param {string} server_ip - The full endpoint URL
 * @param {Object} formData - Data to send as JSON in the request body
 * @returns {Promise<{result: boolean, data: any}>} - Response result and data or error
 */
async function postRequest(server_ip, formData) {
    try {
        const response = await fetch(server_ip, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(formData)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error);
        }

        return {result: true, data: await response.json()};
    } catch (error) {
        return {result: false, data: error};
    }
}

/**
 * Sends a GET request to the given server endpoint
 * @param {string} server_ip - Base server URL
 * @param {string} commande - Command or path appended to the URL
 * @returns {Promise<{result: boolean, data: any}>} - Response result and data or error
 */
async function getRequest(server_ip, commande) {
    try {
        const response = await fetch(`${server_ip}/${commande}`);
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error);
        }
        return {result: true, data: await response.json()};
    } catch (error) {
        return {result: false, data: error};
    }
}

/**
 * Sends a request to search for a coin on the given cell
 * @param {string} uid - User ID
 * @param {number} line - Row index
 * @param {number} col - Column index
 * @returns {Promise<{result: boolean, msg: string}>} - Result with message
 */
export const postSearchCoin = async (uid, line, col) => {
    const formData = {uid, lig: line, col};
    let res = await postRequest(`${SERVER_IP}/chercherPiece`, formData);

    if (!res.result) return {result: false, msg: res.data};
    if (res.data.error !== undefined) return {result: false, msg: res.data.error};
    if (res.data.piecePresenteLigne < -1)
        return {result: false, msg: "Coin desn't exist on this position"};

    return {result: true, msg: "Exist coin on this position"};
}

/**
 * Attempts to take a coin from the specified cell
 * @param {string} uid - User ID
 * @param {number} line - Row index
 * @param {number} col - Column index
 * @returns {Promise<{result: boolean, msg: string}>} - Result with message
 */
export const postTakeCoin = async (uid, line, col) => {
    const formData = {uid, lig: line, col};
    let res = await postRequest(`${SERVER_IP}/prendrePiece`, formData);

    if (!res.result) return {result: false, msg: res.data};
    if (res.data.error !== undefined) return {result: false, msg: res.data.error};

    return {result: res.data.piecePresente, msg: res.data.valeurPiece};
}

/**
 * Pays an in-game spy using the user's ID
 * @param {string} uid - User ID
 * @returns {Promise<{result: boolean, msg: string}>} - Result with success message
 */
export const postPaySpy = async (uid) => {
    const formData = {uid};
    let res = await postRequest(`${SERVER_IP}/payerEspion`, formData);

    if (!res.result) return {result: false, msg: res.data};
    if (res.data.error !== undefined) return {result: false, msg: res.data.error};

    return {result: true, msg: res.data["success"]};
}

/**
 * Attempts to steal a coin from another team
 * @param {string} uid - User ID
 * @param {number} line - Row index
 * @param {number} col - Column index
 * @returns {Promise<{result: boolean, msg: string, data: any}>} - Success, message, and coin data
 */
export const postStealCoin = async (uid, line, col) => {
    const formData = {uid, lig: line, col};
    let res = await postRequest(`${SERVER_IP}/volerPiece`, formData);

    if (!res.result) return {result: false, msg: res.data};
    if (res.data.error !== undefined) return {result: false, msg: res.data.error};

    return {result: true, msg: res["success"], data: res["piece"]};
}

/**
 * Validates a special "magic number" with the server
 * @param {string} uid - User ID
 * @param {string} megicNumber - The special code to validate
 * @returns {Promise<{result: boolean, msg: string}>} - Result and validation message
 */
export const postMegicNumber = async (uid, megicNumber) => {
    const formData = {uid, megicNumber};
    let res = await postRequest(`${SERVER_IP}/megic-number`, formData);

    if (!res.result) return {result: false, msg: res.data};
    if (res.data.error !== undefined) return {result: false, msg: res.data.error};

    return {result: true, msg: res.data["message"]};
}

/**
 * Retrieves the game board (2D array of cell states)
 * @returns {Promise<any>} - Board data
 */
export const getTable = async () => {
    return (await getRequest(SERVER_IP, "tableau")).data;
}

/**
 * Gets the current count of coins in each team’s bank
 * @returns {Promise<any[]>} - Array of objects with coin counts per team
 */
export const getCoinsInBank = async () => {
    return (await getRequest(SERVER_IP, "piecesEnBanque")).data;
}

/**
 * Retrieves a list of all players and their game-related stats
 * @returns {Promise<any[]>} - Array of player data
 */
export const getListPlayers = async () => {
    return (await getRequest(SERVER_IP, "liste-joueurs")).data;
}

/**
 * Gets the team ID associated with a specific user ID
 * @param {string} uid - User ID
 * @returns {Promise<{result: boolean, msg: string}>} - Team name if found
 */
export const getUserTeam = async (uid) => {
    let res = await getRequest(SERVER_IP, `equipe-utilisateur?uid=${uid}`);
    if (!res.result) return {result: false, msg: res.data};

    return {result: true, msg: res.data.equipe};
}

/**
 * Fetches the remaining wait time before a user can perform another action
 * @param {string} uid - User ID
 * @returns {Promise<{result: boolean, msg: number}>} - Wait time in seconds
 */
export const getWaitTime = async (uid) => {
    let res = await getRequest(SERVER_IP, `temps-attente?uid=${uid}`);
    if (!res.result) return {result: false, msg: res.data};

    return {result: true, msg: res.data.tempsAttente};
}