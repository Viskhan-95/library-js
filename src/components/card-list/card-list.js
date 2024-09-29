import { DivComponent } from "../../common/div-component";
import { Card } from "../card/card";
import './card-list.css';

export class CardList extends DivComponent {
    constructor(appState, parentState) {
        super();
        this.appState = appState;
        this.parentState = parentState;
    }

    prevPage() {
        if (this.parentState.offset > 0) {
            this.parentState.offset--;
        }
    }

    nextPage() {
        if (this.parentState.offset < this.parentState.countPage) {
            this.parentState.offset++;
        }
    }

    render() {
        if(this.parentState.loading) {
            this.el.innerHTML = `<div class="card_list__loader">Загрузка...</div>`;
            return this.el;
        }

        const cardGrid = document.createElement('div');
        cardGrid.classList.add('card_grid');
        this.el.append(cardGrid);

        for(const card of this.parentState.list) {
            cardGrid.append(new Card(this.appState, card).render());
        }

        const pagination = document.createElement('div');

        if(this.parentState.countPage > 1) {
            pagination.classList.add('card__pagination');
            pagination.innerHTML = `
                <button class="card__pagination_prev 
                    ${this.parentState.offset === 0 ? 'hidden' : ''}" >
                        <img src="static/arrow-back.svg" />
                    Предыдущая страница
                </button>
                <button class="card__pagination_next 
                    ${this.parentState.offset === (this.parentState.countPage - 1) ? 'hidden' : ''}">
                    Следующая страница
                    <img src="static/arrow-forth.svg" />
                </button>
            `
            this.el.append(pagination);       
            this.el
                .querySelector('.card__pagination_prev')
                .addEventListener('click', this.prevPage.bind(this));
            this.el
                .querySelector('.card__pagination_next')
                .addEventListener('click', this.nextPage.bind(this));
        } else {
            pagination.innerHTML = '';
        }

        return this.el;
    }
}