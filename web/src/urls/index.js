function serializeQueryString(params) {
  if (!params) {
    return '';
  }

  const string = Object.entries(params)
    .map(([key, value]) => `${encodeURIComponent(key)}=${value}`)
    .join('&');

  return `?${string}`;
}

function replaceParams(input, params) {
  const parts = input.split(/{([^}]+)}/g);
  return parts.map((param) => {
    const value = params[param];

    if (value) {
      return value;
    }

    return param;
  }).join('');
}

function fromEntries(entries) {
  return entries.reduce((result, [key, value]) => ({
    [key]: value,
  }), {});
}

export default class AppUrl {
  constructor(input = {}, route, params) {
    this.input = input;
    this.route = route;
    this.params = params;
    this.routeParams = this.getRouteParams();
    this.queryParams = this.getQueryParams();
  }

  getRouteParams() {
    const routeParams = this.route.split(/{([^}]+)}/g);
    const routeEntries = Object.entries(this.input)
      .filter(([key, value]) => routeParams.includes(key));

    return fromEntries(routeEntries);
  }

  getQueryParams() {
    const queryEntries = Object.entries(this.input)
      .filter(([key, value]) => this.params[key] && !this.routeParams[key]);

    return fromEntries(queryEntries);
  }

  serialize() {
    const string = serializeQueryString(this.queryParams);
    const route = replaceParams(this.route, this.input);
    return `${route}${string}`;
  }

  static deserialize(input) {
    return new URL(input);
  }
}
