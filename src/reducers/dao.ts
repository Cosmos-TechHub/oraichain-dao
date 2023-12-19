import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

import { IDao } from "@/@types";

export interface DaoInterface {
  data: IDao[];
}

export const daoSlice = createSlice({
  name: "dao",
  initialState: {
    data: [
      {
        dao_addr:
          "orai1xm67l9xesgfslr9va67zk7n92ad908adachvuzd8y8rkhqhn7lks9zd3y2",
        voting_addr:
          "orai1hceqpln9fc3hpy2l4kwv0cspgredahy9ha3jzgx3vjl0qtmpnpwqyvvw2y",
        proposal_addr:
          "orai1heuuw8sphhczxens6dszlz49jk7uwsaqzz9t9zunzn30als9ltxqgzh9jq",
        token_addr:
          "orai1u4l0d303r2uydga2axjlflmkkcg7j42ffl68an4mf460qtr75y4qq3qxm3",
        staking_addr:
          "orai1khlsqw6pxzkmtulwp5uttw4ds6yvt07serz69wja2apjmthzd2pqvtv557",
      },
    ],
  } as DaoInterface,
  reducers: {
    // increment: (state: DaoInterface) => {
    //   state.value += 1;
    // },
    // decrement: (state) => {
    //   state.value -= 1;
    // },
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload;
    // },
  },
});

// export const { increment, decrement, incrementByAmount } = daoSlice.actions;
export default daoSlice.reducer;
