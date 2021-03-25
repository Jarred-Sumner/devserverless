package main_test

import (
	"testing"

	. "github.com/onsi/ginkgo"
	. "github.com/onsi/gomega"
)

func TestDevserverless(t *testing.T) {
	RegisterFailHandler(Fail)
	RunSpecs(t, "Devserverless Suite")
}
