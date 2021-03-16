package runner

import (
	"context"
	"errors"
	"fmt"

	"github.com/gammazero/workerpool"
)

var (
	ErrAlreadyRunning = errors.New("job with same id is already running")
	ErrNoSuchJob      = errors.New("no such job")
)

type Runner struct {
	resultChan chan result
	results    map[string]result
	waitErr    error
	waitSet    map[string]struct{}
	wp         *workerpool.WorkerPool
}

type result struct {
	id   string
	data interface{}
	err  error
}

// NewRunner creates a new job runner.
func NewRunner(workers int) *Runner {
	return &Runner{
		resultChan: make(chan result),
		waitSet:    map[string]struct{}{},
		wp:         workerpool.New(workers),
	}
}

// Run executes a function that returns data and error
func (r *Runner) Run(id string, f func(r *Runner) (interface{}, error)) error {
	if _, found := r.waitSet[id]; found {
		return ErrAlreadyRunning
	}
	r.waitSet[id] = struct{}{}
	r.wp.Submit(func() {
		data, err := f(r)
		r.resultChan <- result{id, data, err}
	})
	return nil
}

// Wait collects job result until the context is canceled or times out.
func (r *Runner) Wait(ctx context.Context) error {
	r.results = make(map[string]result, len(r.waitSet))
	for len(r.waitSet) > 0 {
		select {
		case res := <-r.resultChan:
			if _, ok := r.waitSet[res.id]; !ok {
				fmt.Println("Unexpected response ID:", res.id)
				continue
			}
			delete(r.waitSet, res.id)
			r.results[res.id] = res
		case <-ctx.Done():
			// Context canceled or timed out
			r.waitErr = ctx.Err()
			return fmt.Errorf("%s while waiting for %d results", ctx.Err(),
				len(r.waitSet))
		}
	}
	return nil
}

// GetResult returns the result of running the job that had the specified id
func (r *Runner) GetResult(id string) (interface{}, error) {
	result, ok := r.results[id]
	if !ok {
		if _, ok = r.waitSet[id]; !ok {
			return nil, ErrNoSuchJob
		}
		return nil, r.waitErr
	}
	return result.data, result.err
}
