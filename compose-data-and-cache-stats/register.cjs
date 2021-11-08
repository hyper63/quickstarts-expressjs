/**
 * Sets fetch and Request as global function and class
 */
async function m() {
  const nodeFetch = await import('node-fetch')

  globalThis.fetch = nodeFetch.default
  globalThis.Request = nodeFetch.Request

}

m()
