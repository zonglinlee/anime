import anime from "../src/index";
anime({
    targets: '.css-prop-demo .el1',
    translateX: 700,
    duration: 3000,
    backgroundColor: '#f00',
    borderRadius: ['0%', '50%'],
    easing: 'easeInOutQuad'
});
let basicTimeline = anime.timeline({
    autoplay: false
});

let pathEls = document.querySelectorAll(".check");
let pathEl = null
let offset = null
for (let i = 0; i < pathEls.length; i++) {
    pathEl = pathEls[i];
    console.log(pathEl)
    offset = anime.setDashoffset(pathEl);
    pathEl.setAttribute("stroke-dashoffset", offset);
}

basicTimeline
    .add({
        targets: ".text",
        duration: 1,
        opacity: "0"
    })
    .add({
        targets: ".button",
        duration: 1300,
        height: 10,
        width: 300,
        backgroundColor: "#2B2D2F",
        border: "0",
        borderRadius: 100
    })
    .add({
        targets: ".progress-bar",
        duration: 1200,
        width: 300,
        easing: "linear"
    })
    .add({
        targets: ".button",
        width: 0,
        duration: 1
    })
    .add({
        targets: ".progress-bar",
        width: 80,
        height: 80,
        delay: 500,
        duration: 750,
        borderRadius: 80,
        backgroundColor: "#71DFBE"
    })
    .add({
        targets: pathEl,
        strokeDashoffset: [offset, 0],
        duration: 200,
        easing: "easeInOutSine"
    });

document.querySelector(".button,.text").addEventListener('click',function() {
    basicTimeline.play();
});
