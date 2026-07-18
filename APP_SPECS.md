# Music Metadata Integration App: Technical Specifications

## Core Metadata Fields Supported
### Descriptive metadata:
* Track title, artist name, album/release name
* Genre and subgenre (accurate, specific tags)
* Release date, language, lyrics
* Explicit content flag
* Cover art (3000x3000px minimum, format-validated)

### Identification metadata:
* **ISRC:** 12-character unique ID per recording
* **ISWC:** Identifies the composition
* **UPC/EAN:** Barcode for the release
* **IPI/CAE:** Songwriter and publisher IDs from PROs
* **IPN:** Performer IDs from neighboring rights CMOs

## Validation Layer
* Spelling, punctuation, formatting rules per DSP
* Cross-reference against authoritative databases
* Duplicate ISRC detection
* Character/punctuation rules per platform (Spotify, Apple Music, YouTube Music)
* Genre validation against each DSP's accepted taxonomy

## Emerging Requirements
* AI content disclosure (RIAA/Grammys/SAG-AFTRA 2026 requirements)
* Immutable audit trail (version control for metadata changes)
* Semantic/mood tagging
