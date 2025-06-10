const SERVER_IP = "https://pixel-api.codenestedu.fr";

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

        return {result: true, data: await response.json()};
    } catch (error) {
        //console.error("Erreur lors de l'envoi des données :", error);
        return {result: false, data: error};
    }
}

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

export const postSearchCoin = async (uid, line, col) =>
{
    const formData = {
        uid: uid,
        lig: line,
        col: col
    };

    let res = await postRequest(`${SERVER_IP}/chercherPiece`, formData);
    if (!res.result) return {result: false, msg: res.data};
    if (res.data.error !== undefined) return {result: false, msg: res.data.error};
    
    if (res.data.piecePresenteLigne === -1)
        return {result: false, msg: "Coin desn't exist on this position"}

    return {result: true, msg: "Exist coin on this position"};
}

export const postTakeCoin = async (uid, line, col) =>
{
    const formData = {
        uid: uid,
        lig: line,
        col: col
    };

    let res = await postRequest(`${SERVER_IP}/prendrePiece`, formData);
    if (!res.result) return {result: false, msg: res.data};
    if (res.data.error !== undefined) return {result: false, msg: res.data.error};

    return {result: res.data.piecePresente, msg: res.data.valeurPiece};
}

export const postPaySpy = async (uid) =>
{
    const formData = {
        uid: uid
    };

    let res = await postRequest(`${SERVER_IP}/payerEspion`, formData);
    if (!res.result) return {result: false, msg: res.data};
    if (res.data.error !== undefined) return {result: false, msg: res.data.error};

    return {result: true, msg: res.data["success"]};
}

export const postStealCoin = async (uid, line, col) =>
{
    const formData = {
        uid: uid,
        lig: line,
        col: col
    };

    let res = await postRequest(`${SERVER_IP}/volerPiece`, formData);
    if (!res.result) return {result: false, msg: res.data};
    if (res.data.error !== undefined) return {result: false, msg: res.data.error};

    return {result: true, msg: res["success"], data: res["piece"]};
}

export const postMegicNumber = async (uid, megicNumber) =>
{
    const formData = {
        uid: uid,
        megicNumber: megicNumber
    };

    let res = await postRequest(`${SERVER_IP}/megic-number`, formData);
    if (!res.result) return {result: false, msg: res.data};
    if (res.data.error !== undefined) return {result: false, msg: res.data.error};

    return {result: true, msg: res.data["message"]};
}

export const getTable = async () =>
{
    return (await getRequest(SERVER_IP, "tableau")).data;
}

export const getCoinsInBank = async () =>
{
    return (await getRequest(SERVER_IP, "piecesEnBanque")).data;
}

export const getListPlayers = async () =>
{
    return (await getRequest(SERVER_IP, "liste-joueurs")).data;
}

export const getUserTeam = async (uid) =>
{
    let res = await getRequest(SERVER_IP, `equipe-utilisateur?uid=${uid}`);
    if (!res.result)
        return {result: false, msg: res.data};

    return {result: true, msg: res.data.equipe};
}

export const getWaitTime = async (uid) =>
{
    let res = await getRequest(SERVER_IP, `temps-attente?uid=${uid}`);
    if (!res.result)
        return {result: false, msg: res.data};

    return {result: true, msg: res.data.tempsAttente};
}