const { test } = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
const path = require('node:path');
const express = require('express');

test('custom pages API validates paths, protects writes and handles CRUD outcomes', async () => {
  let result = [];
  let queries = [];
  let dbError;
  const db = { query: async (...args) => {
    queries.push(args);
    if (dbError) throw dbError;
    return [result];
  } };
  const context = { module: { exports: {} }, Buffer, console, require: (name) => {
    if (name === 'express') return express;
    if (name === '../database/db') return db;
    if (name === '../middleware/auth') return (req, res, next) => req.headers.authorization === 'Bearer test' ? next() : res.sendStatus(401);
    throw new Error(name);
  } };
  vm.runInNewContext(fs.readFileSync(path.join(__dirname, '../routes/customPages.js'), 'utf8'), context);
  const app = express();
  app.use(express.json({ limit: '2mb' }));
  app.use('/pages', context.module.exports);
  const server = app.listen(0, '127.0.0.1');
  await new Promise((resolve) => server.once('listening', resolve));
  const base = `http://127.0.0.1:${server.address().port}/pages`;
  const request = (url, method = 'GET', body, auth = true) => fetch(base + url, {
    method, headers: { 'Content-Type': 'application/json', ...(auth ? { Authorization: 'Bearer test' } : {}) },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });
  const page = { title: 'About', path: '/about', content: '<h1>Hello</h1>' };
  try {
    for (const method of ['GET', 'POST', 'PUT', 'DELETE']) {
      assert.equal((await request(method === 'PUT' || method === 'DELETE' ? '/1' : '/', method, method === 'POST' || method === 'PUT' ? page : undefined, false)).status, 401);
    }
    assert.equal(queries.length, 0);
    for (const invalid of ['/', '/admin/login', '/API/test', '/assets/x', '/uploads/x', '/health', 'https://example.com', '/x?y=1', '/../x', '/a//b']) {
      assert.equal((await request('/', 'POST', { ...page, path: invalid })).status, 400, invalid);
    }
    assert.equal((await request('/', 'POST', { ...page, content: 'x'.repeat(1024 * 1024 + 1) })).status, 400);
    result = { insertId: 7 };
    const created = await request('/', 'POST', { ...page, path: ' Services/Design/ ' });
    assert.equal(created.status, 201);
    assert.equal((await created.json()).path, '/services/design');
    assert.equal(queries.at(-1)[1][1], '/services/design');
    dbError = { code: 'ER_DUP_ENTRY' };
    assert.equal((await request('/', 'POST', page)).status, 409);
    dbError = null;
    result = [page];
    assert.equal((await request('/public?path=/about', 'GET', undefined, false)).status, 200);
    result = [];
    assert.equal((await request('/public?path=/missing', 'GET', undefined, false)).status, 404);
    assert.equal((await request('/1')).status, 404);
    result = { affectedRows: 1 };
    assert.equal((await request('/7', 'PUT', page)).status, 200);
    assert.equal((await request('/7', 'DELETE')).status, 200);
    result = { affectedRows: 0 };
    assert.equal((await request('/7', 'PUT', page)).status, 404);
    assert.equal((await request('/7', 'DELETE')).status, 404);
    assert.equal((await request('/bad', 'DELETE')).status, 400);
  } finally {
    server.closeAllConnections();
    await new Promise((resolve) => server.close(resolve));
  }
});
