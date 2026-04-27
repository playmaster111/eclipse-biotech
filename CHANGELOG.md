# Changelog

All notable changes to the Eclipse Biotech Platform will be documented in this file.

## [v5.2.1] - 2026-04-27
### Fixed
- **Database Optimization**: Performed a surgical cleanup of `data.js`, removing triple-redundant data blocks and deduplicating 199 compound profiles.
- **Metadata Merging**: Integrated advanced `aestheticProfile` and `physiologicalTargets` metadata from expansion packs into the primary database entries.
- **Rescued Data**: Recovered and properly categorized unique compounds (Dapoxetine, Hashish, Ayahuasca) that were buried in messy data blocks.

## [v5.2.0] - 2026-04-26
### Added
- **"Gold Standard" UI/UX**: Complete overhaul of the research terminal with a cinematic "BF3-style" aesthetic.
- **Holographic Visualization**: Integrated Three.js-powered rotating DNA/Molecular holograms for every compound.
- **Eclipse Audio Engine**: Added high-fidelity, synchronized UI sound effects and an immersive intro sequence with spatial audio.
- **Biometric Authentication**: Simulated retina/face-scan login sequence during terminal initialization.

## [v4.1.0] - 2026-04-26
### Added
- **Search System Upgrade**: The search filter now successfully queries across multiple compound fields including `name`, `id`, `folder`, `aka` (street names), and `esters` (brand names/aliases).
- **New Categories**: `Antidepressants & SSRIs`, `Longevity & Coenzymes`.
- **New Compound Profiles**: Expanded database with Antidepressants, Opioids, and Longevity coenzymes.
- **Aliases Updated**: Added "Lemmons" to Methaqualone and "Desoxyn" to Methamphetamine for searchability.

### Fixed
- Fixed critical null-pointer crash during sidebar navigation state transitions.
- Mobile UI layout improvements, specifically fixing the disorganized 'X' button.
- Cleaned up top-bar clutter and resolved visual connecting box artifacts.
