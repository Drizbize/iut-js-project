import { getUserTeam, getWaitTime, postMegicNumber, postPaySpy, postSearchCoin, postStealCoin, postTakeCoin } from "./server.js";
import { getCol, getLine, output, update } from "./utils.js";

const uidInput = document.getElementById("uidInput");
const verificationBtn = document.getElementById("verificationBtn");

const searchCoinBtn = document.getElementById("searchCoinBtn");
const takeCoinBtn = document.getElementById("takeCoinBtn");
const stealCoinBtn = document.getElementById("stealCoinBtn");
const paySpyBtn = document.getElementById("paySpyBtn");
const waitTimeText = document.getElementById("waitTimeText");
const megicNumberInput = document.getElementById("megicNumberInput");
const megicNumberBtn = document.getElementById("megicNumberBtn");


var uid = ""; //KaGSu21PXB0gxAU

update();

verificationBtn.addEventListener('click', async () => {
    uid = uidInput.value;
    let res = await getUserTeam(uid);
    output((res.result ? "Vous etes dans l'equipe " : "") + res.msg, res.result);
    update();
});

searchCoinBtn.addEventListener('click', async () => {
    let waitTime = await getWaitTime(uid);
    if (waitTime > 0)
    {
        return;
    }

    let res = await postSearchCoin(uid, getLine(), getCol());
    output(res.msg, res.result);
    update();
});

takeCoinBtn.addEventListener('click', async () => {
    let waitTime = await getWaitTime(uid);
    if (waitTime > 0)
        return;
    
    let res = await postTakeCoin(uid, getLine(), getCol());
    output(`Coin with value ${res.msg}`, res.result);
    update();
});

stealCoinBtn.addEventListener('click', async () => {
    let waitTime = await getWaitTime(uid);
    if (waitTime > 0)
        return;

    let res = await postStealCoin(uid, getLine(), getCol());
    output(res.msg, res.result);
    update();
});

paySpyBtn.addEventListener('click', async () => {
    let res = await postPaySpy(uid);
    output(res.msg, res.result);
    update();
});

megicNumberBtn.addEventListener('click', async () => {
    let res = await postMegicNumber(uid);
    output(res.msg, res.result);
    update();
})

setInterval(async () => {
    update();
    if (uid !== "")
    {
        let waitTime = await getWaitTime(uid);
        if (waitTime > 0)
        {
            waitTimeText.innerHTML = `Attendez ${waitTime} seconds`;
        }
        else
        {
            waitTimeText.innerHTML = "";
        }
    }
}, 1000);