<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Place extends Model
{
    use HasFactory;

    const TABLE_NAME = 'places';

    protected $table = self::TABLE_NAME;
    protected $fillable = [
        'name',
    ];
}
