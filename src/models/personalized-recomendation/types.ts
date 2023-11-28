/* eslint-disable linebreak-style */

interface PersonalizedRecMenu {
  id: string
  photo: string
  title: string

}

interface PersonalizedRecModel {

  personalizedRecOutput?: PersonalizedRecMenu[]

}

enum PersonalizedRecActionType {
  PersonalizedRecLoad = 'PersonalizedRec-load',
  PersonalizedRecClear = 'PersonalizedRec-clear'
}

  type PersonalizedRecAction = {

    type: PersonalizedRecActionType.PersonalizedRecLoad
    value?: PersonalizedRecModel

  } | {
    type: PersonalizedRecActionType.PersonalizedRecClear

  };

export { PersonalizedRecActionType };
export type { PersonalizedRecModel, PersonalizedRecAction };
