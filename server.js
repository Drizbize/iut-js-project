const SERVER_IP = "https://pixel-api.codenestedu.fr/";

function postRequest(server_ip, formData)
{
    fetch(server_ip, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(data => {
                throw new Error(data.error);
            });
        }

        return response.json();
    })
    .then(data => {
        return data;
    })
    .catch(error => {
        return null;
        //console.error('Erreur lors de la récupération des données :', error);
    });
}

const postSearchCoin = (uid, line, col) =>
{
    const formData = {
        uid: uid,
        lig: line,
        col: col
    };

    let res = postRequest(`${SERVER_IP}/chercherPiece`, formData);
    return res !== null;
}

const postTakeCoin = (uid, line, col) =>
{
    const formData = {
        uid: uid,
        lig: line,
        col: col
    };

    let res = postRequest(`${SERVER_IP}/prendrePiece`, formData);
    if (res === null)
        return false;

    
}

export function postPaySpy()
{

}

export function postStealCoin()
{

}