<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StudentRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // no auth on this assignment
    }

    public function rules(): array
    {
        return [
            'student_number' => [
                'required', 'string', 'max:10', 'regex:/^\d{4}-\d{5}$/',
                Rule::unique('students', 'student_number')
                    ->ignore($this->route('student')),
            ],
            'name' => ['required', 'string', 'max:255'],
            'course' => ['required', 'string', 'max:255'],
            'section' => ['required', 'string', 'max:255'],
            'year_level' => ['required', 'integer', 'between:1,4'],
        ];
    }
}
