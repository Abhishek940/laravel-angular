<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Redis;
class TestRedisConnection extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'redis:test';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Test Redis connection';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        try {
            Redis::set('test_key', 'Redis is working!');
            $value = Redis::get('test_key');
            $this->info('Redis is working! Value retrieved: ' . $value);
        } catch (\Exception $e) {
            $this->error('Error connecting to Redis: ' . $e->getMessage());
        }
       // return 0;
    }
}
