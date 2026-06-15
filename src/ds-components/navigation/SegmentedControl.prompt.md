Segmented control for 2–4 mutually exclusive options (view toggle, sort, density).

```jsx
<SegmentedControl value={layout} onChange={setLayout}
  options={[{value:'grid',icon:<GridIcon/>},{value:'list',icon:<ListIcon/>}]} />
```
Options accept strings or `{value,label,icon}`. Icon-only allowed. Sizes `sm`/`md`.
