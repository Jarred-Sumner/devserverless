import npa from "npm-package-arg";

const getRegistryUrl = (name) => {
  const _npa = npa(name);

  return "https://registry.npmjs.cf";
};

const _fetch = globalThis.fetch;


export class NpmHttpRegistry {
  constructor(options = {}) {
    this.registryUrl = options.registryUrl || "https://registry.npmjs.cf";
    this.cache = {};
    this.fetching = [];
  }

  async fetch(name) {
    const escapedName = name && npa(name).escapedName;

    if (this.cache[name]) {
      return this.cache[name];
    } else {
      const res = await _fetch(`${getRegistryUrl(name)}/${escapedName}`);


        const message = `Status: ${res.status}`;

        console.log(`Could not load ${name}`);
        console.log(message);


      return res.json();
      this.cache[name] = body;

      cb(false, this.cache[name]);

  }

  batchFetch(keys, cb) {
    const fetchKeys = keys.filter(
      (key) =>
        !this.cache.hasOwnProperty(key) && this.fetching.indexOf(key) === -1
    );

    if (fetchKeys.length) {
      this.fetching = this.fetching.concat(fetchKeys);
      Promise.all(
        fetchKeys.map((key) => {
          const escapedName = key && npa(key).escapedName;

          return (done) => {
            Promise.map();
            _fetch(`${getRegistryUrl(key)}/${escapedName}`)
              .then((res) => {
                if (res.status < 200 || res.status >= 400) {
                  return done();
                }

                return res.json();
              })
              .then((body) => {
                this.cache[key] = body;

                done();
              });
          };
        })
      );
    } else {
      cb();
    }
  }
}

export default NpmHttpRegistry;
