import { defineStore } from 'pinia'
import { CardService } from '../services/card.service'
import * as Scry from 'scryfall-sdk'

export interface CardsStoreState {
    cardService: CardService
    cards: Scry.Card[]
}

export interface CardsStoreActions {
    searchCards(queryString: string): Promise<void>
}

export interface CardsStoreGetters {
    cards(): Scry.Card[]
}

const cardService = new CardService()

export const useCardsStore = defineStore<'cards', CardsStoreState, {}, CardsStoreActions>('cards', {
    state: () => ({
        cardService,
        cards: []
    }),

    // getters: {
    //     cards() {
    //         return this.cards
    //     }
    // },

    actions: {
        async searchCards(queryString: string): Promise<void> {
            try {
                const cards = await this.cardService.search(queryString)
                this.cards = cards
            } catch(error) {
                console.error(error)
                this.cards = []
            }
        },
        
    }
})