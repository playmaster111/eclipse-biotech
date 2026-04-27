# Changelog

All notable changes to the Eclipse Biotech Platform will be documented in this file.

## [v4.1.0] - 2026-04-26

### Added
- **Search System Upgrade**: The search filter now successfully queries across multiple compound fields including `name`, `id`, `folder`, `aka` (street names), and `esters` (brand names/aliases).
- **New Categories**:
  - `Antidepressants & SSRIs`
  - `Longevity & Coenzymes`
- **New Compound Profiles**:
  - **Antidepressants**: Fluoxetine (Prozac), Sertraline (Zoloft), Escitalopram (Lexapro), Venlafaxine (Effexor), Duloxetine (Cymbalta), Bupropion (Wellbutrin), Mirtazapine (Remeron), Amitriptyline (Elavil), Tranylcypromine (Parnate).
  - **Longevity/Peptides**: NAD+, MOTS-c, TB-500 (Thymosin Beta-4).
  - **Opioids**: Codeine, Morphine.
  - **GABAergics / Depressants**: Pregabalin (Lyrica), Diazepam (Valium), Lorazepam (Ativan), Zolpidem (Ambien), Carisoprodol (Soma), Clonazepam (Klonopin).
- **Aliases Updated**: Added "Lemmons" to Methaqualone and "Desoxyn" to Methamphetamine for searchability.

### Fixed
- Fixed critical null-pointer crash during sidebar navigation state transitions (added defensive element checks).
- Mobile UI layout improvements, specifically fixing the disorganized 'X' button.
- Cleaned up top-bar clutter and resolved visual connecting box artifacts.
