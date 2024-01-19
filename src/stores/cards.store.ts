import { defineStore } from 'pinia'
import { ScryfallService } from '../services/scryfall.service'
import { CardsApiService } from '../services/cards-api.service'
import * as Scry from 'scryfall-sdk'
import * as _ from 'lodash'

export interface CardsStoreState {
    cards: Scry.Card[],
    selectedCard: Scry.Card | null
}

export interface CardsStoreActions {
    searchCards(queryString: string): Promise<void>,
    setSelectedCard(selectedCard: Scry.Card | null): void
}

export interface CardsStoreGetters {
    cards(): Scry.Card[]
}

const scryfallService = new ScryfallService()
const cardsApiService = new CardsApiService()

export const useCardsStore = defineStore<'cards', CardsStoreState, {}, CardsStoreActions>('cards', {
    state: () => ({
        cards: [],
        selectedCard: null
    }),

    actions: {
        async searchCards(queryString: string): Promise<void> {
            try {
                this.setSelectedCard(null)
                const cards = await scryfallService.search(queryString)
                this.cards = cards
            } catch(error) {
                console.error(error)
                this.cards = []
            }
        },

        async setSelectedCard(selectedCard: Scry.Card | null): Promise<void> {
            this.selectedCard = selectedCard
            console.log(this.selectedCard)
            if(_.isNull(selectedCard)) return

            await cardsApiService.createCard(this.selectedCard as Scry.Card)
        }
        
    }
})