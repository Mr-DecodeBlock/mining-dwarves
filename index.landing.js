const zeroAddress = "T9yD14Nj9j7xAB4dbGeiX9h8unkKHxuWwb",
    networks = {
        mainnet: "TUTik4srgKuzgXoL4KfV75foQbYuP8SirY",
        shasta: "TNKK3sLSBikAwVVwnCr16LGZ4kw9dZcqVP"
    },
    dailyPlusContractAddress = "THVYLtjFbXNcXwDvZcwCGivS95Wtd4juFn",
    bnkrAddress = "TNo59Khpq46FGf4sD7XSWYFNfYfbc8CqNK",
    boostAddress = "TMmWrjjKGRCdoUzmv6YUaov7mwxy1swDnq",
    luckContractAddress = "TUxeCSq2GGwLWyBE7Q32g5G6f7LkVPh6zu",
    dailyContractAddress = "THEA3DKyvufxh63DYdZMrqvyyWQcFAj6AL",
    donationPoolAddress = "TRepyJ3eTRPWE8X4xQfiReQvW95SWztnzt",
    moonAddress = "TJRq8Sc2Dnx2PJZYccr37BdHdqVt1X2j89",
    saveAddress = "THjY7rDKfjMiyCFMoCMCXdQAtRakD21RZQ",
    swapAddress = "TRXYvAoYvCqmvZWpFCTLc4rdQ7KxbLsUSj",
    credits2Address = "TWkuzBQqzJpQFYoX4DXzMeswgeAqH7EkX2";
var contractAddress, currentAddress, network, tronLinkUrlPrefix, credits, waiting = 0,
    loaded = !1;
let trxVolume;
$(document).ready(async () => {
    window.addEventListener("load", async () => {
        main()
    })
});
async function main() {
    showStats()
}
async function showStats() {
    try {
        let a = (await axios.get("https://bnkr-info.bankroll.network/network_stats")).data;
        $("#totalTxs").text(numeral(a.txs).format("0,0.000 a").toUpperCase());
        let b = a.aum;
        console.log("balances", b), $("#usdBalance").text(numeral(b).format("0,0.000 a").toUpperCase()), $("#getTotalMembers").text(numeral(a.players).format("0.000 a").toUpperCase()), loaded = !0
    } catch (a) {
        console.error("showstats", a)
    }
    loaded || (console.log("stat load retry"), setTimeout(showStats, 500))
}

function cleanAddress(a) {
    return a.trim().replace(/[^\u0000-\u007E]/g, "")
}

function refresh(a) {
    $("#txId").html(`<a href="${tronLinkUrlPrefix}${a}">${shortId(a,5)}</a>`), $("#txModal").modal(), setTimeout(mainLoop)
}

function txError(a) {
    var b = a.message;
    $("#txErrorId").text(b), $("#txErrorModal").modal(), setTimeout(mainLoop)
}

function showAlert(a, b) {
    $("#alertTitle").text(a), $("#alertId").text(b), $("#alertModal").modal()
}

function showError(a) {
    $("#errorId").text(a), $("#errorModal").modal(), setTimeout(mainLoop)
}

function shortId(a, b) {
    return a.substr(0, b) + "..." + a.substr(a.length - b, a.length)
}