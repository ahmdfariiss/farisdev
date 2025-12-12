# 🎨 Portfolio Website

Modern portfolio website dengan tema monokrom dan animasi interaktif. Dibuat untuk mahasiswa semester 5 dengan minat Web Development dan IoT.

## ✨ Fitur

- **Monochrome Design** - Tema hitam/putih/abu-abu yang elegan
- **Interactive Animations** - Animasi smooth dengan Framer Motion
- **Particle Background** - Canvas particles dengan mouse interaction
- **Custom Cursor** - Cursor kustom dengan trail effect
- **Responsive Design** - Tampilan optimal di semua device
- **Unique Section Layouts** - Setiap section memiliki layout berbeda

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Animation**: Framer Motion
- **Icons**: React Icons

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Home page
│
├── components/             # React components
│   ├── layout/            # Layout components
│   │   ├── Navbar.tsx     # Navigation bar
│   │   ├── Footer.tsx     # Footer
│   │   └── index.ts       # Barrel export
│   │
│   ├── sections/          # Page sections
│   │   ├── Hero.tsx       # Hero section (centered dramatic)
│   │   ├── About.tsx      # About section (asymmetric split)
│   │   ├── Skills.tsx     # Skills section (staggered grid)
│   │   ├── Experience.tsx # Experience section (sticky title + cards)
│   │   ├── Projects.tsx   # Projects section (bento grid)
│   │   ├── Contact.tsx    # Contact section (form + info)
│   │   └── index.ts       # Barrel export
│   │
│   ├── ui/                # UI components
│   │   ├── ParticleBackground.tsx
│   │   ├── LoadingScreen.tsx
│   │   ├── CustomCursor.tsx
│   │   └── index.ts       # Barrel export
│   │
│   └── index.ts           # Main barrel export
│
├── constants/              # Data & configuration
│   ├── navigation.ts      # Navigation items
│   ├── social.ts          # Social media links
│   ├── skills.ts          # Skills data with icons
│   ├── experience.ts      # Experience entries
│   ├── projects.ts        # Project data
│   ├── about.ts           # About highlights & stats
│   ├── site.ts            # Site configuration
│   └── index.ts           # Barrel export
│
├── hooks/                  # Custom React hooks
│   ├── useScrollSpy.ts    # Scroll spy for navigation
│   ├── useMediaQuery.ts   # Responsive breakpoints
│   ├── useLocalStorage.ts # Local storage state
│   └── index.ts           # Barrel export
│
├── lib/                    # Utility functions
│   ├── utils.ts           # Helper functions (cn, etc.)
│   └── index.ts           # Barrel export
│
└── types/                  # TypeScript definitions
    └── index.ts           # All type definitions
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm / yarn / pnpm

### Installation

```bash
# Clone repository
git clone <your-repo-url>
cd portfolio

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
npm start
```

## 📝 Customization

### Update Personal Info

1. **Site Config**: Edit `src/constants/site.ts` untuk nama, deskripsi, dll
2. **Social Links**: Edit `src/constants/social.ts` untuk link social media
3. **Skills**: Edit `src/constants/skills.ts` untuk daftar skills
4. **Experience**: Edit `src/constants/experience.ts` untuk pengalaman
5. **Projects**: Edit `src/constants/projects.ts` untuk project portfolio

### Update Content

Edit file di folder `src/components/sections/` untuk mengubah konten dan layout.

## 📦 Dependencies

```json
{
  "next": "^16.0.10",
  "react": "^19",
  "typescript": "^5",
  "tailwindcss": "^4",
  "framer-motion": "^12",
  "react-icons": "^5",
  "react-type-animation": "^3",
  "clsx": "^2",
  "tailwind-merge": "^2"
}
```

## 🎯 Section Layouts

| Section | Layout Style |
|---------|--------------|
| Hero | Centered dramatic with decorative frame |
| About | Asymmetric split (7/5 grid) |
| Skills | Full-width staggered grid |
| Experience | Sticky title with horizontal cards |
| Projects | Bento grid with varying sizes |
| Contact | Split layout (form left, info right) |

## 📄 License

MIT License - feel free to use for personal or commercial projects.

---

Made with ❤️ using Next.js & Tailwind CSS
