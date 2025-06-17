function fetchChannels() {
  const keyword = document.getElementById('keyword').value.toLowerCase();
  const minSubs = parseInt(document.getElementById('minSubs').value) || 0;
  const maxSubs = parseInt(document.getElementById('maxSubs').value) || Infinity;
  const country = document.getElementById('country').value;

  const sampleData = [
    { name: "Fitness Pro", subs: 120000, country: "US", tags: ["fitness", "workout"] },
    { name: "Code Ninja", subs: 90000, country: "IN", tags: ["coding", "education"] },
    { name: "Epic Gamer", subs: 250000, country: "GB", tags: ["games", "entertainment"] },
    { name: "Yoga Zen", subs: 50000, country: "IN", tags: ["yoga", "lifestyle"] },
    { name: "Marketing Mind", subs: 150000, country: "US", tags: ["marketing", "business"] }
  ];

  const resultsContainer = document.getElementById('results');
  resultsContainer.innerHTML = '';

  const filtered = sampleData.filter(channel => {
    const matchesKeyword = keyword === "" || channel.name.toLowerCase().includes(keyword) || channel.tags.includes(keyword);
    const matchesSubs = channel.subs >= minSubs && channel.subs <= maxSubs;
    const matchesCountry = country === "" || channel.country === country;
    return matchesKeyword && matchesSubs && matchesCountry;
  });

  if (filtered.length === 0) {
    resultsContainer.innerHTML = "<p>No channels found.</p>";
    return;
  }

  filtered.forEach(channel => {
    const div = document.createElement("div");
    div.className = "channel-card";
    div.innerHTML = `<strong>${channel.name}</strong><br>
                     Subscribers: ${channel.subs.toLocaleString()}<br>
                     Country: ${channel.country}<br>
                     Tags: ${channel.tags.join(", ")}`;
    resultsContainer.appendChild(div);
  });
}
