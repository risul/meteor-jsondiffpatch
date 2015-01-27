meteor-jsondiffpatch
===============

Meteor package for jsondiffpatch - Diff & patch for JavaScript objects.
More info: https://github.com/benjamine/jsondiffpatch

##Install
```bach
meteor add risul:jsondiffpatch
```

Usage
-----

``` javascript
    // sample data
    var country = {
        name: "Argentina",
        capital: "Buenos Aires",
        independence: new Date(1816, 6, 9),
        unasur: true
    };

    // clone country, using dateReviver for Date objects
    var country2 = JSON.parse(JSON.stringify(country), jsondiffpatch.dateReviver);

    // make some changes
    country2.name = "Republica Argentina";
    country2.population = 41324992;
    delete country2.capital;

    var delta = jsondiffpatch.diff(country, country2);

    assertSame(delta, {
        "name":["Argentina","Republica Argentina"], // old value, new value
        "population":["41324992"], // new value
        "capital":["Buenos Aires", 0, 0] // deleted
    });

    // patch original
    jsondiffpatch.patch(country, delta);

    // reverse diff
    var reverseDelta = jsondiffpatch.reverse(delta);
    // also country2 can be return to original value with: jsondiffpatch.unpatch(country2, delta);

    var delta2 = jsondiffpatch.diff(country, country2);
    assert(delta2 === undefined)
    // undefined => no difference
```

Array diffing:

``` javascript
    // sample data
    var country = {
        name: "Argentina",
        cities: [
        {
            name: 'Buenos Aires',
            population: 13028000,
        },
        {
            name: 'Cordoba',
            population: 1430023,
        },
        {
            name: 'Rosario',
            population: 1136286,
        },
        {
            name: 'Mendoza',
            population: 901126,
        },
        {
            name: 'San Miguel de Tucuman',
            population: 800000,
        }
        ]
    };

    // clone country
    var country2 = JSON.parse(JSON.stringify(country));

    // delete Cordoba
    country.cities.splice(1, 1);

    // add La Plata
    country.cities.splice(4, 0, {
        name: 'La Plata'
        });

    // modify Rosario, and move it
    var rosario = country.cities.splice(1, 1)[0];
    rosario.population += 1234;
    country.cities.push(rosario);

    // create a configured instance, match objects by name
    var diffpatcher = jsondiffpatch.create({
        objectHash: function(obj) {
            return obj.name;
        }
    });

    var delta = diffpatcher.diff(country, country2);

    assertSame(delta, {
        "cities": {
            "_t": "a", // indicates this node is an array (not an object)
            "1": [
                // inserted at index 1
                {
                    "name": "Cordoba",
                    "population": 1430023
                }]
            ,
            "2": {
                // population modified at index 2 (Rosario)
                "population": [
                    1137520,
                    1136286
                ]
            },
            "_3": [
                // removed from index 3
                {
                    "name": "La Plata"
                }, 0, 0],
            "_4": [
                // move from index 4 to index 2
                '', 2, 3]
        }
    });
```