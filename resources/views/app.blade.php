<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Casino Test</title>

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet">

        <style>

            .roulette {
                text-align: center;
            }

            @media(max-width: 800px) {
                .roulette {
                    flex-direction: column;
                }
            }
        </style>

    </head>
    <body>
        <div id="app"></div>
        <script src="./js/app.js"></script>
        <script src="./js/jquery-3.5.1.min.js"></script>
        <script src="./js/timer.jquery.min.js"></script>
        <script src="./js/TweenMax.min.js"></script>
        <script src="./js/Winwheel.min.js"></script>
    </body>
</html>
