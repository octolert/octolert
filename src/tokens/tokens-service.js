class TokensService {
  saveToken(options) {
    console.log(`saving token ${options.name} ${options.value}`);
  }

  getToken(options) {
    console.log(`getting token ${options.name} ${options.value}`);
  }
}

module.exports = TokensService;
