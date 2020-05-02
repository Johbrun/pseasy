module.exports = {
    apps : [{
        name: 'pseasy',
        script: 'npm run start',
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
            'ssh_options': "StrictHostKeyChecking=no",
            ref  : 'origin/cicd',
            repo: 'git@github.com:Johbrun/pseasy.git',
            path : '/opt/pseasy/production',
            'pre-deploy': 'npm install && npm run build && pm2 reload ecosystem.config.js --env production'
        }
    }
};
