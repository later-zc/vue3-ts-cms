import { defineStore } from 'pinia'

const useCounterStore = defineStore('counter', {
  state: () => ({
    counter: 100
  }),
  getters: {
    doubleCounter(state): number {
      console.log('----------')
      return state.counter * 2
    }
  },
  actions: {
    changeCounterAction(newCount: number) {
      this.counter = newCount
    }
  }
})

export default useCounterStore
