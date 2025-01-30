const title = document.querySelector(".title");
let position = window.innerWidth;

export function animateTitle() {
    position -= 2;
    title.style.left = position + "px";

    if(position < -title.clientWidth) {
        position = window.innerWidth;
    }

    requestAnimationFrame(animateTitle);
}
animateTitle();