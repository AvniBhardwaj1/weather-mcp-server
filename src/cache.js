// Cache abstraction: in-memory fallback or Redis when REDIS_URL is provided.
const logger = require('./logger');

let redisClient = null;
let useRedis = false;
if (process.env.REDIS_URL) {
  try {
    const IORedis = require('ioredis');
    redisClient = new IORedis(process.env.REDIS_URL);
    useRedis = true;
    redisClient.on('error', (e) => logger.warn('Redis error: %s', e.message));
    logger.info('Using Redis cache from REDIS_URL');
  } catch (err) {
    logger.warn('ioredis not available or failed to connect, falling back to in-memory cache.');
    useRedis = false;
  }
}

const map = new Map();

function makeKey(parts) {
  return parts.join('|');
}

async function get(key) {
  if (useRedis && redisClient) {
    const data = await redisClient.get(key);
    if (!data) return null;
    try { return JSON.parse(data); } catch (e) { return null; }
  }
  const e = map.get(key);
  if (!e) return null;
  if (Date.now() > e.expires) {
    map.delete(key);
    return null;
  }
  return e.value;
}

async function set(key, value, ttlSeconds = 300) {
  if (useRedis && redisClient) {
    await redisClient.set(key, JSON.stringify(value), 'EX', ttlSeconds);
    return;
  }
  const expires = Date.now() + ttlSeconds * 1000;
  map.set(key, { value, expires });
}

async function del(key) {
  if (useRedis && redisClient) { await redisClient.del(key); return; }
  map.delete(key);
}

async function clear() { if (useRedis && redisClient) { await redisClient.flushdb(); return; } map.clear(); }

module.exports = { makeKey, get, set, del, clear };