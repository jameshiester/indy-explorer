export enum TransactionType {
  NODE = '0',
  NYM = '1',
  ATTRIB = '100',
  SCHEMA = '101',
  CRED_DEF = '102',
  DISCLO = '103',
  GET_ATTR = '104',
  GET_NYM = '105',
  GET_SCHEMA = '107',
  GET_CLAIM_DEF = '108',
  POOL_UPGRADE = '109',
  NODE_UPGRADE = '110',
  POOL_CONFIG = '111',
  CHANGE_KEY = '112',
  REVOC_REG_DEF = '113',
  RECOV_REG_ENTRY = '114',
  POOL_RESTART = '118',
  AUTH_RULE = '120',
}

export type ListPoolsResponse = Array<{
  pool?: string;
}>;

export interface IndyWallet {
  config: WalletConfig;
  credentials: WalletCredentials;
  did?: string;
  verkey?: string;
}

export enum IndyRoleType {
  TRUSTEE = '0',
  STEWARD = '2',
  TGB = '100',
  ENDORSER = '101',
}

export interface ServiceResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface WalletConfig {
  id: string;
  storage_type?: string;
  storageConfig?: {
    path: string;
  };
}

export interface WalletCredentials {
  key: string;
  rekey?: string;
  rekey_derivation_method?: 'ARGON2I_MOD' | 'ARGON2I_INT' | 'RAW';
}

export enum LedgerType {
  POOL = 0,
  DOMAIN = 1,
  CONFIG = 2,
}

export interface NymTransaction {
  data: { dest: string; role: IndyRoleType; verkey: string };
  type: TransactionType.NYM;
  metadata: { from?: string };
}

export interface SchemaTransaction {
  data: { data: { attr_names: Array<string>; name: string; version: string } };
  type: TransactionType.SCHEMA;
  metadata: any;
}

export interface CredentialDefinitionTransaction {
  data: { data: { ref: number; signature_type: string; tag: string } };
  type: TransactionType.CRED_DEF;
  metadata: { from: string };
}

export interface AttributeTransaction {
  data: { dest: string; raw: string };
  type: TransactionType.ATTRIB;
  metadata: { from: string };
}

export interface NodeTransaction {
  data: {
    data: {
      alias: string;
      blskey_pop: string;
      blskey: string;
      client_ip: string;
      client_port: number;
      node_ip: string;
      node_port: number;
      services: Array<string>;
    };
    dest: string;
  };
  type: TransactionType.NODE;
  metadata: { from: string };
}

export interface IndyTransaction {
  auditPath: Array<string>;
  ledgerSize: number;
  reqSignature?: {
    type: 'ED25519';
    values: Array<{ from: string; value: string }>;
  };
  rootHash: string;
  txn:
    | NymTransaction
    | SchemaTransaction
    | AttributeTransaction
    | CredentialDefinitionTransaction
    | NodeTransaction;
  txnMetadata: {
    seqNo: number;
    txnId?: string;
    txnTime?: number;
  };
  ver: number;
}

export interface ITransaction {
  added?: number;
  sequence: number;
  ledger: number;
  transactionType?: TransactionType;
  role?: IndyRoleType;
  transactionId?: string;
  value?: IndyTransaction;
  source?: string;
  destination?: string;
}

export interface INode {
  name: string;
  active: boolean;
  value?: IndyValidatorData;
  indy_version?: string;
  did?: string;
  verkey?: string;
  uptime_seconds?: number;
}

export interface INodesStatusSummary {
  id?: number;
  timestamp?: number;
  read_throughput?: number;
  write_throughput?: number;
  active?: number;
}

export interface IndyValidator {
  active: boolean;
  value: IndyValidatorStatus;
  alias: string;
}

export interface IndyValidatorData {
  ['response-version']: string;
  timestamp: number;
  Hardware: {
    HDD_used_by_node: string;
  };
  Pool_info: {
    Read_only: boolean;
    Total_nodes_count: number;
    f_value: number;
    Quorums: string;
    Reachable_nodes: Array<any>;
    Unreachable_nodes: Array<any>;
    Blacklisted_nodes: Array<any>;
    Reachable_nodes_count: number;
    Unreachable_nodes_count: number;
    Suspicious_nodes: string;
  };
  Protocol: any;
  Node_info: {
    Name: string;
    Mode: string;
    Client_port: number;
    Client_ip: string;
    Node_port: number;
    Node_ip: string;
    Client_protocol: string;
    Node_protocol: string;
    did: string;
    verkey: string;
    BLS_key: string;
    Metrics: {
      Delata: string;
      Lambda: string;
      Omega: string;
      ['instances started']: any;
      ['orderered request counts']: any;
      ['orderered request durations']: any;
      ['max master request latencies']: any;
      ['client avg request latencies']: any;
      ['master throughput']: any;
      ['total requests']: any;
      ['avg backup throughput']: any;
      ['master throughput ratio']: any;
      ['transaction-count']: {
        ledger: number;
        pool: number;
        config: number;
        audit: number;
      };
      ['average-per-second']: {
        ['read-transactions']: number;
        ['write-transactions']: number;
      };
      throughput: any;
      uptime: number;
    };
    Committed_ledger_root_hashes: any;
    Committed_state_root_hashes: any;
    Uncommitted_ledger_root_hashes: any;
    Uncommitted_ledger_txns: any;
    Uncommitted_state_root_hashes: any;
    View_change_status: {
      View_No: number;
      VC_in_progress: boolean;
      Last_view_change_started_at: string;
      Last_complete_view_no: number;
      IC_queue: any;
      VCDone_queue: any;
    };
    Catchup_status: {
      Ledger_statuses: {
        '0': string;
        '1': string;
        '2': string;
        '3': string;
      };
      Received_LedgerStatus: any;
      Waiting_consistency_proof_msgs: {
        '0'?: any;
        '1'?: any;
        '2'?: any;
        '3'?: any;
      };
      Number_txns_in_catchup: {
        '0': number;
        '1': number;
        '2': number;
        '3': number;
      };
    };
    Freshness_status: {
      '0': {
        Last_updated_time: string;
        Has_write_consensus: boolean;
      };
      '1': {
        Last_updated_time: string;
        Has_write_consensus: boolean;
      };
      '2': {
        Last_updated_time: string;
        Has_write_consensus: boolean;
      };
    };
    Requests_timeouts: {
      Propagates_phase_req_timeouts: number;
      Ordering_phase_req_timeouts: number;
    };
    Count_of_replicas: number;
    Replicas_status: any;
  };
  Software: {
    OS_version: string;
    Installed_packages: Array<string>;
    Indy_packages: Array<string>;
    'indy-node': string;
    sovrin: any;
  };
  Update_time: string;
  Memory_profiler: Array<any>;
  Extractions: {
    journalctl_exceptions: Array<string>;
    'indy-node_status': Array<string>;
    'node-control status': Array<string>;
    upgrade_log: string;
    stops_stat: any;
  };
}

export interface IndyValidatorStatus {
  op: string;
  result: {
    type: '119';
    identifier: string;
    reqId: string;
    data: IndyValidatorData;
  };
}

export interface IDid {
  id: string;
  from?: string;
  role?: IndyRoleType;
  verkey?: string;
  attributes?: any;
}
