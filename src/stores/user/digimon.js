
import { defineStore } from 'pinia'
import axios from 'axios'
const BASE_URL = 'https://digimon-api.vercel.app/api/digimon'

export const useDigimonProductStore = defineStore('digimon', {
  state: () => ({
    list: [],
  }),
  actions: {
    filterDigimonProducts (searchName) {
      return this.list.filter(product => product.name.includes(searchName))
    },
    async loadlistdigimon (){
      try {
      const response = await axios.get(`${BASE_URL}`)
      this.list = response.data
      console.log(response.data);
      }catch (error) {
        console.log('error', error)
      }
    }
  }
})
