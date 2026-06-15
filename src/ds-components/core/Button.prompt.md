Primary action button — use for the single most important action in a view; `secondary`/`ghost` for supporting actions and `danger` for destructive ones.

```jsx
<Button variant="primary" size="md" iconLeft={<PlusIcon />}>Add property</Button>
<Button variant="secondary">Export</Button>
<Button variant="ghost" size="sm">Cancel</Button>
```

Variants: `primary` (emerald, default) · `secondary` (white, hairline border) · `ghost` (transparent) · `danger` (red). Sizes: `sm` 30px · `md` 36px · `lg` 44px. Supports `iconLeft` / `iconRight` (pass an SVG node), `fullWidth`, and all native button props.
