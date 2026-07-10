const assert = require("node:assert/strict");
const path = require("node:path");
const test = require("node:test");

const { seedPlayersSerpentine } = require(
  path.join(__dirname, "..", "js", "app.js"),
);

function players(count) {
  return Array.from({ length: count }, (_, index) => ({
    name: `Player ${index + 1}`,
    rating: count - index,
  }));
}

function ranks(groups) {
  return groups.map((group) => group.map(({ name }) => Number(name.slice(7))));
}

test("uses deterministic serpentine seeding for equal groups", () => {
  assert.deepEqual(ranks(seedPlayersSerpentine(players(6), 2)), [
    [1, 4, 5],
    [2, 3, 6],
  ]);
});

test("puts the highest-rated player in group 1", () => {
  const input = players(8).reverse();
  const groups = seedPlayersSerpentine(input, 3);

  assert.equal(groups[0][0].name, "Player 1");
  assert.equal(groups[0][0].rating, 8);
});

test("makes group 1 larger than group 2 for an odd two-group field", () => {
  const groups = seedPlayersSerpentine(players(7), 2);

  assert.deepEqual(groups.map(({ length }) => length), [4, 3]);
  assert.deepEqual(ranks(groups), [
    [1, 4, 5, 7],
    [2, 3, 6],
  ]);
});

test("keeps all group sizes within one and group 1 larger than group 2", () => {
  const input = players(8);
  const groups = seedPlayersSerpentine(input, 3);
  const sizes = groups.map(({ length }) => length);

  assert.deepEqual(sizes, [3, 2, 3]);
  assert.equal(Math.max(...sizes) - Math.min(...sizes), 1);
  assert.deepEqual(
    groups.flat().map(({ name }) => name).sort(),
    input.map(({ name }) => name).sort(),
  );
});

test("preserves input order when ratings are tied", () => {
  const input = [
    { name: "First", rating: 100 },
    { name: "Second", rating: 100 },
    { name: "Third", rating: 90 },
  ];

  assert.equal(seedPlayersSerpentine(input, 2)[0][0].name, "First");
});

test("maintains the distribution guarantees across field sizes", () => {
  for (let playerCount = 2; playerCount <= 50; playerCount++) {
    for (let groupCount = 2; groupCount <= playerCount; groupCount++) {
      const groups = seedPlayersSerpentine(players(playerCount), groupCount);
      const sizes = groups.map(({ length }) => length);

      assert.equal(groups[0][0].rating, playerCount);
      assert.ok(Math.max(...sizes) - Math.min(...sizes) <= 1);
      assert.equal(groups.flat().length, playerCount);
      if (playerCount % groupCount !== 0) {
        assert.equal(sizes[0], sizes[1] + 1);
      }
    }
  }
});
