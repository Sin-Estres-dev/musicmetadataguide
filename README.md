# musicmetadataguide

A comprehensive platform designed to empower independent artists with the tools and knowledge needed to ensure their music is properly registered, integrated, and monetized across the global digital music ecosystem.

**Key Features:**
- Artist metadata profile management (ISRC, IPI, ISWC codes)
- Centralized artist profile integration for all essential codes
- Song split sheet management for multi-writer collaborations
- Automated royalty distribution calculations
- Educational resources on royalty collection and rights management
- Seamless connectivity with global streaming and distribution networks

**Tagline:** *Sync Your Metadata. Secure Your Royalties.*

---

## Quick Start

```bash
npm install
npm start
```

## Features

### 🎵 Artist Metadata Management
- Register ISRC, IPI, and ISWC codes
- Link streaming platform profiles:
  - Spotify, Apple Music, YouTube, TIDAL, Amazon Music
  - SoundCloud, Bandcamp, TuneCore
- Track metadata completion with visual progress indicators (0-100%)
- Export and backup artist profiles as JSON
- Supports multiple artist profiles

### 🎼 Song Split Sheet Management (5+ Writers)
- Create collaborative split sheets for multiple writers
- Assign roles:
  - Composer, Lyricist, Producer, Arranger, Co-Composer
  - Custom roles supported
- Link IPI codes and PRO affiliations:
  - ASCAP, BMI, SESAC, and other PROs
- Automatic 100% allocation validation
- Export split sheets for archival and legal purposes

### 💰 Royalty Tracking & Distribution
- Calculate automatic royalty splits based on percentages
- Track payments across multiple writers
- Real-time royalty calculations
- Export distribution reports

## Running the App

```bash
# Main application - Artist profiles
npm start

# Demo - Song split sheet with 5 writers
node src/testSplitSheet.js
```

## Project Structure

```
musicmetadata/
├── src/
│   ├── index.js              # Main application (Artist profiles)
│   ├── songSplitSheet.js     # Song split sheet module
│   └── testSplitSheet.js     # Demo and test file
├── config/                   # Saved profiles and split sheets
├── docs/                     # Documentation
├── package.json              # Dependencies
└── README.md                 # This file
```

## Example Usage

### Create an Artist Profile
```javascript
const { ArtistProfile } = require('./src/index.js');

const artist = new ArtistProfile('My Artist Name');
artist.registerISRC('US-ABC-21-00001');
artist.registerIPI('00123456789');
artist.registerISWC('T-345.246.317-1');
artist.addStreamingProfile('Spotify', 'spotify:artist:1A2B3C4D5E6F');
artist.displaySummary();
```

### Create a Song Split Sheet
```javascript
const { SongSplitSheet } = require('./src/songSplitSheet.js');

const split = new SongSplitSheet('Song Title', 'Various Artists');
split.addWriter('Writer 1', 'Composer', 50, '00123456789', 'ASCAP');
split.addWriter('Writer 2', 'Lyricist', 50, '00987654321', 'BMI');
split.displaySplitSheet();
split.calculateRoyalties(10000); // Calculate $10,000 split
```

## Next Steps

1. ✅ Create artist profiles for your music
2. ✅ Register your ISRC, IPI, and ISWC codes
3. ✅ Create split sheets for collaborative projects
4. ✅ Link your streaming platform profiles
5. ✅ Calculate and track royalty distributions
6. ✅ Export and backup your metadata
7. ✅ Monitor your royalty registration

## Why Metadata Matters

Independent artists often lose significant royalties because:
- ❌ Metadata isn't properly registered
- ❌ Split sheets aren't documented
- ❌ PRO affiliations aren't linked
- ❌ Streaming platforms can't match payments to correct artists

**This app ensures:**
- ✅ Every piece of music is properly identified
- ✅ All writers are credited and compensated
- ✅ Royalties flow to the right people
- ✅ Complete audit trail for legal protection

## License

Unlicense - Public Domain

---

### 🔐 Developer Note: Gravatar Integration & API Security
When integrating Gravatar for user authentication and profile fetching, avatar image URLs can be generated client-side using an MD5 hash of the user's email. However, fetching full profile data and managing secure authentication requires passing the Gravatar API Key securely through the Express backend. **Never expose your API key in frontend code.** Store it in a `.env` file and proxy requests via the Node.js server.
