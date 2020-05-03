module.exports = {
    apps : [{
        name: 'pseasy',
        script: 'npm run start -- --port=$PORT',
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
            'ssh_options': 'StrictHostKeyChecking=no',
            ref  : 'origin/master',
            repo: 'git@github.com:Johbrun/pseasy.git',
            path : '/opt/pseasy/production',
            'pre-deploy': './install.sh'
        }
    }
};