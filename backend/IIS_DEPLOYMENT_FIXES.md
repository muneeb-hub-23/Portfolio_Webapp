# IIS Deployment Fixes for Portfolio Backend

## Summary
Fixed the Portfolio backend to run properly on IIS by learning from the working HMIS backend configuration.

## Issues Identified and Fixed

### 1. **Missing IIS Environment Variable Detection** ✅
**Problem:** The server was hardcoded to use config values instead of detecting IIS-provided port and host.

**Solution:** Updated `server.js` to prioritize IIS environment variables:
```javascript
const PORT = process.env.PORT || process.env.IISNODE_PORT || config.server.port || 5000;
const HOST = process.env.HOST || process.env.IISNODE_HOST || config.server.host || 'localhost';
```

### 2. **Missing Root Route** ✅
**Problem:** No root (`/`) endpoint which IIS may require for health checks.

**Solution:** Added root route:
```javascript
app.get('/', (req, res) => {
  res.json({
    message: 'Portfolio Backend Server is running!',
    status: 'success',
    port: PORT,
    apiEndpoint: '/api'
  });
});
```

### 3. **No Error Handling** ✅
**Problem:** No graceful startup/shutdown handling or error logging.

**Solution:** Added async startup function and process handlers:
- `startServer()` async function with try-catch
- `SIGINT` and `SIGTERM` handlers for graceful shutdown
- Environment detection logging for debugging

### 4. **Missing IIS Configuration File** ✅
**Problem:** No `iisnode.yml` for fine-tuning IIS Node performance.

**Solution:** Created `iisnode.yml` with:
- Logging enabled
- Process recycling settings
- Request limits (30MB for file uploads)
- Error handling configuration

### 5. **Web.config Enhancements** ✅
**Problem:** Basic web.config without file upload support or proper MIME types.

**Solution:** Enhanced `web.config` with:
- Static file handling for `/uploads` directory
- MIME type for `.webp` images
- Request size limit: 50MB (`maxAllowedContentLength`)
- IIS Node-specific settings inline

## Files Modified

1. **server.js** - Complete rewrite with IIS support
2. **web.config** - Enhanced with upload handling and security
3. **iisnode.yml** - New file for IIS optimization

## Testing the Deployment

### 1. Restart IIS Application Pool
```powershell
# In IIS Manager, recycle the application pool for Portfolio Backend
```

### 2. Check Logs
```
Look in: backend/iisnode/ directory for error logs
```

### 3. Test Endpoints
- Root: `http://your-domain/`
- Health: `http://your-domain/health`
- API Health: `http://your-domain/api/health`
- Any API endpoint: `http://your-domain/api/*`

### 4. Verify IIS Detection
Check console output should show:
```
🌐 Running in IIS/hosted environment
   - PORT source: IISNODE_PORT
   - HOST source: IISNODE_HOST
```

## Key Differences from HMIS Backend

| Feature | HMIS | Portfolio (Before) | Portfolio (After) |
|---------|------|-------------------|-------------------|
| IIS Port Detection | ✅ | ❌ | ✅ |
| Root Route | ✅ | ❌ | ✅ |
| Error Handling | ✅ | ❌ | ✅ |
| iisnode.yml | ❌ | ❌ | ✅ |
| Upload Support | N/A | ❌ | ✅ |
| Graceful Shutdown | ✅ | ❌ | ✅ |

## Additional Notes

- The server now properly detects when running in IIS vs local development
- File uploads up to 50MB are now supported
- All static files in `/uploads` directory are properly served
- Logs are written to `iisnode/` directory for debugging
- The configuration follows IIS best practices learned from the working HMIS backend

## Troubleshooting

If you still encounter errors:

1. **Check Node.js version**: Ensure IIS is using the correct Node.js version
2. **Verify iisnode module**: Ensure iisnode is installed in IIS
3. **Check file permissions**: Ensure IIS application pool identity has read/write access
4. **Review logs**: Check `iisnode/` directory for detailed error messages
5. **Database connection**: Verify MySQL is accessible from IIS with correct credentials in `config/credentials.js`

## Success Indicators

✅ Server starts without errors  
✅ Root endpoint returns JSON response  
✅ API endpoints are accessible  
✅ File uploads work correctly  
✅ No repeated errors in iisnode logs  
✅ Console shows "Running in IIS/hosted environment"
