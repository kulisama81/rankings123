import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  try {
    console.log('Navigating to firstcycling.com...');
    await page.goto('https://firstcycling.com/rankings.php', {
      waitUntil: 'networkidle',
      timeout: 30000
    });

    console.log('Waiting for table...');
    await page.waitForSelector('table', { timeout: 10000 });

    const tableInfo = await page.evaluate(() => {
      const table = document.querySelector('table');
      if (!table) return null;

      return {
        tableClass: table.className,
        tableId: table.id,
        headers: Array.from(table.querySelectorAll('th')).map(th => ({
          text: th.textContent.trim(),
          class: th.className
        })),
        firstRows: Array.from(table.querySelectorAll('tr')).slice(0, 5).map(tr => ({
          html: tr.outerHTML,
          cells: Array.from(tr.querySelectorAll('td, th')).map(cell => ({
            tag: cell.tagName,
            text: cell.textContent.trim(),
            class: cell.className
          }))
        })),
        rowCount: table.querySelectorAll('tr').length
      };
    });

    console.log('\n=== TABLE STRUCTURE ===');
    console.log(JSON.stringify(tableInfo, null, 2));
    console.log('\n=== CURRENT URL ===');
    console.log(page.url());

    const paginationInfo = await page.evaluate(() => {
      const pagination = document.querySelector('.pagination, .pager, [class*="page"]');
      return pagination ? pagination.outerHTML.substring(0, 500) : 'No pagination found';
    });

    console.log('\n=== PAGINATION ===');
    console.log(paginationInfo);

  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await browser.close();
  }
})();
