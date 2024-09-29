<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;
class Meeting extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'meeting_id',
        'web_link',
        'start',
        'startTime',
        'end',
        'endTime',
        'duration',
        'meetingType',
        'location',
        'meetingRoom',
        'participant',
    ];

    protected $casts = [
        'invitees' => 'array',
    ];

       public function getStartAttribute($value)
        {
            return Carbon::parse($value)->format('Y-m-d');
        }

        public function getStartTimeAttribute($value)
        {
            return Carbon::parse($value)->format('H:i:s');
        }
    
}
