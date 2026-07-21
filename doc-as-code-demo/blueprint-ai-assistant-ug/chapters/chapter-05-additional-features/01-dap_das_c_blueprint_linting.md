# Blueprint linting
If you create a blueprint using Blueprint AI Assistant, linting is
    done by default as part of the blueprint creation process. Linting must be done when you
    manually create a blueprint so that it is validated before you upload or run the
    blueprint.
    Basic linting:
    dap-bpa blueprint lint --file blueprint.yaml
    Lint with a zero-byte file check:
    dap-bpa blueprint lint --file blueprint.yaml --verify
    Lint and generate false-positive report:
    dap-bpa blueprint lint --file blueprint.yaml --report-fp
  