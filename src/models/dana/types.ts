interface DANAModel {
  empty: string
}

enum DANAActionType {
  DANABalanceClear = 'DANABalance-Clear'
}

type DANAAction = {
  data?: DANAModel
  type: DANAActionType.DANABalanceClear
};

export { DANAActionType };
export type { DANAModel, DANAAction };
