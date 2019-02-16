const surroundedByBraces = /{([^}]+)}/g;

function serializeQueryString(params) {
  if (!params) {
    return '';
  }

  const string = Object.entries(params)
    .map(([key, value]) => `${encodeURIComponent(key)}=${value}`)
    .join('&');

  return `?${string}`;
}

/** replace route params with given values */
function replaceParams(route, values) {
  // route params are surrounded by {curly braces}
  const parts = route.split(surroundedByBraces);

  return parts.map((param) => {
    const value = values[param];

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

/** Class to be extended by app URLs. */
export default class BaseURL {
  /**
   * Create a URL.
   * @param {object} input - Input URL param values.
   * @param {string} pathtemplate - What the browser URL looks like, with route params surrounded by curly braces
   * @param {object} param - Param names and corresponding types
   */
  constructor(input = {}, pathtemplate, params) {
    this.input = input;
    this.pathtemplate = pathtemplate;
    this.params = params;
    this.pathParams = this.getRouteParams();
    this.queryParams = this.getQueryParams();
  }

  getRouteParams() {
    const pathParams = this.pathtemplate.split(surroundedByBraces);
    const routeEntries = Object.entries(this.input)
      .filter(([key, value]) => pathParams.includes(key));

    return fromEntries(routeEntries);
  }

  getQueryParams() {
    const queryEntries = Object.entries(this.input)
      .filter(([key, value]) => this.params[key] && !this.pathParams[key]);

    return fromEntries(queryEntries);
  }

  serialize() {
    const string = serializeQueryString(this.queryParams);
    const pathtemplate = replaceParams(this.pathtemplate, this.input);
    return `${pathtemplate}${string}`;
  }

  static deserialize(input) {
    return new URL(input);
  }
}
