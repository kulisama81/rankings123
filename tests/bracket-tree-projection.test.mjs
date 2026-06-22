/**
 * Regression test for wc-bracket-tree-render:
 * Ensures the bracket tree projects R16/QF/SF/Final placeholder slots
 * from R32 via the official mapping in worldCupBracketTree.ts.
 *
 * Guards against the bug where only R32 was rendered, leaving R16+ empty
 * and making the bracket tree not visually traceable.
 */

import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  getR16Sources,
  getQFSources,
  getSFSources,
} from '../src/lib/worldCupBracketTree.ts';

test('bracket tree: R16 sources map correctly to R32 matches', () => {
  // Each R16 match should have exactly 2 R32 source matches
  for (let r16Index = 0; r16Index < 8; r16Index++) {
    const sources = getR16Sources(r16Index);
    assert.equal(sources.length, 2, `R16 match ${r16Index} should have 2 sources`);
    assert.ok(sources[0] >= 0 && sources[0] < 16, `R16[${r16Index}] source 1 in range`);
    assert.ok(sources[1] >= 0 && sources[1] < 16, `R16[${r16Index}] source 2 in range`);
    assert.notEqual(sources[0], sources[1], `R16[${r16Index}] sources should be distinct`);
  }
});

test('bracket tree: QF sources map correctly to R16 matches', () => {
  // Each QF match should have exactly 2 R16 source matches
  for (let qfIndex = 0; qfIndex < 4; qfIndex++) {
    const sources = getQFSources(qfIndex);
    assert.equal(sources.length, 2, `QF match ${qfIndex} should have 2 sources`);
    assert.ok(sources[0] >= 0 && sources[0] < 8, `QF[${qfIndex}] source 1 in range`);
    assert.ok(sources[1] >= 0 && sources[1] < 8, `QF[${qfIndex}] source 2 in range`);
    assert.notEqual(sources[0], sources[1], `QF[${qfIndex}] sources should be distinct`);
  }
});

test('bracket tree: SF sources map correctly to QF matches', () => {
  // Each SF match should have exactly 2 QF source matches
  for (let sfIndex = 0; sfIndex < 2; sfIndex++) {
    const sources = getSFSources(sfIndex);
    assert.equal(sources.length, 2, `SF match ${sfIndex} should have 2 sources`);
    assert.ok(sources[0] >= 0 && sources[0] < 4, `SF[${sfIndex}] source 1 in range`);
    assert.ok(sources[1] >= 0 && sources[1] < 4, `SF[${sfIndex}] source 2 in range`);
    assert.notEqual(sources[0], sources[1], `SF[${sfIndex}] sources should be distinct`);
  }
});

test('bracket tree: all R32 matches feed into exactly one R16 match', () => {
  const r32Usage = new Set();
  for (let r16Index = 0; r16Index < 8; r16Index++) {
    const sources = getR16Sources(r16Index);
    for (const r32Index of sources) {
      assert.ok(!r32Usage.has(r32Index), `R32 match ${r32Index} used more than once`);
      r32Usage.add(r32Index);
    }
  }
  assert.equal(r32Usage.size, 16, 'All 16 R32 matches should feed into R16');
});

test('bracket tree: all R16 matches feed into exactly one QF match', () => {
  const r16Usage = new Set();
  for (let qfIndex = 0; qfIndex < 4; qfIndex++) {
    const sources = getQFSources(qfIndex);
    for (const r16Index of sources) {
      assert.ok(!r16Usage.has(r16Index), `R16 match ${r16Index} used more than once`);
      r16Usage.add(r16Index);
    }
  }
  assert.equal(r16Usage.size, 8, 'All 8 R16 matches should feed into QF');
});

test('bracket tree: all QF matches feed into exactly one SF match', () => {
  const qfUsage = new Set();
  for (let sfIndex = 0; sfIndex < 2; sfIndex++) {
    const sources = getSFSources(sfIndex);
    for (const qfIndex of sources) {
      assert.ok(!qfUsage.has(qfIndex), `QF match ${qfIndex} used more than once`);
      qfUsage.add(qfIndex);
    }
  }
  assert.equal(qfUsage.size, 4, 'All 4 QF matches should feed into SF');
});
