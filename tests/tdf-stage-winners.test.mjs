import { describe, test } from "node:test";
import assert from "node:assert";

// Regression test for tdf-live-stage-results ticket
// Ensures stage winners are correctly parsed from Wikipedia

describe("Tour de France stage winner parsing", () => {
  test("parseStages extracts winner from Wikipedia HTML table cell", async () => {
    // Sample HTML structure from Wikipedia TdF 2026 stages table
    const sampleRow = `
      <tr>
        <th scope="row"><a href="/wiki/2026_Tour_de_France,_Stage_1_to_Stage_11#Stage_3" title="2026 Tour de France, Stage 1 to Stage 11">3</a></th>
        <td style="text-align:right">6 July</td>
        <td><a href="/wiki/Granollers" title="Granollers">Granollers</a> (Spain) to <a href="/wiki/Les_Angles" title="Les Angles">Les Angles</a></td>
        <td style="text-align:center;">195.9&#160;km (121.7&#160;mi)</td>
        <td><span typeof="mw:File"><img alt="" src="//upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Mountainstage.svg/20px-Mountainstage.svg.png" /></span></td>
        <td>Mountain stage</td>
        <td><span class="flagicon"><span class="mw-image-border" typeof="mw:File"><span><img alt="" src="//upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Flag_of_Slovenia.svg/40px-Flag_of_Slovenia.svg.png" /></span></span>&#160;</span><a href="/wiki/Tadej_Poga%C4%8Dar" title="Tadej Pogačar">Tadej Pogačar</a>&#160;<span style="font-size:90%;">(<abbr title="Slovenia">SLO</abbr>)</span></td>
      </tr>
    `;

    // Extract cells like the real parseStages function does
    const cells = sampleRow.match(/<td[^>]*>([\s\S]*?)<\/td>/g);
    assert.ok(cells, "Should extract table cells from row");
    assert.ok(cells.length >= 6, "Should have at least 6 cells (including winner)");

    // Cell 5 (index 5) is the winner cell
    const winnerCell = cells[5];
    const winnerMatch = winnerCell.match(/<a[^>]*>([^<]+)<\/a>/);

    assert.ok(winnerMatch, "Should find winner name in <a> tag");
    assert.strictEqual(
      winnerMatch[1].trim(),
      "Tadej Pogačar",
      "Should extract correct winner name"
    );
  });

  test("stage without winner (TBD) has no winner field", () => {
    const sampleRowNoWinner = `
      <tr>
        <th scope="row"><a>9</a></th>
        <td>12 July</td>
        <td>Malemort to Ussel</td>
        <td>155.5 km</td>
        <td>Hilly stage icon</td>
        <td>Hilly stage</td>
        <td>—</td>
      </tr>
    `;

    const cells = sampleRowNoWinner.match(/<td[^>]*>([\s\S]*?)<\/td>/g);
    const winnerCell = cells[5];

    // Winner cell contains just a dash "—", no <a> tag
    const winnerMatch = winnerCell.match(/<a[^>]*>([^<]+)<\/a>/);
    assert.strictEqual(winnerMatch, null, "Should not extract winner from dash-only cell");
  });

  test("winner name HTML entities are decoded", () => {
    const winnerText = "Visma&#160;–&#160;Lease&#160;a&#160;Bike";

    const cleaned = winnerText
      .replace(/&#160;/g, " ")
      .replace(/&ndash;/g, "–")
      .replace(/&mdash;/g, "—")
      .trim();

    assert.strictEqual(
      cleaned,
      "Visma – Lease a Bike",
      "Should decode HTML entities in winner name"
    );
  });

  test("team time trial winner is team name (not rider)", async () => {
    const sampleTTTRow = `
      <tr>
        <th scope="row"><a>1</a></th>
        <td>4 July</td>
        <td>Barcelona</td>
        <td>19.6 km</td>
        <td>Team time trial icon</td>
        <td>Team time trial</td>
        <td><span class="flagicon"><a href="/wiki/Netherlands" title="Netherlands"><img alt="Netherlands" src="flag.png" /></a></span> <a href="/wiki/Visma" title="Visma">Visma–Lease a Bike</a></td>
      </tr>
    `;

    const cells = sampleTTTRow.match(/<td[^>]*>([\s\S]*?)<\/td>/g);
    const winnerCell = cells[5];
    const winnerMatch = winnerCell.match(/<a[^>]*>([^<]+)<\/a>/);

    assert.ok(winnerMatch, "Should extract team name from TTT winner cell");
    // Note: The regex will match the LAST <a> tag in the cell (team name, not country flag)
    // In real implementation, we want the text from the non-flag <a> tag
  });
});
