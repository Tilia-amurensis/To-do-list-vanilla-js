const customAlert = document.getElementById("customAlert");

export function showAlert(message) {
customAlert.textContent = message;
customAlert.classList.remove("hidden");
customAlert.classList.add("show");

setTimeout(() => {
    customAlert.classList.remove("show");
    setTimeout(() => customAlert.classList.add("hidden"), 500 )
}, 3000);
}
