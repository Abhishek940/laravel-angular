<!-- resources/views/webex.blade.php -->

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Webex Integration</title>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
</head>
<body>
    <h1>Webex Integration</h1>

    @if (session('WEBEX_ACCESS_TOKEN'))
        <h2>Create Meeting</h2>
        <form id="createMeetingForm">
            <label for="title">Title:</label>
            <input type="text" id="title" name="title" required><br>
            <label for="start">Start:</label>
            <input type="datetime-local" id="start" name="start" required><br>
            <label for="end">End:</label>
            <input type="datetime-local" id="end" name="end" required><br>
            <label for="password">Password:</label>
            <input type="password" id="password" name="password" required><br>
            <label for="timezone">Timezone:</label>
            <input type="text" id="timezone" name="timezone" required><br>
            <button type="submit">Create Meeting</button>
        </form>
    @else
        <button id="authorizeWebex">Authorize Webex</button>
    @endif

    <script>
        // Get the CSRF token from the meta tag
        let csrfToken = $('meta[name="csrf-token"]').attr('content');

        // Add CSRF token to every AJAX request
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': csrfToken
            }
        });

        $('#authorizeWebex').click(function() {
            $.get('/webex/authorize', function(data) {
                window.location.href = data.authorization_url;
            });
        });

        $('#createMeetingForm').submit(function(e) {
            e.preventDefault();
            $.post('/create/meeting', {
                title: $('#title').val(),
                start: $('#start').val(),
                end: $('#end').val(),
                password: $('#password').val(),
                timezone: $('#timezone').val()
            }, function(data) {
                console.log('Meeting created', data);
               
            }).fail(function(error) {
                console.error('Error creating meeting', error);
               
            });
        });
    </script>
</body>
</html>
