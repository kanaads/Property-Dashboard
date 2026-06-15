Underline tab bar for switching primary views.

```jsx
<Tabs value={view} onChange={setView}
  tabs={[{value:'all',label:'All',count:128},{value:'watch',label:'Watchlist',count:12}]} />
```
Items accept strings or `{value,label,icon,count}`. Controlled via `value`/`onChange`.
