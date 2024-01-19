import * as Scry from 'scryfall-sdk'

export class CardService {
    constructor() {}

    public async search(queryString: string): Promise<Scry.Card[]> {
        return new Promise((resolve, reject) => {
            const cards: Scry.Card[] = []
            Scry.Cards.search(queryString)
                .on('data', (data) => cards.push(data))
                .on('end', () => resolve(cards))
                .on('done', () => resolve(cards))
                .on('error', (error) => reject(error))                                                      
        })
    }
}