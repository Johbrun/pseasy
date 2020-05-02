module.exports = {
    apps : [{
        name: 'pseasy',
        script: 'npm run start -- --port=$PORT',
        watch: '.',
        env: {
            'PORT' : '3000',
            'TEST' : 'DEV',
            'NODE_ENV': 'development',
        },
        env_candidate : {
            'PORT' : '3001',
            'TEST' : 'CANDIDATE',
            'NODE_ENV': 'production'
        },
        env_production : {
            'PORT' : '3002',
            'TEST' : 'PRODUCTION',
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
            'pre-deploy': 'npm install && npm run build && pm2 reload ecosystem.config.js --env production'
        }
    }
};
