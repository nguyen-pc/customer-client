import { defineStore } from 'pinia'
import { useApi, useApiPrivate } from '../composables/useApi'

export interface Author {
  id: string
  name: string
  address: string
}

export interface State {
  authors: Author[]
}

export const useAuthorStore = defineStore('author', {
  state: (): State => {
    return {
      authors: [] as Author[]
    }
  },

  getters: {
    allAuthor: (state: State) => state.authors
  },

  actions: {
    async getAllAuthor() {
      try {
        const { data } = await useApi().get('/api/author/allAuthor')
        this.authors = data
        return data
      } catch (error: Error | any) {
        throw error.message
      }
    },

    // async createComment(CommentData: Comment) {
    //   try {
    //     const { data } = await useApi().post('/api/comment/create', CommentData)
    //     this.authors.push(data)
    //     return data
    //   } catch (error: Error | any) {
    //     throw error.message
    //   }
    // }
  }
})
