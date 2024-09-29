<!DOCTYPE html>
<html>
<head>
    <title>Reset Password</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
</head>
<body>
      <div class="row justify-content-center mt-5">
            <div class="col-md-6">
                <form action="{{ $resetLink }}">
                    <p>Click the following button to reset your password:</p>
                    <a href="{{ $resetLink }}" class="btn btn-primary" target="_blank">Reset Password</a>
                </form>
            </div>
        </div>
  </body>
</html>
