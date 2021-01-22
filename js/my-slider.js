'use strict';

class MySlider {
    constructor(selector, slides) {
        this.$ctnr = document.querySelector(selector);
        this.$slidesCtnr;
        this.slides = slides;
        // this.slides = ['../images/1.png', '../images/2.jpg', '../images/2.png', '../images/3.png'];
        this.currentSlideIndex = 0;
        this.canSlide = true;
        this.initSlider();
    }

    initSlider() {
        const $sliderCtnr = document.createElement('div');
        $sliderCtnr.className = 'my-slider-ctnr';
        this.$ctnr.appendChild($sliderCtnr);
        
        this.$slidesCtnr = document.createElement('div');
        this.$slidesCtnr.className = 'my-slides-ctnr';
        this.$slidesCtnr.style.width = `${this.slides.length}00vw`;
        $sliderCtnr.appendChild(this.$slidesCtnr);

        this.slides.forEach(slide => {
            const $slideImg = document.createElement('div');
            $slideImg.className = "my-slide-img";
            $slideImg.style.backgroundImage = `url(${slide.img})`;
            this.$slidesCtnr.appendChild($slideImg);

            const $p = document.createElement('p');
            $p.innerText = slide.txt;
            $slideImg.appendChild($p);
        });
        this.initNav($sliderCtnr);
    }

    initNav($sliderCtnr) {
        const $nav = document.createElement('nav');
        $sliderCtnr.appendChild($nav);

        const $prevBtn = document.createElement('button');
        $prevBtn.innerText = 'Précédent';

        $prevBtn.addEventListener('click', () => {
            if(this.currentSlideIndex === 0 || !this.canSlide) {
                return;
            }
            this.animateSlideLeft();
        });

        $nav.appendChild($prevBtn);

        const $nextBtn = document.createElement('button');
        $nextBtn.innerText = 'Suivant';
        
        $nextBtn.addEventListener('click', () => {
            if(this.currentSlideIndex === this.slides.length - 1 || !this.canSlide) {
                return;
            }
            this.animateSlideRight();
            
        });
        $nav.appendChild($nextBtn);
    }

    animateSlideLeft() {
        this.canSlide = false;
        let currentMarginLeft = this.currentSlideIndex * -100;
        const marginLeftFinal = currentMarginLeft + 100;
        const interval = window.setInterval(() => {
            currentMarginLeft += 2;
            this.$slidesCtnr.style.marginLeft = `${currentMarginLeft}vw`;
            if(currentMarginLeft >= marginLeftFinal) {
                this.currentSlideIndex --;
                this.canSlide = true;
                window.clearInterval(interval);
            }
        } , 10);
    }

    animateSlideRight() {
        this.canSlide = false;
        let currentMarginLeft = this.currentSlideIndex * -100;
        const marginLeftFinal = currentMarginLeft - 100;
        const interval = window.setInterval(() => {
            currentMarginLeft -= 2;
            this.$slidesCtnr.style.marginLeft = `${currentMarginLeft}vw`;
            if(currentMarginLeft <= marginLeftFinal) {
                this.currentSlideIndex ++;
                this.canSlide = true;
                window.clearInterval(interval);
            }
        } , 10);
    }

    // <div class='my-slider-ctnr'>
    //     <div class="my-slides-ctnr" style='width: 200vw;'>
    //         <div class='my-slide-img' style='background-image: url();'></div>
    //         <div class='my-slide-img' style='background-image: url(images/2.png);'></div>
    //     </div>
    //     <nav>
    //         <button> Precedent </button>
    //         <button> Suivant </button>
    //     </nav>
            
    // </div>
}
