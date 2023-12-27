module.exports = {
  apps : [{
    script: 'yarn dev',
  }],

  deploy : {
    production : {
      user : 'root',
      host : '34.28.50.170',
      ref  : 'origin/main',
      repo : 'git@github.com:Cosmos-TechHub/oraichain-dao.git',
      path : '/home/root',
      'pre-deploy-local': '',
      'post-deploy' : 'source ~/.nvm/nvm.sh && yarn && yarn build && pm2 reload ecosystem.config.js --env production',
      'pre-setup': '',
      'ssh_options': 'ForwardAgent=yes'
    }
  }
};
