Labelled text input with optional icons, a mono prefix, hint and error states.

```jsx
<Input label="Min price" prefix="$" placeholder="0" iconRight={<SearchIcon />} />
<Input label="Email" required error="Enter a valid email" />
```

Sizes `sm`/`md`/`lg`. Pass `error` to switch to invalid styling (replaces `hint`). All native `<input>` props pass through.
