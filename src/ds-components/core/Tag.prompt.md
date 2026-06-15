Filter chip — selectable facets and removable applied-filter pills.

```jsx
<Tag selectable selected>Multifamily</Tag>
<Tag onRemove={() => clear('type')}>Type: Office</Tag>
```
Use `selectable`+`selected` for toggles; `onRemove` adds a × button.
