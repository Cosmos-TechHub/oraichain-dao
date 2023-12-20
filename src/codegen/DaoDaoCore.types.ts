import {Admin, Binary, ModuleInstantiateInfo, CosmosMsgForEmpty, BankMsg, Uint128, StakingMsg, DistributionMsg, IbcMsg, Timestamp, Uint64, WasmMsg, GovMsg, VoteOption, Duration, Coin, Empty, IbcTimeout, IbcTimeoutBlock, Cw20ReceiveMsg, Cw721ReceiveMsg, PreProposeInfo, Addr, Expiration, ContractVersion, ArrayOfString} from "./types";
export interface InstantiateMsg {
  admin?: string | null;
  automatically_add_cw20s: boolean;
  automatically_add_cw721s: boolean;
  dao_uri?: string | null;
  description: string;
  image_url?: string | null;
  initial_items?: InitialItem[] | null;
  name: string;
  proposal_modules_instantiate_info: ModuleInstantiateInfo[];
  voting_module_instantiate_info: ModuleInstantiateInfo;
}
export interface InitialItem {
  key: string;
  value: string;
}
export type ExecuteMsg = {
  execute_admin_msgs: {
    msgs: CosmosMsgForEmpty[];
  };
} | {
  execute_proposal_hook: {
    msgs: CosmosMsgForEmpty[];
  };
} | {
  pause: {
    duration: Duration;
  };
} | {
  receive: Cw20ReceiveMsg;
} | {
  receive_nft: Cw721ReceiveMsg;
} | {
  remove_item: {
    key: string;
  };
} | {
  set_item: {
    key: string;
    value: string;
  };
} | {
  nominate_admin: {
    admin?: string | null;
  };
} | {
  accept_admin_nomination: {};
} | {
  withdraw_admin_nomination: {};
} | {
  update_config: {
    config: Config;
  };
} | {
  update_cw20_list: {
    to_add: string[];
    to_remove: string[];
  };
} | {
  update_cw721_list: {
    to_add: string[];
    to_remove: string[];
  };
} | {
  update_proposal_modules: {
    to_add: ModuleInstantiateInfo[];
    to_disable: string[];
  };
} | {
  update_voting_module: {
    module: ModuleInstantiateInfo;
  };
} | {
  update_sub_daos: {
    to_add: SubDao[];
    to_remove: string[];
  };
};
export interface Config {
  automatically_add_cw20s: boolean;
  automatically_add_cw721s: boolean;
  dao_uri?: string | null;
  description: string;
  image_url?: string | null;
  name: string;
}
export interface SubDao {
  addr: string;
  charter?: string | null;
}
export type QueryMsg = {
  admin: {};
} | {
  admin_nomination: {};
} | {
  config: {};
} | {
  cw20_balances: {
    limit?: number | null;
    start_after?: string | null;
  };
} | {
  cw20_token_list: {
    limit?: number | null;
    start_after?: string | null;
  };
} | {
  cw721_token_list: {
    limit?: number | null;
    start_after?: string | null;
  };
} | {
  dump_state: {};
} | {
  get_item: {
    key: string;
  };
} | {
  list_items: {
    limit?: number | null;
    start_after?: string | null;
  };
} | {
  info: {};
} | {
  proposal_modules: {
    limit?: number | null;
    start_after?: string | null;
  };
} | {
  active_proposal_modules: {
    limit?: number | null;
    start_after?: string | null;
  };
} | {
  proposal_module_count: {};
} | {
  pause_info: {};
} | {
  voting_module: {};
} | {
  list_sub_daos: {
    limit?: number | null;
    start_after?: string | null;
  };
} | {
  dao_u_r_i: {};
} | {
  voting_power_at_height: {
    address: string;
    height?: number | null;
  };
} | {
  total_power_at_height: {
    height?: number | null;
  };
};
export type MigrateMsg = {
  from_v1: {
    dao_uri?: string | null;
    params?: MigrateParams | null;
  };
} | {
  from_compatible: {};
};
export interface MigrateParams {
  migrator_code_id: number;
  params: MigrateV1ToV2;
}
export interface MigrateV1ToV2 {
  migration_params: MigrationModuleParams;
  sub_daos: SubDao[];
  v1_code_ids: V1CodeIds;
  v2_code_ids: V2CodeIds;
}
export interface MigrationModuleParams {
  migrate_stake_cw20_manager?: boolean | null;
  proposal_params: [string, ProposalParams][];
}
export interface ProposalParams {
  close_proposal_on_execution_failure: boolean;
  pre_propose_info: PreProposeInfo;
}
export interface V1CodeIds {
  cw20_stake: number;
  cw20_staked_balances_voting: number;
  cw4_voting: number;
  proposal_single: number;
}
export interface V2CodeIds {
  cw20_stake: number;
  cw20_staked_balances_voting: number;
  cw4_voting: number;
  proposal_single: number;
}
export type ProposalModuleStatus = "enabled" | "disabled";
export type ArrayOfProposalModule = ProposalModule[];
export interface ProposalModule {
  address: Addr;
  prefix: string;
  status: ProposalModuleStatus;
}
export interface AdminNominationResponse {
  nomination?: Addr | null;
}
export interface Cw20BalanceResponse {
  addr: Addr;
  balance: Uint128;
}
export type ArrayOfAddr = Addr[];
export interface DaoURIResponse {
  dao_uri?: string | null;
}
export type PauseInfoResponse = {
  paused: {
    expiration: Expiration;
  };
} | {
  unpaused: {};
};
export interface DumpStateResponse {
  active_proposal_module_count: number;
  admin: Addr;
  config: Config;
  pause_info: PauseInfoResponse;
  proposal_modules: ProposalModule[];
  total_proposal_module_count: number;
  version: ContractVersion;
  voting_module: Addr;
}
export interface GetItemResponse {
  item?: string | null;
}
export interface InfoResponse {
  info: ContractVersion;
}
export type ArrayOfSubDao = SubDao[];
export interface ProposalModuleCountResponse {
  active_proposal_module_count: number;
  total_proposal_module_count: number;
}
export interface TotalPowerAtHeightResponse {
  height: number;
  power: Uint128;
}
export interface VotingPowerAtHeightResponse {
  height: number;
  power: Uint128;
}