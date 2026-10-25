<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    protected $fillable = ['student_number', 'name', 'course', 'section', 'year_level'];

    protected $casts = ['year_level' => 'integer'];
}
