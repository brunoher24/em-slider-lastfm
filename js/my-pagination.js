'use strict';

class MyPagination {
    constructor(selector, total, limit, callback){
        this.totalPages = Math.ceil(total / limit);
        this.limit = limit;
        this.$ctnr = document.querySelector(selector);
        this.currentPage = 9495;
        this.callback = callback;
        this.init();
    }

    createPage(pageNumber, leftPageNumber, rightPageNumber) {
        const $li = document.createElement('li');
        this.$ul.appendChild($li);

        const $button = document.createElement('button');
        $button.innerText = pageNumber;

        $button.addEventListener('click', () => {
            if(pageNumber === '...') {
                console.log(leftPageNumber, rightPageNumber);
                this.currentPage = leftPageNumber + Math.floor((rightPageNumber - leftPageNumber) / 2);
            } else {
                this.currentPage = pageNumber;
            }
            this.init();
            this.callback(this.currentPage);
        });
        $li.appendChild($button);
    }

    init() {
        this.$ctnr.innerHTML = "";
        // on inititalise un conteneur global qui
        // contient la liste (ul) qui contiendra
        // les <li><button></buton></li> à définir plus bas
        const $nav = document.createElement('nav');
        $nav.className = 'my-pagination';
        this.$ctnr.appendChild($nav);
        this.$ul = document.createElement('ul');
        $nav.appendChild(this.$ul);

        // cas de figure 1 : mon nombre total est plus petit ou égal à 10
        // dans ce cas on implémente le nombre total de page sans ellipse 
        if(this.totalPages <= 10) {
            for(let i = 1; i <= this.totalPages; i ++) {
                this.createPage(i, null, null);
            }
            // si le nombre totald e page est plus grad que 10 et ....

                // ... la page actuelle est inférieure ou égale à 6
        } else if (this.currentPage <= 6) {
            for(let i = 1; i <= this.totalPages; i ++) {
                 // pas besoin de mettre d'ellipse en partant de la première page
                if(i > 9) {
                    // si on arrive à un numéro de page supérieur à la page actuelle + 4
                    
                    // on affiche l' lellipse
                    this.createPage('...', 9, this.totalPages);
                    // on affiche la toute dernière page
                    this.createPage(this.totalPages, null, null);
                    // on quitte la boucle prématurément
                    break;

                } else {
                    this.createPage(i);
                }
            } 

        // ... la page actuelle est supérieure à 6
        } else {

            // on affiche quoi qu'il arrive la page 1, puis une ellipse
            this.createPage(1);
            this.createPage('...', 1, this.currentPage - 4);
           

            // on affiche les 8 pages suivantes encadrant la page actuelle
            for(let i = this.currentPage - 4; i <= this.totalPages; i ++) {
                
                 // si on arrive à un numéro de page supérieur à la page actuelle + 4
                if(i > this.currentPage + 4 && this.totalPages > (i + 1)) {
                    this.createPage('...', this.currentPage + 4, this.totalPages);
                    // on affiche la dernière page
                    this.createPage(this.totalPages, null, null);
                    // on quitte prématurément la boucle
                    break;
                } else {
                    this.createPage(i, null, null);
                }
            }
        }
        
    }
}
