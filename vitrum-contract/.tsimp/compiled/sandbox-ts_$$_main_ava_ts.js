var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
// Imports
import { Worker } from "near-workspaces";
import anyTest from "ava";
var test = anyTest;
var candidateName1;
var candidateName2;
test.beforeEach(function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var worker, root, contract;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Worker.init()];
            case 1:
                worker = _a.sent();
                // Set variable values
                candidateName1 = "Alice";
                candidateName2 = "Bob";
                root = worker.rootAccount;
                return [4 /*yield*/, root.createSubAccount("test-account")];
            case 2:
                contract = _a.sent();
                // Get wasm file path from package.json test script in folder above
                return [4 /*yield*/, contract.deploy(process.argv[2])];
            case 3:
                // Get wasm file path from package.json test script in folder above
                _a.sent();
                // Save state for test runs, it is unique for each test
                t.context.worker = worker;
                t.context.accounts = { root: root, contract: contract };
                return [2 /*return*/];
        }
    });
}); });
test.afterEach.always(function (t) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: 
            // Stop Sandbox server
            return [4 /*yield*/, t.context.worker.tearDown().catch(function (error) {
                    console.log("Failed to stop the Sandbox:", error);
                })];
            case 1:
                // Stop Sandbox server
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
test("add a candidate", function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, root, contract, candidates;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = t.context.accounts, root = _a.root, contract = _a.contract;
                return [4 /*yield*/, root.call(contract, "addCandidate", { name: candidateName1 })];
            case 1:
                _b.sent();
                return [4 /*yield*/, contract.view("getCandidates", {})];
            case 2:
                candidates = _b.sent();
                t.true(candidates.includes(candidateName1), "Candidate not added properly");
                return [2 /*return*/];
        }
    });
}); });
test("get votes for a candidate", function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, root, contract, votes;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = t.context.accounts, root = _a.root, contract = _a.contract;
                return [4 /*yield*/, root.call(contract, "addCandidate", { name: candidateName1 })];
            case 1:
                _b.sent();
                return [4 /*yield*/, contract.view("getVotes", { name: candidateName1 })];
            case 2:
                votes = _b.sent();
                t.is(votes, 0, "Initial votes for the candidate should be 0");
                return [2 /*return*/];
        }
    });
}); });
test("request and use vote ID to vote", function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, root, contract, voteId, votes, e_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = t.context.accounts, root = _a.root, contract = _a.contract;
                return [4 /*yield*/, root.call(contract, "addCandidate", { name: candidateName1 })];
            case 1:
                _b.sent();
                return [4 /*yield*/, root.call(contract, "requestVoteId", {})];
            case 2:
                voteId = _b.sent();
                // Vote using the vote ID
                return [4 /*yield*/, root.call(contract, "vote", { tempId: voteId, name: candidateName1 })];
            case 3:
                // Vote using the vote ID
                _b.sent();
                return [4 /*yield*/, contract.view("getVotes", { name: candidateName1 })];
            case 4:
                votes = _b.sent();
                t.is(votes, 1, "Vote not counted properly");
                _b.label = 5;
            case 5:
                _b.trys.push([5, 7, , 8]);
                return [4 /*yield*/, root.call(contract, "vote", { tempId: voteId, name: candidateName1 })];
            case 6:
                _b.sent();
                t.fail("Should not be able to vote with the same vote ID twice");
                return [3 /*break*/, 8];
            case 7:
                e_1 = _b.sent();
                t.pass("Vote ID invalidated after use");
                return [3 /*break*/, 8];
            case 8: return [2 /*return*/];
        }
    });
}); });
test("prevent unauthorized voting", function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, root, contract, otherAccount, voteId, e_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = t.context.accounts, root = _a.root, contract = _a.contract;
                return [4 /*yield*/, root.createSubAccount("other-account")];
            case 1:
                otherAccount = _b.sent();
                return [4 /*yield*/, root.call(contract, "addCandidate", { name: candidateName1 })];
            case 2:
                _b.sent();
                return [4 /*yield*/, root.call(contract, "requestVoteId", {})];
            case 3:
                voteId = _b.sent();
                _b.label = 4;
            case 4:
                _b.trys.push([4, 6, , 7]);
                return [4 /*yield*/, otherAccount.call(contract, "vote", { tempId: voteId, name: candidateName1 })];
            case 5:
                _b.sent();
                t.fail("Unauthorized account should not be able to vote with another's vote ID");
                return [3 /*break*/, 7];
            case 6:
                e_2 = _b.sent();
                t.pass("Unauthorized vote attempt prevented");
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5hdmEuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL3NhcWlmYWJyYXIvUHJvamVjdHMvaGFja2F0aG9ucy9IYXdrSGFja3MvVml0cnVtL3ZpdHJ1bS1jb250cmFjdC8iLCJzb3VyY2VzIjpbInNhbmRib3gtdHMvbWFpbi5hdmEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsVUFBVTtBQUNWLE9BQU8sRUFBRSxNQUFNLEVBQWUsTUFBTSxpQkFBaUIsQ0FBQztBQUN0RCxPQUFPLE9BQW1CLE1BQU0sS0FBSyxDQUFDO0FBRXRDLElBQU0sSUFBSSxHQUFHLE9BR1gsQ0FBQztBQUVILElBQUksY0FBc0IsQ0FBQztBQUMzQixJQUFJLGNBQXNCLENBQUM7QUFFM0IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFPLENBQUM7Ozs7b0JBRVIscUJBQU0sTUFBTSxDQUFDLElBQUksRUFBRSxFQUFBOztnQkFBNUIsTUFBTSxHQUFHLFNBQW1CO2dCQUVsQyxzQkFBc0I7Z0JBQ3RCLGNBQWMsR0FBRyxPQUFPLENBQUM7Z0JBQ3pCLGNBQWMsR0FBRyxLQUFLLENBQUM7Z0JBR2pCLElBQUksR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFDO2dCQUNmLHFCQUFNLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxjQUFjLENBQUMsRUFBQTs7Z0JBQXRELFFBQVEsR0FBRyxTQUEyQztnQkFDNUQsbUVBQW1FO2dCQUNuRSxxQkFBTSxRQUFRLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQTs7Z0JBRHRDLG1FQUFtRTtnQkFDbkUsU0FBc0MsQ0FBQztnQkFFdkMsdURBQXVEO2dCQUN2RCxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7Z0JBQzFCLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxHQUFHLEVBQUUsSUFBSSxNQUFBLEVBQUUsUUFBUSxVQUFB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