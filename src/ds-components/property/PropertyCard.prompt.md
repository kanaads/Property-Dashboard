The core repeating unit of the Propvia dashboard — one property listing. Composes `ScoreBadge` and `Badge`.

```jsx
<PropertyCard
  image="/p/123.jpg" title="The Linden — 24-unit multifamily"
  location="Logan Square, Chicago" type="Multifamily"
  price={4250000} beds={24} baths={26} sqft={31200}
  score={87} favorite onFavorite={() => toggleWatch(id)} />
```

`price` as a number auto-formats to $X.XM/$XK. The Latent Value Score floats over the photo; the type badge sits top-left, watchlist heart top-right (only when `onFavorite` is set).
