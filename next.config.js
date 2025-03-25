module.exports = {
  reactStrictMode: false,
  async rewrites() {
    return [
      {
        source: '/api/pos/:any*',
        destination: 'http://localhost:3000/api/pos/:any',
      },
    ];
  },
};