/* eslint-disable no-unused-expressions */
import { fixture, assert } from "@open-wc/testing";

import "../client-table-filter-component.js";

describe("Suite cases", () => {
  it("Case default", async () => {
    const _element = await fixture("<client-table-filter-component></client-table-filter-component>");
    assert.strictEqual(_element.hello, 'Hello World!');
  });
});
