/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { Controller, ValidationService, FieldErrors, ValidateError, TsoaRoute, HttpStatusCodeLiteral, TsoaResponse } from 'tsoa';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { DidsController } from './controllers/dids';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { NodesController } from './controllers/nodes';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { TransactionsController } from './controllers/transactions';
import { iocContainer } from './ioc';
import * as express from 'express';

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
    "IndyRoleType": {
        "dataType": "refEnum",
        "enums": ["0", "2", "100", "101"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IDid": {
        "dataType": "refObject",
        "properties": {
            "id": { "dataType": "string", "required": true },
            "from": { "dataType": "string" },
            "role": { "ref": "IndyRoleType" },
            "verkey": { "dataType": "string" },
            "attributes": { "dataType": "any" },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "GetDidsResponse": {
        "dataType": "refAlias",
        "type": { "dataType": "nestedObjectLiteral", "nestedProperties": { "data": { "dataType": "array", "array": { "ref": "IDid" }, "required": true }, "totalRecords": { "dataType": "double", "required": true } }, "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IndyValidatorData": {
        "dataType": "refObject",
        "properties": {
            "undefined": { "dataType": "string", "required": true },
            "timestamp": { "dataType": "double", "required": true },
            "Hardware": { "dataType": "nestedObjectLiteral", "nestedProperties": { "HDD_used_by_node": { "dataType": "string", "required": true } }, "required": true },
            "Pool_info": { "dataType": "nestedObjectLiteral", "nestedProperties": { "Suspicious_nodes": { "dataType": "string", "required": true }, "Unreachable_nodes_count": { "dataType": "double", "required": true }, "Reachable_nodes_count": { "dataType": "double", "required": true }, "Blacklisted_nodes": { "dataType": "array", "array": { "dataType": "any" }, "required": true }, "Unreachable_nodes": { "dataType": "array", "array": { "dataType": "any" }, "required": true }, "Reachable_nodes": { "dataType": "array", "array": { "dataType": "any" }, "required": true }, "Quorums": { "dataType": "string", "required": true }, "f_value": { "dataType": "double", "required": true }, "Total_nodes_count": { "dataType": "double", "required": true }, "Read_only": { "dataType": "boolean", "required": true } }, "required": true },
            "Protocol": { "dataType": "any", "required": true },
            "Node_info": { "dataType": "nestedObjectLiteral", "nestedProperties": { "Replicas_status": { "dataType": "any", "required": true }, "Count_of_replicas": { "dataType": "double", "required": true }, "Requests_timeouts": { "dataType": "nestedObjectLiteral", "nestedProperties": { "Ordering_phase_req_timeouts": { "dataType": "double", "required": true }, "Propagates_phase_req_timeouts": { "dataType": "double", "required": true } }, "required": true }, "Freshness_status": { "dataType": "nestedObjectLiteral", "nestedProperties": { "0": { "dataType": "nestedObjectLiteral", "nestedProperties": { "Has_write_consensus": { "dataType": "boolean", "required": true }, "Last_updated_time": { "dataType": "string", "required": true } }, "required": true }, "1": { "dataType": "nestedObjectLiteral", "nestedProperties": { "Has_write_consensus": { "dataType": "boolean", "required": true }, "Last_updated_time": { "dataType": "string", "required": true } }, "required": true }, "2": { "dataType": "nestedObjectLiteral", "nestedProperties": { "Has_write_consensus": { "dataType": "boolean", "required": true }, "Last_updated_time": { "dataType": "string", "required": true } }, "required": true } }, "required": true }, "Catchup_status": { "dataType": "nestedObjectLiteral", "nestedProperties": { "Number_txns_in_catchup": { "dataType": "nestedObjectLiteral", "nestedProperties": { "0": { "dataType": "double", "required": true }, "1": { "dataType": "double", "required": true }, "2": { "dataType": "double", "required": true }, "3": { "dataType": "double", "required": true } }, "required": true }, "Waiting_consistency_proof_msgs": { "dataType": "nestedObjectLiteral", "nestedProperties": { "0": { "dataType": "any" }, "1": { "dataType": "any" }, "2": { "dataType": "any" }, "3": { "dataType": "any" } }, "required": true }, "Received_LedgerStatus": { "dataType": "any", "required": true }, "Ledger_statuses": { "dataType": "nestedObjectLiteral", "nestedProperties": { "0": { "dataType": "string", "required": true }, "1": { "dataType": "string", "required": true }, "2": { "dataType": "string", "required": true }, "3": { "dataType": "string", "required": true } }, "required": true } }, "required": true }, "View_change_status": { "dataType": "nestedObjectLiteral", "nestedProperties": { "VCDone_queue": { "dataType": "any", "required": true }, "IC_queue": { "dataType": "any", "required": true }, "Last_complete_view_no": { "dataType": "double", "required": true }, "Last_view_change_started_at": { "dataType": "string", "required": true }, "VC_in_progress": { "dataType": "boolean", "required": true }, "View_No": { "dataType": "double", "required": true } }, "required": true }, "Uncommitted_state_root_hashes": { "dataType": "any", "required": true }, "Uncommitted_ledger_txns": { "dataType": "any", "required": true }, "Uncommitted_ledger_root_hashes": { "dataType": "any", "required": true }, "Committed_state_root_hashes": { "dataType": "any", "required": true }, "Committed_ledger_root_hashes": { "dataType": "any", "required": true }, "Metrics": { "dataType": "nestedObjectLiteral", "nestedProperties": { "uptime": { "dataType": "double", "required": true }, "throughput": { "dataType": "any", "required": true }, "undefined": { "dataType": "any", "required": true }, "Omega": { "dataType": "string", "required": true }, "Lambda": { "dataType": "string", "required": true }, "Delata": { "dataType": "string", "required": true } }, "required": true }, "BLS_key": { "dataType": "string", "required": true }, "verkey": { "dataType": "string", "required": true }, "did": { "dataType": "string", "required": true }, "Node_protocol": { "dataType": "string", "required": true }, "Client_protocol": { "dataType": "string", "required": true }, "Node_ip": { "dataType": "string", "required": true }, "Node_port": { "dataType": "double", "required": true }, "Client_ip": { "dataType": "string", "required": true }, "Client_port": { "dataType": "double", "required": true }, "Mode": { "dataType": "string", "required": true }, "Name": { "dataType": "string", "required": true } }, "required": true },
            "Software": { "dataType": "nestedObjectLiteral", "nestedProperties": { "sovrin": { "dataType": "any", "required": true }, "indy-node": { "dataType": "string", "required": true }, "Indy_packages": { "dataType": "array", "array": { "dataType": "string" }, "required": true }, "Installed_packages": { "dataType": "array", "array": { "dataType": "string" }, "required": true }, "OS_version": { "dataType": "string", "required": true } }, "required": true },
            "Update_time": { "dataType": "string", "required": true },
            "Memory_profiler": { "dataType": "array", "array": { "dataType": "any" }, "required": true },
            "Extractions": { "dataType": "nestedObjectLiteral", "nestedProperties": { "stops_stat": { "dataType": "any", "required": true }, "upgrade_log": { "dataType": "string", "required": true }, "node-control status": { "dataType": "array", "array": { "dataType": "string" }, "required": true }, "indy-node_status": { "dataType": "array", "array": { "dataType": "string" }, "required": true }, "journalctl_exceptions": { "dataType": "array", "array": { "dataType": "string" }, "required": true } }, "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "INode": {
        "dataType": "refObject",
        "properties": {
            "name": { "dataType": "string", "required": true },
            "active": { "dataType": "boolean", "required": true },
            "value": { "ref": "IndyValidatorData" },
            "indy_version": { "dataType": "string" },
            "did": { "dataType": "string" },
            "verkey": { "dataType": "string" },
            "uptime_seconds": { "dataType": "double" },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "GetNodesResponse": {
        "dataType": "refAlias",
        "type": { "dataType": "nestedObjectLiteral", "nestedProperties": { "data": { "dataType": "array", "array": { "ref": "INode" }, "required": true }, "totalRecords": { "dataType": "double", "required": true } }, "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "NodeStatus": {
        "dataType": "refObject",
        "properties": {
            "id": { "dataType": "double" },
            "name": { "dataType": "string" },
            "timestamp": { "dataType": "double" },
            "indy_version": { "dataType": "string" },
            "read_throughput": { "dataType": "double" },
            "write_throughput": { "dataType": "double" },
            "active": { "dataType": "boolean" },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "NodesStatusSummary": {
        "dataType": "refObject",
        "properties": {
            "id": { "dataType": "double" },
            "timestamp": { "dataType": "double" },
            "read_throughput": { "dataType": "double" },
            "write_throughput": { "dataType": "double" },
            "active": { "dataType": "double" },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "TransactionType": {
        "dataType": "refEnum",
        "enums": ["0", "1", "100", "101", "102", "103", "104", "105", "107", "108", "109", "110", "111", "112", "113", "114", "118", "120"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "TransactionType.NYM": {
        "dataType": "refEnum",
        "enums": ["1"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "NymTransaction": {
        "dataType": "refObject",
        "properties": {
            "data": { "dataType": "nestedObjectLiteral", "nestedProperties": { "verkey": { "dataType": "string", "required": true }, "role": { "ref": "IndyRoleType", "required": true }, "dest": { "dataType": "string", "required": true } }, "required": true },
            "type": { "ref": "TransactionType.NYM", "required": true },
            "metadata": { "dataType": "nestedObjectLiteral", "nestedProperties": { "from": { "dataType": "string" } }, "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "TransactionType.SCHEMA": {
        "dataType": "refEnum",
        "enums": ["101"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "SchemaTransaction": {
        "dataType": "refObject",
        "properties": {
            "data": { "dataType": "nestedObjectLiteral", "nestedProperties": { "data": { "dataType": "nestedObjectLiteral", "nestedProperties": { "version": { "dataType": "string", "required": true }, "name": { "dataType": "string", "required": true }, "attr_names": { "dataType": "array", "array": { "dataType": "string" }, "required": true } }, "required": true } }, "required": true },
            "type": { "ref": "TransactionType.SCHEMA", "required": true },
            "metadata": { "dataType": "any", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "TransactionType.ATTRIB": {
        "dataType": "refEnum",
        "enums": ["100"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AttributeTransaction": {
        "dataType": "refObject",
        "properties": {
            "data": { "dataType": "nestedObjectLiteral", "nestedProperties": { "raw": { "dataType": "string", "required": true }, "dest": { "dataType": "string", "required": true } }, "required": true },
            "type": { "ref": "TransactionType.ATTRIB", "required": true },
            "metadata": { "dataType": "nestedObjectLiteral", "nestedProperties": { "from": { "dataType": "string", "required": true } }, "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "TransactionType.CRED_DEF": {
        "dataType": "refEnum",
        "enums": ["102"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CredentialDefinitionTransaction": {
        "dataType": "refObject",
        "properties": {
            "data": { "dataType": "nestedObjectLiteral", "nestedProperties": { "data": { "dataType": "nestedObjectLiteral", "nestedProperties": { "tag": { "dataType": "string", "required": true }, "signature_type": { "dataType": "string", "required": true }, "ref": { "dataType": "double", "required": true } }, "required": true } }, "required": true },
            "type": { "ref": "TransactionType.CRED_DEF", "required": true },
            "metadata": { "dataType": "nestedObjectLiteral", "nestedProperties": { "from": { "dataType": "string", "required": true } }, "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "TransactionType.NODE": {
        "dataType": "refEnum",
        "enums": ["0"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "NodeTransaction": {
        "dataType": "refObject",
        "properties": {
            "data": { "dataType": "nestedObjectLiteral", "nestedProperties": { "dest": { "dataType": "string", "required": true }, "data": { "dataType": "nestedObjectLiteral", "nestedProperties": { "services": { "dataType": "array", "array": { "dataType": "string" }, "required": true }, "node_port": { "dataType": "double", "required": true }, "node_ip": { "dataType": "string", "required": true }, "client_port": { "dataType": "double", "required": true }, "client_ip": { "dataType": "string", "required": true }, "blskey": { "dataType": "string", "required": true }, "blskey_pop": { "dataType": "string", "required": true }, "alias": { "dataType": "string", "required": true } }, "required": true } }, "required": true },
            "type": { "ref": "TransactionType.NODE", "required": true },
            "metadata": { "dataType": "nestedObjectLiteral", "nestedProperties": { "from": { "dataType": "string", "required": true } }, "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IndyTransaction": {
        "dataType": "refObject",
        "properties": {
            "auditPath": { "dataType": "array", "array": { "dataType": "string" }, "required": true },
            "ledgerSize": { "dataType": "double", "required": true },
            "reqSignature": { "dataType": "nestedObjectLiteral", "nestedProperties": { "values": { "dataType": "array", "array": { "dataType": "nestedObjectLiteral", "nestedProperties": { "value": { "dataType": "string", "required": true }, "from": { "dataType": "string", "required": true } } }, "required": true }, "type": { "dataType": "enum", "enums": ["ED25519"], "required": true } } },
            "rootHash": { "dataType": "string", "required": true },
            "txn": { "dataType": "union", "subSchemas": [{ "ref": "NymTransaction" }, { "ref": "SchemaTransaction" }, { "ref": "AttributeTransaction" }, { "ref": "CredentialDefinitionTransaction" }, { "ref": "NodeTransaction" }], "required": true },
            "txnMetadata": { "dataType": "nestedObjectLiteral", "nestedProperties": { "txnTime": { "dataType": "double" }, "txnId": { "dataType": "string" }, "seqNo": { "dataType": "double", "required": true } }, "required": true },
            "ver": { "dataType": "double", "required": true },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ITransaction": {
        "dataType": "refObject",
        "properties": {
            "added": { "dataType": "double" },
            "sequence": { "dataType": "double", "required": true },
            "ledger": { "dataType": "double", "required": true },
            "transactionType": { "ref": "TransactionType" },
            "role": { "ref": "IndyRoleType" },
            "transactionId": { "dataType": "string" },
            "value": { "ref": "IndyTransaction" },
            "source": { "dataType": "string" },
            "destination": { "dataType": "string" },
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "GetTransactionsResponse": {
        "dataType": "refAlias",
        "type": { "dataType": "nestedObjectLiteral", "nestedProperties": { "data": { "dataType": "array", "array": { "ref": "ITransaction" }, "required": true }, "totalRecords": { "dataType": "double", "required": true } }, "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const validationService = new ValidationService(models);

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

export function RegisterRoutes(app: express.Express) {
    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################
    app.get('/api/dids',
        function(request: any, response: any, next: any) {
            const args = {
                serviceErrorResponse: { "in": "res", "name": "502", "required": true, "dataType": "nestedObjectLiteral", "nestedProperties": { "reason": { "dataType": "string", "required": true } } },
                startRow: { "in": "query", "name": "startRow", "dataType": "double" },
                endRow: { "in": "query", "name": "endRow", "dataType": "double" },
                query: { "in": "query", "name": "query", "dataType": "any" },
                sortBy: { "default": "id", "in": "query", "name": "sortBy", "dataType": "string" },
                sortMode: { "default": "ASC", "in": "query", "name": "sortMode", "dataType": "union", "subSchemas": [{ "dataType": "enum", "enums": ["ASC"] }, { "dataType": "enum", "enums": ["DESC"] }] },
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller: any = iocContainer.get<DidsController>(DidsController);
            if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
            }


            const promise = controller.getDids.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/nodes',
        function(request: any, response: any, next: any) {
            const args = {
                serviceErrorResponse: { "in": "res", "name": "502", "required": true, "dataType": "nestedObjectLiteral", "nestedProperties": { "reason": { "dataType": "string", "required": true } } },
                startRow: { "in": "query", "name": "startRow", "dataType": "double" },
                endRow: { "in": "query", "name": "endRow", "dataType": "double" },
                query: { "in": "query", "name": "query", "dataType": "any" },
                sortBy: { "default": "name", "in": "query", "name": "sortBy", "dataType": "string" },
                sortMode: { "default": "ASC", "in": "query", "name": "sortMode", "dataType": "union", "subSchemas": [{ "dataType": "enum", "enums": ["ASC"] }, { "dataType": "enum", "enums": ["DESC"] }] },
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller: any = iocContainer.get<NodesController>(NodesController);
            if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
            }


            const promise = controller.getNodes.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/nodes/history',
        function(request: any, response: any, next: any) {
            const args = {
                serviceErrorResponse: { "in": "res", "name": "502", "required": true, "dataType": "nestedObjectLiteral", "nestedProperties": { "reason": { "dataType": "string", "required": true } } },
                since: { "in": "query", "name": "since", "dataType": "double" },
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller: any = iocContainer.get<NodesController>(NodesController);
            if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
            }


            const promise = controller.getHistory.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/nodes/:node/history',
        function(request: any, response: any, next: any) {
            const args = {
                serviceErrorResponse: { "in": "res", "name": "502", "required": true, "dataType": "nestedObjectLiteral", "nestedProperties": { "reason": { "dataType": "string", "required": true } } },
                node: { "in": "path", "name": "node", "required": true, "dataType": "string" },
                since: { "in": "query", "name": "since", "dataType": "double" },
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller: any = iocContainer.get<NodesController>(NodesController);
            if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
            }


            const promise = controller.getHistoryByNode.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/nodes/history/summary',
        function(request: any, response: any, next: any) {
            const args = {
                serviceErrorResponse: { "in": "res", "name": "502", "required": true, "dataType": "nestedObjectLiteral", "nestedProperties": { "reason": { "dataType": "string", "required": true } } },
                since: { "in": "query", "name": "since", "dataType": "double" },
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller: any = iocContainer.get<NodesController>(NodesController);
            if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
            }


            const promise = controller.getHistorySummary.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/api/transactions/:ledgerType',
        function(request: any, response: any, next: any) {
            const args = {
                serviceErrorResponse: { "in": "res", "name": "502", "required": true, "dataType": "nestedObjectLiteral", "nestedProperties": { "reason": { "dataType": "string", "required": true } } },
                ledgerType: { "in": "path", "name": "ledgerType", "required": true, "dataType": "union", "subSchemas": [{ "dataType": "enum", "enums": ["POOL"] }, { "dataType": "enum", "enums": ["DOMAIN"] }] },
                startRow: { "in": "query", "name": "startRow", "dataType": "double" },
                endRow: { "in": "query", "name": "endRow", "dataType": "double" },
                query: { "in": "query", "name": "query", "dataType": "any" },
                sortBy: { "default": "sequence", "in": "query", "name": "sortBy", "dataType": "string" },
                sortMode: { "default": "ASC", "in": "query", "name": "sortMode", "dataType": "union", "subSchemas": [{ "dataType": "enum", "enums": ["ASC"] }, { "dataType": "enum", "enums": ["DESC"] }] },
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller: any = iocContainer.get<TransactionsController>(TransactionsController);
            if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
            }


            const promise = controller.getTransactions.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, next);
        });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa


    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function isController(object: any): object is Controller {
        return 'getHeaders' in object && 'getStatus' in object && 'setStatus' in object;
    }

    function promiseHandler(controllerObj: any, promise: any, response: any, next: any) {
        return Promise.resolve(promise)
            .then((data: any) => {
                let statusCode;
                let headers;
                if (isController(controllerObj)) {
                    headers = controllerObj.getHeaders();
                    statusCode = controllerObj.getStatus();
                }

                // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

                returnHandler(response, statusCode, data, headers)
            })
            .catch((error: any) => next(error));
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function returnHandler(response: any, statusCode?: number, data?: any, headers: any = {}) {
        Object.keys(headers).forEach((name: string) => {
            response.set(name, headers[name]);
        });
        if (data && typeof data.pipe === 'function' && data.readable && typeof data._read === 'function') {
            data.pipe(response);
        } else if (data || data === false) { // === false allows boolean result
            response.status(statusCode || 200).json(data);
        } else {
            response.status(statusCode || 204).end();
        }
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function responder(response: any): TsoaResponse<HttpStatusCodeLiteral, unknown> {
        return function(status, data, headers) {
            returnHandler(response, status, data, headers);
        };
    };

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function getValidatedArgs(args: any, request: any, response: any): any[] {
        const fieldErrors: FieldErrors = {};
        const values = Object.keys(args).map((key) => {
            const name = args[key].name;
            switch (args[key].in) {
                case 'request':
                    return request;
                case 'query':
                    return validationService.ValidateParam(args[key], request.query[name], name, fieldErrors, undefined, { "noImplicitAdditionalProperties": "throw-on-extras" });
                case 'path':
                    return validationService.ValidateParam(args[key], request.params[name], name, fieldErrors, undefined, { "noImplicitAdditionalProperties": "throw-on-extras" });
                case 'header':
                    return validationService.ValidateParam(args[key], request.header(name), name, fieldErrors, undefined, { "noImplicitAdditionalProperties": "throw-on-extras" });
                case 'body':
                    return validationService.ValidateParam(args[key], request.body, name, fieldErrors, undefined, { "noImplicitAdditionalProperties": "throw-on-extras" });
                case 'body-prop':
                    return validationService.ValidateParam(args[key], request.body[name], name, fieldErrors, 'body.', { "noImplicitAdditionalProperties": "throw-on-extras" });
                case 'res':
                    return responder(response);
            }
        });

        if (Object.keys(fieldErrors).length > 0) {
            throw new ValidateError(fieldErrors, '');
        }
        return values;
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
