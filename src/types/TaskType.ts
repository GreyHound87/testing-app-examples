export interface ITaskData {
  title: string
  description: string
  imageSrc: string
  imageWidth: number
  imageHeight: number
  imageAlt: string
  taskType: TaskType
}

export enum TaskType {
  SingleChoice = 'SingleChoice',
  MultipleChoice = 'MultipleChoice',
  Matching = 'Matching',
  FillInTheBlanks = 'FillInTheBlanks',
  LineInput = 'LineInput',
  Sequence = 'Sequence',
  Programming = 'Programming',
}
