/**
 * Regression test for FIFA 2026 World Cup bracket tree structure.
 * Verifies that the R32→R16→QF→SF→Final mapping matches the official tournament structure.
 */

import { describe, test } from "node:test";
import assert from "node:assert/strict";
import {
  getR32Destination,
  getR16Destination,
  getQFDestination,
  getSFDestination,
  getR16Sources,
  getQFSources,
  getSFSources,
  getMatchHalf,
} from "../src/lib/worldCupBracketTree.ts";

describe("FIFA 2026 World Cup Bracket Tree", () => {
  test("R32 → R16 mapping matches official structure", () => {
    // Top half R32 → R16 (per official FIFA 2026 bracket)
    // M74 (index 1), M77 (index 4) → M89 (R16 index 0)
    assert.deepEqual(getR32Destination(1), { r16Index: 0, half: "top" });
    assert.deepEqual(getR32Destination(4), { r16Index: 0, half: "top" });

    // M73 (index 0), M75 (index 2) → M90 (R16 index 1)
    assert.deepEqual(getR32Destination(0), { r16Index: 1, half: "top" });
    assert.deepEqual(getR32Destination(2), { r16Index: 1, half: "top" });

    // M83 (index 10), M84 (index 11) → M93 (R16 index 4)
    assert.deepEqual(getR32Destination(10), { r16Index: 4, half: "top" });
    assert.deepEqual(getR32Destination(11), { r16Index: 4, half: "top" });

    // M81 (index 8), M82 (index 9) → M94 (R16 index 5)
    assert.deepEqual(getR32Destination(8), { r16Index: 5, half: "top" });
    assert.deepEqual(getR32Destination(9), { r16Index: 5, half: "top" });

    // Bottom half R32 → R16
    // M76 (index 3), M78 (index 5) → M91 (R16 index 2)
    assert.deepEqual(getR32Destination(3), { r16Index: 2, half: "bottom" });
    assert.deepEqual(getR32Destination(5), { r16Index: 2, half: "bottom" });

    // M79 (index 6), M80 (index 7) → M92 (R16 index 3)
    assert.deepEqual(getR32Destination(6), { r16Index: 3, half: "bottom" });
    assert.deepEqual(getR32Destination(7), { r16Index: 3, half: "bottom" });

    // M86 (index 13), M88 (index 15) → M95 (R16 index 6)
    assert.deepEqual(getR32Destination(13), { r16Index: 6, half: "bottom" });
    assert.deepEqual(getR32Destination(15), { r16Index: 6, half: "bottom" });

    // M85 (index 12), M87 (index 14) → M96 (R16 index 7)
    assert.deepEqual(getR32Destination(12), { r16Index: 7, half: "bottom" });
    assert.deepEqual(getR32Destination(14), { r16Index: 7, half: "bottom" });
  });

  test("R16 → QF mapping matches official structure", () => {
    // Top half: M89, M90 → M97 (QF index 0)
    assert.deepEqual(getR16Destination(0), { qfIndex: 0, half: "top" });
    assert.deepEqual(getR16Destination(1), { qfIndex: 0, half: "top" });

    // Top half: M93, M94 → M98 (QF index 1)
    assert.deepEqual(getR16Destination(4), { qfIndex: 1, half: "top" });
    assert.deepEqual(getR16Destination(5), { qfIndex: 1, half: "top" });

    // Bottom half: M91, M92 → M99 (QF index 2)
    assert.deepEqual(getR16Destination(2), { qfIndex: 2, half: "bottom" });
    assert.deepEqual(getR16Destination(3), { qfIndex: 2, half: "bottom" });

    // Bottom half: M95, M96 → M100 (QF index 3)
    assert.deepEqual(getR16Destination(6), { qfIndex: 3, half: "bottom" });
    assert.deepEqual(getR16Destination(7), { qfIndex: 3, half: "bottom" });
  });

  test("QF → SF mapping matches official structure", () => {
    // Top half: M97, M98 → M101 (SF index 0)
    assert.deepEqual(getQFDestination(0), { sfIndex: 0, half: "top" });
    assert.deepEqual(getQFDestination(1), { sfIndex: 0, half: "top" });

    // Bottom half: M99, M100 → M102 (SF index 1)
    assert.deepEqual(getQFDestination(2), { sfIndex: 1, half: "bottom" });
    assert.deepEqual(getQFDestination(3), { sfIndex: 1, half: "bottom" });
  });

  test("SF → Final mapping matches official structure", () => {
    // Both semifinals feed into the Final
    assert.deepEqual(getSFDestination(0), { final: true });
    assert.deepEqual(getSFDestination(1), { final: true });
  });

  test("Reverse lookups: R16 sources", () => {
    // M89 (R16 index 0) gets M74, M77 (R32 indices 1, 4)
    assert.deepEqual(getR16Sources(0).sort(), [1, 4]);

    // M90 (R16 index 1) gets M73, M75 (R32 indices 0, 2)
    assert.deepEqual(getR16Sources(1).sort(), [0, 2]);

    // M91 (R16 index 2) gets M76, M78 (R32 indices 3, 5)
    assert.deepEqual(getR16Sources(2).sort(), [3, 5]);
  });

  test("Reverse lookups: QF sources", () => {
    // M97 (QF index 0) gets M89, M90 (R16 indices 0, 1)
    assert.deepEqual(getQFSources(0).sort(), [0, 1]);

    // M98 (QF index 1) gets M93, M94 (R16 indices 4, 5)
    assert.deepEqual(getQFSources(1).sort(), [4, 5]);
  });

  test("Reverse lookups: SF sources", () => {
    // M101 (SF index 0) gets M97, M98 (QF indices 0, 1)
    assert.deepEqual(getSFSources(0).sort(), [0, 1]);

    // M102 (SF index 1) gets M99, M100 (QF indices 2, 3)
    assert.deepEqual(getSFSources(1).sort(), [2, 3]);
  });

  test("Two-halves structure: top half stays in top, bottom in bottom", () => {
    // Top half R32 matches
    [0, 1, 2, 8, 9, 10, 11].forEach((i) => {
      assert.equal(getMatchHalf("R32", i), "top", `R32[${i}] should be in top half`);
    });

    // Bottom half R32 matches
    [3, 5, 6, 7, 12, 13, 14, 15].forEach((i) => {
      assert.equal(getMatchHalf("R32", i), "bottom", `R32[${i}] should be in bottom half`);
    });

    // Top half R16 matches (indices 0, 1, 4, 5)
    [0, 1, 4, 5].forEach((i) => {
      assert.equal(getMatchHalf("R16", i), "top", `R16[${i}] should be in top half`);
    });

    // Bottom half R16 matches (indices 2, 3, 6, 7)
    [2, 3, 6, 7].forEach((i) => {
      assert.equal(getMatchHalf("R16", i), "bottom", `R16[${i}] should be in bottom half`);
    });

    // QF halves
    assert.equal(getMatchHalf("QF", 0), "top");
    assert.equal(getMatchHalf("QF", 1), "top");
    assert.equal(getMatchHalf("QF", 2), "bottom");
    assert.equal(getMatchHalf("QF", 3), "bottom");

    // SF halves
    assert.equal(getMatchHalf("SF", 0), "top");
    assert.equal(getMatchHalf("SF", 1), "bottom");
  });

  test("All 16 R32 matches have a destination", () => {
    for (let i = 0; i < 16; i++) {
      const dest = getR32Destination(i);
      assert.notEqual(dest, null, `R32[${i}] should have an R16 destination`);
      assert.ok(dest.r16Index >= 0 && dest.r16Index <= 7, "R16 index should be 0-7");
      assert.ok(dest.half === "top" || dest.half === "bottom", "Half should be top or bottom");
    }
  });

  test("All 8 R16 matches have a destination", () => {
    for (let i = 0; i < 8; i++) {
      const dest = getR16Destination(i);
      assert.notEqual(dest, null, `R16[${i}] should have a QF destination`);
      assert.ok(dest.qfIndex >= 0 && dest.qfIndex <= 3, "QF index should be 0-3");
    }
  });

  test("All 4 QF matches have a destination", () => {
    for (let i = 0; i < 4; i++) {
      const dest = getQFDestination(i);
      assert.notEqual(dest, null, `QF[${i}] should have an SF destination`);
      assert.ok(dest.sfIndex >= 0 && dest.sfIndex <= 1, "SF index should be 0-1");
    }
  });

  test("No fabricated matchups: mapping is bijective", () => {
    // Each R16 slot should get exactly 2 R32 sources
    for (let i = 0; i < 8; i++) {
      const sources = getR16Sources(i);
      assert.equal(
        sources.length,
        2,
        `R16[${i}] should get exactly 2 R32 sources, got ${sources.length}`
      );
    }

    // Each QF slot should get exactly 2 R16 sources
    for (let i = 0; i < 4; i++) {
      const sources = getQFSources(i);
      assert.equal(sources.length, 2, `QF[${i}] should get exactly 2 R16 sources`);
    }

    // Each SF slot should get exactly 2 QF sources
    for (let i = 0; i < 2; i++) {
      const sources = getSFSources(i);
      assert.equal(sources.length, 2, `SF[${i}] should get exactly 2 QF sources`);
    }
  });
});
