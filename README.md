
This project was created for [BUKAZU](https://bukazu.com/).

  

This project contains a app to connect to the Bukazu Portal<br>

Through this app you can create a Search page of call a booking form for a object<br>

  

## Integration

  

To integrate this app into your existing website you add the css in the head of your website:  

```html
<link  rel="stylesheet" href="https://portal.bukazu.com/main.css" type="text/css" media="all" />
```

And you have to add the .js to the end of the body tag
```html
<script  src="https://portal.bukazu.com/main.js"></script>
```

**Search Page**
After that you have to create a div inside your body with the id "bukazu-app", you add the portal code and language.
```html
<div  id="bukazu-app" portal-code="80b2523b" language='nl'></div>
```

**Calendar Page**
For the calendar page you need to add the object code for the object you want the calendar for.
```html
<div  id="bukazu-app" portal-code="80b2523b" object-code="NL0099" language='nl'></div>
```