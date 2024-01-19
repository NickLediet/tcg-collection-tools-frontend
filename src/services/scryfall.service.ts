import * as Scry from 'scryfall-sdk'

export class ScryfallService {
    constructor() {}

    public async search(queryString: string): Promise<Scry.Card[]> {
        return new Promise((resolve, reject) => {
            const cards: Scry.Card[] = []
            const searchOptions: Scry.SearchOptions = {
                include_extras: true,
                unique: 'prints',
            }
            Scry.Cards.search(queryString, searchOptions)
                .on('data', (data) => cards.push(data))
                .on('end', () => resolve(cards))
                .on('done', () => resolve(cards))
                .on('error', (error) => reject(error))                                                      
        })
    }

}