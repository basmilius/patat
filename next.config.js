const {createHash} = require("crypto");
const generateName = require("css-class-generator");

const names = {};

const sha1 = str => {
    const shasum = createHash("sha1");
    shasum.update(str);

    return shasum.digest("hex").substring(0, 7);
};

const getLocalIdent = ({rootContext, resourcePath}, _, name) => {
    const key = sha1(`${rootContext}//${resourcePath}//${name}`);

    if (key in names) {
        return names[key];
    }

    return names[key] = generateName(parseInt(key, 16));
};

module.exports = () => ({
    poweredByHeader: false,
    reactStrictMode: true,

    pageExtensions: ["js", "jsx", "ts", "tsx", "mdx"],

    swcMinify: true,

    experimental: {
        cpus: 4,
        esmExternals: false,
        swcLoader: true,
        workerThreads: true
    },

    webpack: (config) => {
        config.module.rules[2].oneOf.forEach(moduleLoader => {
            Array.isArray(moduleLoader.use) && moduleLoader.use.forEach(l => {
                if (!l.loader) {
                    return;
                }

                if (typeof l.loader !== "string") {
                    throw new Error("Loader is not a string.")
                }

                if (l.loader.indexOf("css-loader") > -1 && l.loader.indexOf("postcss-loader") === -1) {
                    if (!l.options.modules) {
                        return;
                    }

                    const {getLocalIdent: _, ...others} = l.options.modules;

                    l.options = {
                        ...l.options,
                        modules: {
                            ...others,
                            getLocalIdent
                        }
                    };
                }
            });
        });

        return config;
    }
});
