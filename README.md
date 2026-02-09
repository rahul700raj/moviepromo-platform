# MoviePromo - Director's Movie Promotion Platform 🎬

Complete platform for directors to promote their movies with digital & organic marketing tools.

## ✨ Features

### 🎯 Core Features
- **User Authentication** - Register/Login with 3 free credits
- **Movie Upload** - Upload story, poster, trailer, and details
- **Credit System** - 3 free uploads, then auto-pay subscription
- **Payment Plans** - Monthly (₹999) & Yearly (₹9,999) with auto-renewal

### 📊 Marketing Tools
- **Digital Marketing** - Facebook, Instagram, YouTube, Google Ads integration
- **Organic Marketing** - SEO, Social Sharing, Community Building, Email campaigns
- **Analytics Dashboard** - Track views, likes, engagement rates
- **Performance Metrics** - Detailed movie performance analytics

### 🎨 UI/UX
- Responsive design for all devices
- Modern gradient themes
- Professional navbar with all sections
- Font Awesome icons
- Beautiful movie cards and layouts

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start server
npm start

# Development mode
npm run dev
```

Visit `http://localhost:3000`

## 📁 Project Structure

```
moviepromo-platform/
├── server.js              # Express server & routes
├── package.json           # Dependencies
├── views/                 # EJS templates
│   ├── index.ejs         # Homepage
│   ├── dashboard.ejs     # User dashboard
│   ├── upload.ejs        # Movie upload form
│   ├── pricing.ejs       # Subscription plans
│   ├── marketing.ejs     # Marketing tools
│   ├── analytics.ejs     # Analytics dashboard
│   ├── login.ejs         # Login page
│   ├── register.ejs      # Registration
│   ├── movie-detail.ejs  # Movie details
│   ├── explore.ejs       # Browse movies
│   └── partials/         # Reusable components
│       ├── navbar.ejs
│       └── footer.ejs
└── public/
    ├── css/
    │   └── style.css     # Complete styling
    ├── uploads/          # User uploads
    └── images/           # Static images
```

## 🔧 Environment Variables

Create `.env` file:

```env
PORT=3000
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
SESSION_SECRET=your_session_secret
```

## 🌐 Deployment

### Deploy to Vercel

1. **Via Vercel CLI:**
```bash
npm i -g vercel
vercel
```

2. **Via Vercel Dashboard:**
- Go to [vercel.com](https://vercel.com)
- Import GitHub repository
- Deploy automatically

### Deploy to Railway/Render

1. Connect GitHub repository
2. Set environment variables
3. Deploy

## 💳 Payment Integration

Currently uses simulated payments. To integrate real payments:

1. Get Stripe API keys from [stripe.com](https://stripe.com)
2. Add keys to `.env`
3. Uncomment Stripe code in `server.js`
4. Test with Stripe test cards

## 📱 Pages & Routes

| Route | Description |
|-------|-------------|
| `/` | Homepage with featured movies |
| `/register` | Sign up (3 free credits) |
| `/login` | User login |
| `/dashboard` | User dashboard with stats |
| `/upload` | Upload new movie |
| `/pricing` | Subscription plans |
| `/marketing` | Marketing tools |
| `/analytics` | Performance analytics |
| `/explore` | Browse all movies |
| `/movie/:id` | Movie details page |

## 🎯 How It Works

1. **Register** - Get 3 free credits
2. **Upload Movie** - Add story, poster, trailer (uses 1 credit)
3. **Promote** - Use digital & organic marketing tools
4. **Track** - Monitor views, likes, engagement
5. **Subscribe** - After 3 uploads, choose monthly/yearly plan
6. **Auto-Pay** - Automatic subscription renewal

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js
- **Frontend:** EJS, CSS3, JavaScript
- **File Upload:** Multer
- **Session:** Express-session
- **Payment:** Stripe (ready to integrate)
- **Icons:** Font Awesome 6

## 📈 Future Enhancements

- [ ] Database integration (MongoDB/PostgreSQL)
- [ ] Real Stripe payment processing
- [ ] Email notifications (SendGrid/Mailgun)
- [ ] Social media API integration
- [ ] Video streaming optimization
- [ ] User reviews & ratings
- [ ] Advanced analytics with charts
- [ ] Mobile app (React Native)

## 🤝 Contributing

Contributions welcome! Please open an issue or submit a PR.

## 📄 License

MIT License - feel free to use for your projects!

## 🎬 Demo

**Live Demo:** [Coming Soon]

**Screenshots:**
- Homepage with hero section
- Dashboard with stats
- Movie upload form
- Marketing tools page
- Analytics dashboard
- Pricing plans

## 📞 Support

For issues or questions:
- Open a GitHub issue
- Email: support@moviepromo.com

---

Made with ❤️ for filmmakers and directors