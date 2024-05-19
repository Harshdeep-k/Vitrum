// Imports
import { Worker, NearAccount } from "near-workspaces";
import anyTest, { TestFn } from "ava";

const test = anyTest as TestFn<{
	worker: Worker;
	accounts: Record<string, NearAccount>;
}>;

let candidateName1: string;
let candidateName2: string;

test.beforeEach(async (t) => {
	// Init the worker and start a Sandbox server
	const worker = await Worker.init();

	// Set variable values
	candidateName1 = "Alice";
	candidateName2 = "Bob";

	// Deploy contract
	const root = worker.rootAccount;
	const contract = await root.createSubAccount("test-account");
	// Get wasm file path from package.json test script in folder above
	await contract.deploy(process.argv[2]);

	// Save state for test runs, it is unique for each test
	t.context.worker = worker;
	t.context.accounts = { root, contract };
});

test.afterEach.always(async (t) => {
	// Stop Sandbox server
	await t.context.worker.tearDown().catch((error) => {
		console.log("Failed to stop the Sandbox:", error);
	});
});

test("add a candidate", async (t) => {
	const { root, contract } = t.context.accounts;
	await root.call(contract, "addCandidate", { name: candidateName1 });
	const candidates = await contract.view("getCandidates", {});
	t.true(candidates.includes(candidateName1), "Candidate not added properly");
});

test("get votes for a candidate", async (t) => {
	const { root, contract } = t.context.accounts;
	await root.call(contract, "addCandidate", { name: candidateName1 });
	const votes = await contract.view("getVotes", { name: candidateName1 });
	t.is(votes, 0, "Initial votes for the candidate should be 0");
});

test("request and use vote ID to vote", async (t) => {
	const { root, contract } = t.context.accounts;
	await root.call(contract, "addCandidate", { name: candidateName1 });

	// Request vote ID
	const voteId = await root.call(contract, "requestVoteId", {});

	// Vote using the vote ID
	await root.call(contract, "vote", { tempId: voteId, name: candidateName1 });

	// Check if the vote count increased
	const votes = await contract.view("getVotes", { name: candidateName1 });
	t.is(votes, 1, "Vote not counted properly");

	// Check if the vote ID is invalidated
	try {
		await root.call(contract, "vote", { tempId: voteId, name: candidateName1 });
		t.fail("Should not be able to vote with the same vote ID twice");
	} catch (e) {
		t.pass("Vote ID invalidated after use");
	}
});

test("prevent unauthorized voting", async (t) => {
	const { root, contract } = t.context.accounts;
	const otherAccount = await root.createSubAccount("other-account");

	await root.call(contract, "addCandidate", { name: candidateName1 });

	// Request vote ID with root account
	const voteId = await root.call(contract, "requestVoteId", {});

	// Attempt to vote with the other account using the root's vote ID
	try {
		await otherAccount.call(contract, "vote", { tempId: voteId, name: candidateName1 });
		t.fail("Unauthorized account should not be able to vote with another's vote ID");
	} catch (e) {
		t.pass("Unauthorized vote attempt prevented");
	}
});
