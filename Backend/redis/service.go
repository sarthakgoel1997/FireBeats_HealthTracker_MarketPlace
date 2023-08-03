package redis

import (
	"time"

	"github.com/go-redis/redis"
)

func Get(redisClient *redis.ClusterClient, key string) (val string, err error) {
	resp := redisClient.Get(key)
	if resp.Err() != nil {
		return val, resp.Err()
	}
	return resp.Result()
}

func Set(redisClient *redis.ClusterClient, key string, val interface{}, ttl time.Duration) error {
	return redisClient.Set(key, val, ttl).Err()
}
