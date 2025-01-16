function needsTrimming(url) {
    const domain = new URL(url).hostname.replace('www.', '');
    return trimParamsList.some(d => domain.includes(d));
}

function processUrl(url) {
    if (needsTrimming(url)) {
        return url.split('?')[0];
    }
    return url;
}

chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: MENU_ID,
        title: MENU_TITLE,
        contexts: ["page", "link"]
    });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === MENU_ID) {
        const targetUrl = info.linkUrl || info.pageUrl;
        const processedUrl = processUrl(targetUrl);
        const archiveUrl = `${ARCHIVE_URL}/submit/?url=${encodeURIComponent(processedUrl)}`;
        chrome.tabs.create({ url: archiveUrl });
    }
});

const ARCHIVE_URL = 'https://archive.md';
const MENU_ID = 'archivePage';
const MENU_TITLE = 'Open in Archive.today';

const trimParamsList = [
    // Major US News
    'nytimes.com',
    'washingtonpost.com',
    'wsj.com',
    'bloomberg.com',
    'cnn.com',
    'nbcnews.com',
    'cnbc.com',
    'foxnews.com',
    'usatoday.com',
    'latimes.com',
    'nypost.com',
    'politico.com',
    'thehill.com',
    'axios.com',

    // Business/Tech News
    'businessinsider.com',
    'forbes.com',
    'fortune.com',
    'marketwatch.com',
    'fool.com',
    'benzinga.com',
    'techcrunch.com',
    'theverge.com',
    'engadget.com',
    'venturebeat.com',
    'zdnet.com',
    'cnet.com',

    // International News
    'reuters.com',
    'apnews.com',
    'bbc.com',
    'theguardian.com',
    'independent.co.uk',
    'telegraph.co.uk',
    'aljazeera.com',
    'dw.com',
    'france24.com',
    'abc.net.au',
    'channelnewsasia.com',
    'straitstimes.com',

    // News Aggregators
    'news.google.com',
    'news.yahoo.com',
    'msn.com/news',
    'theweek.com',

    // Magazines
    'newyorker.com',
    'theatlantic.com',
    'time.com',
    'economist.com',
    'wired.com',
    'vice.com',
    'slate.com',
    'vox.com',
    'motherjones.com',
    'newrepublic.com',
    'thedailybeast.com'
];