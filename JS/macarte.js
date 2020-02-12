class Carte {
    constructor(latitude, longitude) {
        this.latitude = latitude;
        this.longitude = longitude;
        this.maCarte = null;
        this.formulaire=document.querySelector("form");
        this.inputNumero = document.getElementById("nomStat");
        this.inputAdress = document.getElementById("adresseStation");
        this.inputNbreVelo = document.getElementById("nbreVelo");
        this.inputNbreVeloRestant = document.getElementById("nbreVeloRestant");
        this.inputStatut=document.getElementById("statut");
        this.nom = document.getElementById("nom");
        this.prenom = document.getElementById("prenom");
        document.getElementById("resa").addEventListener('click', this.reserver1.bind(this));
        document.getElementById("enregistrer").addEventListener('click', this.reserver.bind(this));
        this.nom.value = localStorage.getItem("nom");
        this.prenom.value = localStorage.getItem("prenom");
        this.statut;
        this.encart=document.getElementById("formulaire");
        this.encart.style.visibility="hidden";
        document.getElementById("signature").style.display = "none";
        this.decale=document.querySelector(".map1");
       
       
        }

    // Fonction d'initialisation de la carte
    initMap() {
        this.maCarte = L.map('map').setView([this.latitude, this.longitude], 11);
        // Leaflet ne récupère pas les cartes (tiles) sur un serveur par défaut. Nous devons lui préciser où nous souhaitons les récupérer. Ici, openstreetmap.fr
        L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
            // Il est toujours bien de laisser le lien vers la source des données
            attribution: 'données © <a href="//osm.org/copyright">OpenStreetMap</a>/ODbL - rendu <a href="//openstreetmap.fr">OSM France</a>',
            minZoom: 1,
            maxZoom: 20
        }).addTo(this.maCarte);
        var getInfos = ajaxGet(this.markersInit.bind(this));
    };

    markersInit(response) {
        this.stations = JSON.parse(response);
        for (let i in this.stations) {
            // Ajout des markers
            var decale=document.querySelector(".map1");
           
            var marker = L.marker([this.stations[i].position.lat, this.stations[i].position.lng]).addTo(this.maCarte);
            marker.addEventListener('click', function (e) {
                this.inputStatut.value=this.stations[i].status;
                this.inputNumero.value = this.stations[i].name;
                this.inputAdress.value = this.stations[i].address;
                this.inputNbreVelo.value = this.stations[i].bike_stands;
                this.inputNbreVeloRestant.value = this.stations[i].available_bikes;
                this.stations[i];
             decale.className="map2";
             this.encart.style.visibility="visible";
             console.log(decale);
             
              
            }.bind(this));         
        

            var station = {
                numeroStation: this.stations[i].number,
                nomStation: this.stations[i].name,
                adresseStation: this.stations[i].address,
                nbrMaxVelos: this.stations[i].bike_stands,
                velosRestants: this.stations[i].available_bikes,
            }
            this.stations.push(station);          
        }        
            
    }
    reserver1(){
        if(this.inputNbreVeloRestant.value > 0){
            this.formulaire.style.display="none";
            document.getElementById("signature").style.display = "block";
        }else{
            document.getElementById("attent").innerHTML = "vous ne pouvez pas réserver";
        }
    }
    reserver() {
     
        if (this.nom.value.length > 0 && this.prenom.value.length > 0 )
      
        {
            localStorage.setItem("nom", this.nom.value);
            localStorage.setItem("prenom", this.prenom.value);
            sessionStorage.setItem("adresse", this.inputAdress.value);
            sessionStorage.setItem("nomStation", this.inputNumero.value);
            sessionStorage.setItem("nbreVeloRestant", this.inputNbreVeloRestant.value);
             document.getElementById("signature").style.visibility = "hidden";
            document.getElementById("attention").style.visibility = "hidden"; 
            this.decale.className="map1";                 

        } else {
            document.getElementById("attention").innerHTML = "Veuillez remplir tous les champs";
                           
        }

        

        if (sessionStorage.getItem("secondes") > 0) {
            document.getElementById("resa_en_cours").style.visibility = "visible";
            document.getElementById("resa_en_cours").innerHTML = "Votre vélo est réservé si vous voulez changer, appuyer sur le bouton ci-desous";
            // document.getElementById("signature").style.visibility = "hidden";
        }; 
    }
    
}

var carte = new Carte(47.2241, -1.5582);
carte.initMap();
