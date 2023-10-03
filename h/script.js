
let confetti = new Confetti('confetti');

confetti.destroyTarget(false);

confetti.setCount(1000);
confetti.setSize(1);
confetti.setPower(60);
confetti.setFade(false);
confetti.destroyTarget(false);

window.addEventListener("load", (event) => {
    document.getElementById("confetti").click();
    document.getElementById("confetti").click();
});

$(".full-landing-image").ripples({
    resolution: 256,
    perturbance: 0.05,
  });
