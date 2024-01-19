import axios, { AxiosInstance } from 'axios'
import * as Scry from 'scryfall-sdk'
import { getEndpointUrl } from '../utils/url'
import { API_ENDPOINTS } from '../constants'

export type CreateCardDto = {
    scryfall_id: string
}


export class CardsApiService {
    private axios: AxiosInstance
    
    constructor() {
        this.axios = axios.create()
    }

    async createCard(card: Scry.Card) {
        const { id: scryfall_id } = card
        
        try {
            console.log(getEndpointUrl(API_ENDPOINTS.createCard))
            console.log(card)
            const data = await this.axios(
                {
                    url: getEndpointUrl(API_ENDPOINTS.createCard),
                    method: API_ENDPOINTS.createCard.method,
                    data: new URLSearchParams({ scryfall_id }),
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        
                    }
                }
            )

            console.log(data)
            Promise.resolve(data)
        } catch(error) {
            console.log(error)
            Promise.reject(error)
        }
    }
}