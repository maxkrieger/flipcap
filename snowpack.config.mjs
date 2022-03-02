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
        watch: true,
        sourcemap: true
    }
};
