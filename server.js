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
        
    })
    .catch(error => {
        console.error('Erreur lors de la récupération des données :', error);
    });
}

const postSearchCoin = (uid, line, col) =>
{
    let isCoint = false;

    const formData = {
        uid: uid,
        lig: line,
        col: col
    };

    fetch(`${SERVER_IP, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    }}`)
    .then(response => {
        if (!response.ok) {
            return response.json().then(data => {
                throw new Error(data.error);
            });
        }

        return response.json();
    })
    .then(data => {
        
    })
    .catch(error => {
        console.error('Erreur lors de la récupération des données :', error);
    });
}

export function postTakeCoin()
{
}

export function postPaySpy()
{

}

export function postStealCoin()
{

}