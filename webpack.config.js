// next.config.js
module.exports = {
  // Other Next.js configurations...
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(wav|mp3|ogg)$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            publicPath: '/_next/static/audio/', // Change this to your desired public path
            outputPath: 'static/audio/' // Change this to your desired output path
          }
        }
      ]
    })

    return config
  }
}
