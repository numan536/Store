const isProd = process.env.NODE_ENV === 'production';
const CompressionWebpackPlugin = require('compression-webpack-plugin');
//const SitemapPlugin = require('sitemap-webpack-plugin').default;
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// const paths = [
//     {
//         path: '/',
//         lastmod: '2021-11-22',
//         priority: 1.0,
//         changefreq: 'yearly'
//     },
// ];

// production/development In mode ,plugins Add file compression processor
if(isProd){
    new CompressionWebpackPlugin({
        algorithm: 'gzip',
        test: /\.js$|\.css$|\.html$|\.eot?.+$|\.ttf?.+$|\.woff?.+$|\.svg?.+$/,
        threshold: 10240,
        minRatio: 0.8
    })
} 

module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
    ? '/admotors-fe-demo/' 
    : '/',
    devServer: {
        
        // Server
        proxy: 'https://casacar.xyz/admotors'
    },
    css: {
        loaderOptions: {
            sass: {
                sassOptions: {
            
                }
            }
        }
    },
    configureWebpack: {
        // webpack plugins
        plugins: [
            new CompressionWebpackPlugin(),
            // new SitemapPlugin({ base: 'https://casacar.xyz/admotors', paths, options: {
            //     skipgzip: true,
            //     filename: 'sitemap.xml',
            //   } })
            // new BundleAnalyzerPlugin()
            
        ]
    },
    chainWebpack: (config) => {
        // Disable prefetch and preload of async modules for 'app' page
        config.plugins.store.delete('prefetch-app');
        config.plugins.store.delete('preload-app');
        // Use this syntax if not using multipage setup
        config.plugins.store.delete('prefetch');
        config.plugins.store.delete('preload');
        config.module.rule('vue').uses.delete('cache-loader');			
        config.module.rule('js').uses.delete('cache-loader');			
        config.module.rule('ts').uses.delete('cache-loader');			
        config.module.rule('tsx').uses.delete('cache-loader');

        const svgRule = config.module.rule('svg');

        svgRule.uses.clear();

        // config.module
        //     .rule('svg')
        //     .test(/\.svg$/)
        //     .use('html-loader')
        //     .loader('html-loader')
        //     .end()
    },

}