const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();

  const category = 'all'; // you can change this to 'Music', 'Gaming', etc.
  const url = `https://playboard.co/en/youtube-ranking/${category}`;

  await page.goto(url, { waitUntil: 'networkidle2' });

  const channels = await page.evaluate(() => {
    const channelCards = document.querySelectorAll('.channel-info');

    return Array.from(channelCards).map(card => {
      const name = card.querySelector('.channel-title')?.innerText?.trim();
      const handle = card.querySelector('.channel-title a')?.getAttribute('href');
      const playboardLink = window.location.origin + handle;
      const ytUsername = handle?.split('/').pop();
      const ytURL = `https://youtube.com/${ytUsername ? '@' + ytUsername : ''}`;

      return {
        name,
        channel_url: ytURL,
        category: document.querySelector('.title')?.innerText || 'Unknown',
        playboard_url: playboardLink
      };
    });
  });

  fs.writeFileSync('channels.json', JSON.stringify(channels, null, 2));
  console.log(`✅ Done! Scraped ${channels.length} channels.`);
  await browser.close();
})();
