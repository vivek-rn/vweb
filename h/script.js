let confetti = new Confetti('confetti');

confetti.destroyTarget(false);

confetti.setCount(1000);
confetti.setSize(1);
confetti.setPower(60);
confetti.setFade(false);
confetti.destroyTarget(false);

window.addEventListener("load", (event) => {
    document.getElementById("confetti").click();
});
