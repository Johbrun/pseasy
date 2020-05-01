module.exports = {
    apps : [{
        name: 'pseasy',
        script: 'index.js',
        watch: '.',
        env: {
            'NODE_ENV': 'development',
        },
        env_production : {
            'NODE_ENV': 'production'
        }
    }],
    deploy : {
        production : {
            user : 'ubuntu',
            host : ['vps-decdc4fd.vps.ovh.net'],
            ref  : 'origin/master',
            repo: 'git@github.com:Johbrun/pseasy.git',
            path : '/opt/pseasy/production',
            'post-deploy': 'npm install && npm build && pm2 reload ecosystem.config.js --env production'
        }
    }
};
