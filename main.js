import { getUserTeam, getWaitTime, postMegicNumber, postPaySpy, postSearchCoin, postStealCoin, postTakeCoin } from "./server.js";
import { getCol, getLine, output, update } from "./utils.js";

// DOM elements
const uidInput = document.getElementById("uidInput");
const verificationBtn = document.getElementById("verificationBtn");

const searchCoinBtn = document.getElementById("searchCoinBtn");
const takeCoinBtn = document.getElementById("takeCoinBtn");
const stealCoinBtn = document.getElementById("stealCoinBtn");
const paySpyBtn = document.getElementById("paySpyBtn");
const waitTimeText = document.getElementById("waitTimeText");
const megicNumberInput = document.getElementById("megicNumberInput");
const megicNumberBtn = document.getElementById("megicNumberBtn");

// Current user ID
var uid = ""; // KaGSu21PXB0gxAU

// Initialize interface
update();

/**
 * Handles user verification by fetching their team based on UID input
 * Displays the result in the UI and updates the board
 */
verificationBtn.addEventListener('click', async () => {
    uid = uidInput.value;
    let res = await getUserTeam(uid);
    output((res.result ? "Vous etes dans l'equipe " : "") + res.msg, res.result);
    update();
});

/**
 * Handles searching for a coin at the selected grid location
 * Prevents the action if the user must wait
 */
searchCoinBtn.addEventListener('click', async () => {
    let waitTime = await getWaitTime(uid);
    if (waitTime > 0) return;

    let res = await postSearchCoin(uid, getLine(), getCol());
    output(res.msg, res.result);
    update();
});

/**
 * Handles taking a coin from the selected grid location
 * Only proceeds if wait time has elapsed
 */
takeCoinBtn.addEventListener('click', async () => {
    let waitTime = await getWaitTime(uid);
    if (waitTime > 0) return;
    
    let res = await postTakeCoin(uid, getLine(), getCol());
    output(`${res.result ? "Coin with value " : ""}${res.msg}`, res.result);
    update();
});

/**
 * Handles stealing a coin from another team
 * Requires wait time to be zero
 */
stealCoinBtn.addEventListener('click', async () => {
    let waitTime = await getWaitTime(uid);
    if (waitTime > 0) return;

    let res = await postStealCoin(uid, getLine(), getCol());
    output(res.msg, res.result);
    update();
});

/**
 * Sends a request to pay the in-game spy for strategic information
 */
paySpyBtn.addEventListener('click', async () => {
    let res = await postPaySpy(uid);
    output(res.msg, res.result);
    update();
});

/**
 * Submits the magic number (entered by user) to the server
 * Note: Currently the magic number value is not read from the input
 */
megicNumberBtn.addEventListener('click', async () => {
    let res = await postMegicNumber(uid); // Possible oversight: megicNumberInput.value not passed
    output(res.msg, res.result);
    update();
});

/**
 * Periodically updates the interface and remaining wait time every second
 * If wait time is greater than 0, it is shown on screen
 */
setInterval(async () => {
    update();
    if (uid !== "") {
        let waitTime = await getWaitTime(uid);
        waitTimeText.innerHTML = waitTime > 0 ? `Attendez ${waitTime} seconds` : "";
    }
}, 1000);