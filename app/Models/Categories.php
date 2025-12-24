<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Categories extends Model
{

    protected $fillable = ['name'];

    public function sites(): HasMany
    {
        return $this->hasMany(Sites::class, 'category_id');
    }
}
