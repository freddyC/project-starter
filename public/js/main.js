require.config({
    paths: {
        'tmpl': 'lib/tmpl'
    }
});


require([
    'tmpl!templates/template',
    'tmpl!templates/header',
    'tmpl!templates/items'
], function (
    bodyTmpl,
    headerTmpl,
    itemsTmpl

) {

    $('.body').html(bodyTmpl([
        {
            name: 'Mom',
            msgs: ['i love you', 'youre the best']
        },
        {
            name: 'Dad',
            msgs: ['youre cool']
        }
    ]));

    $('.header').html(headerTmpl([
        {
            ref: 'index.html',
            name: 'Home'
        },
        {
            ref: 'contact.html',
            name: 'Contact Us'
        },
        {
            ref: 'projects.html',
            name: 'Our Projects'
        },
        {
            ref: 'about.html',
            name: 'About Us'
        }
    ]));


    $(".items").html(itemsTmpl({
        titles: ["Part Name", "Make", "Color"
        ],

        info:[
            {
                partNum: 554361,
                make: "chevy",
                color: "puke Green"
            },
            {
                partNum: 25,
                make: "Firebird",
                color: "Lime Green"
            }
        ]
    }));




});


