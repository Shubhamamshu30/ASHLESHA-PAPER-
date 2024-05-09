let highestZ = 1;

class Paper {
    holdingPaper = false;
    touchStartX = 0;
    touchStartY = 0;
    mouseX = 0;
    mouseY = 0;
    prevMouseX = 0;
    prevMouseY = 0;
    velX = 0;
    velY = 0;
    rotation = Math.random() * 30 - 15;
    currentPaperX = 0;
    currentPaperY = 0;
    rotating = false;

    init(paper) {
        const isTouchDevice = 'ontouchstart' in window || navigator.msMaxTouchPoints;

        const startEvent = isTouchDevice ? 'touchstart' : 'mousedown';
        const moveEvent = isTouchDevice ? 'touchmove' : 'mousemove';
        const endEvent = isTouchDevice ? 'touchend' : 'mouseup';

        document.addEventListener(moveEvent, (e) => {
            if (!this.rotating) {
                if (isTouchDevice && e.touches.length === 1) {
                    this.mouseX = e.touches[0].clientX;
                    this.mouseY = e.touches[0].clientY;
                } else {
                    this.mouseX = e.clientX;
                    this.mouseY = e.clientY;
                    this.velX = this.mouseX - this.prevMouseX;
                    this.velY = this.mouseY - this.prevMouseY;
                }
            }
            if (this.holdingPaper) {
                this.movePaper(paper);
            }
        });

        paper.addEventListener(startEvent, (e) => {
            if (this.holdingPaper) return;
            this.holdingPaper = true;
            paper.style.zIndex = highestZ;
            highestZ += 1;
            if (isTouchDevice && e.touches.length === 1) {
                this.touchStartX = e.touches[0].clientX;
                this.touchStartY = e.touches[0].clientY;
            } else {
                this.mouseX = e.clientX;
                this.mouseY = e.clientY;
                this.prevMouseX = this.mouseX;
                this.prevMouseY = this.mouseY;
            }
        });

        window.addEventListener(endEvent, () => {
            this.holdingPaper = false;
            this.rotating = false;
        });
    }

    movePaper(paper) {
        if (!this.rotating) {
            if (!this.rotating) {
                this.currentPaperX += this.velX;
                this.currentPaperY += this.velY;
            }
            this.prevMouseX = this.mouseX;
            this.prevMouseY = this.mouseY;
            paper.style.transform = `translateX(${this.currentPaperX}px) translateY(${this.currentPaperY}px) rotateZ(${this.rotation}deg)`;
        }
    }
}

const papers = Array.from(document.querySelectorAll('.paper'));
papers.forEach(paper => {
    const p = new Paper();
    p.init(paper);
});

const noButton = document.getElementById("no-btn");
const yesButton = document.getElementById("yes-btn");
const popup = document.getElementById("popup");

noButton.addEventListener("mouseover", () => {
    noButton.style.position = "absolute";
    noButton.style.left = Math.random() * 80 + "vw";
    noButton.style.top = Math.random() * 80 + "vh";
});

yesButton.addEventListener("click", () => {
    popup.style.display = "block";
});

// Hide the popup initially
popup.style.display = "none";
