import { getUserTeam, postPaySpy, postSearchCoin, postStealCoin, postTakeCoin } from "./server.js";
import { getCol, getLine, output, update } from "./utils.js";

const uidInput = document.getElementById("uidInput");
const verificationBtn = document.getElementById("verificationBtn");

const searchCoinBtn = document.getElementById("searchCoinBtn");
const takeCoinBtn = document.getElementById("takeCoinBtn");
const stealCoinBtn = document.getElementById("stealCoinBtn");
const paySpyBtn = document.getElementById("paySpyBtn");
const megicNumberInput = document.getElementById("megicNumberInput");
const megicNumberBtn = document.getElementById("megicNumberBtn");


var uid = "";

update();

verificationBtn.addEventListener('click', async () => {
    uid = uidInput.value;
    let res = await getUserTeam(uid);
    output((res.result ? "Vous etes dans l'equipe " : "") + res.msg, res.result);
    update();
});

searchCoinBtn.addEventListener('click', async () => {
    let res = await postSearchCoin(uid, getLine(), getCol());
    output(res.msg, res.result);
    update();
});

takeCoinBtn.addEventListener('click', async () => {
    let res = await postTakeCoin(uid, getLine(), getCol());
    output(res.msg, res.result);
    update();
});

stealCoinBtn.addEventListener('click', async () => {
    let res = await postStealCoin(uid, getLine(), getCol());
    output(res.msg, res.result);
    update();
});

paySpyBtn.addEventListener('click', async () => {
    let res = await postPaySpy(uid);
    output(res.msg, res.result);
    update();
});

setInterval(function() {
    update();
}, 5000);