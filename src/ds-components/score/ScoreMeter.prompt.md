Radial gauge for the **Latent Value Score** (1–100) — Propvia's signature, highest-priority data point. Color follows the heat scale by band.

```jsx
<ScoreMeter score={87} size="lg" />
<ScoreMeter score={52} size="sm" showCaption={false} />
```

Bands: <40 limited (slate) · 40–69 moderate (gold) · 70–89 strong (emerald) · 90+ exceptional (bright emerald). Sizes `sm`/`md`/`lg`. Use `scoreBand(n)` to color related UI consistently. For inline/table use, prefer `ScoreBadge`.
