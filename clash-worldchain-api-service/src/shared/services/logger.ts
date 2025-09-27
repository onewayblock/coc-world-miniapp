import path from 'path'
import pino from 'pino'
import pretty from 'pino-pretty'

import {LOG_LEVEL, LOG_PRETTY} from '../../config/env'

const isPm2 = !!process.env.PM2_HOME || !!process.env.PM2

const pm2AppName = process.env.name || 'app'

const pm2Home = process.env.PM2_HOME
const home = process.env.HOME

let pm2LogsDir: string | undefined

if (pm2Home) {
    pm2LogsDir = path.join(pm2Home, 'logs')
} else if (home) {
    pm2LogsDir = path.join(home, '.pm2/logs')
}

let stream

if (LOG_PRETTY && !isPm2) {
    console.log('setup pino pretty logging')
    stream = pretty({sync: false})
}

if (isPm2 && pm2LogsDir) {
    console.log(
        `setup pino logging for pm2 environment...\nname: ${pm2AppName}\nlogsDir: ${pm2LogsDir}`
    )

    const pm2LogPath = path.join(pm2LogsDir, `${pm2AppName}-out.log`)

    console.log(`pm2 out log path: ${pm2LogPath}`)

    stream = pino.destination(pm2LogPath)
}

export const logger = pino(
    {
        level: LOG_LEVEL,
        timestamp: pino.stdTimeFunctions.isoTime,
    },
    stream || process.stdout
)
