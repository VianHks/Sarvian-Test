/* eslint-disable import/exports-last */
/* eslint-disable linebreak-style */

interface PersonalizedRecMenu {
  id: string
  photo: string
  title: string
}

export interface NewsList {
  status: string
  totalResults: number
  articles: [
    {
      source: {
        id: null
        name: string
      }
      author: string
      title: string
      description: string
      url: string
      urlToImage: null
      publishedAt: string
      content: string
    }
  ]
}

export interface RecMenu {
  data: [
    {
      id: string
      photo: string
      title: string
    }
  ]

}

export interface CustomerProfile {

  data: {
    user: {
      dateJoined: string
      defaultBillingAddress: {
        city: string
        cityArea: string
        companyName: string
        country: {
          code: string
          country: string
        }
        countryArea: string
        firstName: string
        id: string
        lastName: string
        phone: string
        postalCode: string
        streetAddress1: string
        streetAddress2: string
      }
      defaultShippingAddress: {
        city: string
        cityArea: string
        companyName: string
        country: {
          code: string
          country: string
        }
        countryArea: string
        firstName: string
        id: string
        lastName: string
        phone: string
        postalCode: string
        streetAddress1: string
        streetAddress2: string
      }
      email: string
      firstName: string
      id: string
      isActive: boolean
      lastName: string
      lastPlacedOrder: {
        edges: [
          {
            node: {
              created: string
              id: string
            }
          }
        ]
      }
      metadata: [
        {
          key: string
          value: string
        }
      ]
      note: string
      orders: {
        edges: [
          {
            node: {
              created: string
              id: string
              number: string
              paymentStatus: string
              total: {
                gross: {
                  amount: number
                  currency: string
                }
              }
            }
          }
        ]
      }
    }
  }
  extensions: {
    cost: {
      maximumAvailable: number
      requestedQueryCost: number
    }
  }
}

interface PersonalRecomendationModel {
  recomendationList?: PersonalizedRecMenu[]
  recomendationMenu?: RecMenu
  customerProfile?: CustomerProfile
  newsList?: NewsList
}

enum PersonalizedRecActionType {
  GetPersonalizedRecomendation = '⌘➝PersonalizedRecomendation➝GetPersonalizedRecomendation',
  GetRecomendationMenu = '⌘➝PersonalizedRecomendation➝RecomendationMenu',
  GetCustomerProfile = '⌘➝PersonalizedRecomendation➝CustomerProfile',
  GetListNews = '⌘➝GetNews➝GetListNews'
}

type PersonalizedRecAction = {

  data?: PersonalRecomendationModel
  type: PersonalizedRecActionType.GetPersonalizedRecomendation

} | {
  data?: PersonalRecomendationModel
  type: PersonalizedRecActionType.GetCustomerProfile

} | {
  data?: PersonalRecomendationModel
  type: PersonalizedRecActionType.GetListNews
} | {
  data?: PersonalRecomendationModel
  type: PersonalizedRecActionType.GetRecomendationMenu
};

export { PersonalizedRecActionType };
export type { PersonalRecomendationModel, PersonalizedRecAction };
