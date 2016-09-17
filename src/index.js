const manageTokens = require('node-tokens');
const fetch = require('node-fetch');

export default class ContentInsightsApi {
  constructor(host) {
    this._name = 'ContentInsights';
    this.host = host;
    this.tokenName = 'content-insights-api-token';
    this.tokens = manageTokens({
      'content_insights_service.read': { scope: ['uid'] }
    }, {
      credentialsDir: process.env.CREDENTIALS_DIR || '.',
      oauthTokeninfoUrl: 'https://info.services.auth.zalando.com/oauth2/tokeninfo?access_token=',
      oauthTokenUrl: 'https://token.services.auth.zalando.com/oauth2/access_token?realm=/services'
    });
  }

  get(path) {
    var headers = this.getAuthHeaders(this.tokenName);

    return fetch(this.host + path, {headers}).then(response => {
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
      'Content-Type': 'application/json',
      'X-Tenant-Id': 'Dougal'
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
