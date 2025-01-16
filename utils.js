import { trimParamsList } from './constants.js';

export function needsTrimming(url) {
    const domain = new URL(url).hostname.replace('www.', '');
    return trimParamsList.some(d => domain.includes(d));
}

export function processUrl(url) {
    if (needsTrimming(url)) {
        return url.split('?')[0];
    }
    return url;
}

export function createArchiveUrl(url, archiveBaseUrl) {
    const processedUrl = processUrl(url);
    return `${archiveBaseUrl}/${encodeURIComponent(processedUrl)}`;
}