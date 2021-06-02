<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class UserFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = User::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $number = $this->faker->randomNumber(3);
        $unixTimestamp = '1461067200';
        return [
            'en' => [
                'name' => $this->faker->name(),
            ],
            'ar' => [
                'name' => $this->faker->name(),
            ],
            'email' => $this->faker->unique()->safeEmail(),
            'avatar_name' => "http://lorempixel.com/{$number}/{$number}/sports/",
            'birthdate' => $this->faker->date('Y-m-d', $unixTimestamp),
            'email_verified_at' => now(),
            'password' => bcrypt(123456), // password
            'remember_token' => Str::random(10),
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     *
     * @return \Illuminate\Database\Eloquent\Factories\Factory
     */
    public function unverified()
    {
        return $this->state(function (array $attributes) {
            return [
                'email_verified_at' => null,
            ];
        });
    }
}
