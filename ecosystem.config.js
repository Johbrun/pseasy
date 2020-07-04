const ENV =
    process.argv.indexOf('--env') === -1
        ? ''
        : '' + process.argv[process.argv.indexOf('--env') + 1];

module.exports = {
    apps: [
        {
            name: `pseasy-${ENV}`,
            script: 'npm run start -- --port=$PORT',
            // will erase confs in .env
            env_qa: {
                PORT: '3000',
                NODE_ENV: 'production',
            },
            env_candidate: {
                PORT: '3001',
                NODE_ENV: 'production',
            },
            env_production: {
                PORT: '3002',
                NODE_ENV: 'production',
            },
        },
    ],
    deploy: {
        qa: {
            user: 'ubuntu',
            host: ['vps-decdc4fd.vps.ovh.net'],
            ssh_options: 'StrictHostKeyChecking=no',
            ref: 'origin/develop',
            repo: 'git@github.com:Johbrun/pseasy.git',
            path: '/opt/pseasy/qa',
            'pre-deploy':
                'git pull && cp .env.qa .env && npm i && npm run build && pm2 reload ecosystem.config.js --env qa',
        },
        candidate: {
            user: 'ubuntu',
            host: ['vps-decdc4fd.vps.ovh.net'],
            ssh_options: 'StrictHostKeyChecking=no',
            ref: 'origin/candidate',
            repo: 'git@github.com:Johbrun/pseasy.git',
            path: '/opt/pseasy/candidate',
            'pre-deploy':
                'git pull && cp .env.candidate .env && npm i && npm run build && pm2 reload ecosystem.config.js --env candidate',
        },
        production: {
            user: 'ubuntu',
            host: ['vps-decdc4fd.vps.ovh.net'],
            ssh_options: 'StrictHostKeyChecking=no',
            ref: 'origin/master',
            repo: 'git@github.com:Johbrun/pseasy.git',
            path: '/opt/pseasy/production',
            'pre-deploy':
                'git pull && cp .env.production .env && npm i && npm run build && pm2 reload ecosystem.config.js --env production',
        },
    },
};
