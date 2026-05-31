# Social App — Frontend

A modern social media platform frontend built with React 19, Redux Toolkit, and Tailwind CSS. Users can create posts, follow others, like and comment, search for people, and manage their profiles — all with dark/light theme support.

---

## ✨ Features

- **Authentication** — Sign up, log in, log out, and email OTP verification
- **Feed** — View posts from all users with real-time-like updates
- **Posts** — Create, edit, and delete posts with image support
- **Likes & Comments** — Toggle likes, add, edit, and delete comments
- **Profiles** — View any user's profile with their posts, follower/following counts
- **Follow System** — Follow/unfollow users, view followers and following lists
- **People You May Know** — Suggested users to follow
- **Search** — Search for users by name
- **Notifications** — Dedicated notifications page
- **Dark / Light Theme** — Toggle via theme switcher using `next-themes`
- **Account Management** — Update profile info or delete account

---

## 🛠 Tech Stack

| Category | Technology |
|---|---|
| Framework | React 19 |
| Build Tool | Vite 6 |
| State Management | Redux Toolkit + React Redux |
| Routing | React Router DOM v6 |
| UI Library | HeroUI v2 |
| Styling | Tailwind CSS v3 |
| Animations | Framer Motion |
| HTTP Client | Axios |
| Theme | next-themes |
| Icons | react-icons |

---

## 📁 Project Structure

```
src/
├── App.jsx                        # Home feed (posts + create post + suggestions)
├── main.jsx                       # Entry point
├── providers.jsx                  # App-level providers (Redux, theme)
├── themeSwitcher.jsx              # Theme toggle logic
│
├── routes/
│   └── router.jsx                 # All application routes
│
├── layouts/
│   ├── mainLayout.jsx             # Layout for authenticated pages
│   └── authLayout.jsx             # Layout for auth pages
│
├── pages/
│   ├── loginPage.jsx
│   ├── signupPage.jsx
│   ├── VerificationAccountPage.jsx  # OTP email verification
│   ├── profilePage.jsx
│   ├── followersPage.jsx
│   ├── followingPage.jsx
│   ├── notifiacionsPage.jsx
│   ├── searchPage.jsx
│   └── notFoundPage.jsx
│
├── components/
│   ├── common/
│   │   ├── navbar.jsx
│   │   ├── checkAuth.jsx            # Auth guard wrapper
│   │   ├── PeopleYouMayKnow.jsx     # Suggested users widget
│   │   ├── editPostModal.jsx
│   │   ├── editProfileModal.jsx
│   │   └── updateCommentModal.jsx
│   ├── home/
│   │   ├── createPost.jsx
│   │   ├── HomePost.jsx             # Single post card
│   │   └── HomePostsList.jsx        # Feed list
│   └── profile/
│       ├── ProfilePost.jsx          # Post card on profile page
│       ├── profilePostsList.jsx
│       ├── profilePostOptions.jsx
│       ├── commentOptions.jsx
│       └── deleteUserModal.jsx
│
├── store/
│   ├── store.js                     # Redux store config
│   ├── authSlice/
│   │   ├── authSlice.js             # Auth state
│   │   └── thunk.js                 # Auth async actions
│   ├── postsSlice/
│   │   ├── postsSlice.js            # Posts state
│   │   └── thunk.js                 # Posts async actions
│   └── profileSlice/
│       ├── profileSlice.js          # Profile state
│       └── thunk.js                 # Profile async actions
│
└── index.css                        # Global styles
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18+
- **npm** or **yarn**

### Installation

```bash
# 1. Clone the repository
git clone <your-repo-url>
cd socialApp-frontend

# 2. Install dependencies
npm install
```

### Environment Variables

Create a `.env` file in the root:

```env
VITE_API_URL=http://localhost:5000/api
```

### Running the App

```bash
# Development server
npm run dev

# Production build
npm run build

# Preview production build
npm run preview

# Lint
npm run lint
```

---

## 🗺 Routes

| Path | Description | Access |
|---|---|---|
| `/` | Home feed | Protected |
| `/profile/:id` | User profile | Protected |
| `/followers/:id` | Followers list | Protected |
| `/following/:id` | Following list | Protected |
| `/notifications` | Notifications | Protected |
| `/search` | Search users | Protected |
| `/auth/login` | Login | Public |
| `/auth/signup` | Sign up | Public |
| `/auth/verification/:email` | OTP verification | Public |
| `*` | 404 Not Found | — |

---

## 🗃 Redux Store

The app uses three Redux slices:

**`authSlice`** — manages the logged-in user, suggested people, and search results.
Actions: `signup`, `login`, `logout`, `checkAuth`, `verifyOTP`, `resendOTP`, `getUser`, `deleteProfile`, `suggestedPeople`, `getsearchUsers`

**`postsSlice`** — manages the global posts feed.
Actions: `getAllPosts`, `createPost`, `updatePost`, `deletePost`, `toggleLike`, `createComment`, `updateComment`, `deleteComment`

**`profileSlice`** — manages a viewed user's profile, followers, and following.
Actions: `getProfile`, `updateProfile`, `toggleFollow`, `getFollowers`, `getFollowing`

---

## 🚢 Deployment

This project includes a `vercel.json` for deployment on [Vercel](https://vercel.com).

```bash
npm i -g vercel
vercel
```

Add your environment variables in the Vercel project dashboard before deploying.

---

## 📄 License

MIT

---

Created by **Osama Ahmed**
