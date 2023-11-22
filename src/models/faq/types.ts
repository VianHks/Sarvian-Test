interface FAQ {
  description: string
  id: number
  title: string
}
interface FAQModel {
  FAQOutput?: FAQ[]
}

enum FAQActionType {
  FAQLoad = 'FAQ-load',
  FAQClear = 'FAQ-clear'
}

type FAQAction = {
  type: FAQActionType.FAQClear
} | {
  type: FAQActionType.FAQLoad
  value?: FAQModel
};

export { FAQActionType };
export type { FAQModel, FAQAction };
