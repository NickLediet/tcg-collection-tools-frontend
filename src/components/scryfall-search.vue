<script setup lang="ts">
import AutoComplete, { AutoCompleteCompleteEvent, AutoCompleteItemSelectEvent } from 'primevue/autocomplete'
import { ref, watch, computed } from 'vue'
import * as Scry from 'scryfall-sdk'
import { useCardsStore } from '../stores/cards.store'
import * as _ from 'lodash'
const { debounce } = _

export type Suggestion = {
    [key: string]: Scry.Card
}

export type SuggestionComputed = {
    suggestionMap: Suggestion,
    suggestionKeys: string[]    
}

const cardsStore = useCardsStore()
const scryfallSearchQuery = ref('')
const suggestionData = computed(
    (): SuggestionComputed => {
        const suggestionMap: Suggestion = cardsStore.cards
            .reduce((acc: { [key: string]: Scry.Card }, card) => {
                const keyString = `(${card.set.toUpperCase()}) - ${card.name}`
                acc[keyString] = card as Scry.Card
                return acc
            }, {})

        const suggestionKeys = Object.keys(suggestionMap)

        return { suggestionMap, suggestionKeys }
    }
)
const suggestionMap = computed(() => suggestionData.value.suggestionMap)
const suggestionKeys = computed(() => suggestionData.value.suggestionKeys)

watch(suggestionMap, (newValue) => {
    console.log('suggestionMap: ', newValue)
})

const searchCards = debounce(
    ({ query }: AutoCompleteCompleteEvent) => cardsStore.searchCards(query),
    2000
)

const selectCard = ({ value: selectedKey }: AutoCompleteItemSelectEvent) => {
    if(typeof selectedKey !== 'string') return 

    const currentCard = suggestionMap.value[selectedKey]
    cardsStore.setSelectedCard(currentCard)
}
</script>

<template>
    <span class="float-label">
        <AutoComplete 
            v-model="scryfallSearchQuery" 
            :suggestions="suggestionKeys"
            @item-select="selectCard" 
            @complete="searchCards" />
    </span>
</template>
