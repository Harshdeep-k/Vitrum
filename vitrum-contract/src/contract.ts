import {
  NearBindgen,
  near,
  call,
  view,
  assert,
  LookupMap,
  UnorderedMap,
} from "near-sdk-js";

@NearBindgen({})
class Candidate {
  name: string;
  votes: number;

  constructor(name: string) {
    this.name = name;
    this.votes = 0;
  }

  addVote(): void {
    this.votes += 1;
  }
}

@NearBindgen({})
class VotingContract {
  candidates = new UnorderedMap<Candidate>("candidates");
  tempIds = new LookupMap<string>("tempIds");

  @view({})
  getCandidates(): string[] {
    return this.candidates.keys({start: undefined, limit: undefined});
  }

  @view({})
  getVotes({ name }: { name: string }): number {
    const candidate = this.candidates.get(name);
    assert(candidate !== null, "Candidate does not exist");
    return candidate.votes;
  }

  @call({})
  addCandidate({ name }: { name: string }) {
    assert(!this.candidates.get(name, null), "Candidate already exists");
    const candidate = new Candidate(name);
    this.candidates.set(name, candidate);
  }

  @call({})
  requestVoteId(): string {
    const voter = near.signerAccountId();
    const tempId = Math.random().toString(36).substr(2, 9);
    this.tempIds.set(tempId, voter);
    return tempId;
  }

  @call({})
  vote({ tempId, name }: { tempId: string; name: string }) {
    const voter = this.tempIds.get(tempId);
    assert(voter === near.signerAccountId(), "Unauthorized vote attempt");
    assert(this.tempIds.get(tempId, null), "Invalid vote ID");

    const candidate = this.candidates.get(name);
    assert(candidate !== null, "Candidate does not exist");

    candidate.addVote();
    this.candidates.set(name, candidate);

    this.tempIds.remove(tempId);
  }
}
