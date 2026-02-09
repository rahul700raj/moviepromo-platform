const express = require('express');
const multer = require('multer');
const path = require('path');
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
  secret: 'moviepromo-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 24 * 60 * 60 * 1000 }
}));

// In-memory storage (replace with database in production)
const users = [];
const movies = [];
const payments = [];

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// Authentication middleware
const isAuthenticated = (req, res, next) => {
  if (req.session.userId) {
    next();
  } else {
    res.redirect('/login');
  }
};

// Routes
app.get('/', (req, res) => {
  const featuredMovies = movies.slice(0, 6);
  res.render('index', { user: req.session.userId ? users.find(u => u.id === req.session.userId) : null, movies: featuredMovies });
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if (user) {
    req.session.userId = user.id;
    res.redirect('/dashboard');
  } else {
    res.render('login', { error: 'Invalid credentials' });
  }
});

app.get('/register', (req, res) => {
  res.render('register');
});

app.post('/register', (req, res) => {
  const { name, email, password } = req.body;
  const userId = Date.now().toString();
  users.push({ id: userId, name, email, password, credits: 3, isPaid: false });
  req.session.userId = userId;
  res.redirect('/dashboard');
});

app.get('/dashboard', isAuthenticated, (req, res) => {
  const user = users.find(u => u.id === req.session.userId);
  const userMovies = movies.filter(m => m.userId === req.session.userId);
  res.render('dashboard', { user, movies: userMovies });
});

app.get('/upload', isAuthenticated, (req, res) => {
  const user = users.find(u => u.id === req.session.userId);
  if (user.credits <= 0 && !user.isPaid) {
    return res.redirect('/pricing');
  }
  res.render('upload', { user });
});

app.post('/upload', isAuthenticated, upload.fields([{ name: 'poster' }, { name: 'trailer' }]), (req, res) => {
  const user = users.find(u => u.id === req.session.userId);
  
  if (user.credits <= 0 && !user.isPaid) {
    return res.redirect('/pricing');
  }

  const movieData = {
    id: Date.now().toString(),
    userId: req.session.userId,
    title: req.body.title,
    genre: req.body.genre,
    description: req.body.description,
    story: req.body.story,
    director: req.body.director,
    cast: req.body.cast,
    releaseDate: req.body.releaseDate,
    poster: req.files.poster ? '/uploads/' + req.files.poster[0].filename : null,
    trailer: req.files.trailer ? '/uploads/' + req.files.trailer[0].filename : null,
    views: 0,
    likes: 0,
    createdAt: new Date()
  };

  movies.push(movieData);
  
  if (!user.isPaid) {
    user.credits--;
  }

  res.redirect('/dashboard');
});

app.get('/movie/:id', (req, res) => {
  const movie = movies.find(m => m.id === req.params.id);
  if (movie) {
    movie.views++;
    const director = users.find(u => u.id === movie.userId);
    res.render('movie-detail', { movie, director, user: req.session.userId ? users.find(u => u.id === req.session.userId) : null });
  } else {
    res.redirect('/');
  }
});

app.get('/pricing', isAuthenticated, (req, res) => {
  const user = users.find(u => u.id === req.session.userId);
  res.render('pricing', { user });
});

app.post('/subscribe', isAuthenticated, (req, res) => {
  const user = users.find(u => u.id === req.session.userId);
  const { plan } = req.body;
  
  // Simulate payment processing
  user.isPaid = true;
  user.plan = plan;
  user.subscriptionDate = new Date();
  
  payments.push({
    id: Date.now().toString(),
    userId: user.id,
    plan,
    amount: plan === 'monthly' ? 999 : 9999,
    date: new Date(),
    status: 'success'
  });

  res.redirect('/dashboard');
});

app.get('/marketing', isAuthenticated, (req, res) => {
  const user = users.find(u => u.id === req.session.userId);
  const userMovies = movies.filter(m => m.userId === req.session.userId);
  res.render('marketing', { user, movies: userMovies });
});

app.get('/analytics', isAuthenticated, (req, res) => {
  const user = users.find(u => u.id === req.session.userId);
  const userMovies = movies.filter(m => m.userId === req.session.userId);
  const totalViews = userMovies.reduce((sum, m) => sum + m.views, 0);
  const totalLikes = userMovies.reduce((sum, m) => sum + m.likes, 0);
  res.render('analytics', { user, movies: userMovies, totalViews, totalLikes });
});

app.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

app.get('/explore', (req, res) => {
  res.render('explore', { movies, user: req.session.userId ? users.find(u => u.id === req.session.userId) : null });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});