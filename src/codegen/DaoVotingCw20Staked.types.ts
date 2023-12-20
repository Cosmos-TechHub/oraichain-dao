import {ActiveThreshold, Uint128, Decimal, TokenInfo, StakingInfo, Duration, Logo, EmbeddedLogo, Binary, Cw20Coin, InstantiateMarketingInfo, Addr, ContractVersion, Boolean} from "./types";
export interface InstantiateMsg {
  active_threshold?: ActiveThreshold | null;
  token_info: TokenInfo;
}
export type ExecuteMsg = {
  update_active_threshold: {
    new_threshold?: ActiveThreshold | null;
  };
};
export type QueryMsg = {
  staking_contract: {};
} | {
  active_threshold: {};
} | {
  voting_power_at_height: {
    address: string;
    height?: number | null;
  };
} | {
  total_power_at_height: {
    height?: number | null;
  };
} | {
  dao: {};
} | {
  info: {};
} | {
  token_contract: {};
} | {
  is_active: {};
};
export interface MigrateMsg {}
export interface ActiveThresholdResponse {
  active_threshold?: ActiveThreshold | null;
}
export interface InfoResponse {
  info: ContractVersion;
}
export interface TotalPowerAtHeightResponse {
  height: number;
  power: Uint128;
}
export interface VotingPowerAtHeightResponse {
  height: number;
  power: Uint128;
}