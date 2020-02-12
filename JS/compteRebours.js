class Timer {
  constructor(tempsMinTimer) {
    this.minCpt = tempsMinTimer;
    this.interval = null;
    this.min = (tempsMinTimer - 60) / 60;
    this.sec = 59;  
    this.recupSec = sessionStorage.getItem("secondes");
    this.recupMin = sessionStorage.getItem("minutes"); 
    document.getElementById("reservation").style.visibility = "hidden";
    document.getElementById("encart").style.visibility = "hidden";
    document.getElementById("changerStation").addEventListener('click', this.stopTimer.bind(this));
    document.getElementById("enregistrer").addEventListener('click', this.startTimer.bind(this));
    window.addEventListener('load', this.startRefresh.bind(this)); 
    this.prenom=localStorage.getItem("prenom");
    this.nom=localStorage.getItem("nom");
    document.getElementById("chang").style.display= "block";  
   
  
  }

  display() {
   
   
    this.interval = setInterval(() => {
      document.getElementById("encart").style.visibility="visible";          
      document.getElementById("reservation").textContent =this.prenom+" " + this.nom + " il vous reste " + sessionStorage.getItem("minutes") + " min " + sessionStorage.getItem("secondes") + " sec" + " pour aller à la station " + sessionStorage.getItem("adresse");
      if ((this.sec >= 0)) {
        this.sec--;
      }

      if (this.sec === 0) {
        this.sec = 59;
        this.min--;
        
      }

      if ((this.min >= 0) && (this.sec >= 0)) {
        sessionStorage.setItem("secondes", this.sec);
        sessionStorage.setItem("minutes", this.min);
            
      } else {
        sessionStorage.clear();
        clearInterval(this.interval);        
        document.getElementById("resa_en_cours").style.visibility = "hidden";
        document.getElementById("encart").style.visibility="hidden";
        document.getElementById("reservation").textContent= "Votre réservation est devenue obolète";
       
      }
     }, 1000);
  }

 

  startTimer() { 
 
    clearInterval(this.interval);   
   this.display();
    document.getElementById("encart").style.visibility = "visible";
    document.getElementById("chang").style.visibility = "visible";
    document.getElementById("reservation").style.visibility = "visible";
    // document.getElementById("signature").style.visibility = "hidden";
    document.getElementById("enregistrer").style.visibility = "hidden";
  }

  startRefresh() {
    this.refresh();
    document.getElementById("reservation").style.visibility = "visible";
    // document.getElementById("signature").style.visibility = "hidden";
    document.getElementById("enregistrer").style.visibility = "hidden";
    document.getElementById("encart").style.visibility="visible";
  }
 
  refresh() {
    
    this.interval = setInterval(() => {
          document.getElementById("encart").style.visibility="visible";
          document.getElementById("reservation").textContent =this.prenom+" " + this.nom +" il vous reste " + sessionStorage.getItem("minutes") + " min " + sessionStorage.getItem("secondes") + " sec" + " pour aller à la station " + sessionStorage.getItem("adresse");

        if ((this.recupSec >= 0)) {
          this.recupSec--;
        }

        if (this.recupSec === 0) {
          this.recupSec = 59;
          this.recupMin--;
          
        }
        if ((this.recupMin >= 0) && (this.recupSec >= 0)) {
          sessionStorage.setItem("secondes", this.recupSec);
          sessionStorage.setItem("minutes", this.recupMin);
          } else {
          sessionStorage.clear();
          clearInterval(this.interval); 
          document.getElementById("chang").style.visibility = "hidden";        
          document.getElementById("encart").style.visibility = "hidden";
          document.getElementById("reservation").style.visibility = "hidden";
          
        }
      },
      1000);
  } 
  stopTimer() {
    clearInterval(this.interval);
    sessionStorage.clear();    
    document.getElementById("encart").style.visibility = "hidden";
    document.getElementById("reservation").style.display = "none"; 
    window.location.reload();
          
  }

}
var timer = new Timer(1200);