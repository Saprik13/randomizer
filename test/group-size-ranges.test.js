const test = require("node:test");
const assert = require("node:assert/strict");

const { getGroupSizeRange } = require("../js/app.js");

test("maps every group-size dropdown value to its numeric range", () => {
  assert.deepEqual(getGroupSizeRange("3"), { min: 3, max: 3 });
  assert.deepEqual(getGroupSizeRange("4-6"), { min: 4, max: 6 });
  assert.deepEqual(getGroupSizeRange("7+"), {
    min: 7,
    max: Number.POSITIVE_INFINITY,
  });
});

test("falls back to the default 4–6 range", () => {
  assert.deepEqual(getGroupSizeRange("unexpected"), { min: 4, max: 6 });
});
