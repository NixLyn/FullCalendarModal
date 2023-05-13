# Dynamic Calendar #


Pure Vanilla JavaScript 😃

This Will Require the use of Jinja2 or Django,
as it makes use uf {% block conent %} & {% include 'url.html' %}.
We will be using Flask-WebApp for this example, but,
if you know your way around html/css/js, then feel free to make
your own methods from this...


```
test_0_0_3/
-> full_cal_3.js
-> full_cal_0.css
-> full_cal_0.html

```

## Integration ##

Step 1:

```
git clone https://github.com/NixLyn/FullCalendarModal.git

```

Step 2:

```
Copy -> full_cal_3.js && full_cal_0.css

Paste -> static/jss/ && static/css/

```

Step 3:

Include the html modual where needed, eg:
```
<section>
    <div class="some-form">
        <!-- You will need to 'Call' the Modual -->
        {% include "full_cal_0.html" %}
    </div>

</section>


```

Step 4:

Check in 'full_cal_0.html', at the top, that the following
'href="../path/to_where/you_pasted/"' 

```
<link rel="stylesheet" type="text/css" href="../Your/path/full_cal_0.css">

```

Step 5:

Add the following to the bottom of the HTML file, 
where you will be using/calling the DynamicDatePicker

```
    <script type="text/javascript" src="full_cal_3.js">
    </script>

    <script>
        /* Here is an Example of how to Disable certain Dates */
        let disabledDates = ['2023-05-07', '2023-05-17', '2023-05-27', '2023-06-22'];
        console.log("[HTML_SIDE]:", disabledDates);
        add_disbaled_dates(disabledDates);

        /* 
            ? Only SetDynamicCalender,
            ? After Adding Dynamic Elements
        */
        SetDynamicCalendar();
        /*
            ? This wroks much the same as a 'main()'...
        */


    </script>

```

## Usage(s) ##

### Flask-Implementation ###


