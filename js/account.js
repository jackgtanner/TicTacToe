const account = document.querySelector("#account");
const accounts = document.querySelector(".accounts");

account.addEventListener('click', () => {
    accounts.style.display = "flex";

    var close = document.querySelectorAll(".close")[0];
    console.log(close);
    close.addEventListener("click", () =>{
        accounts.style.display = "none";
    })
})