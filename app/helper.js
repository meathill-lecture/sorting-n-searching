/**
 * Created by meathill on 2017/7/18.
 */

export function getSearchParams(search) {
  let query = {};
  if (search) {
    search = search.substr(1);
    search = search.split('&');
    for (let i = 0, len = search.length; i < len; i++) {
      let kv = search[i].split('=');
      if (!isNaN(kv[1])) {
        kv[1] = Number(kv[1]);
      }
      if (/^true|false$/i.test(kv[1])) {
        kv[1] = Boolean(kv[1]);
      }
      query[kv[0]] = kv[1];
    }
  }
  return query;
}

function loadCSS(url) {
  let link = document.createElement( 'link' );
  link.rel = 'stylesheet';
  link.type = 'text/css';
  link.href = url;
  document.head.appendChild( link );
  return new Promise((resolve, reject) => {
    link.onload = resolve;
    link.onerror = reject;
  });
}

export function load(url) {
  if (/\.css$/.test(url)) {
    return loadCSS(url);
  }
}