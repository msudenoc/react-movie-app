package httpmanage

import (
	"strconv"

	"github.com/gin-gonic/gin"
)

func GetQueryInt(c *gin.Context, key string) (value int, ok bool) {
	if qParam, exists := c.GetQuery(key); exists {
		if parsed, err := strconv.Atoi(qParam); err == nil {
			value = parsed
			ok = true
		}
	}

	return value, ok
}

func GetParamInt64(c *gin.Context, key string) (value int64, ok bool) {
	if qParam, exists := c.Params.Get(key); exists {
		if parsed, err := strconv.ParseInt(qParam, 10, 64); err == nil {
			value = parsed
			ok = true
		}
	}

	return value, ok
}
