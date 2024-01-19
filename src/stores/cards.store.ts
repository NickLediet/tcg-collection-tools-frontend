import { defineStore } from 'pinia'
import { CardService } from '../services/cards.service'
import * as Scry from 'scryfall-sdk'

export interface CardsStoreState {
    cardService: CardService
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

const cardService = new CardService()

export const useCardsStore = defineStore<'cards', CardsStoreState, {}, CardsStoreActions>('cards', {
    state: () => ({
        cardService,
        cards: [],
        selectedCard: null
    }),

    actions: {
        async searchCards(queryString: string): Promise<void> {
            try {
                this.setSelectedCard(null)
                const cards = await this.cardService.search(queryString)
                this.cards = cards
            } catch(error) {
                console.error(error)
                this.cards = []
            }
        },

        setSelectedCard(selectedCard: Scry.Card | null): void {
            this.selectedCard = selectedCard
            console.log(this.selectedCard)
        }
        
    }
})