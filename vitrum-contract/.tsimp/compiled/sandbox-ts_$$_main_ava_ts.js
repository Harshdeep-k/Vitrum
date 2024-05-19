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
/*import { Worker, NearAccount } from 'near-workspaces';
import anyTest, { TestFn } from 'ava';
import { setDefaultResultOrder } from 'dns'; setDefaultResultOrder('ipv4first'); // temp fix for node >v17

// Global context
const test = anyTest as TestFn<{ worker: Worker, accounts: Record<string, NearAccount> }>;

test.beforeEach(async (t) => {
  // Create sandbox, accounts, deploy contracts, etc.
  const worker = t.context.worker = await Worker.init();

  // Deploy contract
  const root = worker.rootAccount;
  const contract = await root.createSubAccount('test-account');

  // Get wasm file path from package.json test script in folder above
  await contract.deploy(
    process.argv[2],
  );

  // Save state for test runs, it is unique for each test
  t.context.accounts = { root, contract };
});

test.afterEach.always(async (t) => {
  // Stop Sandbox server
  await t.context.worker.tearDown().catch((error) => {
    console.log('Failed to stop the Sandbox:', error);
  });
});

test('returns the default greeting', async (t) => {
  const { contract } = t.context.accounts;
  const greeting: string = await contract.view('get_greeting', {});
  t.is(greeting, 'Hello');
});

test('changes the greeting', async (t) => {
  const { root, contract } = t.context.accounts;
  await root.call(contract, 'set_greeting', { greeting: 'Howdy' });
  const greeting: string = await contract.view('get_greeting', {});
  t.is(greeting, 'Howdy');
});*/
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5hdmEuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL3NhcWlmYWJyYXIvUHJvamVjdHMvaGFja2F0aG9ucy9IYXdrSGFja3Mvdml0cnVtLWNvbnRyYWN0LyIsInNvdXJjZXMiOlsic2FuZGJveC10cy9tYWluLmF2YS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxVQUFVO0FBQ1YsT0FBTyxFQUFFLE1BQU0sRUFBZSxNQUFNLGlCQUFpQixDQUFDO0FBQ3RELE9BQU8sT0FBbUIsTUFBTSxLQUFLLENBQUM7QUFFdEMsSUFBTSxJQUFJLEdBQUcsT0FHWCxDQUFDO0FBRUgsSUFBSSxjQUFzQixDQUFDO0FBQzNCLElBQUksY0FBc0IsQ0FBQztBQUUzQixJQUFJLENBQUMsVUFBVSxDQUFDLFVBQU8sQ0FBQzs7OztvQkFFUixxQkFBTSxNQUFNLENBQUMsSUFBSSxFQUFFLEVBQUE7O2dCQUE1QixNQUFNLEdBQUcsU0FBbUI7Z0JBRWxDLHNCQUFzQjtnQkFDdEIsY0FBYyxHQUFHLE9BQU8sQ0FBQztnQkFDekIsY0FBYyxHQUFHLEtBQUssQ0FBQztnQkFHakIsSUFBSSxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUM7Z0JBQ2YscUJBQU0sSUFBSSxDQUFDLGdCQUFnQixDQUFDLGNBQWMsQ0FBQyxFQUFBOztnQkFBdEQsUUFBUSxHQUFHLFNBQTJDO2dCQUM1RCxtRUFBbUU7Z0JBQ25FLHFCQUFNLFFBQVEsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFBOztnQkFEdEMsbUVBQW1FO2dCQUNuRSxTQUFzQyxDQUFDO2dCQUV2Qyx1REFBdUQ7Z0JBQ3ZELENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztnQkFDMUIsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxRQUFRLEdBQUcsRUFBRSxJQUFJLE1BQUEsRUFBRSxRQUFRLFVBQUEsRUFBRSxDQUFDOzs7O0tBQ3hDLENBQUMsQ0FBQztBQUVILElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFVBQU8sQ0FBQzs7OztZQUM3QixzQkFBc0I7WUFDdEIscUJBQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUMsS0FBSyxDQUFDLFVBQUMsS0FBSztvQkFDN0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyw2QkFBNkIsRUFBRSxLQUFLLENBQUMsQ0FBQztnQkFDbkQsQ0FBQyxDQUFDLEVBQUE7O2dCQUhGLHNCQUFzQjtnQkFDdEIsU0FFRSxDQUFDOzs7O0tBQ0gsQ0FBQyxDQUFDO0FBRUgsSUFBSSxDQUFDLGlCQUFpQixFQUFFLFVBQU8sQ0FBQzs7Ozs7Z0JBQ3pCLEtBQXFCLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFyQyxJQUFJLFVBQUEsRUFBRSxRQUFRLGNBQUEsQ0FBd0I7Z0JBQzlDLHFCQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLGNBQWMsRUFBRSxFQUFFLElBQUksRUFBRSxjQUFjLEVBQUUsQ0FBQyxFQUFBOztnQkFBbkUsU0FBbUUsQ0FBQztnQkFDakQscUJBQU0sUUFBUSxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUUsRUFBRSxDQUFDLEVBQUE7O2dCQUFyRCxVQUFVLEdBQUcsU0FBd0M7Z0JBQzNELENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsRUFBRSw4QkFBOEIsQ0FBQyxDQUFDOzs7O0tBQzVFLENBQUMsQ0FBQztBQUVILElBQUksQ0FBQywyQkFBMkIsRUFBRSxVQUFPLENBQUM7Ozs7O2dCQUNuQyxLQUFxQixDQUFDLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBckMsSUFBSSxVQUFBLEVBQUUsUUFBUSxjQUFBLENBQXdCO2dCQUM5QyxxQkFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxjQUFjLEVBQUUsRUFBRSxJQUFJLEVBQUUsY0FBYyxFQUFFLENBQUMsRUFBQTs7Z0JBQW5FLFNBQW1FLENBQUM7Z0JBQ3RELHFCQUFNLFFBQVEsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLEVBQUUsSUFBSSxFQUFFLGNBQWMsRUFBRSxDQUFDLEVBQUE7O2dCQUFqRSxLQUFLLEdBQUcsU0FBeUQ7Z0JBQ3ZFLENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUMsRUFBRSw2Q0FBNkMsQ0FBQyxDQUFDOzs7O0tBQzlELENBQUMsQ0FBQztBQUVILElBQUksQ0FBQyxpQ0FBaUMsRUFBRSxVQUFPLENBQUM7Ozs7O2dCQUN6QyxLQUFxQixDQUFDLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBckMsSUFBSSxVQUFBLEVBQUUsUUFBUSxjQUFBLENBQXdCO2dCQUM5QyxxQkFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxjQUFjLEVBQUUsRUFBRSxJQUFJLEVBQUUsY0FBYyxFQUFFLENBQUMsRUFBQTs7Z0JBQW5FLFNBQW1FLENBQUM7Z0JBR3JELHFCQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLGVBQWUsRUFBRSxFQUFFLENBQUMsRUFBQTs7Z0JBQXZELE1BQU0sR0FBRyxTQUE4QztnQkFFN0QseUJBQXlCO2dCQUN6QixxQkFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxNQUFNLEVBQUUsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxjQUFjLEVBQUUsQ0FBQyxFQUFBOztnQkFEM0UseUJBQXlCO2dCQUN6QixTQUEyRSxDQUFDO2dCQUc5RCxxQkFBTSxRQUFRLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxFQUFFLElBQUksRUFBRSxjQUFjLEVBQUUsQ0FBQyxFQUFBOztnQkFBakUsS0FBSyxHQUFHLFNBQXlEO2dCQUN2RSxDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDLEVBQUUsMkJBQTJCLENBQUMsQ0FBQzs7OztnQkFJM0MscUJBQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsTUFBTSxFQUFFLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsY0FBYyxFQUFFLENBQUMsRUFBQTs7Z0JBQTNFLFNBQTJFLENBQUM7Z0JBQzVFLENBQUMsQ0FBQyxJQUFJLENBQUMsd0RBQXdELENBQUMsQ0FBQzs7OztnQkFFakUsQ0FBQyxDQUFDLElBQUksQ0FBQywrQkFBK0IsQ0FBQyxDQUFDOzs7OztLQUV6QyxDQUFDLENBQUM7QUFFSCxJQUFJLENBQUMsNkJBQTZCLEVBQUUsVUFBTyxDQUFDOzs7OztnQkFDckMsS0FBcUIsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQXJDLElBQUksVUFBQSxFQUFFLFFBQVEsY0FBQSxDQUF3QjtnQkFDekIscUJBQU0sSUFBSSxDQUFDLGdCQUFnQixDQUFDLGVBQWUsQ0FBQyxFQUFBOztnQkFBM0QsWUFBWSxHQUFHLFNBQTRDO2dCQUVqRSxxQkFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxjQUFjLEVBQUUsRUFBRSxJQUFJLEVBQUUsY0FBYyxFQUFFLENBQUMsRUFBQTs7Z0JBQW5FLFNBQW1FLENBQUM7Z0JBR3JELHFCQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLGVBQWUsRUFBRSxFQUFFLENBQUMsRUFBQTs7Z0JBQXZELE1BQU0sR0FBRyxTQUE4Qzs7OztnQkFJNUQscUJBQU0sWUFBWSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsTUFBTSxFQUFFLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsY0FBYyxFQUFFLENBQUMsRUFBQTs7Z0JBQW5GLFNBQW1GLENBQUM7Z0JBQ3BGLENBQUMsQ0FBQyxJQUFJLENBQUMsd0VBQXdFLENBQUMsQ0FBQzs7OztnQkFFakYsQ0FBQyxDQUFDLElBQUksQ0FBQyxxQ0FBcUMsQ0FBQyxDQUFDOzs7OztLQUUvQyxDQUFDLENBQUM7QUFFSDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0tBMENLIn0=