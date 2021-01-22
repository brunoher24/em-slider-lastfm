'use strict';

class MyPagination {
    constructor(selector, total, limit){
        this.totalPages = Math.ceil(total / limit);
        this.limit = limit;
        this.$ctnr = document.querySelector(selector);
        this.currentPage = 1;
        this.init();
    }

    init() {
        const $nav = document.createElement('nav');
        $nav.className = 'my-pagination';
        this.$ctnr.appendChild($nav);
        const $ul = document.createElement('ul');
        $nav.appendChild($ul);

        for(let i = 1; i <= this.totalPages; i ++) {
            const $li = document.createElement('li');
            $ul.appendChild($li);

            const $button = document.createElement('button');
            $button.innerText = i;
            $li.appendChild($button);
        }
    }
}
