const SERVER_IP = "https://pixel-api.codenestedu.fr/";

async function postRequest(server_ip, formData) {
    try {
        const response = await fetch(server_ip, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error);
        }

        const data = await response.json();
        console.log("postRequest result:", data);
        return data;
    } catch (error) {
        console.error("Erreur lors de l'envoi des données :", error);
        return null;
    }
}

async function getRequest(server_ip, commande) {
    try {
        const response = await fetch(`${server_ip}/${commande}`);
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error);
        }

        return await response.json();
    } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
        return null;
    }
}

export const postSearchCoin = (uid, line, col) =>
{
    const formData = {
        uid: uid,
        lig: line,
        col: col
    };

    let res = postRequest(`${SERVER_IP}/chercherPiece`, formData);
    if (res === null)
        return {resultat: false, msg: "Server error"};

    if (res["error"] !== null)
        return {resultat: false, msg: res["error"]};

    return {resultat: true, msg: "Exist coin on this possition"};
}

export const postTakeCoin = (uid, line, col) =>
{
    const formData = {
        uid: uid,
        lig: line,
        col: col
    };

    let res = postRequest(`${SERVER_IP}/prendrePiece`, formData);
    if (res === null)
        return {resultat: false, msg: "Server error"};

    if (res["error"] !== null)
        return {resultat: false, msg: res["error"]};

    return {resultat: res["piecePresente"], msg: res["valeurPiece"]};
}

export const postPaySpy = (uid) =>
{
    const formData = {
        uid: uid
    };

    let res = postRequest(`${SERVER_IP}/payerEspion`, formData);
    if (res === null)
        return {resultat: false, msg: "Server error"};

    if (res["error"] !== null)
        return {resultat: false, msg: res["error"]};

    return {resultat: true, msg: res["success"]};
}

export const postStealCoin = (uid, line, col) =>
{
    const formData = {
        uid: uid,
        lig: line,
        col: col
    };

    let res = postRequest(`${SERVER_IP}/volerPiece`, formData);
    if (res === null)
        return {resultat: false, msg: "Server error"};

    if (res["error"] !== null)
        return {resultat: false, msg: res["error"]};

    return {resultat: true, msg: res["success"], data: res["piece"]};
}

export const postMegicNumber = (megicNumber) =>
{
    const formData = {
        uid: uid,
        megicNumber: megicNumber
    };

    let res = postRequest(`${SERVER_IP}/megic-number`, formData);
    if (res === null)
        return {resultat: false, msg: "Server error"};

    if (res["error"] !== null)
        return {resultat: false, msg: res["error"]};

    return {resultat: true, msg: res["success"]};
}

export const getTable = () =>
{
    return getRequest(SERVER_IP, "tableau");
}

export const getCoinsInBank = () =>
{
    return getRequest(SERVER_IP, "pieceEnBanque");
}

export const getListPlayers = () =>
{
    return getRequest(SERVER_IP, "liste-joueurs");
}

export const getUserTeam = (uid) =>
{
    return getRequest(SERVER_IP, `/equipe-utilisateur?uid=${uid}`);
}

export const getWaitTime = (uid) =>
{
    return getRequest(SERVER_IP, `/temps-attente?uid=${uid}`);
}