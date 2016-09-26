const manageTokens = require('node-tokens');
const request = require('request-promise-native');

export default class ContentInsightsApi {
  constructor(host, tokenName, tokenConfig, agentConfig) {
    this._name = 'ContentInsights';
    this.host = host;
    this.tokenName = tokenName || 'mint';
    this.agentConfig = agentConfig || {};
    this.tokens = manageTokens({
      'kio': { scope: ['uid'] },
      'mint': { scope: ['uid'] }
    }, tokenConfig);
  }

  get(path, parameters) {
    return request({
      uri: this.host + path,
      qs: parameters,
      headers: this.getAuthHeaders(this.tokenName),
      agentOptions: this.agentConfig,
      resolveWithFullResponse: true,
      simple: false
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

  search(query, start, end, limit, offset, domain, sort, normalizeEntities) {
    var parameters = { q: query };

    if (start !== undefined) {
      parameters.start = start;
    }
    if (end !== undefined) {
      parameters.end = end;
    }
    if (limit !== undefined) {
      parameters.limit = limit;
    }
    if (offset !== undefined) {
      parameters.offset = offset;
    }
    if (domain !== undefined) {
      parameters.domain = domain;
    }
    if (sort !== undefined) {
      parameters.sort = sort;
    }
    if (normalizeEntities !== undefined) {
      parameters['normalize_entities'] = normalizeEntities;
    }
    return this.get('/api/content-articles-search', parameters);
  }

  timeseries(query, start, end, limit, offset, domain, sort, timeWindow, normalizeEntities) {
    var parameters = { q: query };

    if (start !== undefined) {
      parameters.start = start;
    }
    if (end !== undefined) {
      parameters.end = end;
    }
    if (limit !== undefined) {
      parameters.limit = limit;
    }
    if (offset !== undefined) {
      parameters.offset = offset;
    }
    if (domain !== undefined) {
      parameters.domain = domain;
    }
    if (sort !== undefined) {
      parameters.sort = sort;
    }
    if (timeWindow !== undefined) {
      parameters.window = timeWindow;
    }
    if (normalizeEntities !== undefined) {
      parameters['normalize_entities'] = normalizeEntities;
    }
    return this.get('/api/content-articles-timeseries', parameters);
  }

  article(id, normalizeEntities) {
    var parameters = {};

    if (normalizeEntities !== undefined) {
      parameters['normalize_entities'] = normalizeEntities;
    }
    return this.get(`/api/content-articles/${id}`);
  }

}
