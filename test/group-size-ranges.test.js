const test = require("node:test");
const assert = require("node:assert/strict");

const { getGroupSizeRange } = require("../js/app.js");

test("maps every group-size dropdown value to its numeric range", () => {
  assert.deepEqual(getGroupSizeRange("3"), { min: 3, max: 3 });
  assert.deepEqual(getGroupSizeRange("4-6"), { min: 4, max: 6 });
  assert.deepEqual(getGroupSizeRange("7-8"), { min: 7, max: 8 });
  assert.deepEqual(getGroupSizeRange("9-11"), { min: 9, max: 11 });
  assert.deepEqual(getGroupSizeRange("12+"), {
    min: 12,
    max: Number.POSITIVE_INFINITY,
  });
});

test("falls back to the default 4–6 range", () => {
  assert.deepEqual(getGroupSizeRange("unexpected"), { min: 4, max: 6 });
});
