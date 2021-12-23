package httpmanage

import "log"

type HttpError struct {
	Code    int
	Error   string
	Message string
}

func BuildError(c int, e string, m string) HttpError {
	return HttpError{
		Code:    c,
		Error:   e,
		Message: m,
	}
}

func checkError(err error) {
	if err != nil {
		log.Panic(err)
	}
}
