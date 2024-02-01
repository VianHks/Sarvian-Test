/* eslint-disable linebreak-style */

interface PersonalizedRecMenu {
  id: string
  photo: string
  title: string
}

interface PersonalRecomendationModel {
  recomendationList?: PersonalizedRecMenu[]
}

enum PersonalizedRecActionType {
  GetPersonalizedRecomendation = '⌘➝PersonalizedRecomendation➝GetPersonalizedRecomendation'
}

type PersonalizedRecAction = {

  data?: PersonalRecomendationModel
  type: PersonalizedRecActionType.GetPersonalizedRecomendation

};

export { PersonalizedRecActionType };
export type { PersonalRecomendationModel, PersonalizedRecAction };
