@component('mail::message')
# Meeting Created

A new meeting has been created.

**Title:** {{ $meeting->title }}  
**Start Time:** {{ $meeting->start_time }}  
**End Time:** {{ $meeting->end_time }}

@component('mail::button', ['url' => $meeting->web_link])
Join Meeting
@endcomponent

Thanks,<br>
{{ config('app.name') }}
@endcomponent
