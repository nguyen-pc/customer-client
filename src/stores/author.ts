import { defineStore } from 'pinia'
import { useApi, useApiPrivate } from '../composables/useApi'

export interface Author {
  id: string
  name: string
  address: string
  detail: string
}

export interface State {
  authors: Author[]
  totalUsers: number
  totalPages: number
  currentPage: number
}

export const useAuthorStore = defineStore('author', {
  state: (): State => {
    return {
      authors: [] as Author[],
      totalUsers: 0,
      totalPages: 0,
      currentPage: 1
    }
  },

  getters: {
    allAuthor: (state: State) => state.authors
  },

  actions: {
    async getAllAuthor(pageNumber: number, limit: number) {
      try {
        const { data } = await useApi().get('/api/author/allAuthor', {
          params: {
            pageNumber: pageNumber, // pass the pageNumber
            limit: limit // pass the limit
          }
        })
        this.totalUsers = data.totalUsers
        this.totalPages = data.totalPages
        this.currentPage = data.currentPage
        this.authors = data
        return data
      } catch (error: Error | any) {
        throw error.message
      }
    },

    async getAuthorById(id: string) {
      try {
        console.log(id)
        const { data } = await useApi().get(`/api/author/getauthor/${id}`)
        return data
      } catch (error: Error | any) {
        throw error.message
      }
    }

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
