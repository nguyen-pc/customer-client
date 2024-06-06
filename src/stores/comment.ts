import { defineStore } from 'pinia'
import { useApi, useApiPrivate } from '../composables/useApi'

export interface Comment {
  id: string
  user: string
  book: string
  text: string
}

export interface State {
  comments: Comment[]
}

export const useCommentStore = defineStore('comment', {
  state: (): State => {
    return {
      comments: [] as Comment[]
    }
  },

  getters: {
    allComment: (state: State) => state.comments
  },

  actions: {
    async getAllComment() {
      try {
        const { data } = await useApi().get('/api/comment/allComment')
        this.comments = data
        return data
      } catch (error: Error | any) {
        throw error.message
      }
    },

    async createComment(CommentData: Comment) {
      try {
        const { data } = await useApi().post('/api/comment/create', CommentData)
        this.comments.push(data)
        return data
      } catch (error: Error | any) {
        throw error.message
      }
    }
  }
})
