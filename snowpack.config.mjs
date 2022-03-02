/** @type {import("snowpack").SnowpackUserConfig } */
export default {
    plugins: [
        "@snowpack/plugin-typescript"
        // [
        //     "snowpack-plugin-copy"
        // ]
    ],
    mount: {
        src: "/",
    },
    buildOptions: {
        sourcemap: "inline",
        jsxInject: "import React from 'react';"
    },
    optimize: {
        bundle: true,
        minify: true,
        target: 'es2018',
    },
};
