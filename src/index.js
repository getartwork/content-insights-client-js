const manageTokens = require('node-tokens');
const request = require('request');

export default class ContentInsightsApi {
  constructor(host, tokenName, tokenConfig, agentConfig) {
    this._name = 'ContentInsights';
    this.host = host;
    this.tokenName = tokenName || 'mint';
    this.agentConfig = agentConfig || {}
    this.tokens = manageTokens({
      'kio': { scope: ['uid'] },
      'mint': { scope: ['uid'] }
    }, tokenConfig);
  }

  get(path) {
    return request({
      url: this.host + path,
      headers: this.getAuthHeaders(this.tokenName),
      agentOptions: this.agentConfig
    }, {headers}).then(response => {
      return response.json().then(json => ({ json, response }));
    });
  }

  getAuthHeaders() {
    var token = this.tokens.get(this.tokenName);

    if (!token) {
      throw Error('Could not get a token for: ' + this.tokenName);
    }
    return {
      'Authorization': 'Bearer ' + token,
      'Accept': 'application/x.zalando.content-article+json',
      'Content-Type': 'application/json'
    };
  }

  search(query, start, end, limit, offset, domain, sort) {
    var parameters = [];

    if (start !== undefined) {
      parameters.push(`start=${encodeURIComponent(start)}`);
    }
    if (end !== undefined) {
      parameters.push(`end=${encodeURIComponent(end)}`);
    }
    if (limit !== undefined) {
      parameters.push(`limit=${encodeURIComponent(limit)}`);
    }
    if (offset !== undefined) {
      parameters.push(`offset=${encodeURIComponent(offset)}`);
    }
    if (domain !== undefined) {
      parameters.push(`domain=${encodeURIComponent(domain)}`);
    }
    if (sort !== undefined) {
      parameters.push(`sort=${encodeURIComponent(sort)}`);
    }
    return this.get(`/api/content-articles-search?q=${encodeURIComponent(query)}&${parameters.join('&')}`);
  }

  timeseries(query, start, end, limit, offset, domain, sort, timeWindow, normalizeEntities) {
    var parameters = [];

    if (start !== undefined) {
      parameters.push(`start=${encodeURIComponent(start)}`);
    }
    if (end !== undefined) {
      parameters.push(`end=${encodeURIComponent(end)}`);
    }
    if (limit !== undefined) {
      parameters.push(`limit=${encodeURIComponent(limit)}`);
    }
    if (offset !== undefined) {
      parameters.push(`offset=${encodeURIComponent(offset)}`);
    }
    if (domain !== undefined) {
      parameters.push(`domain=${encodeURIComponent(domain)}`);
    }
    if (sort !== undefined) {
      parameters.push(`sort=${encodeURIComponent(sort)}`);
    }
    if (timeWindow !== undefined) {
      parameters.push(`window=${encodeURIComponent(timeWindow)}`);
    }
    if (normalizeEntities !== undefined) {
      parameters.push(`normalize_entities=${normalizeEntities}`);
    }
    return this.get(`/api/content-articles-timeseries?q=${encodeURIComponent(query)}&${parameters.join('&')}`);
  }

  article(id) {
    return this.get(`/api/content-articles/${id}`);
  }

}
