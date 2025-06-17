const axios = require('axios');
const cheerio = require('cheerio');

async function scrapeNoxinfluencer(keyword, minSubs, maxSubs, countryCode = 'us', maxPages = 5) {
  const results = [];

  for (let page = 1; page <= maxPages; page++) {
    const url = `https://www.noxinfluencer.com/youtube-channel-ranking/top-100-${keyword}-all-${countryCode}-sorted-by-subs-weekly?page=${page}`;
    console.log(`Fetching: ${url}`);

    const res = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0',
      },
    });

    const $ = cheerio.load(res.data);

    $('.table-row').each((i, el) => {
      const channelName = $(el).find('.info-box .name').text().trim();
      const channelUrl = 'https://www.noxinfluencer.com' + $(el).find('.info-box a').attr('href');
      const subsText = $(el).find('.subscriber-num').text().replace(/[^\d]/g, '');
      const subscribers = parseInt(subsText, 10);

      if (subscribers >= minSubs && subscribers <= maxSubs) {
        results.push({
          name: channelName,
          url: channelUrl,
          subscribers,
        });
      }
    });

    // Stop if no rows found (end of results)
    if ($('.table-row').length === 0) break;
  }

  return results;
}

// Example test run (can remove later)
scrapeNoxinfluencer('fitness', 10000, 100000, 'us', 5).then(data => {
  console.log(data);
});
