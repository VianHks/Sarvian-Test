import type { Command } from '@nxweb/core';

import type { RootModel } from '@models/types.js';

import { DANAActionType } from './types.js';

import type { DANAAction } from './types.js';

const DanaCommand = {
  menuBerandaClear: (): DANAAction => {
    return {
      type: DANAActionType.DANABalanceClear
    };
  },
  menuBerandaLoad: () => {
    return '';
  }

} satisfies Command<RootModel, DANAAction>;

export { DanaCommand };
