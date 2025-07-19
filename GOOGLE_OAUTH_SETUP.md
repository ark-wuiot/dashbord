# 🔐 Google OAuth Setup Guide

## **Issue: Unauthorized Domain Error**

```
FirebaseError: Firebase: Error (auth/unauthorized-domain)
The current domain is not authorized for OAuth operations
```

### **🔍 Understanding the Problem**

Your domain `app.ark-wuiot.com` is not authorized for Google OAuth operations in Firebase. This prevents Google sign-in from working.

---

## **✅ Step-by-Step Fix**

### **Step 1: Add Domain to Firebase Console**

1. **Go to Firebase Console**
   - Visit: https://console.firebase.google.com
   - Select your project: `ark-wuiot`

2. **Navigate to Authentication**
   - Click "Authentication" in left sidebar
   - Click "Settings" tab

3. **Add Authorized Domain**
   - Scroll to "Authorized domains" section
   - Click "Add domain"
   - Enter: `app.ark-wuiot.com`
   - Click "Add"

4. **Verify Domain**
   - The domain should appear in the list
   - Status should show as "Verified" or "Pending verification"

### **Step 2: Alternative Domains to Add**

If you're testing locally, also add these domains:

```
localhost
127.0.0.1
localhost:5173
localhost:3000
```

### **Step 3: Enable Google Provider**

1. **Go to Sign-in Method**
   - In Authentication → Sign-in method tab
   - Click "Google" provider

2. **Enable Google Sign-in**
   - Toggle "Enable" to ON
   - Add your support email
   - Click "Save"

### **Step 4: Configure OAuth Consent Screen**

1. **Go to Google Cloud Console**
   - Visit: https://console.cloud.google.com
   - Select your project: `ark-wuiot`

2. **Navigate to OAuth Consent Screen**
   - Go to "APIs & Services" → "OAuth consent screen"
   - Configure your app information

3. **Add Authorized Domains**
   - In "Authorized domains" section
   - Add: `ark-wuiot.com`
   - Add: `app.ark-wuiot.com`

---

## **🔧 Development vs Production**

### **Development Environment**

For local development, add these domains:

```
localhost
127.0.0.1
localhost:5173
localhost:3000
```

### **Production Environment**

For production, add your actual domains:

```
ark-wuiot.com
app.ark-wuiot.com
www.ark-wuiot.com
```

---

## **🚀 Testing the Fix**

### **1. Clear Browser Cache**
```bash
# Hard refresh your browser
Ctrl+Shift+R (Windows)
Cmd+Shift+R (Mac)
```

### **2. Test Google Login**
- Try Google sign-in again
- Should work without unauthorized domain error

### **3. Check Console**
- No more `auth/unauthorized-domain` errors
- Google OAuth should work smoothly

---

## **🔄 Alternative Solutions**

### **Option 1: Use Localhost for Development**

If you're developing locally, use:

```bash
npm run dev
# Access via: http://localhost:5173
```

### **Option 2: Use Firebase Hosting**

Deploy to Firebase Hosting for testing:

```bash
npm run build
firebase deploy
```

### **Option 3: Custom Domain Setup**

If using a custom domain:

1. **Verify Domain Ownership**
   - Add TXT record to DNS
   - Verify in Firebase Console

2. **Configure SSL Certificate**
   - Ensure HTTPS is enabled
   - Google OAuth requires HTTPS

---

## **📋 Verification Checklist**

- [ ] Domain added to Firebase Authentication → Settings → Authorized domains
- [ ] Google provider enabled in Authentication → Sign-in method
- [ ] OAuth consent screen configured in Google Cloud Console
- [ ] Domain verified in Google Cloud Console
- [ ] Browser cache cleared
- [ ] HTTPS enabled (for production)
- [ ] No unauthorized domain errors in console

---

## **🎯 Expected Results**

After completing the setup:

1. **Google Login Works** - No unauthorized domain errors
2. **Popup Method** - `signInWithPopup` works correctly
3. **Redirect Method** - `signInWithRedirect` works as fallback
4. **Smooth Authentication** - No delays or errors

---

## **🆘 Troubleshooting**

### **Still Getting Unauthorized Domain Error?**

1. **Check Domain Format**
   - Ensure no typos: `app.ark-wuiot.com`
   - Don't include protocol: `https://` or `http://`

2. **Wait for Propagation**
   - DNS changes can take up to 24 hours
   - Firebase changes are usually immediate

3. **Check Multiple Browsers**
   - Test in Chrome, Firefox, Safari
   - Clear cache in all browsers

4. **Verify Project Configuration**
   - Ensure you're using the correct Firebase project
   - Check environment variables

### **Common Issues**

1. **Wrong Project**
   - Ensure you're in the correct Firebase project
   - Check project ID in your config

2. **Cached Configuration**
   - Clear browser cache completely
   - Restart development server

3. **DNS Issues**
   - Verify domain resolves correctly
   - Check DNS propagation

---

## **💡 Pro Tips**

- **Use Environment Variables** for different domains
- **Test in Incognito Mode** to avoid cache issues
- **Monitor Firebase Console Logs** for detailed errors
- **Set Up Multiple Environments** (dev, staging, prod)

---

## **🔗 Useful Links**

- [Firebase Authentication Documentation](https://firebase.google.com/docs/auth)
- [Google OAuth Setup Guide](https://developers.google.com/identity/protocols/oauth2)
- [Firebase Console](https://console.firebase.google.com)
- [Google Cloud Console](https://console.cloud.google.com)

---

**🎉 Once configured, Google OAuth will work perfectly!** 