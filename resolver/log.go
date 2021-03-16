package resolver

import (
	"log"
)

func Error(format string, a ...interface{}) {
	log.Fatalf(format, a...)
}

func Line(message string) {
	log.Println(message)
}

func Log(format string, a ...interface{}) {
	log.Printf(format, a...)
}

func LogV(format string, a ...interface{}) {
	log.Printf(format, a...)
}
