class Slider {
    constructor() {
        this.index = 0;
        this.playing = true;
        this.video = null;
        this.images = document.querySelectorAll(".slide");
        console.log(this.images);
        this.images[this.index].className = "slide";
        document.getElementById("arret").addEventListener("click", this.playpause.bind(this));
        document.getElementById("droite").addEventListener("click", this.droite.bind(this));
        document.getElementById("gauche").addEventListener("click", this.gauche.bind(this));
        this.arret=document.querySelectorAll("i")[2];

        //interaction au clavier
        document.addEventListener("keyup", this.controleClavier.bind(this));
    }
    //methodes
    nextSlide() {
        this.images[this.index].className = 'slide';
        this.index = (this.index + 1) % this.images.length;
        this.images[this.index].className = 'active';
      
    }

    play() {
        this.nextSlide();
        this.video = setInterval(this.nextSlide.bind(this), 5000);
    }

    pause() {
        clearInterval(this.video);
    }

    playpause() {
        if (this.playing) {
            this.pause();
            this.arret.classList.remove("fa-play-circle");
            this.arret.classList.add("fa-pause-circle");
        } else {
            this.play();
            this.arret.classList.add("fa-play-circle");
            
        }
        this.playing = !this.playing;
    }

    next() {
        this.images[this.index].className = 'slide';
        this.index = (this.index + 1) % this.images.length;
        this.images[this.index].className = 'active';
    }

    nextplus() {
        setTimeout(this.next.bind(this), 1000);
    }

    droite() {
        this.pause();
        this.nextplus();
    }

    previous() {
        this.images[this.index].className = 'slide';
        this.index = (this.index + 3) % this.images.length;
        this.images[this.index].className = 'active';
    }

    nextmoins() {
        setTimeout(this.previous.bind(this), 1000);
    }

    gauche() {
        this.pause();
        this.nextmoins();
    }

    init() {
        this.play();
    }

    controleClavier(event) {
        console.log("controleClavier");
        console.log(event);
        if (event.keyCode === 37) {
            this.droite();
        } else if (event.keyCode === 39) {
            this.gauche();
        }

    }
}

var slider = new Slider;
slider.init();
