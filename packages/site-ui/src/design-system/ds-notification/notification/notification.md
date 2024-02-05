# Notification params

```js
type: 'info',                           // type: String; default: 'info'; values: 'info', 'error';
autoClose: false,                       // type: Boolean; default: false;
timeline: 1000,                         // type: Number; default: 3000;
```

## Items params

### Plain

```js
item: {
  type: 'plain',                          // type: String; default: 'plain'; values: 'plain';
  title: 'Ссылка скопирована',            // type: String; default: '';
  subtitle: '5 минут назад',              // type: String; default: '';
  text: 'И помещена в буфер обмена'       // type: String; default: '';
  buttons: [
    {
      ...ds-button,                         // ds-button params
      calback: calback,                     // type: Function
    },
    {}
  ]
}
```
