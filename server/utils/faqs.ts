import { readString } from '~~/server/utils/validate'

export interface FaqInput {
  question: string
  answer: string
  sortOrder: number
  published: boolean
}

/** Validates and normalises an FAQ payload from the admin portal. */
export const readFaqInput = (body: any): FaqInput => ({
  question: readString(body?.question, { label: 'Question', max: 300, min: 5 }),
  answer: readString(body?.answer, { label: 'Answer', max: 3000, min: 5 }),
  sortOrder: Number.isFinite(Number(body?.sortOrder)) ? Number(body.sortOrder) : 0,
  published: body?.published !== false,
})
