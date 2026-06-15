KPI tile for the portfolio analytics row.

```jsx
<StatCard label="Portfolio value" value="$48.2M" delta="+4.2%" deltaDirection="up" note="vs last month" icon={<WalletIcon/>} />
<StatCard label="Avg price / sqft" value="$312" delta="-1.1%" deltaDirection="down" />
```
Large mono figure. Provide `delta` + `deltaDirection` (up=green, down=red) for trend. Lay four across the top of a dashboard.
