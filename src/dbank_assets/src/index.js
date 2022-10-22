import { dbank } from "../../declarations/dbank";

window.addEventListener("load", updateBalanceUI);

document.querySelector("form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const button = e.target.querySelector("#submit-btn");

  const inputAmt = parseFloat(document.getElementById("input-amount").value);
  const outputAmt = parseFloat(
    document.getElementById("withdrawal-amount").value
  );

  button.setAttribute("disabled", true);

  if (document.getElementById("input-amount").value.length != 0) {
    await dbank.topUp(inputAmt);
  }
  if (document.getElementById("withdrawal-amount").value.length != 0) {
    await dbank.withdraw(outputAmt);
  }

  await dbank.compound();
  updateBalanceUI();

  document.getElementById("input-amount").value = "";
  document.getElementById("withdrawal-amount").value = "";

  button.removeAttribute("disabled");
});

async function updateBalanceUI() {
  const curAmount = await dbank.checkBalance();
  document.getElementById("value").innerText =
    Math.round(curAmount * 100) / 100;
}
