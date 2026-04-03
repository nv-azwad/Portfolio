# Gausul Azam Jameh Masjid — Digital Mosque Management System

## Overview

A full-stack mosque management platform built for **Gausul Azam Jameh Masjid** (Uttara, Dhaka, Bangladesh). The system consists of a web-based admin dashboard and a cross-platform mobile app (Android + PWA) serving the mosque community with real-time prayer times, notifications, Quran reader, Qibla compass, Islamic calendar, and community engagement features.

**GitHub:** [github.com/nv-azwad/Masjid](https://github.com/nv-azwad/Masjid)
**Live Dashboard:** [masjid-dun.vercel.app](https://masjid-dun.vercel.app/)
**Live PWA:** [gausul-azam-masjid.vercel.app](https://gausul-azam-masjid.vercel.app/)

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Admin Dashboard** | Next.js 14 (App Router), Tailwind CSS, Prisma ORM |
| **Mobile App** | React Native, Expo, Expo Router |
| **PWA** | Expo Web, Service Workers, W3C Web Push API |
| **Database** | PostgreSQL (Neon) |
| **Push Notifications** | Firebase Cloud Messaging (Android), VAPID Web Push (PWA) |
| **Auth** | JWT, bcrypt, email-based password recovery (Nodemailer) |
| **Deployment** | Vercel (dashboard + PWA), EAS (Android builds) |
| **APIs** | RESTful API (17 endpoints), Al Quran Cloud API integration |

---

## Features Built

### Admin Dashboard (Next.js)
- **Single-page dashboard** with section-based navigation (Overview, Prayers, Jummah, Imams, Notifications, Calendar Events, Community Posts, Users)
- **Role-based access control** — Admin and Moderator roles with approval workflows (PendingChange model for moderator submissions)
- **Prayer time management** — CRUD for 5 daily prayers with adhan/jamaat times, auto-sync via daily Vercel cron job
- **Jummah settings** — Manage Friday prayer time and khateeb assignments
- **Imam profiles** — Add/edit imam bios, roles, and ordering
- **Push notification system** — Send announcements to all Android + PWA users simultaneously
- **Islamic calendar events** — Create events (types: event, special_prayer, holiday, reminder) with date and description
- **Community post moderation** — Review, approve, or reject community-submitted posts; author notified on decision
- **User management** — Create admin/moderator accounts, username-based login
- **Password recovery** — Forgot password flow with email reset links (1-hour expiry tokens)
- **App install analytics** — Track unique installs by device and platform
- **Security hardening** — CORS policies, rate limiting (IP-based on login, device-based on posts), input validation (Zod), SQL injection prevention (Prisma)

### Mobile App (React Native + Expo)
- **Home screen** — Today's prayer times with next prayer highlight, Hijri date display, mosque info
- **Updates screen** — Two-tab layout: Announcements (admin notifications) + Community posts with unread badges
- **Community posts** — Submit messages (anonymous or named, 750-char limit), rate limited to 3/device/day
- **Quran reader** — Full Quran with Arabic text, Bengali translation, and English translation (Al Quran Cloud API), surah navigation
- **Qibla compass** — Animated compass with magnetometer sensor, smoothing algorithm (0.06 factor), 1.5-degree dead zone, calibration prompt
- **Settings** — Dark/light theme toggle, app info
- **Offline support** — Network-first data strategy with AsyncStorage fallback, locally calculated prayer times (adhan.js) as final fallback
- **Push notifications (Android)** — Firebase FCM via Expo Push API, local scheduled reminders 15 min before each jamaat
- **Web push notifications (PWA)** — VAPID-based browser notifications via service worker
- **Unread badge system** — Combined count of unseen announcements + community posts on tab icons

### API Layer (17 REST Endpoints)
`/api/mosque` (main data endpoint, CDN cached), `/api/prayers`, `/api/jummah`, `/api/imams`, `/api/notifications`, `/api/calendar`, `/api/community-posts`, `/api/push-tokens`, `/api/web-push-subscriptions`, `/api/auth`, `/api/users`, `/api/members`, `/api/pending`, `/api/stats`, `/api/app-open`, `/api/keepalive`, `/api/cron`

### Database Schema (12 Models)
User, Mosque, Prayer, JummahSetting, Imam, Notification, PushToken, AppInstall, CalendarEvent, CommunityPost, WebPushSubscription, Member, PendingChange

---

## Architecture Highlights

- **Network-first caching strategy:** App fetches from dashboard API first, falls back to AsyncStorage cache, then to locally computed prayer times — ensuring the app works even offline
- **CDN-optimized API:** Main endpoint cached with `s-maxage=30, stale-while-revalidate=60`; dashboard bypasses cache with timestamp query params
- **Cross-platform notifications:** Single admin action sends to both FCM (Android) and Web Push (PWA) subscribers simultaneously
- **Device-based rate limiting:** Community posts throttled per device (3/day) without requiring user accounts
- **Approval workflow:** Moderators submit changes that require admin approval before going live (PendingChange model)
- **Hijri calendar:** Custom Gregorian-to-Hijri converter using Umm al-Qura algorithm with +/-1 day accuracy
- **Database keepalive:** External cron pings every 5 minutes to prevent Neon free-tier cold starts
- **Automated prayer sync:** Vercel cron runs at midnight Bangladesh time daily

---

## Deployment & Infrastructure

All services run on **free tiers** — designed for a real community project with zero recurring cost:

| Service | Purpose |
|---------|---------|
| Vercel (x2 projects) | Dashboard hosting + PWA hosting |
| Neon | PostgreSQL database |
| Firebase (Spark plan) | FCM push notifications |
| EAS (Expo) | Android APK/AAB builds |
| cron-job.org | Database keepalive pings |
| Al Quran Cloud API | Quran text (Arabic, Bengali, English) |

---

## My Role

Solo developer — designed, built, and deployed the entire system end-to-end:
- Database schema design and API architecture
- Full admin dashboard UI and backend
- Cross-platform mobile app (Android + PWA)
- Push notification infrastructure (FCM + Web Push)
- Security implementation (auth, rate limiting, CORS, input validation)
- Deployment and CI/CD pipeline setup
- Ongoing maintenance and feature additions for a live community
